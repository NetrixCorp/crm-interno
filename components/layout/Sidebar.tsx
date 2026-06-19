'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { LayoutDashboard, Users, KanbanSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/pipeline', label: 'Pipeline', icon: KanbanSquare },
  { href: '/contacts', label: 'Contactos', icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-brand-black-soft border-r border-brand-gray-dark flex-shrink-0 flex flex-col">
      <div className="p-6 border-b border-brand-gray-dark">
        <h1 className="text-xl font-bold text-white tracking-widest">NETRIX</h1>
        <p className="text-xs text-brand-gray-mid mt-0.5">CRM Interno</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                active
                  ? 'bg-brand-red text-white font-semibold'
                  : 'text-brand-gray-mid hover:bg-brand-gray-dark hover:text-white'
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-brand-gray-dark flex items-center gap-3">
        <UserButton afterSignOutUrl="/sign-in" />
        <span className="text-xs text-brand-gray-mid">Mi cuenta</span>
      </div>
    </aside>
  )
}
