import type { Metadata } from 'next'
import { getAllProjectsAdmin } from '@/lib/content'
import AdminSidebar from '@/components/AdminSidebar'

export const metadata: Metadata = {
  title: { default: 'CMS', template: '%s — CMS' },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const projects = getAllProjectsAdmin().map(p => ({
    slug: p.slug,
    label: p.card.brand,
  }))

  return (
    <div className="admin-shell">
      <AdminSidebar projects={projects} />
      <main className="admin-main">{children}</main>
    </div>
  )
}
