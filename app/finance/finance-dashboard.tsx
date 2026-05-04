import React from 'react';
import { Upload, FileCheck, HardHat, TrendingDown } from 'lucide-react';

const FinanceDashboardV2 = ({ opsData, bankData }) => {
  return (
    <div className="space-y-6">
      {/* Top Level: Operational Reality */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Direct Labor (Subcon) Tracking */}
        <div className="p-5 bg-white border border-orange-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <HardHat size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Direct Labor (Subcon)</span>
          </div>
          <p className="text-2xl font-bold">₱{opsData.directLaborTotal.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 mt-1 italic">
            *Mapped to Operational Accomplishment Reports
          </p>
        </div>

        {/* Bank Reconciliation Status */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase">Bank Reconciliation</span>
            <button className="flex items-center gap-1 text-xs bg-blue-600 text-white px-2 py-1 rounded">
              <Upload size={12} /> Import Statement
            </button>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-slate-500">Unreconciled Items</p>
              <p className="text-xl font-bold text-red-600">{bankData.pendingItems} Transactions</p>
            </div>
            <FileCheck className="text-slate-300" size={32} />
          </div>
        </div>
      </div>

      {/* The Master Reconciliation Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-800 text-white flex justify-between">
          <h3 className="text-sm font-medium">Bank-to-ERP Reconciliation Ledger</h3>
          <span className="text-xs text-slate-400">Last Import: {bankData.lastImportDate}</span>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Bank Description</th>
              <th className="p-3 text-right">Bank Amount</th>
              <th className="p-3 text-right">ERP Record (Matched)</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Logic: If Bank Outflow matches an Approved Subcon Billing, it's Green */}
            <tr className="border-b">
              <td className="p-3">2026-05-01</td>
              <td className="p-3 font-mono text-xs text-slate-500">PYMT-SUBCON-VILLAR-001</td>
              <td className="p-3 text-right font-medium">₱45,000.00</td>
              <td className="p-3 text-right text-blue-600">DL-Accomp-429</td>
              <td className="p-3 text-center">
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold">MATCHED</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
