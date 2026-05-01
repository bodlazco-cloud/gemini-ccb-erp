'use client'
import { useState } from 'react';
import { Check, X, Eye, MapPin } from 'lucide-react';

export default function AuditQueue() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Pending Verification Queue</h1>
      <div className="space-y-4">
        {/* Sample Verification Card */}
        <div className="bg-white border rounded-lg p-6 flex items-center justify-between shadow-sm">
          <div className="flex gap-6">
            <div className="h-24 w-24 bg-slate-200 rounded flex items-center justify-center">
              <Eye className="text-slate-400" /> {/* Click to zoom MRR Photo */}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono font-bold text-blue-600">PO-2024-882</span>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-medium">READY-MIX</span>
              </div>
              <h3 className="font-semibold text-slate-800">15.0 m³ - Batching Plant A</h3>
              <p className="text-sm text-slate-500 flex items-center gap-1">
                <MapPin size={14} /> Site: Block 12, Lot 4 (Structural)
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors">
              <X size={18} /> Reject
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg font-medium transition-colors shadow-sm">
              <Check size={18} /> Approve for Billing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
