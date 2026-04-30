CREATE TABLE virtual_inventory_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    material_id UUID REFERENCES master_materials(id),
    site_id UUID REFERENCES sites(id),
    total_bulk_qty NUMERIC(12,2),
    allocated_qty NUMERIC(12,2) DEFAULT 0,
    remaining_qty NUMERIC(12,2) GENERATED ALWAYS AS (total_bulk_qty - allocated_qty) STORED
);
