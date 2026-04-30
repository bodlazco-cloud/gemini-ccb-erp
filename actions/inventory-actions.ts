export async function processMRR(data: { po_id: string; items: any[]; photo_url: string }) {
  // 1. Update PO Line Items (Remaining Balance)
  // 2. Increment Virtual Warehouse Stock (site_id level)
  // 3. Create 'Material Movement' log for Audit
  const { error } = await supabase.rpc('process_material_receiving', {
    p_po_id: data.po_id,
    p_items: data.items,
    p_evidence: data.photo_url
  });
}
// actions/inventory-actions.ts

// ... (keep your existing processMRR function at the top)

/**
 * INVENTORY ADJUSTMENT LOGIC
 * Handles non-PO movements (Theft, Damage, Spillage, or Found Stock).
 * Triggers an Audit flag if the value exceeds the Admin threshold.
 */
export async function adjustInventory(data: {
  material_id: string;
  site_id: string;
  adjustment_qty: number; 
  reason: string;
  photo_proof: string;
  unit_price: number; // Pulled from Master List at runtime
}) {
  const totalAdjustmentValue = Math.abs(data.adjustment_qty * data.unit_price);

  // 1. ATOMIC TRANSACTION: Log the discrepancy and update physical stock
  const { data: adjustment, error } = await supabase.rpc('execute_inventory_adjustment', {
    p_site_id: data.site_id,
    p_material_id: data.material_id,
    p_qty: data.adjustment_qty,
    p_reason: data.reason,
    p_evidence: data.photo_proof,
    p_is_high_value: totalAdjustmentValue > 5000 // Flag for Audit/BOD
  });
  if (error) {
    console.error("Adjustment Failed:", error.message);
    return { success: false, error: error.message };
  }

  return { 
    success: true, 
    flagged: totalAdjustmentValue > 5000, 
    message: "Adjustment logged and stock updated." 
  };
}
