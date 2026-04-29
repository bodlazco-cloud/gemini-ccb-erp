"use server"
import { db } from '@/db';
import { projects, taskAssignments, subcontractors, units, masterBom, purchaseOrders, poItems } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// --- PHASE 1: BOD & MOBILIZATION ---
export async function bodApproveProject(projectId: string) {
  await db.update(projects).set({ bodApproved: true }).where(eq(projects.id, projectId));
  revalidatePath('/planning');
}

export async function createNtp(data: any) {
  // GATE: Check BOD Approval
  const unit = await db.query.units.findFirst({
    where: (u, { eq }) => eq(u.id, data.unitId),
    with: { project: true }
  });
  if (!unit?.project?.bodApproved) throw new Error("LOCKED: Awaiting BOD Strategic Approval.");

  // GATE: Subcon Capacity
  const subcon = await db.query.subcontractors.findFirst({ where: (s, { eq }) => eq(s.id, data.subcontractorId) });
  if (subcon && subcon.activeUnitsCount >= subcon.maxRatedCapacity) throw new Error("LOCKED: Subcontractor at max capacity.");

  return await db.transaction(async (tx) => {
    const [ntp] = await tx.insert(taskAssignments).values(data).returning();
    await tx.update(subcontractors).set({ activeUnitsCount: sql`${subcontractors.activeUnitsCount} + 1` }).where(eq(subcontractors.id, data.subcontractorId));
    return ntp;
  });
}

// --- PHASE 2: PROCUREMENT ---
export async function generatePo(unitId: string) {
  const unit = await db.query.units.findFirst({ where: (u, { eq }) => eq(u.id, unitId) });
  const bomItems = await db.query.masterBom.findMany({ where: (b, { eq }) => eq(b.modelType, unit!.modelType), with: { material: true } });

  return await db.transaction(async (tx) => {
    const [po] = await tx.insert(purchaseOrders).values({ unitId, status: 'DRAFT' }).returning();
    for (const item of bomItems) {
      await tx.insert(poItems).values({
        poId: po.id,
        materialId: item.materialId,
        quantity: item.requiredQuantity, // FIXED
        unitPrice: item.material.standardRate // FIXED
      });
    }
    return po;
  });
}
```

### 3. GitHub & Base44 Integration

To pull this into **Base44**, you need to push these files to a GitHub repository.

**Step-by-Step GitHub Setup:**
1.  **Create Repository:** Go to GitHub and create a new repository (e.g., `castcrete-360-erp`).
2.  **Initialize Locally:**
    ```bash
    git init
    git add .
    git commit -m "Initial Build: Consolidated Schema and ERP Gates"
    ```
3.  **Link to GitHub:**
    ```bash
    git remote add origin https://github.com/your-username/castcrete-360-erp.git
    git branch -M main
    git push -u origin main
