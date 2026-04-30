'use server'
import { supabase } from '@/lib/supabase';

/**
 * AUTOMATED PR GENERATION
 * Converts verified Resource Forecasts into a formal Purchase Requisition.
 */
export async function generatePRFromForecast(siteId: string) {
  // 1. Fetch pending forecasts for the site
  const { data: forecasts } = await supabase
    .from('resource_forecasts')
    .select('*')
    .eq('site_id', siteId)
    .eq('status', 'PENDING_PR');

  if (!forecasts || forecasts.length === 0) return { message: "No pending forecasts found." };

  // 2. Create the PR Header
  const { data: prHeader } = await supabase
    .from('purchase_requisitions')
    .insert({ 
      site_id: siteId, 
      requested_by: 'SYSTEM_FORECAST',
      status: 'AWAITING_PO_CONVERSION' 
    })
    .select()
    .single();

  // 3. Map Forecast Items to PR Line Items
  const prLines = forecasts.map(f => ({
    pr_id: prHeader.id,
    item_id: f.item_id,
    quantity: f.forecast_qty,
    unit_id: f.unit_id // Maintains unit-level traceability
  }));

  await supabase.from('pr_items').insert(prLines);

  // 4. Update Forecast Status to prevent double-ordering
  await supabase
    .from('resource_forecasts')
    .update({ status: 'PR_CREATED' })
    .eq('site_id', siteId)
    .eq('status', 'PENDING_PR');

  return { success: true, prId: prHeader.id };
}
