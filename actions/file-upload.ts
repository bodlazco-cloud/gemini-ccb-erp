"use server"

import { createClient } from '@/utils/supabase/server'; // Assumes Supabase SSR helper
import { revalidatePath } from 'next/cache';

/**
 * Handles file uploads to Supabase Storage and returns the path
 * Used for Site Progress Photos (Construction) and Document Checklists (Finance)
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

  // Clean filename to prevent storage path issues
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

  // Return the path to be stored in Drizzle
  return {
    path: data.path,
    fullUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${data.path}`
  };
}

/**
 * Server Action to verify the Document Checklist for Phase III
 */
export async function verifyDocumentChecklist(billingId: string, userId: string) {
  // Logic to update the verify_status in the DB
  // This will be used in the next step to enable the "Submit to Audit" button
  console.log(`Verifying documents for billing: ${billingId} by ${userId}`);
}
