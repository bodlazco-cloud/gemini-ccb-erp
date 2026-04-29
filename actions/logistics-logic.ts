// actions/logistics-logic.ts
'use server'
import { supabase } from '@/lib/supabase';

export async function submitMRR(formData: FormData) {
  const poId = formData.get('poId');
  const qtyReceived = formData.get('qtyReceived');
  const file = formData.get('photo'); // File from mobile camera

  // 1. Upload Evidence to Supabase Storage
  const { data: fileData, error: uploadError } = await supabase.storage
    .from('mrr-evidence')
    .upload(`${poId}/${Date.now()}.jpg`, file as File);

  if (uploadError) throw new Error("Photo upload failed. Check signal.");

  // 2. Update Ledger & PO Status
  const { error: dbError } = await supabase.rpc('receive_materials_v1', {
    p_po_id: poId,
    p_qty: qtyReceived,
    p_photo_url: fileData.path
  });

  return { success: !dbError };
}
