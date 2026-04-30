// actions/finance-actions.ts
'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function authorizePaymentRelease(voucher_id: string, authorizer_id: string) {
  // 1. Fetch Voucher with Preparer and Amount details
  const { data: voucher, error: fetchError } = await supabase
    .from('financial_vouchers')
    .select('amount, source_doc_url, prepared_by, status')
    .eq('id', voucher_id)
    .single();

  if (fetchError || !voucher) throw new Error("Voucher not found.");

  // 2. SECURITY GATE: Zero-Trust Validations
  if (!voucher.source_doc_url) {
    throw new Error("Zero-Trust Violation: No source document (PDF/Photo) attached.");
  }
  
  if (voucher.prepared_by === authorizer_id) {
    throw new Error("Security Violation: The person who prepared the voucher cannot authorize the release.");
  }

  // 3. THRESHOLD LOGIC: Audit Flag for > 50,000 PHP
  const isHighValue = voucher.amount >= 50000;

  // 4. ATOMIC TRANSACTION: Release funds and Update Ledger
  const { error: updateError } = await supabase
    .from('financial_vouchers')
    .update({ 
      authorized_by: authorizer_id,
      status: 'RELEASED',
      released_at: new Date(),
      is_high_value_approved: isHighValue
    })
    .eq('id', voucher_id);

  if (updateError) throw new Error("Database transaction failed.");

  // 5. UPDATE BANK & P&L: Automated Departmental Mapping
  // This RPC updates the bank balance and logs the expense against the specific Project/Dept Cost Center
  await supabase.rpc('execute_financial_finalization', { 
    p_voucher_id: voucher_id 
  });

  revalidatePath('/finance/disbursements');
  revalidatePath('/executive/overview');
  
  return { success: true, highValue: isHighValue };
}
