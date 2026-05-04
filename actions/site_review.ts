import React, { useState } from 'react';
import { ShieldCheck, RotateCcw, CheckCircle2, MessageSquare } from 'lucide-react';

const ApprovalRow = ({ record, onApprove, onReject }) => {
  const [isRejecting, setIsRejecting] = useState(false);
  const [note, setNote] = useState('');

  return (
    <tr className="hover:bg-slate-50 border-b border-slate-100">
      <td className="p-4">
        <div className="font-medium text-slate-800">{record.employee_name}</div>
        <div className="text-xs text-slate-400">ID: {record.employee_id.slice(0,8)}</div>
      </td>
      <td className="p-4 text-slate-600">{record.project_name}</td>
      <td className="p-4 text-right font-mono">₱{record.gross_pay.toLocaleString()}</td>
      <td className="p-4 text-right font-bold text-slate-900">₱{record.net_pay.toLocaleString()}</td>
      
      <td className="p-4">
        {isRejecting ? (
          <div className="flex flex-col gap-2">
            <textarea 
              className="text-xs border p-2 rounded w-48" 
              placeholder="Reason for dispute..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="flex gap-2">
              <button 
                onClick={() => { onReject(record.id, note); setIsRejecting(false); }}
                className="bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                Confirm Reject
              </button>
              <button 
                onClick={() => setIsRejecting(false)}
                className="text-xs text-slate-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-3">
            {/* APPROVE BUTTON */}
            <button 
              onClick={() => onApprove(record.id)}
              className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition-all text-sm font-medium shadow-sm"
            >
              <CheckCircle2 size={16} /> Certify
            </button>

            {/* RETURN TO SENDER BUTTON */}
            <button 
              onClick={() => setIsRejecting(true)}
              className="flex items-center gap-1 bg-white border border-red-200 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-50 transition-all text-sm font-medium"
            >
              <RotateCcw size={16} /> Return to Site
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};
