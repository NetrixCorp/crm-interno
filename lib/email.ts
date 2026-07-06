import { Resend } from 'resend'
import { NETRIX } from './constants'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendInternalNotification(subject: string, html: string) {
  try {
    console.log('[EMAIL DEBUG] Intentando enviar a:', NETRIX.email)
    console.log('[EMAIL DEBUG] Desde:', process.env.RESEND_FROM_EMAIL)
    console.log('[EMAIL DEBUG] API Key presente:', !!process.env.RESEND_API_KEY)
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'NETRIX CRM <onboarding@resend.dev>',
      to: NETRIX.email,
      subject,
      html,
    })
    console.log('[EMAIL DEBUG] Resultado de Resend:', JSON.stringify(result))
  } catch (error) {
    console.error('Error enviando notificacion interna:', error)
    console.error('[EMAIL DEBUG] Error completo:', JSON.stringify(error))
  }
}
