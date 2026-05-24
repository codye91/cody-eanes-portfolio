'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { label: 'Projects', href: '/admin/projects', icon: '◈' },
  { label: 'Content', href: '/admin/content', icon: '✦' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <Link href="/" className="admin-wordmark">
          Cody Eanes
        </Link>
        <span className="admin-cms-tag">CMS</span>
      </div>

      <nav className="admin-nav">
        {navItems.map(item => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item${active ? ' active' : ''}`}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="admin-sidebar-footer">
        <a href="/" target="_blank" rel="noopener" className="admin-nav-item view-site">
          <span className="admin-nav-icon">↗</span>
          View site
        </a>
        <button
          onClick={handleLogout}
          className="admin-nav-item admin-logout"
          disabled={loggingOut}
        >
          <span className="admin-nav-icon">→</span>
          {loggingOut ? 'Signing out…' : 'Sign out'}
        </button>
      </div>
    </aside>
  )
}
