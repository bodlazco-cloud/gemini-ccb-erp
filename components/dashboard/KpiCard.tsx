import React from 'react';

export default function KpiCard({ title, value, description, icon }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      </div>
      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</h3>
      <p className="text-2xl font-black text-slate-900 mt-1">{value}</p>
      <p className="text-[10px] text-slate-400 mt-1 font-medium">{description}</p>
    </div>
  );
}
