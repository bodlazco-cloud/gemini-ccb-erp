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
