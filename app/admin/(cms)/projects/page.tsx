import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllProjectsAdmin } from '@/lib/content'
import AdminProjectsClient from '@/components/AdminProjectsClient'

export const metadata: Metadata = { title: 'Projects' }

export default function AdminProjectsPage() {
  const projects = getAllProjectsAdmin()
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Projects</h1>
          <p className="admin-page-sub">{projects.length} case studies</p>
        </div>
        <Link href="/admin/projects/new" className="admin-btn-primary">
          + New project
        </Link>
      </div>
      <AdminProjectsClient initialProjects={projects} />
    </div>
  )
}
