import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getAuthUrl } from '@/lib/google-calendar'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const url = new URL(request.url)
  const dealId = url.searchParams.get('dealId') || ''
  const authUrl = getAuthUrl(dealId)
  return NextResponse.redirect(authUrl)
}
