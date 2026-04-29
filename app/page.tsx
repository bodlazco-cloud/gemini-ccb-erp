import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  Building2,
  Users,
  Truck,
  Activity
} from 'lucide-react';

export default function BODCockpit() {
  const kpis = [
    {
      label: 'Net Cash Position',
      value: '₱63.75M',
      subtext: 'Above 5M buffer',
      trend: 'up',
      icon: <DollarSign size={22} className="text-emerald-600" />,
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
    {
      label: 'Units Completed',
      value: '84 / 120',
      subtext: '70% of target',
      trend: 'up',
      icon: <Building2 size={22} className="text-blue-600" />,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
    {
      label: 'Active Subcontractors',
      value: '6',
      subtext: '82% capacity utilization',
      trend: 'neutral',
      icon: <Users size={22} className="text-indigo-600" />,
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
    },
    {
      label: 'Pending NTPs',
      value: '25',
      subtext: 'Awaiting BOD gate',
      trend: 'down',
      icon: <Clock size={22} className="text-amber-600" />,
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
  ];

  const alerts = [
    { level: 'info', message: 'BOD Strategic Gate: Project "CCB-Phase-1" is approved. NTP issuance unlocked.', time: '2 hours ago' },
    { level: 'warning', message: 'Batching Plant yield variance at 1.8% — within tolerance but approaching limit.', time: '5 hours ago' },
    { level: 'success', message: 'Milestone Billing verified for B3-L4. Submitted to Audit queue.', time: '1 day ago' },
    { level: 'warning', message: 'Subcontractor "Dela Cruz Construction" approaching rated capacity (9/10 units).', time: '1 day ago' },
  ];

  const gateStatuses = [
    { phase: 'Phase 1: BOD Approval', status: 'APPROVED', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    { phase: 'Phase 2: NTP Issuance', status: 'ACTIVE', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    { phase: 'Phase 3: Procurement Gate', status: 'ACTIVE', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    { phase: 'Phase 4: Milestone Billing', status: 'PENDING', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    { phase: 'Phase 5: Final Audit', status: 'LOCKED', color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-200' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">BOD Cockpit</h2>
        <p className="text-slate-500 mt-1">Strategic overview — Castcrete Builders 120-Unit Project</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className={`${kpi.bg} ${kpi.border} border rounded-2xl p-5 flex items-start gap-4`}>
            <div className="mt-0.5">{kpi.icon}</div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{kpi.label}</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{kpi.value}</p>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                {kpi.trend === 'up' && <TrendingUp size={12} className="text-emerald-500" />}
                {kpi.trend === 'down' && <TrendingDown size={12} className="text-amber-500" />}
                {kpi.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strategic Gate Status */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <Activity size={18} className="text-blue-600" />
              Strategic Gate Status
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {gateStatuses.map((gate) => (
              <div key={gate.phase} className={`flex items-center justify-between p-3 rounded-xl ${gate.bg} border ${gate.border}`}>
                <span className="text-sm font-medium text-slate-700">{gate.phase}</span>
                <span className={`text-xs font-bold ${gate.color} uppercase tracking-wide`}>{gate.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-500" />
              System Alerts
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {alerts.map((alert, i) => (
              <div key={i} className="p-4 flex gap-3">
                <div className="mt-0.5">
                  {alert.level === 'success' && <CheckCircle2 size={16} className="text-green-500" />}
                  {alert.level === 'warning' && <AlertTriangle size={16} className="text-amber-500" />}
                  {alert.level === 'info' && <CheckCircle2 size={16} className="text-blue-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700">{alert.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-700">Department P&L Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Department</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-600">Inflow</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-600">Outflow</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-600">Net</th>
                <th className="text-center px-4 py-3 font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { dept: 'Construction (Sites)', inflow: '18.5M', outflow: '12.3M', net: '+6.2M', status: 'HEALTHY' },
                { dept: 'Procurement & Stock', inflow: '0', outflow: '8.1M', net: '-8.1M', status: 'WATCH' },
                { dept: 'Batching Plant', inflow: '3.2M', outflow: '2.8M', net: '+0.4M', status: 'HEALTHY' },
                { dept: 'Motorpool', inflow: '1.5M', outflow: '0.9M', net: '+0.6M', status: 'HEALTHY' },
                { dept: 'HR & Payroll', inflow: '0', outflow: '4.2M', net: '-4.2M', status: 'WATCH' },
              ].map((row) => (
                <tr key={row.dept} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-700">{row.dept}</td>
                  <td className="px-4 py-3 text-right text-emerald-600 font-medium">₱{row.inflow}</td>
                  <td className="px-4 py-3 text-right text-red-500 font-medium">₱{row.outflow}</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-800">₱{row.net}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      row.status === 'HEALTHY' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                    }`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
