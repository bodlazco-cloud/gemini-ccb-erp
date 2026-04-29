'use client'
import { useState, useMemo } from 'react';
import { Table, Select, Calculator } from '@/components/ui';

export default function DynamicBOMReport() {
  const [filters, setFilters] = useState({ site: '', model: '', type: 'REG' });

  // Logic: Multiplies BOM Requirements by the number of Active NTPs
  const calculatedForecast = useMemo(() => {
    // 1. Get Base BOM for Model + Type
    // 2. Filter by Site
    // 3. Return: Total Materials needed for the next 30 days
  }, [filters]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8 border-b pb-6">
        <div>
          <h1 className="text-2xl font-bold">Dynamic Resource Forecast</h1>
          <p className="text-slate-500">Site-Specific Material Demand Aggregator</p>
        </div>
        
        <div className="flex gap-4">
          <Select label="Project Site" options={['Site Alpha', 'Site Bravo']} 
            onChange={(v) => setFilters({...filters, site: v})} />
          <Select label="Unit Type" options={['BEG', 'REG', 'END']} 
            onChange={(v) => setFilters({...filters, type: v})} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="p-4">Material Description</th>
              <th className="p-4">UOM</th>
              <th className="p-4">Base Qty/Unit</th>
              <th className="p-4">Active Units (NTP)</th>
              <th className="p-4 font-bold text-blue-600">Total Requirement</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through the filtered calculation */}
            <tr className="border-t">
              <td className="p-4 font-medium">Ready-Mix Concrete (3000 PSI)</td>
              <td className="p-4">m³</td>
              <td className="p-4 text-slate-400">12.50</td>
              <td className="p-4">x 45</td>
              <td className="p-4 font-bold">562.50 m³</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-800 transition-all">
          Generate Purchase Requisitions
        </button>
      </div>
    </div>
  );
}
