import { Resend } from 'resend'
import { NETRIX } from './constants'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendInternalNotification(subject: string, html: string) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'NETRIX CRM <onboarding@resend.dev>',
      to: NETRIX.email,
      subject,
      html,
    })
  } catch (error) {
    console.error('Error enviando notificacion interna:', error)
  }
}
