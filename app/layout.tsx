'use client';

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, HardHat, ClipboardCheck, Truck, 
  Factory, Construction, Wallet, Users, Settings, 
  Bell, Menu, X, AlertTriangle, ChevronRight 
} from 'lucide-react';
import './globals.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch errors
  useEffect(() => {
    setMounted(true);
  }, []);

  const departments = [
    { name: 'Planning & Engineering', icon: <HardHat size={20} />, path: '/planning', color: 'text-blue-600' },
    { name: 'Audit & Quality', icon: <ClipboardCheck size={20} />, path: '/audit', color: 'text-purple-600' },
    { name: 'Construction (Sites)', icon: <Construction size={20} />, path: '/construction', color: 'text-orange-600' },
    { name: 'Procurement & Stock', icon: <Truck size={20} />, path: '/procurement', color: 'text-green-600' },
    { name: 'Batching Plant', icon: <Factory size={20} />, path: '/batching', color: 'text-slate-600' },
    { name: 'Motorpool', icon: <Settings size={20} />, path: '/motorpool', color: 'text-red-600' },
    { name: 'Finance & Accounting', icon: <Wallet size={20} />, path: '/finance', color: 'text-emerald-600' },
    { name: 'HR & Payroll', icon: <Users size={20} />, path: '/hr', color: 'text-indigo-600' },
  ];

  if (!mounted) return null; // Avoids the "white screen" during hydration

  return (
    <html lang="en">
      <body className="bg-slate-50">
        <div className="min-h-screen flex flex-col font-sans text-slate-900">
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="flex flex-col">
                <h1 className="font-bold text-xl tracking-tight text-slate-800">CASTCRETE <span className="text-blue-600">360</span></h1>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 -mt-1">Enterprise Resource Planning</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
                <AlertTriangle size={14} className="text-amber-600" />
                <span className="text-xs font-medium text-amber-800">System Status: 5M Buffer Secured</span>
              </div>
              <button className="relative p-2 text-slate-500 hover:text-blue-600 transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold leading-none">BOD User</p>
                  <p className="text-[10px] text-slate-500 uppercase mt-1">Administrator</p>
                </div>
                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">AD</div>
              </div>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden">
            <aside className={`bg-white border-r border-slate-200 transition-all duration-300 ease-in-out z-40 ${isSidebarOpen ? 'w-72' : 'w-0 overflow-hidden'} lg:relative absolute inset-y-0`}>
              <div className="p-4 flex flex-col h-full">
                <nav className="flex-1 space-y-1">
                  <div className="pb-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Main Dashboard</p>
                    <a href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-semibold">
                      <LayoutDashboard size={20} />
                      <span>BOD Cockpit</span>
                      <ChevronRight size={14} className="ml-auto opacity-50" />
                    </a>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 pt-2">Departments</p>
                  {departments.map((dept) => (
                    <a key={dept.name} href={dept.path} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 group">
                      <span className={`transition-colors group-hover:${dept.color}`}>{dept.icon}</span>
                      <span className="text-sm font-medium">{dept.name}</span>
                    </a>
                  ))}
                </nav>
                <div className="pt-6 border-t border-slate-100">
                  <div className="bg-slate-900 rounded-2xl p-4 text-white">
                    <p className="text-xs opacity-60">Production Target</p>
                    <div className="flex justify-between items-end mt-1 mb-2">
                      <span className="text-xl font-bold">84 / 120</span>
                      <span className="text-[10px] font-bold text-blue-400">70%</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[70%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
