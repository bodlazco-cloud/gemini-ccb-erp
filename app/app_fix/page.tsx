// app/page.tsx
import { 
  TrendingUp, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  Activity 
} from 'lucide-react';
import KpiCard from '../components/dashboard/KpiCard';
import ProgressOverview from '../components/dashboard/ProgressOverview';
import CashFlowChart from '../components/dashboard/CashFlowChart';

export default async function BodCockpit() {
  // In a real scenario, fetch your high-level aggregates here
  // const metrics = await getExecutiveMetrics();

  return (
    <div className="space-y-8">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">BOD COCKPIT</h2>
          <p className="text-slate-500 text-sm font-medium">Real-time Enterprise Health & Solvency</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
            Download Monthly Audit
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            Generate Variance Report
          </button>
        </div>
      </div>

      {/* 2. Top Tier KPIs: Financial & Solvency */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Net Margin (Consolidated)" 
          value="18.4%" 
          trend="+2.1%" 
          trendUp={true}
          description="Revenue vs. (Materials+Labor+Internal)"
          icon={<TrendingUp size={20} className="text-emerald-600" />}
        />
        <KpiCard 
          title="Cash on Hand" 
          value="₱12,450,000" 
          description="Across 4 Verified Banks"
          icon={<Wallet size={20} className="text-blue-600" />}
        />
        <KpiCard 
          title="Liquidity Ratio" 
          value="1.45" 
          status="HEALTHY"
          description="Current Assets / Liabilities"
          icon={<Activity size={20} className="text-purple-600" />}
        />
        <KpiCard 
          title="Adv. Depletion Rate" 
          value="₱840k/wk" 
          trendUp={false}
          trend="-12%"
          description="Downpayment Burn Velocity"
          icon={<AlertCircle size={20} className="text-orange-600" />}
        />
      </div>

      {/* 3. Mid Tier: Production & Cash Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unit Turnover Progress (The 120 Target) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Unit Turnover Progress</h3>
            <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded-md uppercase">Target: 120/mo</span>
          </div>
          <ProgressOverview />
        </div>

        {/* Unusual Expenses / Dual Auth Alerts */}
        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <AlertCircle size={18} className="text-amber-400" />
            Priority Approvals
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Finance > ₱50k Threshold</p>
              <p className="text-sm font-medium mt-1">Site Materials - SM Tarlac</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs font-mono">₱142,000.00</span>
                <button className="text-[10px] bg-blue-500 px-2 py-1 rounded font-bold uppercase">View PDF</button>
              </div>
            </div>
            {/* More alerts... */}
          </div>
        </div>
      </div>
    </div>
  );
}
