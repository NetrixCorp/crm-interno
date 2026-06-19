import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

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
