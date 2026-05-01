import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Plus, 
  Search, 
  Filter,
  BarChart3,
  Calendar,
  Users,
  LayoutGrid,
  FileText
} from 'lucide-react';

/**
 * PLANNING & ENGINEERING DASHBOARD
 * Mandate: Production Brain & Guardian of Technical Efficiency.
 * Features: 
 * - 120-Unit Monthly Cycle Matrix
 * - Subcontractor Capacity Tracking (Sequential Locking Gate)
 * - Resource Forecasting (BOM x Target Units)
 */
export default function PlanningDashboard() {
  const [activeTab, setActiveTab] = useState('matrix');
  const [filter, setFilter] = useState('ALL');

  // Logic: Generate 120 Units representing the Monthly Target
  const units = Array.from({ length: 120 }, (_, i) => {
    const block = Math.floor(i / 12) + 1;
    const lot = (i % 12) + 1;
    let status = 'UNASSIGNED';
    if (i < 24) status = 'ACTIVE';
    else if (i < 48) status = 'PENDING_NTP';
    
    return {
      id: `P1-B${block}-L${lot}`,
      block,
      lot,
      status,
      model: block % 2 === 0 ? 'Model-A' : 'Model-B',
      subcon: i < 24 ? 'Villarosa Builders' : null
    };
  });

  const stats = [
    { label: 'BOD Strategic Gate', value: 'APPROVED', icon: <CheckCircle2 className="text-green-500" />, sub: '63.75M Advance Secured' },
    { label: 'Subcon Capacity', value: '78%', icon: <Users className="text-blue-500" />, sub: 'Utilization vs Rated Limit' },
    { label: 'Production Velocity', value: '1.2u/day', icon: <Clock className="text-orange-500" />, sub: 'Target: 4.0u/day' },
    { label: 'BOM Compliance', value: '98.4%', icon: <BarChart3 className="text-emerald-500" />, sub: 'Admin Price Lock Integrity' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Planning & Engineering</h2>
          <p className="text-slate-500 text-sm">Target: 120 Units Monthly Production Cycle</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all text-sm">
            <FileText size={18} />
            BVA Report
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 text-sm">
            <Plus size={18} />
            Issue NTP
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2 text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
              {stat.icon}
            </div>
            <div className="text-2xl font-black text-slate-800">{stat.value}</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Production Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
              <div className="flex items-center gap-3">
                <LayoutGrid size={20} className="text-slate-400" />
                <h3 className="font-bold text-slate-800">Unit Status Matrix</h3>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                {['ALL', 'ACTIVE', 'PENDING'].map((t) => (
                  <button 
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                      filter === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2 overflow-y-auto max-h-[520px]">
              {units.map((unit) => (
                <div 
                  key={unit.id}
                  className={`group relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-110 hover:z-10
                    ${unit.status === 'ACTIVE' ? 'bg-green-50 border-green-200 text-green-700 shadow-sm shadow-green-100' : 
                      unit.status === 'PENDING_NTP' ? 'bg-amber-50 border-amber-200 text-amber-700 shadow-sm shadow-amber-100' : 
                      'bg-white border-slate-100 text-slate-300 hover:border-blue-200 hover:text-blue-500'}
                  `}
                >
                  <span className="text-[10px] font-black leading-none">{unit.lot}</span>
                  <span className="text-[8px] font-bold opacity-60 mt-0.5">B{unit.block}</span>
                  
                  {/* Status Indicator Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-40 bg-slate-900 text-white p-3 rounded-xl z-30 pointer-events-none shadow-2xl border border-slate-700">
                    <div className="text-[10px] font-black border-b border-slate-700 pb-1.5 mb-1.5">{unit.id}</div>
                    <div className="space-y-1 text-[9px] opacity-80">
                      <div className="flex justify-between"><span>Model:</span> <span className="font-bold">{unit.model}</span></div>
                      <div className="flex justify-between"><span>Assignee:</span> <span className="font-bold">{unit.subcon || 'UNASSIGNED'}</span></div>
                    </div>
                    <div className={`mt-2 text-[10px] font-black uppercase text-center py-1 rounded ${
                      unit.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 
                      unit.status === 'PENDING_NTP' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {unit.status.replace('_', ' ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex justify-center gap-6">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-green-500"></div> <span className="text-[10px] font-bold text-slate-500 uppercase">In Production</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-500"></div> <span className="text-[10px] font-bold text-slate-500 uppercase">NTP Issued</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-slate-200"></div> <span className="text-[10px] font-bold text-slate-500 uppercase">Pre-Prod</span></div>
            </div>
          </div>
        </div>

        {/* Capacity & Forecasting Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Subcontractor Assignment Guard */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
              <Users size={18} className="text-blue-600" />
              Subcon Capacity Gate
            </h3>
            <div className="space-y-5">
              {[
                { name: 'Villarosa Builders', active: 18, max: 20 },
                { name: 'LGS Construction', active: 11, max: 25 },
                { name: 'Giga-Structure Inc.', active: 15, max: 15 }
              ].map((sub) => (
                <div key={sub.name} className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-slate-700">{sub.name}</span>
                    <span className={sub.active >= sub.max ? 'text-red-600' : 'text-slate-500'}>
                      {sub.active} / {sub.max} Units
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-700 ${
                        sub.active >= sub.max ? 'bg-red-500' : 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]'
                      }`} 
                      style={{ width: `${(sub.active / sub.max) * 100}%` }}
                    ></div>
                  </div>
                  {sub.active >= sub.max && (
                    <div className="flex items-center gap-1.5 text-[9px] text-red-500 font-black uppercase">
                      <AlertCircle size={12} /> Rated Capacity Reached
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-bold hover:border-blue-300 hover:text-blue-600 transition-all">
              Manage Subcontractors
            </button>
          </div>

          {/* Resource Forecast Block */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl shadow-slate-200 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -translate-y-12 translate-x-12 blur-3xl"></div>
            <h3 className="font-bold mb-4 flex items-center gap-2 text-blue-400">
              <BarChart3 size={18} />
              Material Forecast (Cycle)
            </h3>
            <div className="space-y-4">
              {[
                { item: 'Cement (PNS)', qty: '1,080', uom: 'Bags', color: 'bg-blue-500' },
                { item: 'Deformed Bars', qty: '4,200', uom: 'Kgs', color: 'bg-indigo-500' },
                { item: 'Ready-Mix Concrete', qty: '840', uom: 'M3', color: 'bg-sky-500' }
              ].map((item) => (
                <div key={item.item} className="flex justify-between items-center group">
                  <div>
                    <p className="text-xs font-bold text-slate-100 group-hover:text-blue-300 transition-colors">{item.item}</p>
                    <p className="text-[9px] text-slate-500 font-medium">BOM Multiplier Active</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black">{item.qty}</p>
                    <p className="text-[9px] text-slate-500 font-bold uppercase">{item.uom}</p>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Estimated Value</span>
                  <span className="text-sm font-black text-emerald-400">₱4,280,000.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
