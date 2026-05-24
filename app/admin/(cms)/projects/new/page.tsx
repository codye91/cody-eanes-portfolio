import type { Metadata } from 'next'
import { getAllProjectsAdmin } from '@/lib/content'
import ProjectForm from '@/components/ProjectForm'

export const metadata: Metadata = { title: 'New Project' }

export default function NewProjectPage() {
  const existing = getAllProjectsAdmin()
  const nextOrder = existing.length > 0 ? Math.max(...existing.map(p => p.order)) + 1 : 1

  const blank = {
    slug: '',
    order: nextOrder,
    visible: false,
    reversed: false,
    card: {
      role: '',
      brand: '',
      title: '',
      description: '',
      metrics: [],
      image: '',
      imageAlt: '',
    },
    hero: {
      title: '',
      subtitle: '',
      meta: [
        { label: 'Brand', value: '' },
        { label: 'Role', value: '' },
        { label: 'Duration', value: '' },
        { label: 'Scope', value: '' },
      ],
    },
    sections: [],
    reflection: { quote: '', followUp: null },
    nextProject: null,
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">New Project</h1>
      </div>
      <ProjectForm project={blank} isNew />
    </div>
  )
}
