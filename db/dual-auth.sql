ALTER TABLE financial_vouchers ADD COLUMN prepared_by UUID REFERENCES auth.users(id);
ALTER TABLE financial_vouchers ADD COLUMN authorized_by UUID REFERENCES auth.users(id);
ALTER TABLE financial_vouchers ADD COLUMN status TEXT DEFAULT 'DRAFT'; -- DRAFT, PENDING_RELEASE, RELEASED
