"use server"

import { createClient } from '@/utils/supabase/server'; // Assumes Supabase SSR helper
import { revalidatePath } from 'next/cache';

/**
 * Handles file uploads to Supabase Storage and returns the path.
 * Used for:
 * 1. Site Progress Photos (Construction Department)
 * 2. Signed WAR/Transfers (Finance Department Checklist)
 * 3. Equipment Maintenance Logs (Motorpool)
 */
export async function uploadFile(
  formData: FormData, 
  bucketName: string, 
  pathPrefix: string
) {
  const supabase = createClient();
  
  // Auth check - ensure only authenticated staff can upload
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error("Unauthorized: You must be logged in to upload assets.");
  }

  const file = formData.get('file') as File;
  if (!file) throw new Error("No file provided.");

  // Clean filename to prevent storage path issues (e.g., Block-Lot_Photo.jpg)
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
  const filePath = `${pathPrefix}/${fileName}`;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error("Storage Upload Error:", error);
    throw new Error(`Failed to upload to ${bucketName}: ${error.message}`);
  }

  // Return the path and public URL
  // Note: Ensure the bucket is set to 'Public' in Supabase dashboard
  return {
    path: data.path,
    fullUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${data.path}`
  };
}

/**
 * Server Action to verify the Document Checklist for Phase III (Financial Closing)
 * This is the 'Gate' that enables the "Submit to Audit" button.
 */
export async function verifyDocumentChecklist(billingId: string, userId: string) {
  const supabase = createClient();

  // In a real scenario, this would update a 'verification_status' column 
  // in your billing or milestone table.
  const { error } = await supabase
    .from('financial_ledger') // Or a specific 'billings' table if added
    .update({ 
      description: sql`description || ' | Verified by ' || ${userId} || ' on ' || NOW()` 
    })
    .eq('id', billingId);

  if (error) throw new Error(`Verification failed: ${error.message}`);

  revalidatePath('/finance/checklist');
  return { success: true };
}
