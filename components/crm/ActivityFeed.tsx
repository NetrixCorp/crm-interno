'use client'

import { useState } from 'react'
import { Plus, Phone, MessageCircle, Mail, Users, FileText, CheckCircle, X } from 'lucide-react'
import { formatRelativeDate } from '@/lib/utils'

const ACTIVITY_ICONS: Record<string, any> = {
  Llamada: Phone,
  WhatsApp: MessageCircle,
  Email: Mail,
  Reunion: Users,
  Nota: FileText,
  Propuesta: FileText,
  Cierre: CheckCircle,
}

const ACTIVITY_COLORS: Record<string, string> = {
  Llamada: 'text-blue-400',
  WhatsApp: 'text-green-400',
  Email: 'text-yellow-400',
  Reunion: 'text-purple-400',
  Nota: 'text-brand-gray-mid',
  Propuesta: 'text-orange-400',
  Cierre: 'text-brand-red',
}

const ACTIVITY_TYPES = ['Llamada', 'WhatsApp', 'Email', 'Reunion', 'Nota', 'Propuesta', 'Cierre']

interface Activity {
  id: string
  type: string
  description: string
  outcome: string | null
  createdAt: string
}

interface ActivityFeedProps {
  dealId: string
  activities: Activity[]
  onActivityAdded: () => void
}

export function ActivityFeed({ dealId, activities, onActivityAdded }: ActivityFeedProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState({ type: 'Llamada', description: '', outcome: '' })
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch(`/api/deals/${dealId}/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm({ type: 'Llamada', description: '', outcome: '' })
    setFormOpen(false)
    setSaving(false)
    onActivityAdded()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Historial de actividades</h3>
        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-1 text-xs text-brand-gray-mid hover:text-white border border-brand-gray-dark hover:border-brand-gray-mid px-3 py-1.5 rounded-lg transition-colors"
        >
          <Plus size={14} /> Registrar
        </button>
      </div>

      {formOpen && (
        <div className="bg-brand-black border border-brand-gray-dark rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white text-sm font-medium">Nueva actividad</p>
            <button onClick={() => setFormOpen(false)} className="text-brand-gray-mid hover:text-white">
              <X size={16} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full bg-brand-black-soft border border-brand-gray-dark rounded-lg px-3 py-2 text-white text-sm"
            >
              {ACTIVITY_TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}
            </select>
            <textarea
              required
              placeholder="¿Qué pasó? Describe la interacción..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full bg-brand-black-soft border border-brand-gray-dark rounded-lg px-3 py-2 text-white text-sm resize-none"
            />
            <input
              placeholder="Resultado / próximo paso (opcional)"
              value={form.outcome}
              onChange={(e) => setForm({ ...form, outcome: e.target.value })}
              className="w-full bg-brand-black-soft border border-brand-gray-dark rounded-lg px-3 py-2 text-white text-sm"
            />
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-brand-red text-white font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
            >
              {saving ? 'Guardando...' : 'Guardar actividad'}
            </button>
          </form>
        </div>
      )}

      {activities.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-white text-sm font-medium mb-2">Sin actividades todavía</p>
          <p className="text-brand-gray-mid text-xs max-w-xs mx-auto">
            Registrá cada interacción con este cliente: llamadas, mensajes de WhatsApp,
            reuniones, propuestas enviadas. Esto construye el historial completo del deal.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => {
            const Icon = ACTIVITY_ICONS[activity.type] || FileText
            const colorClass = ACTIVITY_COLORS[activity.type] || 'text-brand-gray-mid'
            return (
              <div key={activity.id} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-black border border-brand-gray-dark flex items-center justify-center">
                  <Icon size={14} className={colorClass} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs font-semibold ${colorClass}`}>{activity.type}</span>
                    <span className="text-brand-gray-mid text-xs">{formatRelativeDate(activity.createdAt)}</span>
                  </div>
                  <p className="text-white text-sm">{activity.description}</p>
                  {activity.outcome && (
                    <p className="text-brand-gray-mid text-xs mt-1">→ {activity.outcome}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
