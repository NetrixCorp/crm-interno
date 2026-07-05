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

  const deal = await db.deal.findUnique({
    where: { id: params.id },
    include: {
      contact: true,
      activities: { orderBy: { createdAt: 'desc' } },
    },
  })
  if (!deal) return NextResponse.json({ error: 'Deal no encontrado' }, { status: 404 })

  return NextResponse.json({ ...deal, valueCop: Number(deal.valueCop) })
}
