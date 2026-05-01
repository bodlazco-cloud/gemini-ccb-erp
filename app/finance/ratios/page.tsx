// Using a simple grid for high-impact executive readability
export default function FinancialHealth() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      {/* Liquidity Gauge */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm text-center">
        <h3 className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-4">Liquidity Ratio</h3>
        <div className="text-5xl font-black text-blue-600">1.85</div>
        <p className="text-sm text-green-600 mt-2 font-medium">Healthy: $1.85 available for every $1 debt</p>
      </div>

      {/* Solvency Gauge */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm text-center">
        <h3 className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-4">Solvency Score</h3>
        <div className="text-5xl font-black text-slate-800">28%</div>
        <p className="text-sm text-slate-500 mt-2 font-medium">Enterprise Long-term Stability</p>
      </div>
    </div>
  );
}
