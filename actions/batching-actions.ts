/**
 * Logs a concrete delivery and handles the Internal Sales Ledger movement.
 */
export async function logConcreteDelivery(data: {
  site_id: string;
  unit_id: string;
  mix_id: string;
  cubic_meters: number;
  truck_id: string;
}) {
  // 1. Calculate Cost based on Admin-Locked Rates
  const { data: mix } = await supabase
    .from('master_mix_designs')
    .select('standard_rate')
    .eq('id', data.mix_id)
    .single();

  const totalValue = data.cubic_meters * mix.standard_rate;

  // 2. EXECUTE DUAL LEDGER ENTRY (Internal Sale)
  // This satisfies the Departmental P&L requirement
  const { error } = await supabase.rpc('execute_internal_concrete_sale', {
    p_site_id: data.site_id,
    p_unit_id: data.unit_id,
    p_qty: data.cubic_meters,
    p_total_value: totalValue,
    p_plant_id: 'MAIN_PLANT_01'
  });

  revalidatePath('/batching/production');
  return { success: !error };
}
