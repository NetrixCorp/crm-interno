import { google } from 'googleapis'

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

export function getAuthUrl(dealId: string): string {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.events'],
    state: dealId,
    prompt: 'consent',
  })
}

export async function createCalendarEvent(
  accessToken: string,
  refreshToken: string,
  event: {
    title: string
    description: string
    startDateTime: string
    endDateTime: string
    attendeeEmail?: string
  }
) {
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  })

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

  const response = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: {
      summary: event.title,
      description: event.description,
      start: { dateTime: event.startDateTime, timeZone: 'America/Bogota' },
      end: { dateTime: event.endDateTime, timeZone: 'America/Bogota' },
      attendees: event.attendeeEmail
        ? [{ email: event.attendeeEmail }]
        : [],
    },
  })

  return response.data
}
