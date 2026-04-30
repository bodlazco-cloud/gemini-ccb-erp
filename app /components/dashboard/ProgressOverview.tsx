'use client'

export default function ProgressOverview() {
  // Logic: In production, these percentages come from the Milestone Audit table
  const siteProgress = [
    { id: 'SMTA', name: 'SM Tarlac', current: 84, target: 120, color: 'bg-blue-600' },
    { id: 'DVCM', name: 'Davao Casa Mira', current: 45, target: 120, color: 'bg-emerald-500' },
    { id: 'ORCM', name: 'Ormoc Casa Mira', current: 112, target: 120, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6">
      {siteProgress.map((site) => {
        const percentage = (site.current / site.target) * 100;
        return (
          <div key={site.id} className="group">
            <div className="flex justify-between items-end mb-2">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{site.id}</p>
                <h4 className="text-sm font-black text-slate-700">{site.name}</h4>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-slate-900">{site.current}</span>
                <span className="text-xs font-bold text-slate-400"> / {site.target} UNITS</span>
              </div>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div 
                className={`${site.color} h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
