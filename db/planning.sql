-- Fetch the 120-unit production status grid
SELECT 
    id as unit_id, 
    model_type, 
    current_status,
    (SELECT name FROM subcontractors WHERE id = (
        SELECT subcontractor_id FROM task_assignments WHERE unit_id = units.id LIMIT 1
    )) as assigned_subcon
FROM units
WHERE project_id = 'YOUR_PROJECT_ID'
ORDER BY id ASC;

-- Calculate Resource Forecast (Total cement needed for the 120 units)
SELECT 
    mpl.material_name,
    SUM(bom.required_quantity) as total_needed,
    mpl.uom
FROM units u
JOIN master_bom bom ON u.model_type = bom.model_type
JOIN master_price_list mpl ON bom.material_id = mpl.id
WHERE u.project_id = 'YOUR_PROJECT_ID'
GROUP BY mpl.material_name, mpl.uom;
