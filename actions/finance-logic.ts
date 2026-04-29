// actions/finance-logic.ts
'use server'

export async function releasePayment(paymentId: string, authUser: string) {
  const { data: payment } = await supabase.from('payments').select('*').eq('id', paymentId).single();

  if (payment.prepared_by === authUser) {
    throw new Error("Dual-Auth Violation: Preparer cannot be Authorizer.");
  }

  return await supabase
    .from('payments')
    .update({ 
      status: 'RELEASED', 
      released_by: authUser,
      released_at: new Date() 
    })
    .eq('id', paymentId);
}
