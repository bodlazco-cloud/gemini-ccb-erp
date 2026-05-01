// app/procurement/page.tsx
import { getPendingRequisitions, generatePOsFromForecast } from '@/actions/procurement-logic';
import { ProcurementTable } from '@/components/procurement-table';
import { Alert, Button } from '@/components/ui';

export default async function ProcurementPage() {
  const requisitions = await getPendingRequisitions(); // Fetches data based on active NTPs

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Procurement & Inventory Control</h1>
        <div className="space-x-2">
          <Button variant="outline">Inventory Audit</Button>
          <Button onClick={generatePOsFromForecast} className="bg-blue-700">
            Generate Automated POs
          </Button>
        </div>
      </header>

      {/* OSM Flagged Items Alert */}
      <Alert title="OSM Awareness" duration={0}>
        There are {requisitions.filter(r => r.is_osm).length} items flagged as Owner Supplied. 
        These will be excluded from Vendor Payables but tracked in Inventory.
      </Alert>

      <ProcurementTable data={requisitions} />
    </div>
  );
}
