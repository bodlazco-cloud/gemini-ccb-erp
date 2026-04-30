'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

/**
 * INTERNAL RENTAL LOGGING
 * Logic: Charges the Project Site a Daily Rate based on Equipment Usage.
 */
export async function logEquipmentUsage(data: {
  equipment_id: string;
  site_id: string;
  unit_id: string;
  days_used: number;
}) {
  // 1. Get Daily Rate from Master Directory
  const { data: equipment } = await supabase
    .from('equipment_directory')
    .select('daily_rental_rate')
    .eq('id', data.equipment_id)
    .single();

  const totalCost = data.days_used * equipment.daily_rental_rate;

  // 2. Execute Internal Transfer
  // Debit: Site Project Cost | Credit: Motor Pool Revenue
  const { error } = await supabase.rpc('execute_internal_rental_charge', {
    p_site_id: data.site_id,
    p_unit_id: data.unit_id,
    p_equipment_id: data.equipment_id,
    p_total_charge: totalCost
  });

  revalidatePath('/motorpool/usage');
  return { success: !error };
}
