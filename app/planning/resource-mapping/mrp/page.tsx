export default function MRPQueue({ site_id }) {
  // Logic: Fetch aggregated totals and subtract 'Virtual Warehouse' stock
  return (
    <div className="p-6">
      <header className="flex justify-between mb-6">
        <h2 className="text-xl font-bold uppercase tracking-tight text-slate-700">
          MRP Aggregator: Site {site_id}
        </h2>
        <Badge variant="outline">Units Pending: 12</Badge>
      </header>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <thead className="bg-slate-50">
            <tr>
              <th>Material</th>
              <th>Total Gross Demand</th>
              <th>Stock on Hand (Virtual)</th>
              <th>Net to Purchase</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-medium">Cement (40kg)</td>
              <td>1,080 Bags</td>
              <td className="text-blue-600">200 Bags</td>
              <td className="font-bold">880 Bags</td>
              <td>
                <span className="text-orange-500 font-bold">● Below MOQ (1000)</span>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg flex items-center justify-between border border-blue-100">
        <div className="flex gap-2 items-center text-blue-800 font-medium">
          <InfoIcon size={18} />
          <span>MOQ Suggestion: Add 2 units from Block 15 to hit Cement MOQ.</span>
        </div>
        <Button className="bg-blue-700">Consolidate & Issue PR</Button>
      </div>
    </div>
  );
}
