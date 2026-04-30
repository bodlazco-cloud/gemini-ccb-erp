// actions/construction-actions.ts
'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function submitNTP(formData: {
  site_id: string;
  subcon_id: string;
  sow_id: string;
  unit_ids: string[]; // Array of selected Unit IDs (e.g., B12-L04)
  unit_type: 'BEG' | 'REG' | 'END';
  manpower_count: number;
}) {
  
  // 1. GENERATE AUTO-IDENTIFIER
  // Format: NTP-[SITE]-[TIMESTAMP]
  const ntp_id = `NTP-${formData.site_id.substring(0,3).toUpperCase()}-${Date.now()}`;

  // 2. CAPACITY CHECK (Subcon Rated Capacity vs. Active Units)
  const { data: subcon } = await supabase
    .from('subcontractors')
    .select('max_rated_capacity, active_units_count')
    .eq('id', formData.subcon_id)
    .single();

  if (subcon.active_units_count + formData.unit_ids.length > subcon.max_rated_capacity) {
    throw new Error("Validation Failed: Subcontractor exceeds rated capacity.");
  }

  // 3. ATOMIC TRANSACTION: Create NTP and Update Unit Status
  // We use a RPC (Stored Procedure) to ensure both happen or neither happens
  const { error } = await supabase.rpc('issue_ntp_v2', {
    p_ntp_id: ntp_id,
    p_site_id: formData.site_id,
    p_subcon_id: formData.subcon_id,
    p_sow_id: formData.sow_id,
    p_unit_ids: formData.unit_ids,
    p_unit_type: formData.unit_type,
    p_manpower: formData.manpower_count,
    p_status: 'PENDING_APPROVAL' // Requires Construction Officer sign-off
  });

  if (error) {
    console.error("NTP Submission Error:", error);
    return { success: false, message: error.message };
  }

  revalidatePath('/construction/site/[id]');
  return { success: true, ntp_id };
}
