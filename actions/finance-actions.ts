// actions/finance-actions.ts
export async function authorizePayment(voucher_id: string, authorizer_id: string) {
  // Check if source document exists
  const { data: voucher } = await supabase
    .from('financial_vouchers')
    .select('source_doc_url, amount')
    .eq('id', voucher_id)
    .single();

  if (!voucher.source_doc_url) {
    throw new Error("Security Violation: No source document attached.");
  }

  // Trigger Dual-Auth Lock
  const { error } = await supabase
    .from('financial_vouchers')
    .update({ 
      authorized_by: authorizer_id,
      status: 'RELEASED',
      released_at: new Date()
    })
    .eq('id', voucher_id);

  // Update Bank Balance automatically
  if (!error) {
    await supabase.rpc('update_bank_balance', { 
      p_voucher_id: voucher_id 
    });
  }
}
