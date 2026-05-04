CREATE TABLE fleet_internal_billing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  equipment_id UUID REFERENCES fleet_registry(id),
  project_id UUID REFERENCES projects(id),
  date DATE NOT NULL,
  hours_used DECIMAL(5, 2),
  internal_rate DECIMAL(12, 2), -- Set by Admin Sovereignty
  total_charge DECIMAL(12, 2) GENERATED ALWAYS AS (hours_used * internal_rate) STORED,
  status TEXT DEFAULT 'pending_audit' -- Must be certified by Audit
);
