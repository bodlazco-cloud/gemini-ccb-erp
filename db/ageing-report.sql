-- AGED PAYABLES VIEW (What we owe Subcons & Suppliers)
CREATE VIEW aged_payables_summary AS
SELECT 
  vendor_name,
  category,
  amount_due,
  due_date,
  CURRENT_DATE - due_date AS days_overdue,
  CASE 
    WHEN (CURRENT_DATE - due_date) <= 30 THEN '0-30 Days'
    WHEN (CURRENT_DATE - due_date) <= 60 THEN '31-60 Days'
    WHEN (CURRENT_DATE - due_date) <= 90 THEN '61-90 Days'
    ELSE '90+ Days'
  END AS aging_bucket
FROM payables_ledger
WHERE status = 'certified_not_paid';

-- AGED RECEIVABLES VIEW (What Developers owe us)
CREATE VIEW aged_receivables_summary AS
SELECT 
  developer_name,
  milestone_name,
  billed_amount,
  billing_date,
  CURRENT_DATE - billing_date AS days_uncollected,
  CASE 
    WHEN (CURRENT_DATE - billing_date) <= 30 THEN '0-30 Days'
    WHEN (CURRENT_DATE - billing_date) <= 60 THEN '31-60 Days'
    WHEN (CURRENT_DATE - billing_date) <= 90 THEN '61-90 Days'
    ELSE '90+ Days'
  END AS aging_bucket
FROM developer_billings
WHERE status = 'billed_uncollected';
