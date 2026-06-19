import { db } from '@/lib/db'
import { formatCOP } from '@/lib/utils'
import { KPICard } from '@/components/crm/KPICard'

export default async function DashboardPage() {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)

  const [leadsActivos, dealsAbiertos, dealsCerrados, followUpsHoy] = await Promise.all([
    db.contact.count({ where: { status: 'Activo' } }),
    db.deal.findMany({
      where: { stage: { notIn: ['Cerrado', 'Perdido'] } },
      select: { valueCop: true },
    }),
    db.deal.count({ where: { stage: 'Cerrado' } }),
    db.deal.count({ where: { nextFollowUp: { gte: startOfDay, lte: endOfDay } } }),
  ])

  const revenuePipeline = dealsAbiertos.reduce((sum, d) => sum + Number(d.valueCop), 0)

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-brand-gray-mid text-sm mb-8">
        Vista general del pipeline comercial de NETRIX
      </p>
      <div className="grid grid-cols-4 gap-4">
        <KPICard label="Leads activos" value={String(leadsActivos)} />
        <KPICard label="Revenue pipeline" value={formatCOP(revenuePipeline)} />
        <KPICard label="Deals cerrados" value={String(dealsCerrados)} />
        <KPICard label="Follow-ups hoy" value={String(followUpsHoy)} />
      </div>
    </div>
  )
}
