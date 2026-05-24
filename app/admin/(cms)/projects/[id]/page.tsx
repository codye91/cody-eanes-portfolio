import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjectBySlug } from '@/lib/content'
import ProjectForm from '@/components/ProjectForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const project = getProjectBySlug(id)
  return { title: project ? `Edit — ${project.card.brand}` : 'Edit Project' }
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = getProjectBySlug(id)
  if (!project) notFound()

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Edit — {project.card.brand}</h1>
        <a
          href={`/work/${project.slug}`}
          target="_blank"
          rel="noopener"
          className="admin-btn-ghost"
        >
          View live ↗
        </a>
      </div>
      <ProjectForm project={project} isNew={false} />
    </div>
  )
}
