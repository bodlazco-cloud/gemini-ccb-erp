'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function verifyMilestone(data: {
  ntp_id: string;
  unit_id: string;
  audit_status: 'VERIFIED' | 'REJECTED';
  remarks: string;
  auditor_id: string;
}) {
  // 1. Update the Milestone Status
  const { error } = await supabase
    .from('milestone_progress')
    .update({ 
      status: data.audit_status, 
      verified_at: new Date(),
      auditor_remarks: data.remarks,
      verified_by: data.auditor_id
    })
    .match({ ntp_id: data.ntp_id, unit_id: data.unit_id });

  if (error) throw new Error(error.message);

  // 2. If VERIFIED, trigger the creation of a "Pending Bill" in Finance
  if (data.audit_status === 'VERIFIED') {
    await supabase.rpc('generate_subcon_billable', { 
      p_ntp_id: data.ntp_id,
      p_unit_id: data.unit_id 
    });
  }

  revalidatePath('/audit/queues');
  revalidatePath('/finance/payables');
  return { success: true };
}
