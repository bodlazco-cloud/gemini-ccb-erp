CREATE TABLE payroll_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employee_registry(id),
  project_id UUID REFERENCES projects(id), -- Maps cost to specific Project P&L
  period_end_date DATE NOT NULL,
  is_second_half BOOLEAN DEFAULT FALSE, -- FALSE = 15th, TRUE = 30th
  
  -- Earnings
  gross_pay DECIMAL(12, 2) NOT NULL,
  basic_pay DECIMAL(12, 2) NOT NULL,
  allowances DECIMAL(12, 2) DEFAULT 0,
  
  -- Deductions (The Logic results)
  sss_regular DECIMAL(12, 2) DEFAULT 0,
  sss_mpf DECIMAL(12, 2) DEFAULT 0,
  phic_deduction DECIMAL(12, 2) DEFAULT 0,
  hdmf_deduction DECIMAL(12, 2) DEFAULT 0,
  withholding_tax DECIMAL(12, 2) DEFAULT 0,
  
  -- Net Pay
  net_pay DECIMAL(12, 2) NOT NULL,
  
  -- Audit Trail
  status TEXT DEFAULT 'pending_approval', -- pending_approval, approved, paid
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
