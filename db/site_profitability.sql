CREATE VIEW site_profitability AS
SELECT 
    p.site_id,
    p.block_id,
    p.unit_id,
    p.contract_price,
    -- Direct Costs
    COALESCE(SUM(m.material_cost), 0) as total_materials,
    COALESCE(SUM(l.labor_cost), 0) as total_labor,
    COALESCE(SUM(c.concrete_cost), 0) as total_concrete_internal,
    COALESCE(SUM(f.fleet_rental_cost), 0) as total_fleet_internal,
    -- Calculation
    (p.contract_price - (SUM(m.material_cost) + SUM(l.labor_cost) + SUM(c.concrete_cost) + SUM(f.fleet_rental_cost))) as net_profit_margin
FROM unit_master p
LEFT JOIN material_issuances m ON p.unit_id = m.unit_id
-- ... joins for labor, concrete, and fleet
GROUP BY p.site_id, p.block_id, p.unit_id;
