export const SITE_CONFIG = {
  name: 'NETRIX CRM',
  fullName: 'NETRIX CRM Interno',
  description: 'Sistema de gestión de clientes y pipeline comercial de NETRIX Corporation',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
}

export const NETRIX = {
  name: 'NETRIX Corporation',
  email: 'netrixcorporation@gmail.com',
  whatsapp: '+57 317 278 5407',
  whatsappLink: 'https://wa.me/573172785407',
  whatsappMessage: 'https://wa.me/573172785407?text=Hola%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20NETRIX.',
  instagram: 'https://www.instagram.com/netrix_col/',
  linkedin: 'https://www.linkedin.com/company/netrixcol/',
  portfolio: 'https://portafolio-phi-jade-93.vercel.app',
}

export const COLORS = {
  black: '#0D0D0D',
  red: '#FF2E2E',
  white: '#FFFFFF',
  blackSoft: '#1A1A1A',
  grayDark: '#2C2C2C',
  grayLight: '#F4F4F2',
  grayMid: '#CCCCCC',
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''
export const HOTJAR_SCRIPT_SRC = process.env.NEXT_PUBLIC_HOTJAR_SCRIPT_SRC || ''

export const DEAL_STAGES = [
  { id: 'Lead', label: 'Lead', color: '#3B82F6' },
  { id: 'Propuesta_Enviada', label: 'Propuesta enviada', color: '#F59E0B' },
  { id: 'Negociacion', label: 'Negociación', color: '#F97316' },
  { id: 'Cerrado', label: 'Cerrado', color: '#22C55E' },
  { id: 'Perdido', label: 'Perdido', color: '#EF4444' },
] as const

export const CONTACT_SOURCES = [
  'WhatsApp', 'Instagram', 'Referido', 'Web', 'LinkedIn', 'Otro',
] as const

export const SERVICE_TYPES = [
  'CRM', 'Landing', 'Ecommerce', 'Dashboard', 'Chatbot',
  'Automatizacion', 'Web', 'API', 'Diagnostico',
] as const

export const SERVICE_LEVELS = ['N1', 'N2', 'N3', 'N4'] as const

export const TEAM = {
  MONKEY: { clerkId: '', name: 'Diego Medina', role: 'Tech', alias: 'Monkey' },
  POLO: { clerkId: '', name: 'Juan Pablo Monroy', role: 'Marketing', alias: 'Polo' },
}

export const NETRIX_ATTRIBUTION = {
  text: 'Powered by NETRIX Corporation',
  url: 'https://wa.me/573172785407',
  visible: true,
}

export const isSubscriptionActive = process.env.SUBSCRIPTION_ACTIVE !== 'false'

export const CRON_DAILY_HOUR = 9
export const CRON_WEEKLY_DAY = 1
export const STAGNATION_DAYS = 3

export const PRICING_DEFAULTS: Record<string, Record<string, number>> = {
  CRM:            { N1: 2500000, N2: 3000000, N3: 3500000, N4: 4000000 },
  Web:            { N1: 2000000, N2: 2500000, N3: 3000000, N4: 3500000 },
  Ecommerce:      { N1: 3000000, N2: 3500000, N3: 4000000, N4: 5000000 },
  Dashboard:      { N1: 2000000, N2: 2500000, N3: 3000000, N4: 3500000 },
  Chatbot:        { N1: 2500000, N2: 3000000, N3: 3500000, N4: 4000000 },
  Automatizacion: { N1: 2000000, N2: 2500000, N3: 3000000, N4: 4000000 },
  Landing:        { N1: 1200000, N2: 1600000, N3: 2000000, N4: 2500000 },
  API:            { N1: 2000000, N2: 3000000, N3: 4000000, N4: 5000000 },
  Diagnostico:    { N1: 500000,  N2: 500000,  N3: 500000,  N4: 500000  },
}
