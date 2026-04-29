-- CASTCRETE 360 ERP: FULL CONSOLIDATED SQL SCHEMA
-- Architecture: Unit_ID (Project-Block-Lot) as the Central Relational Key

-- 1. EXTENSIONS & ENUMS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$ BEGIN
CREATE TYPE department_type AS ENUM (
'PLANNING', 'AUDIT', 'CONSTRUCTION', 'PROCUREMENT',
'BATCHING', 'MOTORPOOL', 'FINANCE', 'HR'
);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
CREATE TYPE ntp_status AS ENUM ('DRAFT', 'BOD_APPROVED', 'ACTIVE', 'COMPLETED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. PROJECTS & UNITS (THE STRATEGIC CORE)
CREATE TABLE IF NOT EXISTS projects (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name TEXT NOT NULL,
advance_amount NUMERIC(15, 2) NOT NULL, -- Target: 63.75M PHP
bod_approved BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS units (
id TEXT PRIMARY KEY, -- Format: PROJECT-BLOCK-LOT (The Golden Key)
project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
model_type TEXT NOT NULL, -- e.g., 'Model-A', 'Model-B'
current_status TEXT DEFAULT 'PRE_PRODUCTION',
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ADMIN MASTER LISTS (READ-ONLY GATES)
CREATE TABLE IF NOT EXISTS master_price_list (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
material_name TEXT UNIQUE NOT NULL,
uom TEXT NOT NULL, -- Unit of Measure
standard_rate NUMERIC(12, 2) NOT NULL, -- Controlled by Admin/Finance
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS master_bom (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
model_type TEXT NOT NULL,
material_id UUID REFERENCES master_price_list(id),
required_quantity NUMERIC(12, 2) NOT NULL,
UNIQUE(model_type, material_id)
);

-- 4. SUBCONTRACTORS & PRODUCTION PLANNING (NTPs)
CREATE TABLE IF NOT EXISTS subcontractors (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name TEXT NOT NULL,
max_rated_capacity INTEGER NOT NULL, -- Number of units they can handle
active_units_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS task_assignments (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
unit_id TEXT REFERENCES units(id),
subcontractor_id UUID REFERENCES subcontractors(id),
status ntp_status DEFAULT 'DRAFT',
start_date DATE,
end_date DATE,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. PROCUREMENT & INVENTORY (OSM RECOUPMENT TRACKING)
CREATE TABLE IF NOT EXISTS purchase_orders (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
unit_id TEXT REFERENCES units(id),
status TEXT DEFAULT 'DRAFT',
total_amount NUMERIC(15, 2),
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS po_items (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
po_id UUID REFERENCES purchase_orders(id) ON DELETE CASCADE,
material_id UUID REFERENCES master_price_list(id),
quantity NUMERIC(12, 2) NOT NULL,
unit_price NUMERIC(12, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS inventory_ledger (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
unit_id TEXT REFERENCES units(id),
material_name TEXT NOT NULL,
quantity NUMERIC(12, 2) NOT NULL,
source_type TEXT NOT NULL, -- 'SUPPLIER' or 'DEVELOPER_OSM'
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. SITE PRODUCTION & BATCHING
CREATE TABLE IF NOT EXISTS daily_progress (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
task_assignment_id UUID REFERENCES task_assignments(id),
unit_id TEXT REFERENCES units(id),
activity_name TEXT NOT NULL,
manpower_count INTEGER NOT NULL,
status TEXT NOT NULL, -- e.g., 'IN_PROGRESS', 'COMPLETED'
photo_urls TEXT[] DEFAULT '{}', -- Evidence for Audit
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. MOTORPOOL (FIX OR FLIP ROI ENGINE)
CREATE TABLE IF NOT EXISTS fleet (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
equipment_name TEXT NOT NULL,
total_maintenance_cost NUMERIC(15, 2) DEFAULT 0,
total_rental_income NUMERIC(15, 2) DEFAULT 0, -- Internal rental to sites
status TEXT DEFAULT 'AVAILABLE',
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. CENTRAL FINANCIAL LEDGER (P&L ENGINE)
CREATE TABLE IF NOT EXISTS financial_ledger (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
unit_id TEXT REFERENCES units(id), -- Can be NULL for overhead
department department_type NOT NULL,
transaction_type TEXT NOT NULL, -- 'INFLOW' or 'OUTFLOW'
amount NUMERIC(15, 2) NOT NULL,
is_osm_deduction BOOLEAN DEFAULT FALSE, -- Flag for developer billing
description TEXT,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. PERFORMANCE INDICES
CREATE INDEX idx_ledger_unit ON financial_ledger(unit_id);
CREATE INDEX idx_ledger_dept ON financial_ledger(department);
CREATE INDEX idx_units_project ON units(project_id);
CREATE INDEX idx_progress_task ON daily_progress(task_assignment_id);
-- Track Purchase Orders linked to Unit_ID
CREATE TABLE purchase_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    po_number SERIAL UNIQUE,
    unit_id TEXT REFERENCES units(id),
    vendor_id UUID,
    total_amount NUMERIC(15,2),
    is_osm BOOLEAN DEFAULT FALSE, -- Flag for Finance Deductions
    status TEXT DEFAULT 'PENDING_AUDIT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Warehouse / Material Receiving Report (MRR)
CREATE TABLE mrr_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    po_id UUID REFERENCES purchase_orders(id),
    received_qty NUMERIC(12,2),
    receiver_id UUID REFERENCES users(id),
    photo_evidence_url TEXT,
    received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
