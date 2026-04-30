// actions/planning-actions.ts
export async function getMRPAggregation(site_id: string) {
  // 1. Get all units waiting for NTP approval at this site
  const { data: requirements } = await supabase
    .from('task_assignments')
    .select(`
      unit_type,
      units(model_type),
      master_bom(material_id, required_quantity, master_materials(material_name, uom))
    `)
    .eq('site_id', site_id)
    .eq('status', 'PENDING_APPROVAL');

  // 2. Apply multipliers (BEG: 1.1, REG: 1.0, END: 1.15) and aggregate
  const totals = requirements.reduce((acc, curr) => {
    const multiplier = curr.unit_type === 'BEG' ? 1.1 : curr.unit_type === 'END' ? 1.15 : 1.0;
    
    curr.master_bom.forEach(item => {
      const qty = item.required_quantity * multiplier;
      acc[item.material_id] = (acc[item.material_id] || 0) + qty;
    });
    return acc;
  }, {});

  return totals;
}
