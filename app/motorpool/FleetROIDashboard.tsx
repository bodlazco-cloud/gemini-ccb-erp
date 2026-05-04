import React from 'react';
import { Truck, AlertTriangle, TrendingUp, Tool } from 'lucide-react';

const FleetROIDashboard = ({ fleetData }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
        <Truck className="text-blue-600" /> Fleet Internal ROI (Fix or Flip)
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fleetData.map((item) => (
          <div key={item.id} className={`p-4 rounded-xl border ${item.netIncome < 0 ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-bold text-slate-900">{item.unit_name}</p>
                <p className="text-xs text-slate-500">Plate: {item.plate_no}</p>
              </div>
              {item.netIncome < 0 ? (
                <span className="bg-red-100 text-red-700 text-[10px] px-2 py-1 rounded-full font-bold flex items-center gap-1">
                  <AlertTriangle size={10} /> LIABILITY
                </span>
              ) : (
                <span className="bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-full font-bold">
                  ASSET
                </span>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Internal Billing (Earnings):</span>
                <span className="font-medium">₱{item.earnings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-red-600">
                <span>Total OpEx (Fuel/Maint):</span>
                <span>-₱{item.opex.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t flex justify-between font-bold">
                <span>Net ROI:</span>
                <span className={item.netIncome < 0 ? 'text-red-600' : 'text-green-600'}>
                  ₱{item.netIncome.toLocaleString()}
                </span>
              </div>
            </div>

            {item.netIncome < 0 && (
              <button className="mt-4 w-full bg-slate-800 text-white text-xs py-2 rounded hover:bg-slate-700 transition-colors">
                Initiate "Flip" Analysis (Sell Unit)
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
