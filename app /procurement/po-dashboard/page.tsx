// Logic: Fetch Draft POs with MOQ Warnings
export default function PODashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">PO Control Center</h1>
        <div className="flex gap-4">
          <Badge className="bg-orange-100 text-orange-700">6 Below MOQ</Badge>
          <Badge className="bg-blue-100 text-blue-700">12 Pending Audit</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {draftPOs.map(po => (
          <POCard key={po.id} po={po} onOptimize={() => openTopUpModal(po.id)} />
        ))}
      </div>
    </div>
  );
}
