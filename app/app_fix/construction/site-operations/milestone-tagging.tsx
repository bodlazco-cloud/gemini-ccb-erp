import { useParams } from 'react-router-dom';

export default function MilestoneTagging() {
  const { site_id } = useParams(); // Extracting the param we defined in App.jsx

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Milestone Tagging</h1>
        <p className="text-slate-500 text-sm">Site ID Reference: {site_id}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Unit Selector */}
        <div className="col-span-1 bg-white border rounded-xl p-4 shadow-sm">
          <h3 className="font-bold mb-4">Select Block & Unit</h3>
          <div className="space-y-2 h-[400px] overflow-y-auto">
             {/* Example Unit Item */}
             <button className="w-full text-left p-3 rounded-lg border hover:bg-blue-50 border-blue-200 bg-blue-50">
               <span className="block font-bold text-blue-700">Block 12 - Lot 4</span>
               <span className="text-xs text-slate-500">Unit Type: REG | Model: Cast-A</span>
             </button>
          </div>
        </div>

        {/* Milestone Activity List */}
        <div className="col-span-2 bg-white border rounded-xl p-6 shadow-sm">
          <h3 className="font-bold mb-4">Activities for Structural Phase</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50">
              <div>
                <p className="font-medium">Ground Floor Slab Pouring</p>
                <p className="text-xs text-slate-500">Linked Subcon: A-1 Concrete Pros</p>
              </div>
              <div className="flex items-center gap-4">
                <input type="number" className="w-16 border rounded p-1" defaultValue={0} max={100} />
                <span className="text-sm font-bold">%</span>
                <Button size="sm" variant="outline">Attach Proof</Button>
                <Button size="sm" className="bg-blue-600">Update</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
