'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/#work', label: 'The Work', matchRoot: true },
  { href: '/about', label: 'About' },
  { href: '/my-process', label: 'Process' },
]

const RESUME_URL = 'https://drive.google.com/file/d/1B5phyGjlVl0t4TsXUP4TnsJMDVLRZ28G/view'

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  function isActive(href: string, matchRoot?: boolean): boolean {
    if (matchRoot) return pathname === '/'
    return pathname === href || pathname.startsWith(href)
  }

  function close() {
    setOpen(false)
  }

  return (
    <nav className={open ? 'nav-open' : ''}>
      <div className="nav-inner">
        <Link href="/" className="nav-wordmark" onClick={close}>
          Cody Eanes
        </Link>

        <ul className="nav-links">
          {NAV_LINKS.map(({ href, label, matchRoot }) => (
            <li key={href}>
              <Link
                href={href}
                className={isActive(href, matchRoot) ? 'active' : ''}
                onClick={close}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Resume <span>↗</span>
            </a>
          </li>
        </ul>

        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(prev => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
