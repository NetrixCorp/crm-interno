import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { sendInternalNotification } from '@/lib/email'
import { formatCOP } from '@/lib/utils'

function serializeDeal(deal: any) {
  return { ...deal, valueCop: Number(deal.valueCop) }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = await request.json()
  const current = await db.deal.findUnique({ where: { id: params.id } })
  if (!current) return NextResponse.json({ error: 'Deal no encontrado' }, { status: 404 })

  const deal = await db.deal.update({
    where: { id: params.id },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.service !== undefined && { service: body.service }),
      ...(body.level !== undefined && { level: body.level }),
      ...(body.valueCop !== undefined && { valueCop: BigInt(body.valueCop) }),
      ...(body.stage !== undefined && { stage: body.stage }),
      ...(body.probability !== undefined && { probability: body.probability }),
      ...(body.nextFollowUp !== undefined && {
        nextFollowUp: body.nextFollowUp ? new Date(body.nextFollowUp) : null,
      }),
    },
    include: { contact: true },
  })

  if (body.stage !== undefined && body.stage !== current.stage) {
    await db.activity.create({
      data: {
        dealId: deal.id,
        contactId: deal.contactId,
        type: 'Nota',
        description: `Etapa cambiada de ${current.stage} a ${body.stage}`,
        userId,
      },
    })

    await sendInternalNotification(
      `Deal actualizado: ${deal.title}`,
      `<div style="font-family: sans-serif;">
        <h2 style="color:#0D0D0D;">Cambio de etapa en el pipeline</h2>
        <p><strong>Deal:</strong> ${deal.title}</p>
        <p><strong>Contacto:</strong> ${deal.contact.name}</p>
        <p><strong>De:</strong> ${current.stage} → <strong>A:</strong> ${body.stage}</p>
        <p><strong>Valor:</strong> ${formatCOP(Number(deal.valueCop))}</p>
      </div>`
    )
  }

  return NextResponse.json(serializeDeal(deal))
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  await db.deal.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
