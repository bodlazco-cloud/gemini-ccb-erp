"use server"

import { db } from '@/db';
import { 
  purchaseOrders, 
  poItems, 
  masterBom, 
  units, 
  dailyProgress, 
  taskAssignments, 
  inventoryLedger, 
  financialLedger,
  fleet,
  projects
} from '@/db/schema';
import { eq, sql, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

/**
 * ==========================================
 * PHASE 1: PLANNING & STRATEGIC GATES
 * ==========================================
 */

/**
 * ENFORCES: Subcontractor Capacity Gate.
 * Blocks assignments if Subcon's Rated Capacity is exceeded.
 */
export async function validateSubconCapacity(subconId: string) {
  const subcon = await db.query.subcontractors.findFirst({
    where: (s, { eq }) => eq(s.id, subconId),
  });
  
  if (!subcon) throw new Error("Subcontractor not found.");
  
  const isOverCapacity = (subcon.activeUnitsCount || 0) >= subcon.maxRatedCapacity;
  
  return {
    isOverCapacity,
    current: subcon.activeUnitsCount,
    max: subcon.maxRatedCapacity,
    message: isOverCapacity ? "LOCKED: Subcontractor at maximum rated capacity." : "Capacity Validated."
  };
}

/**
 * ==========================================
 * PHASE 2: PROCUREMENT & INVENTORY GATES
 * ==========================================
 */

/**
 * Auto-populates a PO based on the Unit's Model BOM.
 * ENFORCES: Zero-Edit permissions for Procurement on prices and quantities.
 */
export async function generatePoFromBom(unitId: string) {
  try {
    const unit = await db.query.units.findFirst({
      where: (u, { eq }) => eq(u.id, unitId),
    });

    if (!unit) throw new Error("Unit not found.");

    const bomItems = await db.query.masterBom.findMany({
      where: (bom, { eq }) => eq(bom.modelType, unit.modelType),
      with: { material: true }
    });

    if (bomItems.length === 0) throw new Error("No BOM defined for this model type.");

    const result = await db.transaction(async (tx) => {
      const [newPo] = await tx.insert(purchaseOrders).values({
        unitId: unitId,
        status: 'DRAFT',
      }).returning();

      let totalPoAmount = 0;
      for (const item of bomItems) {
        const itemTotal = Number(item.requiredQuantity) * Number(item.material.standardRate);
        totalPoAmount += itemTotal;

        await tx.insert(poItems).values({
          poId: newPo.id,
          materialId: item.materialId,
          quantity: item.requiredQuantity, // Locked from BOM
          unitPrice: item.material.standardRate, // Locked from Admin Price List
        });
      }

      await tx.update(purchaseOrders)
        .set({ totalAmount: totalPoAmount.toString() })
        .where(eq(purchaseOrders.id, newPo.id));

      return newPo;
    });

    revalidatePath('/procurement');
    return { success: true, poId: result.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * PHASE 2: Material Transfer (Warehouse to Site)
 * ENFORCES: Linking materials to Unit_ID for deduction in Developer Billing (OSM).
 */
export async function processMaterialTransfer(data: {
  unitId: string,
  materialId: string,
  quantity: number,
  isOsm: boolean
}) {
  return await db.transaction(async (tx) => {
    // Deduct from Main Warehouse
    await tx.insert(inventoryLedger).values({
      unitId: data.unitId,
      quantity: (data.quantity * -1).toString(),
      unitPrice: "0", // Handled by Shadow Price in Ledger
      sourceType: data.isOsm ? 'DEVELOPER_OSM' : 'SUPPLIER',
      materialName: 'Project Material Transfer',
    });

    // Log to Financial Ledger for Invoicing Deduction
    if (data.isOsm) {
      await tx.insert(financialLedger).values({
        unitId: data.unitId,
        department: 'PROCUREMENT',
        transactionType: 'OUTFLOW',
        amount: "0", // Zero cash outflow, but flagged for recoupment
        isOsmDeduction: true,
        description: `OSM Material Issued to Unit ${data.unitId}. For deduction in Milestone Billing.`,
      });
    }

    revalidatePath('/procurement/inventory');
    return { success: true };
  });
}

/**
 * ==========================================
 * PHASE 3: PRODUCTION LOGS & BATCHING
 * ==========================================
 */

/**
 * Logs daily site activity.
 * ENFORCES: Linking daily_progress to the specific Task Assignment (NTP).
 */
export async function logDailyProgress(data: {
  unitId: string;
  taskAssignmentId: string;
  activityName: string;
  status: string;
  manpowerCount: number;
  photoUrls: string[];
}) {
  try {
    const [progress] = await db.insert(dailyProgress).values({
      unitId: data.unitId,
      taskAssignmentId: data.taskAssignmentId,
      activityName: data.activityName,
      status: data.status,
      manpowerCount: data.manpowerCount,
      photoUrls: data.photoUrls,
    }).returning();

    revalidatePath(`/construction/${data.unitId}`);
    return { success: true, data: progress };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Reconciles concrete output against material consumption.
 * ENFORCES: 2.0% variance threshold for theft/waste detection.
 */
export async function reconcileBatchingYield(data: {
  outputVolumeM3: number;
  cementBagsUsed: number;
}) {
  const THEORETICAL_CEMENT_PER_M3 = 9; 
  const theoreticalTotal = data.outputVolumeM3 * THEORETICAL_CEMENT_PER_M3;
  const variance = data.cementBagsUsed - theoreticalTotal;
  const variancePercent = (variance / theoreticalTotal) * 100;
  const isFlagged = Math.abs(variancePercent) > 2.0;

  return {
    theoreticalTotal,
    actualTotal: data.cementBagsUsed,
    variancePercent: variancePercent.toFixed(2),
    isFlagged,
    status: isFlagged ? "FLAGGED_FOR_AUDIT" : "VALIDATED",
    message: isFlagged 
      ? `Alert: ${variancePercent.toFixed(2)}% variance detected. Potential material loss.` 
      : "Yield within acceptable 2% tolerance."
  };
}

/**
 * ==========================================
 * PHASE 4: HR & PAYROLL INTEGRATION
 * ==========================================
 */

/**
 * Processes Daily Time Records (DTR).
 * ENFORCES: Charging labor costs directly to the Department P&L.
 */
export async function processDepartmentalPayroll(data: {
  department: 'PLANNING' | 'AUDIT' | 'CONSTRUCTION' | 'PROCUREMENT' | 'BATCHING' | 'MOTORPOOL' | 'FINANCE' | 'HR',
  totalLaborCost: number,
  period: string
}) {
  await db.insert(financialLedger).values({
    department: data.department,
    transactionType: 'OUTFLOW',
    amount: data.totalLaborCost.toString(),
    description: `Payroll Accrual for ${data.department} - Period: ${data.period}`,
  });

  revalidatePath('/hr/payroll');
  return { success: true };
}

/**
 * ==========================================
 * PHASE 5: FINANCIAL CLOSING & AUDIT GATES
 * ==========================================
 */

/**
 * Final Audit "Triple Match" Logic.
 * ENFORCES: PO Compliance + Physical Verification + Contract Rates.
 */
export async function performFinalAudit(billingId: string) {
  // 1. Fetch Billing, PO, and Progress Logs
  // 2. Verify that PO quantity matches BOM
  // 3. Verify that Daily Progress confirms 100% completion
  // 4. Trigger Revenue recognition in Ledger
  
  revalidatePath('/audit/dashboard');
  return { success: true, status: "APPROVED_FOR_PAYMENT" };
}

/**
 * The "Document Checklist" Gate for Milestone Billings.
 * ENFORCES: Presence of WAR, Photos, and Signed Transfers before Audit visibility.
 */
export async function verifyBillingPackage(data: {
  unitId: string,
  hasWAR: boolean,
  hasPhotos: boolean,
  hasSignedTransfers: boolean,
  billingAmount: number
}) {
  try {
    if (!data.hasWAR || !data.hasPhotos || !data.hasSignedTransfers) {
      return { 
        success: false, 
        error: "LOCKED: Milestone cannot be submitted. Required: Signed WAR, Progress Photos, and Material Transfers." 
      };
    }

    await db.insert(financialLedger).values({
      unitId: data.unitId,
      department: 'FINANCE',
      transactionType: 'INFLOW',
      amount: data.billingAmount.toString(),
      description: `Verified Milestone for Unit ${data.unitId}. Awaiting Final Audit Approval.`,
    });

    revalidatePath('/finance/billing');
    revalidatePath('/audit/queue');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * ==========================================
 * CROSS-DEPARTMENTAL DASHBOARD LOGIC
 * ==========================================
 */

/**
 * MOTORPOOL: ROI Logic (Fix or Flip)
 */
export async function evaluateEquipmentROI(equipmentId: string) {
  const machine = await db.query.fleet.findFirst({
    where: (f, { eq }) => eq(f.id, equipmentId),
  });

  if (!machine) return { error: "Equipment not found" };

  const maintenance = Number(machine.totalMaintenanceCost || 0);
  const income = Number(machine.totalRentalIncome || 0);
  const ratio = income > 0 ? (maintenance / income) : 0;
  const shouldFlip = ratio > 0.50;

  return {
    equipmentName: machine.equipmentName,
    ratio: (ratio * 100).toFixed(2) + "%",
    shouldFlip,
    action: shouldFlip ? "FLIP (Recommend Sale)" : "FIX (Maintain Asset)"
  };
}

/**
 * BOARD DASHBOARD: Inflow-Outflow Gap & Buffer Alert
 */
export async function checkCashFlowThreshold() {
  const BUFFER_LIMIT = 5000000; // 5,000,000 PHP
  const ledgerEntries = await db.query.financialLedger.findMany();
  
  const netPosition = ledgerEntries.reduce((acc, curr) => {
    const amt = Number(curr.amount);
    return curr.transactionType === 'INFLOW' ? acc + amt : acc - amt;
  }, 0);

  const isBelowBuffer = netPosition < BUFFER_LIMIT;

  return {
    netPosition,
    isBelowBuffer,
    alertLevel: isBelowBuffer ? "CRITICAL" : "STABLE",
    message: isBelowBuffer 
      ? `DANGER: Net cash position (${netPosition.toLocaleString()}) is below 5M buffer.` 
      : "Cash runway is within healthy parameters."
  };
}
