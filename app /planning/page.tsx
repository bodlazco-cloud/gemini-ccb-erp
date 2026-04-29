import React from 'react';
import { CheckCircle2, AlertCircle, Clock, Plus } from 'lucide-react';

export default function PlanningDashboard() {
  // Mock data representing the 120-unit target
  const units = Array.from({ length: 120 }, (_, i) => ({
    id: `B${Math.floor(i / 10) + 1}-L${(i % 10) + 1}`,
    status: i < 20 ? 'ACTIVE' : i < 45 ? 'PENDING_NTP' : 'PRE_PRODUCTION',
    subcon: i < 20 ? 'Villarosa Builders' : null
  }));

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Planning & Engineering</h2>
          <p className="text-slate-500">Resource Forecasting & Subcontractor Assignments</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
          <Plus size={18} />
          New Task Assignment (NTP)
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">BOD Strategic Gate</p>
          <div className="flex items-center gap-2 mt-1">
            <CheckCircle2 className="text-green-500" size={20} />
            <span className="text-lg font-bold">Project Approved</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Subcon Capacity</p>
          <p className="text-lg font-bold mt-1">82% <span className="text-xs font-normal text-slate-400">of Rated Limit</span></p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Resource Forecast</p>
          <p className="text-lg font-bold mt-1 text-blue-600">63.75M PHP <span className="text-xs font-normal text-slate-400">Value Locked</span></p>
        </div>
      </div>

      {/* The 120-Unit Production Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-bold text-slate-700">120-Unit Production Matrix</h3>
          <div className="flex gap-4 text-xs font-medium">
            <div className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Active</div>
            <div className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 rounded-full"></span> Pending NTP</div>
            <div className="flex items-center gap-1"><span className="w-2 h-2 bg-slate-200 rounded-full"></span> Unassigned</div>
          </div>
        </div>
        
        <div className="p-6 grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
          {units.map((unit) => (
            <div 
              key={unit.id}
              className={`aspect-square rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 hover:shadow-md
                ${unit.status === 'ACTIVE' ? 'bg-green-50 border-green-200 text-green-700' : 
                  unit.status === 'PENDING_NTP' ? 'bg-amber-50 border-amber-200 text-amber-700' : 
                  'bg-white border-slate-200 text-slate-400'}
              `}
              title={`${unit.id}: ${unit.subcon || 'No Subcontractor'}`}
            >
              <span className="text-[10px] font-bold">{unit.id.split('-')[1]}</span>
              <span className="text-[8px] font-medium opacity-70">{unit.id.split('-')[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
