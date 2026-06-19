interface KPICardProps {
  label: string
  value: string
}

export function KPICard({ label, value }: KPICardProps) {
  return (
    <div className="bg-brand-black-soft border border-brand-gray-dark rounded-lg p-4">
      <p className="text-brand-gray-mid text-xs">{label}</p>
      <p className="text-white text-2xl font-bold mt-1">{value}</p>
    </div>
  )
}
