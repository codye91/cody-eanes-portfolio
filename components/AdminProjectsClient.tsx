'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/content'

export default function AdminProjectsClient({
  initialProjects,
}: {
  initialProjects: Project[]
}) {
  const [projects, setProjects] = useState(initialProjects)
  const [saving, setSaving] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  async function patchProject(slug: string, patch: Partial<Project>) {
    setSaving(slug)
    setMessage('')
    try {
      const project = projects.find(p => p.slug === slug)!
      const updated = { ...project, ...patch }
      const res = await fetch(`/api/admin/projects/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      if (res.ok) {
        setProjects(prev => prev.map(p => (p.slug === slug ? updated : p)))
        setMessage('Saved.')
      } else {
        setMessage('Save failed.')
      }
    } finally {
      setSaving(null)
    }
  }

  async function moveProject(slug: string, direction: 'up' | 'down') {
    const sorted = [...projects].sort((a, b) => a.order - b.order)
    const idx = sorted.findIndex(p => p.slug === slug)
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= sorted.length) return

    const current = sorted[idx]
    const swap = sorted[swapIdx]
    const newCurrentOrder = swap.order
    const newSwapOrder = current.order

    setSaving(slug)
    setMessage('')

    try {
      await Promise.all([
        fetch(`/api/admin/projects/${current.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...current, order: newCurrentOrder }),
        }),
        fetch(`/api/admin/projects/${swap.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...swap, order: newSwapOrder }),
        }),
      ])
      setProjects(prev =>
        prev.map(p => {
          if (p.slug === current.slug) return { ...p, order: newCurrentOrder }
          if (p.slug === swap.slug) return { ...p, order: newSwapOrder }
          return p
        })
      )
      setMessage('Order updated.')
    } finally {
      setSaving(null)
    }
  }

  async function deleteProject(slug: string) {
    if (!confirm('Delete this project? This cannot be undone.')) return
    setSaving(slug)
    try {
      const res = await fetch(`/api/admin/projects/${slug}`, { method: 'DELETE' })
      if (res.ok) {
        setProjects(prev => prev.filter(p => p.slug !== slug))
        setMessage('Deleted.')
      } else {
        setMessage('Delete failed.')
      }
    } finally {
      setSaving(null)
    }
  }

  const sorted = [...projects].sort((a, b) => a.order - b.order)

  return (
    <div className="admin-projects-list">
      {message && <p className="admin-toast">{message}</p>}
      {sorted.map((project, i) => (
        <div key={project.slug} className="admin-project-row">
          <div className="admin-project-order-controls">
            <button
              className="admin-order-btn"
              onClick={() => moveProject(project.slug, 'up')}
              disabled={i === 0 || saving === project.slug}
              aria-label="Move up"
            >
              ↑
            </button>
            <span className="admin-order-num">{project.order}</span>
            <button
              className="admin-order-btn"
              onClick={() => moveProject(project.slug, 'down')}
              disabled={i === sorted.length - 1 || saving === project.slug}
              aria-label="Move down"
            >
              ↓
            </button>
          </div>

          <div className="admin-project-info">
            <p className="admin-project-title">{project.card.title}</p>
            <p className="admin-project-meta">
              {project.card.brand} · /{project.slug}
            </p>
          </div>

          <div className="admin-project-actions">
            <label className="admin-toggle" title={project.visible ? 'Visible' : 'Hidden'}>
              <input
                type="checkbox"
                checked={project.visible}
                onChange={e => patchProject(project.slug, { visible: e.target.checked })}
                disabled={saving === project.slug}
              />
              <span className="admin-toggle-track" />
              <span className="admin-toggle-label">
                {project.visible ? 'Visible' : 'Hidden'}
              </span>
            </label>

            <Link
              href={`/admin/projects/${project.slug}`}
              className="admin-btn-secondary"
            >
              Edit
            </Link>

            <a
              href={`/work/${project.slug}`}
              target="_blank"
              rel="noopener"
              className="admin-btn-ghost"
            >
              View ↗
            </a>

            <button
              className="admin-btn-danger"
              onClick={() => deleteProject(project.slug)}
              disabled={saving === project.slug}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
