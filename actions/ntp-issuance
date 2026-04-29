"use server"

import { db } from '@/db';
import { taskAssignments, projects, units, subcontractors } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { checkSubconCapacity } from './project-actions';
import { revalidatePath } from 'next/cache';

export async function createSubconTaskAssignment(data: {
  unitId: string;
  subcontractorId: string;
  startDate: Date;
  endDate: Date;
}) {
  try {
    // 1. GATE: Check if Project is BOD Approved
    const unit = await db.query.units.findFirst({
      where: (units, { eq }) => eq(units.id, data.unitId),
      with: { project: true }
    });

    if (!unit?.project?.bodApproved) {
      return { success: false, error: "LOCKED: Board of Directors must approve project targets before issuing NTPs." };
    }

    // 2. GATE: Check Subcon Capacity
    const capacity = await checkSubconCapacity(data.subcontractorId, 1);
    if (!capacity.allowed) {
      return { success: false, error: capacity.message };
    }

    // 3. EXECUTE: Create Task and Increment Subcon active count
    const result = await db.transaction(async (tx) => {
      const [newTask] = await tx.insert(taskAssignments).values({
        unitId: data.unitId,
        subcontractorId: data.subcontractorId,
        startDate: data.startDate,
        endDate: data.endDate,
        status: 'ACTIVE',
      }).returning();

      await tx.update(subcontractors)
        .set({ activeUnitsCount: sql`${subcontractors.activeUnitsCount} + 1` })
        .where(eq(subcontractors.id, data.subcontractorId));

      return newTask;
    });

    revalidatePath('/construction');
    return { success: true, task: result };
  } catch (error) {
    return { success: false, error: "Transaction failed." };
  }
}
