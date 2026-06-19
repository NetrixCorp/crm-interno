import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const contacts = await db.contact.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { deals: true } } },
  })
  return NextResponse.json(contacts)
}

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = await request.json()
  const contact = await db.contact.create({
    data: {
      name: body.name,
      email: body.email || null,
      phone: body.phone || null,
      company: body.company || null,
      source: body.source || 'Otro',
      status: body.status || 'Activo',
      userId,
    },
  })
  return NextResponse.json(contact, { status: 201 })
}
