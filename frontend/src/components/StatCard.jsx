
function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{title}</p>

        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={22} />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-slate-800 mt-4">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;
