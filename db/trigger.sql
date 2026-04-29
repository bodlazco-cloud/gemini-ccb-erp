-- 1. Function to Automate Internal Rental Posting
CREATE OR REPLACE FUNCTION fn_post_internal_rental()
RETURNS TRIGGER AS $$
DECLARE
    daily_rate_val NUMERIC(15,2);
BEGIN
    -- Fetch the Admin-Locked rate for this specific equipment
    SELECT standard_daily_rate INTO daily_rate_val 
    FROM fleet_master 
    WHERE id = NEW.equipment_id;

    -- DEBIT: Charge the Project Site (The Cost Center)
    INSERT INTO financial_ledger (unit_id, department, transaction_type, amount, description)
    VALUES (NEW.unit_id, 'CONSTRUCTION', 'EXPENSE', daily_rate_val * NEW.duration_days, 'Internal Equipment Rental: ' || NEW.equipment_id);

    -- CREDIT: Record Internal Revenue for the Motor Pool
    INSERT INTO financial_ledger (unit_id, department, transaction_type, amount, description)
    VALUES (NEW.unit_id, 'MOTORPOOL', 'REVENUE', daily_rate_val * NEW.duration_days, 'Internal Rental Income');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Trigger: Fires whenever a rental log is COMPLETED
CREATE TRIGGER tr_auto_rental_billing
AFTER UPDATE OF status ON fleet_rental_logs
FOR EACH ROW
WHEN (NEW.status = 'COMPLETED')
EXECUTE FUNCTION fn_post_internal_rental();
