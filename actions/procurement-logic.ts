// actions/procurement-logic.ts
'use server'
import { supabase } from '@/lib/supabase';

export async function getProcurementForecast() {
  // Pulls all active units that have been given the "Green Light" (NTP)
  const { data, error } = await supabase
    .from('task_assignments')
    .select(`
      unit_id,
      units (
        model_type,
        project_id,
        projects (name)
      ),
      subcontractors (name)
    `)
    .eq('status', 'ACTIVE');

  if (error) throw new Error("Failed to fetch production forecast");
  return data;
}

export async function createAutomatedPO(unitId: string, materialId: string, qty: number) {
  // Logic: Fetch the LOCKED rate from the Master List
  const { data: priceData } = await supabase
    .from('master_price_list')
    .select('standard_rate')
    .eq('id', materialId)
    .single();

  const { error } = await supabase.from('purchase_orders').insert({
    unit_id: unitId,
    material_id: materialId,
    quantity: qty,
    unit_price: priceData.standard_rate, // INJECTION PREVENTION: Uses Master Rate only
    status: 'PENDING_AUDIT'
  });

  return { success: !error };
}
