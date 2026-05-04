import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

const AgedPayables = ({ payablesData }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Clock className="text-orange-500" /> Aged Payables (Liability Radar)
        </h3>
        <span className="text-xs text-slate-400 font-mono">Run Date: 2026-05-04</span>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {['0-30 Days', '31-60 Days', '61-90 Days', '90+ Days'].map((bucket, i) => (
          <div key={bucket} className="p-3 bg-slate-50 rounded border border-slate-100">
            <p className="text-[10px] text-slate-500 uppercase">{bucket}</p>
            <p className={`text-lg font-bold ${i > 1 ? 'text-red-600' : 'text-slate-800'}`}>
              ₱{payablesData.buckets[i].toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <table className="w-full text-xs">
        <thead className="bg-slate-100 text-slate-600">
          <tr>
            <th className="p-2 text-left">Vendor/Subcon</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-right">Days Overdue</th>
            <th className="p-2 text-right">Balance</th>
          </tr>
        </thead>
        <tbody>
          {payablesData.criticalItems.map(item => (
            <tr key={item.id} className="border-b">
              <td className="p-2 font-medium">{item.name}</td>
              <td className="p-2">{item.category}</td>
              <td className="p-2 text-right text-red-600 font-bold">{item.days} Days</td>
              <td className="p-2 text-right">₱{item.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
