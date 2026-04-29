// actions/procurement-logic.ts
'use server'
import { supabase } from '@/lib/supabase';

export async function generatePOsFromForecast() {
  // 1. Get all units with 'ACTIVE' NTP status
  const { data: activeNTPs } = await supabase
    .from('task_assignments')
    .select('unit_id, units(model_type)')
    .eq('status', 'ACTIVE');

  // 2. Cross-reference with master_bom and master_price_list
  for (const ntp of activeNTPs) {
    const { data: bomItems } = await supabase
      .from('master_bom')
      .select('material_id, required_quantity, master_price_list(standard_rate, material_name)')
      .eq('model_type', ntp.units.model_type);

    // 3. Insert into Purchase Orders (Locked to Standard Rate)
    for (const item of bomItems) {
      await supabase.from('purchase_orders').insert({
        unit_id: ntp.unit_id,
        material_id: item.material_id,
        quantity: item.required_quantity,
        unit_price: item.master_price_list.standard_rate, // ADMIN-LOCKED PRICE
        status: 'PENDING_AUDIT'
      });
    }
  }
}
