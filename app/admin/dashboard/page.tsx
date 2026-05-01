'use client'
// Dashboard enforces "Admin Sovereignty"
export default function ExecutiveOverview() {
  const { cashOnHand, totalPayables } = useFinances();

  return (
    <div className="p-8 bg-slate-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light">Castcrete 360 <span className="font-bold text-orange-500">HQ</span></h1>
        {cashOnHand < 5000000 && (
          <div className="bg-red-600 px-4 py-2 rounded animate-pulse">
            CRITICAL: Cash Below 5M Buffer
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-6">
        <KPICard title="Solvency Ratio" value="1.45" status="Healthy" />
        <KPICard title="Fleet ROI" value="22%" status="High" />
        <KPICard title="Labor Efficiency" value="94%" status="Optimal" />
        <KPICard title="Active Units" value="120/120" status="At Capacity" />
      </div>
      
      {/* Real-time P&L Chart follows here */}
    </div>
  );
}
