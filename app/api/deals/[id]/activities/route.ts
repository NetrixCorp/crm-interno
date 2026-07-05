import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const activities = await db.activity.findMany({
    where: { dealId: params.id },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(activities)
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = await request.json()
  const deal = await db.deal.findUnique({
    where: { id: params.id },
    select: { contactId: true },
  })
  if (!deal) return NextResponse.json({ error: 'Deal no encontrado' }, { status: 404 })

  const activity = await db.activity.create({
    data: {
      dealId: params.id,
      contactId: deal.contactId,
      type: body.type,
      description: body.description,
      outcome: body.outcome || null,
      userId,
    },
  })
  return NextResponse.json(activity, { status: 201 })
}
