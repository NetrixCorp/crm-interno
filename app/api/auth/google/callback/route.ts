import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const dealId = url.searchParams.get('state')

  if (!code) return NextResponse.redirect(new URL('/pipeline?error=google_auth_failed', url))

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )

  const { tokens } = await oauth2Client.getToken(code)

  if (dealId && tokens.access_token) {
    await db.automationLog.create({
      data: {
        dealId,
        autoType: 'google_calendar_auth',
        trigger: 'oauth_callback',
        status: 'success',
        details: {
          googleAccessToken: tokens.access_token,
          googleRefreshToken: tokens.refresh_token,
        },
      },
    })
  }

  return NextResponse.redirect(
    new URL(dealId ? `/deals/${dealId}?google=connected` : '/dashboard', url)
  )
}
