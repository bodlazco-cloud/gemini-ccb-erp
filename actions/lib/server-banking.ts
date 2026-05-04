"use server";
import { db } from "@/db";
import { bankImports, bankStatementTransactions } from "./schema";
import { eq, and } from "drizzle-orm";

// 1. Initial Import
export async function importBankStatement(bank: string, data: any[]) {
  const [newImport] = await db.insert(bankImports).values({ bankName: bank }).returning();
  await db.insert(bankStatementTransactions).values(
    data.map(row => ({
      importId: newImport.id,
      transactionDate: row.date,
      description: row.description,
      referenceNo: row.ref_no,
      debit: row.debit || 0,
      credit: row.credit || 0,
    }))
  );
  return newImport.id;
}

// 2. Auto-Match Logic (Date + Amount + Ref)
export async function autoMatch(importId: string) {
  // Logic: Search for exact matches in Subcon Payments (Direct Labor) or Developer AR
  // update bankStatementTransactions set isMatched = true where ...
}

// 3. Manual Match / Unmatch
export async function manualMatch(transactionId: string, internalRecordId: string, note: string) {
  await db.update(bankStatementTransactions)
    .set({ isMatched: true, matchedRecordId: internalRecordId })
    .where(eq(bankStatementTransactions.id, transactionId));
}

// 4. Finalize
export async function finalizeReconciliation(importId: string) {
  await db.update(bankImports).set({ status: "finalized" }).where(eq(bankImports.id, importId));
}
