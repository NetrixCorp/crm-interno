import { ReportsCharts } from '@/components/crm/ReportsCharts'

export const dynamic = 'force-dynamic'

export default function ReportsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Reportes</h1>
        <p className="text-brand-gray-mid text-sm">
          Análisis del pipeline y performance comercial
        </p>
      </div>
      <ReportsCharts />
    </div>
  )
}
