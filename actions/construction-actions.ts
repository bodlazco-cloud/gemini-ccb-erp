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
// actions/construction-actions.ts
'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

// --- EXISTING: NTP TRIGGER LOGIC (KEEP THIS) ---
export async function submitNTP(formData: { ... }) { 
  // ... your existing code ...
}

// --- NEW: MILESTONE TAGGING LOGIC (APPEND THIS) ---
/**
 * Updates physical progress per unit. 
 * If 100%, triggers the Sequential Lock for Audit Verification.
 */
export async function updateMilestoneProgress(data: {
  unit_id: string;
  sow_activity_id: string;
  progress_pct: number;
  photo_proof_url: string;
  site_id: string; // Required for revalidation
}) {
  // 1. DATA INTEGRITY CHECK: Ensure progress doesn't exceed 100%
  if (data.progress_pct > 100) throw new Error("Progress cannot exceed 100%");

  // 2. UPDATE PROGRESS & ATTACH PROOF
  const { error: updateError } = await supabase
    .from('unit_milestones')
    .update({ 
      progress: data.progress_pct, 
      evidence_url: data.photo_proof_url,
      updated_at: new Date()
    })
    .match({ unit_id: data.unit_id, activity_id: data.sow_activity_id });

  if (updateError) throw new Error(updateError.message);

  // 3. SEQUENTIAL LOCK TRIGGER
  // If progress is 100%, we move the task into the Audit Queue. 
  // The subcon cannot bill until Audit verifies this entry.
  if (data.progress_pct === 100) {
    const { error: auditError } = await supabase
      .from('audit_verification_queue')
      .insert({
        type: 'MILESTONE_VERIFICATION',
        reference_id: data.unit_id,
        activity_id: data.sow_activity_id,
        status: 'PENDING_AUDIT',
        created_at: new Date()
      });
      
    if (auditError) console.error("Audit Queue Trigger Failed:", auditError.message);
  }

  revalidatePath(`/construction/site/${data.site_id}`);
  return { success: true };
}
// actions/construction-actions.ts
// ... keep your submitNTP function here ...

/**
 * UPDATED: Milestone Tagging with Internal Resource Triggers
 * When a milestone is tagged, it potentially triggers Fleet & Batching needs.
 */
export async function updateMilestoneProgress(data: {
  site_id: string;
  unit_id: string;
  activity_id: string;
  progress_pct: number;
  photo_proof_url: string;
}) {
  // 1. Update Unit Progress
  const { error: updateError } = await supabase
    .from('unit_milestones')
    .update({ 
      progress: data.progress_pct, 
      evidence_url: data.photo_proof_url,
      updated_at: new Date()
    })
    .match({ unit_id: data.unit_id, activity_id: data.activity_id });

  if (updateError) throw new Error(updateError.message);

  // 2. TRIGGER: Audit Queue for 100% completion
  if (data.progress_pct === 100) {
    await supabase.from('audit_verification_queue').insert({
      type: 'MILESTONE_VERIFICATION',
      site_id: data.site_id,
      unit_id: data.unit_id,
      activity_id: data.activity_id,
      status: 'PENDING_AUDIT'
    });
  }

  revalidatePath(`/construction/site/${data.site_id}`);
  return { success: true };
}
