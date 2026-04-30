'use client'
import { useState, useEffect } from 'react';
import { generatePRFromForecast } from '@/actions/procurement-actions';
import { Package, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AutoPRGenerator() {
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleGenerate = async (siteId: string) => {
    setLoading(true);
    const result = await generatePRFromForecast(siteId);
    if (result.success) {
      setSuccessId(result.prId);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">PR Automation Engine</h1>
        <p className="text-slate-500">Convert active construction forecasts into Purchase Requisitions.</p>
      </header>

      <div className="grid gap-4">
        {['SMTA', 'DVCM', 'ORCM'].map((site) => (
          <div key={site} className="bg-white border border-slate-200 p-6 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                <Package size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{site} - Forecast Pending</h3>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter">Ready for Conversion</p>
              </div>
            </div>
            
            <button 
              onClick={() => handleGenerate(site)}
              disabled={loading}
              className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Generate PR'}
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>

      {successId && (
        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-700 font-bold animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 size={20} />
          PR #{successId.slice(0,8)} Created Successfully. Sent to Audit Queue.
        </div>
      )}
    </div>
  );
}
