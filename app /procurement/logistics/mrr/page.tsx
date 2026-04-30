export default function MaterialReceiving() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Material Receiving (MRR)</h1>
      
      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <Select label="Select Approved PO" options={['PO-2024-001 (Holcim)', 'PO-2024-002 (SteelAsia)']} />
        
        <Table>
          <thead>
            <tr className="text-left border-b text-slate-500 text-sm">
              <th className="pb-2">Material</th>
              <th className="pb-2">PO Qty</th>
              <th className="pb-2 text-blue-600">Qty Received Now</th>
              <th className="pb-2">Remaining Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 font-medium">Portland Cement (40kg)</td>
              <td>1,000</td>
              <td>
                <input type="number" className="border rounded px-2 py-1 w-24 border-blue-300 focus:ring-2 focus:ring-blue-500" placeholder="0" />
              </td>
              <td className="text-slate-400">1,000</td>
            </tr>
          </tbody>
        </Table>

        <div className="border-2 border-dashed rounded-lg p-8 text-center bg-slate-50 border-slate-200">
          <CameraIcon className="mx-auto text-slate-400 mb-2" />
          <p className="text-sm text-slate-500">Upload Photo of Delivery Receipt (DR) & Materials</p>
          <input type="file" className="hidden" />
        </div>

        <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4">
          Verify Receipt & Update Site Inventory
        </Button>
      </div>
    </div>
  );
}
