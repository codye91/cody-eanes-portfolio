'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

interface ProjectNavItem {
  slug: string
  label: string
}

interface AdminSidebarProps {
  projects: ProjectNavItem[]
}

const CONTENT_SUB_ITEMS = [
  { label: 'Home', href: '/admin/content' },
  { label: 'About', href: '/admin/content/about' },
  { label: 'My Process', href: '/admin/content/my-process' },
  { label: 'Resume Link-Out', href: '/admin/content/resume' },
]

interface NavItem {
  label: string
  href: string
  icon: string
  section: string | null
  subItems: { label: string; href: string }[]
}

export default function AdminSidebar({ projects }: AdminSidebarProps) {
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

  // Derive expanded section purely from current pathname
  const activeSection = pathname.startsWith('/admin/projects')
    ? 'projects'
    : pathname.startsWith('/admin/content')
    ? 'content'
    : null

  const navItems: NavItem[] = [
    {
      label: 'Projects',
      href: '/admin/projects',
      icon: '◈',
      section: 'projects',
      subItems: projects.map(p => ({
        label: p.label,
        href: `/admin/projects/${p.slug}`,
      })),
    },
    {
      label: 'Content',
      href: '/admin/content',
      icon: '✦',
      section: 'content',
      subItems: CONTENT_SUB_ITEMS,
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: '⚙',
      section: null,
      subItems: [],
    },
  ]

  function renderNavItem(item: NavItem, onLinkClick?: () => void) {
    const isExpanded = activeSection === item.section
    const parentActive = isActive(item.href)

    if (item.subItems.length === 0) {
      return (
        <Link
          key={item.href}
          href={item.href}
          className={`admin-nav-item${parentActive ? ' active' : ''}`}
          onClick={onLinkClick}
        >
          <span className="admin-nav-icon">{item.icon}</span>
          {item.label}
        </Link>
      )
    }

    return (
      <div key={item.href} className="admin-nav-group">
        <Link
          href={item.href}
          className={`admin-nav-item admin-nav-parent${parentActive ? ' active' : ''}`}
          onClick={onLinkClick}
        >
          <span className="admin-nav-icon">{item.icon}</span>
          <span className="admin-nav-parent-label">{item.label}</span>
          <span className={`admin-nav-chevron${isExpanded ? ' open' : ''}`}>›</span>
        </Link>
        <div className={`admin-subnav${isExpanded ? ' open' : ''}`}>
          {item.subItems.map(sub => (
            <Link
              key={sub.href}
              href={sub.href}
              className={`admin-subnav-item${pathname === sub.href ? ' active' : ''}`}
              onClick={onLinkClick}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      </div>
    )
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
          {navItems.map(item => renderNavItem(item))}
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
          {navItems.map(item => renderNavItem(item, () => setDrawerOpen(false)))}
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
