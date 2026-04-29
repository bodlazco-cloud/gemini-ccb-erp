# CASTCRETE 360 ERP

An Enterprise Resource Planning system for Castcrete Builders, managing a 120-unit housing construction project.

## Architecture

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Package Manager**: npm
- **Port**: 5000

## Project Structure

```
app/                    # Next.js App Router pages
  layout.tsx            # Root layout with sidebar navigation
  page.tsx              # BOD Cockpit (main dashboard)
  planning/page.tsx     # Planning & Engineering department
  audit/page.tsx        # Audit & Quality department
  construction/page.tsx # Construction (Sites) department
  procurement/page.tsx  # Procurement & Stock department
  batching/page.tsx     # Batching Plant department
  motorpool/page.tsx    # Motorpool department
  finance/page.tsx      # Finance & Accounting department
  hr/page.tsx           # HR & Payroll department
  globals.css           # Global Tailwind styles

actions/                # Next.js Server Actions (business logic)
  erp-logic.ts          # Core ERP gates (BOD approval, NTP, PO generation)
  bod-approval.ts       # BOD strategic approval actions
  ntp-issuance.ts       # Notice-to-Proceed issuance with gates
  procurement-and-production.ts  # Full procurement & production lifecycle
  file-upload.ts        # Document upload actions

db/
  schema.sql            # Full PostgreSQL schema (8 departments)
  planning.sql          # Planning queries (120-unit matrix)
```

## Key Features

- **BOD Cockpit**: Strategic dashboard with KPIs, gate status, P&L summary
- **8-Department Structure**: Planning, Audit, Construction, Procurement, Batching, Motorpool, Finance, HR
- **Strategic Gates**: BOD approval required before NTP issuance or procurement
- **120-Unit Production Matrix**: Visual grid tracking all unit statuses
- **5M Cash Buffer Alert**: System-wide financial threshold monitoring

## Running the App

```bash
npm run dev   # Development (port 5000)
npm run build # Production build
npm start     # Production start
```

## Deployment

Configured for autoscale deployment with `npm run build` and `npm run start`.
