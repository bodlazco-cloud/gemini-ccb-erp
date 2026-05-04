CREATE TABLE corporate_loans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lender_name TEXT NOT NULL, -- e.g., BDO, Metrobank, Private
  loan_type TEXT, -- e.g., Equipment Loan, Working Capital
  principal_amount DECIMAL(15, 2),
  interest_rate DECIMAL(5, 2),
  tenor_months INTEGER,
  start_date DATE,
  monthly_amortization DECIMAL(15, 2),
  current_balance DECIMAL(15, 2),
  status TEXT DEFAULT 'active' -- active, fully_paid, restructured
);
