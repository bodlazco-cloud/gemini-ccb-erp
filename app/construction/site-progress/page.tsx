// Key Component: The 120-Unit Matrix
// Green = Completed | Yellow = In Progress | Red = Flagged/Delayed
export default function SiteProgress({ siteId }) {
  return (
    <div className="grid grid-cols-10 gap-2">
      {units.map(unit => (
        <UnitCard 
          key={unit.id}
          status={unit.status}
          onClick={() => openMilestoneModal(unit.id)}
        />
      ))}
    </div>
  );
}
