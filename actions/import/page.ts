export default function ImportPage() {
  return (
    <div className="max-w-2xl mx-auto p-10 bg-white border rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Import Bank Statement</h1>
      <select className="w-full p-3 border rounded mb-4">
        <option>Select Bank (BDO / Metrobank / BPI)</option>
      </select>
      <div className="border-2 border-dashed border-slate-200 p-20 text-center rounded-lg hover:border-blue-400 transition-all cursor-pointer">
        <p className="text-slate-500">Drag & Drop CSV Statement here</p>
      </div>
      <button className="w-full mt-6 bg-slate-900 text-white p-3 rounded-lg font-bold">
        Process Import
      </button>
    </div>
  );
}
