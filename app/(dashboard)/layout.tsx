import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { isSubscriptionActive } from '@/lib/constants'
import { Sidebar } from '@/components/layout/Sidebar'

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
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
