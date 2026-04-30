-- db/functions/issue_ntp.sql
CREATE OR REPLACE FUNCTION issue_ntp_v2(
    p_ntp_id TEXT,
    p_site_id UUID,
    p_subcon_id UUID,
    p_sow_id UUID,
    p_unit_ids TEXT[],
    p_unit_type TEXT,
    p_manpower INTEGER,
    p_status TEXT
) RETURNS VOID AS $$
BEGIN
    -- Insert into Task Assignments
    INSERT INTO task_assignments (
        id, site_id, subcontractor_id, sow_id, unit_ids, unit_type, manpower_count, status
    ) VALUES (
        p_ntp_id, p_site_id, p_subcon_id, p_sow_id, p_unit_ids, p_unit_type, p_manpower, p_status
    );

    -- Update Units status to PENDING_NTP to trigger the Demand Aggregator
    UPDATE units 
    SET current_status = 'PENDING_NTP'
    WHERE id = ANY(p_unit_ids);
END;
$$ LANGUAGE plpgsql;
