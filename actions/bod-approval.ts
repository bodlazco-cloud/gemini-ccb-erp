"use server"

import { db } from '@/db';
import { projects, units } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

/**
 * PHASE 1: BOD Strategic Gate
 * Approves the project targets and margin projections.
 * This "unlocks" the ability for Operations to issue Task Assignments.
 */
export async function approveProjectStrategicPlan(projectId: string) {
  try {
    const [updatedProject] = await db.update(projects)
      .set({ 
        bodApproved: true,
      })
      .where(eq(projects.id, projectId))
      .returning();

    revalidatePath('/planning');
    revalidatePath('/bod-dashboard');
    
    return { success: true, project: updatedProject };
  } catch (error) {
    console.error("BOD Approval Error:", error);
    return { success: false, error: "Failed to approve strategic plan." };
  }
}

/**
 * PHASE 1: Subcontractor Capacity Check Logic
 * Prevents assigning more units than a subcontractor can handle.
 */
export async function checkSubconCapacity(subconId: string, additionalUnits: number) {
  const subcon = await db.query.subcontractors.findFirst({
    where: (subcontractors, { eq }) => eq(subcontractors.id, subconId),
  });

  if (!subcon) throw new Error("Subcontractor not found.");

  const projectedTotal = (subcon.activeUnitsCount || 0) + additionalUnits;
  
  if (projectedTotal > subcon.maxRatedCapacity) {
    return { 
      allowed: false, 
      message: `Capacity Exceeded. Subcon has ${subcon.activeUnitsCount} active units. Max is ${subcon.maxRatedCapacity}.` 
    };
  }

  return { allowed: true };
}
