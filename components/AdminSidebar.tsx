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
  const [drawerOpen, setDrawerOpen] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    setDrawerOpen(false)
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────────── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <Link href="/" className="admin-wordmark">
            Cody Eanes
          </Link>
          <span className="admin-cms-tag">CMS</span>
        </div>

        <div className="admin-nav">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item${isActive(item.href) ? ' active' : ''}`}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>

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

      {/* ── Mobile top bar (visible < 900px) ────────────────── */}
      <div className="admin-topbar">
        <Link href="/admin/projects" className="admin-topbar-wordmark">
          Cody Eanes
          <span className="admin-cms-tag">CMS</span>
        </Link>
        <button
          className={`admin-topbar-hamburger${drawerOpen ? ' open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(prev => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* ── Right-side drawer overlay ────────────────────────── */}
      <div
        className={`admin-drawer-overlay${drawerOpen ? ' open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* ── Right-side drawer panel ──────────────────────────── */}
      <div
        className={`admin-drawer${drawerOpen ? ' open' : ''}`}
        role="dialog"
        aria-label="Admin navigation"
      >
        <div className="admin-drawer-header">
          <div className="admin-drawer-logo">
            <span className="admin-wordmark" style={{ fontSize: '15px' }}>Cody Eanes</span>
            <span className="admin-cms-tag">CMS</span>
          </div>
          <button
            className={`admin-topbar-hamburger${drawerOpen ? ' open' : ''}`}
            aria-label="Close navigation"
            onClick={() => setDrawerOpen(false)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className="admin-drawer-nav">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item${isActive(item.href) ? ' active' : ''}`}
              onClick={() => setDrawerOpen(false)}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="admin-drawer-footer">
          <a
            href="/"
            target="_blank"
            rel="noopener"
            className="admin-nav-item view-site"
            onClick={() => setDrawerOpen(false)}
          >
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
      </div>
    </>
  )
}
