import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { createCalendarEvent } from '@/lib/google-calendar'

export const dynamic = 'force-dynamic'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = await request.json()
  const deal = await db.deal.findUnique({
    where: { id: params.id },
    include: { contact: true },
  })

  if (!deal) return NextResponse.json({ error: 'Deal no encontrado' }, { status: 404 })

  const authLog = await db.automationLog.findFirst({
    where: { dealId: params.id, autoType: 'google_calendar_auth' },
    orderBy: { createdAt: 'desc' },
  })
  const tokens = (authLog?.details as { googleAccessToken?: string; googleRefreshToken?: string } | null) || {}

  if (!tokens.googleAccessToken) {
    return NextResponse.json({ error: 'Google Calendar no conectado' }, { status: 400 })
  }

  const event = await createCalendarEvent(
    tokens.googleAccessToken,
    tokens.googleRefreshToken || '',
    {
      title: body.title || `Reunión con ${deal.contact.name} — ${deal.title}`,
      description: `Deal: ${deal.title}\nContacto: ${deal.contact.name}\n${body.description || ''}`,
      startDateTime: body.startDateTime,
      endDateTime: body.endDateTime,
      attendeeEmail: deal.contact.email || undefined,
    }
  )

  await db.calendarEvent.create({
    data: {
      dealId: params.id,
      googleEventId: event.id || '',
      title: event.summary || '',
      startTime: new Date(event.start?.dateTime || body.startDateTime),
      endTime: new Date(event.end?.dateTime || body.endDateTime),
      eventType: 'Reunion',
    },
  })

  const meetLink = event.conferenceData?.entryPoints?.[0]?.uri || null

  return NextResponse.json({
    success: true,
    eventId: event.id,
    htmlLink: event.htmlLink,
    meetLink,
  })
}
