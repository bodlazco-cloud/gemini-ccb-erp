// Logic: Map SOW Milestones to Timeline bars
const ganttData = milestones.map(m => ({
  id: m.id,
  name: `${m.unit_id}: ${m.activity_name}`,
  start: m.planned_start,
  end: m.planned_end,
  progress: m.progress_pct, // Tied to the Milestone Tagging interface
  dependencies: m.preceding_activity_id
}));
