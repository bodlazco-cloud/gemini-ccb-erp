// app/procurement/page.tsx
import { getProcurementForecast } from '@/actions/procurement-logic';
import { Card, Table, Badge, Button } from '@/components/ui'; 

export default async function ProcurementDashboard() {
  const forecast = await getProcurementForecast();

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Procurement Control</h1>
          <p className="text-muted-foreground">Automated Requisitions based on active Site NTPs.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">Print Picking List</Button>
          <Button className="bg-orange-600 hover:bg-orange-700">Bulk Generate POs</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Pending PRs" value="14" footer="Awaiting Audit Approval" />
        <Card title="OSM Materials" value="8 Units" footer="Owner Supplied - No Cost" />
        <Card title="Critical Stock" value="2 Items" color="text-red-500" />
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="p-4 text-left">Unit ID</th>
              <th className="p-4 text-left">Project</th>
              <th className="p-4 text-left">Model</th>
              <th className="p-4 text-left">Subcontractor</th>
              <th className="p-4 text-left">BOM Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((item) => (
              <tr key={item.unit_id} className="border-b">
                <td className="p-4 font-mono font-bold">{item.unit_id}</td>
                <td className="p-4">{item.units.projects.name}</td>
                <td className="p-4">{item.units.model_type}</td>
                <td className="p-4">{item.subcontractors.name}</td>
                <td className="p-4">
                  <Badge variant="secondary">Calculated</Badge>
                </td>
                <td className="p-4 text-right">
                  <Button size="sm">Review PO</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
