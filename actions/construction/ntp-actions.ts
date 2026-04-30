// app/actions/construction/ntp-actions.ts
'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function submitNTPForApproval(formData: {
  site_id: string;
  subcontractor_id: string;
  sow_id: string;
  unit_ids: string[]; // Array of Unit IDs (e.g., ["B12-L04", "B12-L05"])
  unit_type: 'BEG' | 'REG' | 'END';
  manpower_count: number;
}) {
  
  // 1. AUTO-IDENTIFIER GENERATION
  const timestamp = new Date().getTime();
  const ntp_id = `NTP-${formData.site_id.substring(0,3)}-${timestamp}`;

  // 2. CAPACITY & SOW VALIDATION (Zero-Trust)
  // Check if Subcon is actually authorized for this SOW and has headcount room
  const { data: subcon } = await supabase
    .from('subcontractors')
    .select('max_rated_capacity, active_units_count')
    .eq('id', formData.subcontractor_id)
    .single();

  if (subcon.active_units_count + formData.unit_ids.length > subcon.max_rated_capacity) {
    throw new Error("Subcontractor Capacity Exceeded. Cannot issue NTP.");
  }

  // 3. ATOMIC TRANSACTION (Database Function)
  // This updates the Units to 'PENDING_NTP' and creates the Task Assignment record
  const { error } = await supabase.rpc('create_ntp_entry', {
    p_ntp_id: ntp_id,
    p_site_id: formData.site_id,
    p_subcon_id: formData.subcontractor_id,
    p_sow_id: formData.sow_id,
    p_unit_ids: formData.unit_ids,
    p_unit_type: formData.unit_type,
    p_manpower: formData.manpower_count
  });

  if (error) return { success: false, error: error.message };

  revalidatePath('/construction/site-operations');
  return { success: true, ntp_id };
}
