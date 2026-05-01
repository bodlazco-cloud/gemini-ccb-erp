// app/construction/site/[site_id]/tagging/page.tsx
'use client'

import { useParams } from 'next/navigation';
import { updateMilestoneProgress } from '@/actions/construction-actions';

export default function MilestoneTaggingPage() {
  const { site_id } = useParams(); // Matches the [site_id] folder name

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">Site {site_id}: Milestone Update</h2>
        <p className="text-sm text-slate-500">Capture daily progress for Structural/Architectural phases.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Input Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <label className="block text-sm font-bold mb-2 uppercase tracking-tight">Current Progress (%)</label>
          <input 
            type="range" 
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            min="0" max="100"
          />
          <div className="mt-4 flex justify-between items-center">
             <span className="text-3xl font-black text-blue-600">75%</span>
             <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-semibold">
               Update Progress
             </button>
          </div>
        </div>

        {/* Fleet/Resource Quick-Link */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl">
          <h3 className="font-bold mb-4">Internal Resource Request</h3>
          <p className="text-xs text-slate-400 mb-4">Auto-calculated based on BOM requirements for this activity.</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm py-2 border-b border-slate-800">
              <span>Concrete Required (Class A)</span>
              <span className="font-mono text-blue-400">12.5 m³</span>
            </div>
            <div className="flex justify-between text-sm py-2">
              <span>Equipment Needed</span>
              <span className="font-mono text-blue-400">Backhoe (1 Day)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
