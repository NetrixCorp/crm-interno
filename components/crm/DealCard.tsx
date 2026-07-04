'use client'

import { Draggable } from '@hello-pangea/dnd'
import { MessageCircle } from 'lucide-react'
import { formatCOP, formatRelativeDate, buildWhatsAppLink } from '@/lib/utils'

interface DealCardProps {
  deal: any
  index: number
  onClick: () => void
}

export function DealCard({ deal, index, onClick }: DealCardProps) {
  return (
    <Draggable draggableId={deal.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
          className={`bg-brand-black border border-brand-gray-dark rounded-lg p-3 mb-2 cursor-pointer hover:border-brand-gray-mid transition-colors ${
            snapshot.isDragging ? 'opacity-70' : ''
          }`}
        >
          <p className="text-white text-sm font-medium truncate">{deal.title}</p>
          <p className="text-brand-gray-mid text-xs mt-0.5">{deal.contact?.name}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-brand-red text-sm font-semibold">{formatCOP(deal.valueCop)}</span>
            <div className="flex items-center gap-2">
              {deal.contact?.phone && (
                <a
                  href={buildWhatsAppLink(deal.contact.phone, `Hola ${deal.contact.name}, te escribo sobre ${deal.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-brand-gray-mid hover:text-green-500"
                  title="Escribir por WhatsApp"
                >
                  <MessageCircle size={14} />
                </a>
              )}
              <span className="text-brand-gray-mid text-xs">{formatRelativeDate(deal.updatedAt)}</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}
