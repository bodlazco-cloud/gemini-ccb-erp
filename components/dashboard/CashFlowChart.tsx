'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', Inflow: 4500000, Outflow: 3200000 },
  { month: 'Feb', Inflow: 5200000, Outflow: 4100000 },
  { month: 'Mar', Inflow: 3800000, Outflow: 4800000 }, // Milestone dip
  { month: 'Apr', Inflow: 6100000, Outflow: 3900000 },
];

export default function CashFlowChart() {
  return (
    <div className="h-[300px] w-full pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
          />
          <YAxis hide />
          <Tooltip 
            cursor={{ fill: '#f8fafc' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
          />
          <Legend iconType="circle" />
          <Bar dataKey="Inflow" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={20} />
          <Bar dataKey="Outflow" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
