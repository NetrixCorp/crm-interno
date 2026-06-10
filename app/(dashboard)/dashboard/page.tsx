export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-brand-gray-mid text-sm">
        Setup completado ✅ — Pipeline y KPIs se construyen en CRM-2
      </p>
      <div className="mt-8 grid grid-cols-4 gap-4">
        {['Leads activos', 'Revenue pipeline', 'Deals cerrados', 'Follow-ups hoy'].map((label) => (
          <div
            key={label}
            className="bg-brand-black-soft border border-brand-gray-dark rounded-lg p-4"
          >
            <p className="text-brand-gray-mid text-xs">{label}</p>
            <p className="text-white text-2xl font-bold mt-1">—</p>
          </div>
        ))}
      </div>
    </div>
  )
}
