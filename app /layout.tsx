'use client';

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, HardHat, Construction, Truck, 
  Factory, Settings, ShieldCheck, Wallet, 
  Database, ShieldAlert, ChevronDown, ChevronRight,
  Menu, X, Bell, Activity, Users
} from 'lucide-react';
import './globals.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const toggleMenu = (name: string) => {
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const navigation = [
    {
      name: 'Planning & Engineering',
      icon: <HardHat size={18} />,
      color: 'text-blue-600',
      path: '/planning',
      subsections: [
        { name: 'Overview', path: '/planning' },
        { name: 'Bill of Materials', path: '/planning/bom' },
        { name: 'Resource Mapping', path: '/planning/mapping' },
        { name: 'MRP Queue', path: '/planning/mrp' },
        { name: 'Batching Forecast', path: '/planning/batching-forecast' },
        { name: 'Motorpool Needs', path: '/planning/fleet-needs' },
        { name: 'Change Orders', path: '/planning/change-orders' },
        { name: 'Budget vs Actual', path: '/planning/reports/bva' },
        { name: 'Job Costing', path: '/planning/reports/job-costing' },
      ]
    },
    {
      name: 'Construction',
      icon: <Construction size={18} />,
      color: 'text-orange-600',
      path: '/construction',
      subsections: [
        { name: 'Overview', path: '/construction' },
        { name: 'Site Registry', path: '/construction/registry' },
        { name: 'NTP Issuance', path: '/construction/ntp' },
        { name: 'Daily Progress', path: '/construction/progress' },
        { name: 'Manpower Logs', path: '/construction/manpower' },
        { name: 'Site Profitability', path: '/construction/reports/profit' },
      ]
    },
    {
      name: 'Procurement & Stock',
      icon: <Truck size={18} />,
      color: 'text-green-600',
      path: '/procurement',
      subsections: [
        { name: 'Overview', path: '/procurement' },
        { name: 'PR/PO Management', path: '/procurement/orders' },
        { name: 'Logistics (MRR)', path: '/procurement/logistics' },
        { name: 'Inventory', path: '/procurement/inventory' },
      ]
    },
    {
      name: 'Finance & Accounting',
      icon: <Wallet size={18} />,
      color: 'text-emerald-600',
      path: '/finance',
      subsections: [
        { name: 'Overview', path: '/finance' },
        { name: 'Billing', path: '/finance/billing' },
        { name: 'Payables', path: '/finance/payables' },
        { name: 'Banking/Recon', path: '/finance/banking' },
        { name: 'P&L (by Dept)', path: '/finance/reports/pnl' },
        { name: 'Cash Flow Projections', path: '/finance/reports/cashflow' },
      ]
    },
    {
      name: 'Audit & Quality',
      icon: <ShieldCheck size={18} />,
      color: 'text-purple-600',
      path: '/audit',
      subsections: [
        { name: 'PO Verification', path: '/audit/po' },
        { name: 'Milestone Audit', path: '/audit/milestone' },
        { name: 'Variance Audit', path: '/audit/variance' },
        { name: 'QA Punch-lists', path: '/audit/qa' },
      ]
    }
  ];

  const adminNav = [
    { name: 'Master List', icon: <Database size={18} />, path: '/master-data', color: 'text-slate-500' },
    { name: 'Admin Settings', icon: <Settings size={18} />, path: '/admin', color: 'text-red-500' }
  ];

  if (!mounted) return null;

  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <div className="min-h-screen flex flex-col">
          {/* HEADER */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="flex flex-col">
                <h1 className="font-black text-xl tracking-tighter">CASTCRETE <span className="text-blue-600">360</span></h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest -mt-1">Enterprise Intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
               <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full">
                <Activity size={14} className="text-blue-600" />
                <span className="text-[10px] font-bold text-blue-800 uppercase">System: Operational</span>
              </div>
              <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black uppercase">Lesley Ventura</p>
                  <p className="text-[10px] text-slate-400 font-bold">BOD LEAD</p>
                </div>
                <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white text-xs font-black">LV</div>
              </div>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden">
            {/* SIDEBAR */}
            <aside className={`bg-white border-r border-slate-200 transition-all duration-300 shadow-sm ${isSidebarOpen ? 'w-72' : 'w-0 overflow-hidden'} flex flex-col`}>
              <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                
                {/* COCKPIT */}
                <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-lg mb-6 hover:scale-[1.02] transition-transform">
                  <LayoutDashboard size={20} className="text-blue-400" />
                  <span className="font-bold text-sm">BOD COCKPIT</span>
                </a>

                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">Departments</p>
                
                {navigation.map((dept) => (
                  <div key={dept.name} className="space-y-1">
                    <button 
                      onClick={() => toggleMenu(dept.name)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all hover:bg-slate-50 group ${openMenus[dept.name] ? 'bg-slate-50' : ''}`}
                    >
                      <span className={dept.color}>{dept.icon}</span>
                      <span className="text-[13px] font-bold text-slate-700">{dept.name}</span>
                      {openMenus[dept.name] ? <ChevronDown size={14} className="ml-auto opacity-40" /> : <ChevronRight size={14} className="ml-auto opacity-40" />}
                    </button>
                    
                    {openMenus[dept.name] && (
                      <div className="ml-9 border-l-2 border-slate-100 pl-4 space-y-1 mb-2 animate-in slide-in-from-left-2 duration-200">
                        {dept.subsections.map(sub => (
                          <a key={sub.name} href={sub.path} className="block py-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="pt-6 mt-6 border-t border-slate-100 space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">System Control</p>
                   {adminNav.map(item => (
                     <a key={item.name} href={item.path} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
                       <span className={item.color}>{item.icon}</span>
                       <span className="text-[13px] font-bold">{item.name}</span>
                     </a>
                   ))}
                </div>
              </div>

              {/* SIDEBAR FOOTER: TURNOVER TRACKER */}
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black text-slate-400">PROJECT TURNOVER</span>
                    <span className="text-[10px] font-black text-blue-600 tracking-tighter">TARGET: 120/MO</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-[70%]" />
                  </div>
                </div>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-y-auto p-4 md:p-10">
              <div className="max-w-[1400px] mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
