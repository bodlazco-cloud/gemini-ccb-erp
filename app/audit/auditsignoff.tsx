import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

const AuditSignOff = ({ pendingRecords }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <h3 className="font-bold flex items-center gap-2">
          <ShieldCheck className="text-blue-600" size={20} />
          Internal Audit: Payroll Verification Queue
        </h3>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs uppercase text-slate-500 bg-slate-50">
            <th className="p-4">Employee</th>
            <th className="p-4">Project</th>
            <th className="p-4 text-right">Gross Pay</th>
            <th className="p-4 text-right">Deductions</th>
            <th className="p-4 text-right">Net Pay</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {pendingRecords.map((record) => (
            <tr key={record.id} className="hover:bg-slate-50 transition-colors">
              <td className="p-4 font-medium">{record.employee_name}</td>
              <td className="p-4 text-slate-600">{record.project_name}</td>
              <td className="p-4 text-right">₱{record.gross_pay.toLocaleString()}</td>
              <td className="p-4 text-right text-red-500">
                -₱{(record.gross_pay - record.net_pay).toLocaleString()}
              </td>
              <td className="p-4 text-right font-bold">₱{record.net_pay.toLocaleString()}</td>
              <td className="p-4 text-center">
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center gap-1 mx-auto">
                  <CheckCircle2 size={14} /> Certify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {pendingRecords.length === 0 && (
        <div className="p-10 text-center text-slate-400">
          <AlertCircle className="mx-auto mb-2" size={32} />
          No payroll records awaiting audit.
        </div>
      )}
    </div>
  );
};

export default AuditSignOff;
