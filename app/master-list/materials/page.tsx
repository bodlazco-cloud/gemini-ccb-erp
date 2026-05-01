// app/master-list/materials/page.tsx
// Logic: Admin-only interface to manage the 120-unit resource base.

export default function MaterialMaster() {
  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Material Master List</h1>
        <Button className="bg-slate-900">+ Add New Material</Button>
      </header>

      <div className="bg-white border rounded-xl overflow-hidden">
        <Table>
          <thead className="bg-slate-50">
            <tr>
              <th>Material Code</th>
              <th>Description</th>
              <th>UOM</th>
              <th>Standard Rate (PHP)</th>
              <th>Category</th>
              <th>MOQ</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr className="hover:bg-slate-50">
              <td className="font-mono text-xs">MAT-CEM-40KG</td>
              <td>Portland Cement - 40kg</td>
              <td>Bag</td>
              <td>285.00</td>
              <td>Structural</td>
              <td>1,000</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
