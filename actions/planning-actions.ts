// actions/planning-actions.ts
'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

/**
 * MRP AGGREGATOR & PR ISSUANCE
 * Logic: Scans PENDING_NTP units, aggregates BOM requirements with multipliers,
 * subtracts Virtual Warehouse stock, and creates a consolidated PR.
 */
export async function consolidateAndIssuePR(siteId: string, pendingNtpIds: string[]) {
  try {
    // 1. AGGREGATE DEMAND via SQL RPC (The Engine)
    // This RPC handles the multipliers for BEG/REG/END types and joins with Master BOM
    const { data: aggregatedDemand, error: aggError } = await supabase
      .rpc('calculate_mrp_demand', { 
        p_ntp_ids: pendingNtpIds 
      });

    if (aggError) throw new Error(`Aggregation Error: ${aggError.message}`);
    if (!aggregatedDemand || aggregatedDemand.length === 0) {
      return { success: false, message: "No demand found for selected NTPs." };
    }

    // 2. VIRTUAL WAREHOUSE CHECK & MOQ PREPARATION
    // We calculate the net shortfall and flag MOQ issues for Procurement
    const prItems = aggregatedDemand.map(item => {
      const netShortfall = Math.max(0, item.total_needed - (item.current_soh || 0));
      return {
        material_id: item.material_id,
        requested_qty: netShortfall,
        standard_rate: item.master_rate, // ADMIN SOVEREIGNTY: Locked Price
        moq_status: netShortfall < item.moq_threshold ? 'BELOW_MOQ' : 'OPTIMIZED',
        moq_threshold: item.moq_threshold
      };
    });

    // 3. CREATE CONSOLIDATED PR HEADER
    const totalEstValue = prItems.reduce((acc, i) => acc + (i.requested_qty * i.standard_rate), 0);

    const { data: prHeader, error: prError } = await supabase
      .from('purchase_requisitions')
      .insert({
        site_id: siteId,
        status: 'PENDING_PROCUREMENT',
        total_est_value: totalEstValue,
        origin_dept: 'PLANNING_ENGINEERING'
      })
      .select()
      .single();

    if (prError) throw new Error(`PR Header Error: ${prError.message}`);

    // 4. INSERT PR LINE ITEMS
    const { error: itemError } = await supabase.from('pr_items').insert(
      prItems.map(item => ({
        pr_id: prHeader.id,
        material_id: item.material_id,
        quantity: item.requested_qty,
        moq_flag: item.moq_status === 'BELOW_MOQ'
      }))
    );

    if (itemError) throw new Error(`PR Items Error: ${itemError.message}`);

    // 5. UPDATE NTP STATUS (The Lock)
    // Move from PENDING_APPROVAL to PR_GENERATED to prevent duplicate orders
    await supabase
      .from('task_assignments')
      .update({ status: 'PR_GENERATED' })
      .in('id', pendingNtpIds);

    // Refresh the UI across affected segments
    revalidatePath('/planning/resource-mapping');
    revalidatePath('/procurement/requisitions');

    return { 
      success: true, 
      pr_id: prHeader.id, 
      message: `Consolidated PR ${prHeader.id} issued successfully.` 
    };

  } catch (error: any) {
    console.error("MRP/PR Action Failure:", error.message);
    return { success: false, error: error.message };
  }
}

/**
 * HELPER: Fetch Current MRP Queue for UI Display
 */
export async function getMRPQueue(site_id: string) {
  const { data, error } = await supabase
    .from('task_assignments')
    .select(`
      id,
      unit_type,
      unit_ids,
      status
    `)
    .eq('site_id', site_id)
    .eq('status', 'PENDING_APPROVAL');

  if (error) return [];
  return data;
}
