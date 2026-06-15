'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Building2, FileText, BarChart2, Settings, LogOut, Menu, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/clinics', label: 'Clinics', icon: Building2 },
  { href: '/admin/content', label: 'Content', icon: FileText },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const Sidebar = () => (
    <aside className="w-64 bg-ink-dark min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L9 16M2 9H16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-body-md">CareCompass</p>
            <p className="text-white/40 text-caption">Admin Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-sm font-medium transition-all',
                active ? 'bg-primary text-white' : 'text-white/60 hover:text-white hover:bg-white/10'
              )}
            >
              <Icon size={18} />
              {item.label}
              {active && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-white text-label-sm font-bold">A</div>
          <div>
            <p className="text-white text-body-sm font-semibold">Admin</p>
            <p className="text-white/40 text-caption">admin@carecompass.ke</p>
          </div>
        </div>
        <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white text-caption transition-colors">
          <LogOut size={14} /> Sign out
        </Link>
      </div>
    </aside>
  )

  return (
    <div className="flex min-h-screen bg-surface-container-low">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10 h-full">
            <Sidebar />
          </div>
          <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-white">
            <X size={24} />
          </button>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-outline-variant/30 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <button className="lg:hidden text-on-surface-variant" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2 text-caption text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">← Back to site</Link>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
