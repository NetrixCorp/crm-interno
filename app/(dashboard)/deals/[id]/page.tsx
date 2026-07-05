'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Pencil, Trash2, Calendar } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { ActivityFeed } from '@/components/crm/ActivityFeed'
import { DealForm } from '@/components/crm/DealForm'
import { formatCOP, formatDate, formatRelativeDate, buildWhatsAppLink } from '@/lib/utils'
import { DEAL_STAGES } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export default function DealDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [deal, setDeal] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editOpen, setEditOpen] = useState(false)

  const loadDeal = useCallback(async () => {
    const res = await fetch(`/api/deals/${id}/detail`)
    if (!res.ok) { router.push('/pipeline'); return }
    setDeal(await res.json())
    setLoading(false)
  }, [id, router])

  useEffect(() => { loadDeal() }, [loadDeal])

  async function handleDelete() {
    if (!confirm('¿Eliminar este deal? Esta acción no se puede deshacer.')) return
    await fetch(`/api/deals/${id}`, { method: 'DELETE' })
    router.push('/pipeline')
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-brand-gray-mid text-sm">Cargando...</p>
    </div>
  )

  if (!deal) return null

  const stage = DEAL_STAGES.find((s) => s.id === deal.stage)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="text-brand-gray-mid hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">{deal.title}</h1>
          <p className="text-brand-gray-mid text-sm">{deal.contact.name} · {deal.contact.company || '—'}</p>
        </div>
        <div className="flex gap-2">
          {deal.contact.phone && (
            <a
              href={buildWhatsAppLink(deal.contact.phone, `Hola ${deal.contact.name}, te escribo sobre ${deal.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm bg-brand-black-soft border border-brand-gray-dark text-brand-gray-mid hover:text-green-500 hover:border-green-500 px-3 py-2 rounded-lg transition-colors"
            >
              <FaWhatsapp size={16} /> WhatsApp
            </a>
          )}
          <button
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-2 text-sm bg-brand-black-soft border border-brand-gray-dark text-brand-gray-mid hover:text-white px-3 py-2 rounded-lg transition-colors"
          >
            <Pencil size={16} /> Editar
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 text-sm bg-brand-black-soft border border-brand-gray-dark text-brand-gray-mid hover:text-brand-red hover:border-brand-red px-3 py-2 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Columna izquierda — Info del deal */}
        <div className="col-span-1 space-y-4">
          {/* Etapa */}
          <div className="bg-brand-black-soft border border-brand-gray-dark rounded-lg p-4">
            <p className="text-brand-gray-mid text-xs mb-2">Etapa actual</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stage?.color }} />
              <span className="text-white font-semibold text-sm">{stage?.label || deal.stage}</span>
            </div>
          </div>

          {/* Valor */}
          <div className="bg-brand-black-soft border border-brand-gray-dark rounded-lg p-4">
            <p className="text-brand-gray-mid text-xs mb-1">Valor del deal</p>
            <p className="text-brand-red text-2xl font-bold">{formatCOP(deal.valueCop)}</p>
          </div>

          {/* Info del servicio */}
          <div className="bg-brand-black-soft border border-brand-gray-dark rounded-lg p-4 space-y-3">
            <div>
              <p className="text-brand-gray-mid text-xs mb-1">Servicio</p>
              <p className="text-white text-sm">{deal.service}</p>
            </div>
            <div>
              <p className="text-brand-gray-mid text-xs mb-1">Nivel</p>
              <p className="text-white text-sm">{deal.level}</p>
            </div>
            <div>
              <p className="text-brand-gray-mid text-xs mb-1">Creado</p>
              <p className="text-white text-sm">{formatDate(deal.createdAt)}</p>
            </div>
            <div>
              <p className="text-brand-gray-mid text-xs mb-1">Última actualización</p>
              <p className="text-white text-sm">{formatRelativeDate(deal.updatedAt)}</p>
            </div>
          </div>

          {/* Próximo seguimiento */}
          {deal.nextFollowUp && (
            <div className="bg-brand-black-soft border border-brand-gray-dark rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={14} className="text-brand-gray-mid" />
                <p className="text-brand-gray-mid text-xs">Próximo seguimiento</p>
              </div>
              <p className="text-white text-sm font-semibold">{formatDate(deal.nextFollowUp)}</p>
            </div>
          )}

          {/* Contacto */}
          <div className="bg-brand-black-soft border border-brand-gray-dark rounded-lg p-4 space-y-2">
            <p className="text-brand-gray-mid text-xs mb-2">Contacto</p>
            <p className="text-white text-sm font-semibold">{deal.contact.name}</p>
            {deal.contact.company && <p className="text-brand-gray-mid text-xs">{deal.contact.company}</p>}
            {deal.contact.email && <p className="text-brand-gray-mid text-xs">{deal.contact.email}</p>}
            {deal.contact.phone && <p className="text-brand-gray-mid text-xs">{deal.contact.phone}</p>}
            <p className="text-brand-gray-mid text-xs">Fuente: {deal.contact.source}</p>
          </div>

          {/* Notas */}
          {deal.notes && (
            <div className="bg-brand-black-soft border border-brand-gray-dark rounded-lg p-4">
              <p className="text-brand-gray-mid text-xs mb-2">Notas</p>
              <p className="text-white text-sm leading-relaxed">{deal.notes}</p>
            </div>
          )}
        </div>

        {/* Columna derecha — Historial */}
        <div className="col-span-2 bg-brand-black-soft border border-brand-gray-dark rounded-lg p-6">
          <ActivityFeed
            dealId={id}
            activities={deal.activities}
            onActivityAdded={loadDeal}
          />
        </div>
      </div>

      {editOpen && (
        <DealForm
          deal={deal}
          onClose={() => setEditOpen(false)}
          onSaved={() => { setEditOpen(false); loadDeal() }}
        />
      )}
    </div>
  )
}
