// app/logistics/receive/page.tsx
'use client'
import { useState } from 'react';
import { Camera, PackageCheck, AlertCircle } from 'lucide-react';

export default function MobileMRR() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-20">
      <header className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">Material Receiving (MRR)</h2>
        <p className="text-sm text-slate-500">Scan delivery receipt or select PO</p>
      </header>

      {/* PO Selection Card */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
        <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Active Purchase Order</label>
        <select className="w-full p-3 border rounded-lg bg-slate-50 font-mono text-sm">
          <option>PO-2024-001 (Ready-Mix Concrete)</option>
          <option>PO-2024-002 (Rebar 12mm)</option>
        </select>
      </div>

      {/* Entry Form */}
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Quantity Received</label>
          <input 
            type="number" 
            className="w-full text-2xl font-bold p-2 focus:outline-none" 
            placeholder="0.00"
          />
        </div>

        {/* Camera Trigger */}
        <button className="w-full h-32 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center bg-white text-slate-500 active:bg-slate-100 transition-colors">
          <Camera size={32} className="mb-2" />
          <span className="text-sm font-medium">Take Photo of Delivery Receipt</span>
        </button>

        <button 
          onClick={() => setLoading(true)}
          className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? "Processing..." : <><PackageCheck size={20} /> Complete Receiving</>}
        </button>
      </div>
    </div>
  );
}
