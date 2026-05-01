export default function BvAReport({ params }) {
  return (
    <div className="p-8 space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Budget vs. Actual Analysis</h1>
          <p className="text-slate-500 uppercase text-xs tracking-widest font-bold">Project Ref: {params.site_id}</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline">Filter by Block</Button>
           <Button variant="outline">Filter by Unit</Button>
           <Button className="bg-green-600">Export PDF</Button>
        </div>
      </header>

      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <Table>
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 text-left">Category / Material</th>
              <th>BOM Budget (Qty)</th>
              <th>Actual Used (Qty)</th>
              <th>Variance (Qty)</th>
              <th>Cost Variance (PHP)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-medium">Structural / Cement 40kg</td>
              <td className="text-center">1,000 Bags</td>
              <td className="text-center font-bold text-red-600">1,120 Bags</td>
              <td className="text-center">-120</td>
              <td className="text-center font-bold text-red-600">(34,200.00)</td>
              <td><Badge className="bg-red-100 text-red-700">Over-Budget</Badge></td>
            </tr>
            {/* Additional rows... */}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
