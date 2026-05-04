import React, { useState } from 'react';
import { Home, CheckCircle2, TrendingUp, BarChart3 } from 'lucide-react';

const TurnoverSimulation = () => {
  const [isProcessed, setIsProcessed] = useState(false);

  // Simulation Data for 120 Units
  const batchData = {
    units: 120,
    contractValue: 120000000, // ₱120M
    totalCOGS: 85000000,      // Total accumulated costs
    netProfit: 35000000,      // Realized Profit
    margin: 29.1
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border border-slate-200 rounded-2xl shadow-xl">
      <div className="flex items-center gap-4 mb-8 border-b pb-6">
        <div className="p-3 bg-blue-600 rounded-lg text-white">
          <Home size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Architectural Turnover Batch</h1>
          <p className="text-slate-500">120 Units | Project: SMTA-Tarlac-B5</p>
        </div>
      </div>

      {!isProcessed ? (
        <div className="space-y-6">
          <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
            <h3 className="font-bold text-blue-900 mb-2">Pre-Turnover Validation</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-center gap-2">✅ Direct Labor Certified (Ops)</li>
              <li className="flex items-center gap-2">✅ Internal Economy Billed (Fleet/Batching)</li>
              <li className="flex items-center gap-2">✅ Bank Reconciliation Complete (Finance)</li>
            </ul>
          </div>
          
          <button 
            onClick={() => setIsProcessed(true)}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <CheckCircle2 size={20} /> Execute Mass Turnover & Realize Profit
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in zoom-in duration-500">
          <div className="bg-green-600 text-white p-6 rounded-xl text-center mb-8">
            <h2 className="text-3xl font-bold">₱{batchData.netProfit.toLocaleString()}</h2>
            <p className="text-green-100 uppercase tracking-widest text-xs font-bold">Total Net Profit Realized</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 border rounded-lg">
              <p className="text-xs text-slate-400">Total Revenue</p>
              <p className="text-lg font-bold">₱120.0M</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-xs text-slate-400">Total COGS</p>
              <p className="text-lg font-bold text-red-600">₱85.0M</p>
            </div>
            <div className="p-4 border rounded-lg bg-slate-50">
              <p className="text-xs text-slate-400">Net Margin</p>
              <p className="text-lg font-bold text-green-600">{batchData.margin}%</p>
            </div>
          </div>

          <div className="p-4 bg-slate-800 text-white rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-blue-400" />
              <span className="text-sm font-medium">BOD Report Generated</span>
            </div>
            <button className="text-xs bg-slate-700 px-3 py-1 rounded hover:bg-slate-600">Download PDF</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TurnoverSimulation;
