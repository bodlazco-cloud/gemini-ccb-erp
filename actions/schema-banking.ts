import { pgTable, uuid, text, decimal, date, timestamp, boolean } from "drizzle-orm/pg-core";

// 1. Tracks the metadata of every statement upload
export const bankImports = pgTable("bank_imports", {
  id: uuid("id").primaryKey().defaultRandom(),
  bankName: text("bank_name").notNull(), // BDO, Metrobank, etc.
  importDate: timestamp("import_date").defaultNow(),
  status: text("status").default("pending"), // pending, finalized
  fileName: text("file_name"),
});

// 2. The raw rows from the CSV
export const bankStatementTransactions = pgTable("bank_statement_transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  importId: uuid("import_id").references(() => bankImports.id),
  transactionDate: date("transaction_date").notNull(),
  description: text("description"),
  referenceNo: text("reference_no"),
  debit: decimal("debit", { precision: 12, scale: 2 }).default("0"),
  credit: decimal("credit", { precision: 12, scale: 2 }).default("0"),
  isMatched: boolean("is_matched").default(false),
  matchedRecordId: uuid("matched_record_id"), // Links to Subcon Payment or Developer Collection
});

// 3. The Audit Log for reconciliation decisions
export const reconciliationLogs = pgTable("reconciliation_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  transactionId: uuid("transaction_id").references(() => bankStatementTransactions.id),
  actionBy: uuid("action_by"), 
  actionType: text("action_type"), // AUTO_MATCH, MANUAL_MATCH, UNMATCH
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});
