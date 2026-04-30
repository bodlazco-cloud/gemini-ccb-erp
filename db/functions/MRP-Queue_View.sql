-- Logic for the MRP Queue View
SELECT 
    m.material_name,
    SUM(b.required_quantity * (CASE 
        WHEN n.unit_type = 'BEG' THEN 1.1 -- 10% buffer for beginning units
        WHEN n.unit_type = 'END' THEN 1.15 -- 15% buffer for ending units
        ELSE 1.0 
    END)) as total_needed
FROM task_assignments n
JOIN master_bom b ON n.unit_model = b.model_id
JOIN master_materials m ON b.material_id = m.id
WHERE n.status = 'APPROVED_BY_OFFICER'
GROUP BY m.material_name;
