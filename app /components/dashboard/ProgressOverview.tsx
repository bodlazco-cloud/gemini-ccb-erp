'use client'

export default function ProgressOverview() {
  // Mock data - in production, this pulls from your 'unit_milestones' table
  const sites = [
    { name: 'SM Tarlac', completed: 85, target: 120, color: 'bg-blue-600' },
    { name: 'Davao Casa Mira', completed: 42, target: 120, color: 'bg-emerald-500' },
    { name: 'Ormoc Casa Mira', completed: 110, target: 120, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {sites.map((site) => (
        <div key={site.name} className="space-y-2">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-slate-700">{site.name}</span>
            <span className="text-slate-500">{site.completed} / {site.target} Units</span>
          </div>
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
            <div 
              className={`${site.color} h-full transition-all duration-1000`} 
              style={{ width: `${(site.completed / site.target) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
