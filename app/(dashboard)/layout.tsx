import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { isSubscriptionActive } from '@/lib/constants'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')
  if (!isSubscriptionActive) redirect('/cuenta-suspendida')

  return (
    <div className="min-h-screen bg-brand-black flex">
      <aside className="w-64 bg-brand-black-soft border-r border-brand-gray-dark flex-shrink-0">
        <div className="p-6 border-b border-brand-gray-dark">
          <h1 className="text-xl font-bold text-white tracking-widest">NETRIX</h1>
          <p className="text-xs text-brand-gray-mid mt-0.5">CRM Interno</p>
        </div>
        <nav className="p-4">
          <p className="text-brand-gray-mid text-xs">Navegación — CRM-2</p>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
