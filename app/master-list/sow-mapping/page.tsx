// This interface allows Admins to define the "Recipe" for a unit
export default function SOWMapping() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">SOW Resource Definition</h1>
      <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-lg mb-6">
        <Select label="Select SOW" options={['Slab Pouring', 'Wall Partitioning']} />
        <Select label="Model" options={['Model A', 'Model B']} />
        <Select label="Type" options={['BEG', 'REG', 'END']} />
      </div>

      <Table>
        <thead>
          <tr className="text-left border-b">
            <th className="pb-2">Material</th>
            <th className="pb-2">Base Qty</th>
            <th className="pb-2">Unit</th>
            <th className="pb-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Portland Cement (40kg)</td>
            <td><input type="number" className="border rounded px-2 w-24" defaultValue={9} /></td>
            <td>Bags</td>
            <td><Button variant="ghost" className="text-red-500">Remove</Button></td>
          </tr>
        </tbody>
      </Table>
      <Button className="mt-4 bg-blue-600">Lock BOM Definition</Button>
    </div>
  );
}
