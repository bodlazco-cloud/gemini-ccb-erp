import { PayrollCalculator } from '@/components/payroll-calculator';
import { UploadCloud, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function PayrollDashboard() {
  return (
    <div className="p-8 space-y-6">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Payroll Processor</h1>
          <p className="text-slate-500">Automated mapping to Project Cost Centers</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
          <UploadCloud size={20} /> Bulk Upload DTR (.csv)
        </button>
      </header>

      {/* Real-time Variance Alert */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 flex gap-4 items-center">
        <AlertTriangle className="text-amber-600" />
        <div>
          <p className="text-sm font-bold text-amber-900">Manpower Variance Detected</p>
          <p className="text-xs text-amber-700">12 employees have DTR entries without corresponding Site Supervisor sign-offs.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 text-xs font-bold uppercase">Employee</th>
              <th className="p-4 text-xs font-bold uppercase">Cost Center</th>
              <th className="p-4 text-xs font-bold uppercase">Gross Pay</th>
              <th className="p-4 text-xs font-bold uppercase">Deductions</th>
              <th className="p-4 text-xs font-bold uppercase">Net Pay</th>
              <th className="p-4 text-xs font-bold uppercase text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-slate-50">
              <td className="p-4 font-medium">Dela Cruz, Juan</td>
              <td className="p-4"><span className="text-xs font-mono bg-blue-50 p-1 rounded">SITE-ALPHA-01</span></td>
              <td className="p-4">₱18,500.00</td>
              <td className="p-4 text-red-500">-₱2,100.00</td>
              <td className="p-4 font-bold">₱16,400.00</td>
              <td className="p-4 text-right">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Validated</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
