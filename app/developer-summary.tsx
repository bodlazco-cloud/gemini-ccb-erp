import React from 'react';
import { BarChart3, FileText, ArrowRightLeft } from 'lucide-react';

const DeveloperSummary = ({ projectSummary }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <FileText className="text-blue-600" /> Developer Collection Summary (SM Prime)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* The Bid vs Cost Comparison */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 uppercase font-bold">Total Labor Bid (Revenue)</p>
            <p className="text-2xl font-bold text-green-600">₱{projectSummary.totalBidAmount.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 uppercase font-bold">Actual Subcon Cost (Direct Labor)</p>
            <p className="text-2xl font-bold text-orange-600">₱{projectSummary.actualSubconCost.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-blue-900 text-white rounded-lg">
            <p className="text-xs text-blue-300 uppercase font-bold">Retained Margin</p>
            <p className="text-2xl font-bold">₱{(projectSummary.totalBidAmount - projectSummary.actualSubconCost).toLocaleString()}</p>
          </div>
        </div>

        {/* The Collection Gap */}
        <div className="border-l pl-8 space-y-6">
          <h4 className="text-sm font-bold text-slate-700">Billing Status</h4>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Billed to Developer</span>
              <span>₱{projectSummary.totalBilled.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Collected (Cash in Bank)</span>
              <span>₱{projectSummary.totalCollected.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-red-50 rounded border border-red-100 text-red-700 text-sm font-bold text-center">
            Outstanding Balance: ₱{(projectSummary.totalBilled - projectSummary.totalCollected).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};
