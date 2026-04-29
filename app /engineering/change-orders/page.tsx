'use client'
import { Upload, AlertCircle, Send } from 'lucide-react';

export default function ChangeOrderRequest() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Engineering Change Order (ECO)</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="Unit ID (e.g., B12-L04)" className="p-2 border rounded" />
          <select className="p-2 border rounded">
            <option>Material Increment</option>
            <option>SOW Modification</option>
          </select>
        </div>

        <textarea 
          placeholder="Technical Justification for Variance..." 
          className="w-full h-32 p-3 border rounded mb-4"
        />

        {/* Photo Evidence - Required for Audit */}
        <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center mb-6">
          <Upload className="mx-auto text-slate-400 mb-2" />
          <p className="text-sm text-slate-500">Upload Site Photo showing why change is needed</p>
          <input type="file" className="hidden" id="eco-photo" />
        </div>

        <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-orange-700">
          <Send size={18} /> Submit for Engineering & Audit Approval
        </button>
      </div>
    </div>
  );
}
