'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Project } from '@/lib/content'

export default function ProjectForm({
  project: initial,
  isNew,
}: {
  project: Project
  isNew: boolean
}) {
  const router = useRouter()
  const [project, setProject] = useState<Project>(initial)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function set<K extends keyof Project>(key: K, value: Project[K]) {
    setProject(prev => ({ ...prev, [key]: value }))
  }

  function setCard<K extends keyof Project['card']>(key: K, value: Project['card'][K]) {
    setProject(prev => ({ ...prev, card: { ...prev.card, [key]: value } }))
  }

  function setHero<K extends keyof Project['hero']>(key: K, value: Project['hero'][K]) {
    setProject(prev => ({ ...prev, hero: { ...prev.hero, [key]: value } }))
  }

  function setMeta(idx: number, field: 'label' | 'value', value: string) {
    setProject(prev => {
      const meta = [...prev.hero.meta]
      meta[idx] = { ...meta[idx], [field]: value }
      return { ...prev, hero: { ...prev.hero, meta } }
    })
  }

  function setMetric(idx: number, field: 'value' | 'label', value: string) {
    setProject(prev => {
      const metrics = [...prev.card.metrics]
      metrics[idx] = { ...metrics[idx], [field]: value }
      return { ...prev, card: { ...prev.card, metrics } }
    })
  }

  function addMetric() {
    setProject(prev => ({
      ...prev,
      card: { ...prev.card, metrics: [...prev.card.metrics, { value: '', label: '' }] },
    }))
  }

  function removeMetric(idx: number) {
    setProject(prev => ({
      ...prev,
      card: { ...prev.card, metrics: prev.card.metrics.filter((_, i) => i !== idx) },
    }))
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    setSuccess('')

    const url = isNew
      ? '/api/admin/projects'
      : `/api/admin/projects/${initial.slug}`
    const method = isNew ? 'POST' : 'PUT'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      })

      if (res.ok) {
        setSuccess('Saved successfully.')
        if (isNew) {
          router.push(`/admin/projects/${project.slug}`)
        }
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? 'Save failed.')
      }
    } catch {
      setError('Network error.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="admin-form">
      {/* Status messages */}
      {error && <p className="admin-form-error">{error}</p>}
      {success && <p className="admin-form-success">{success}</p>}

      {/* ── Identity ─────────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Identity</h2>
        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-label">Slug</label>
            <input
              className="admin-input"
              value={project.slug}
              onChange={e => set('slug', e.target.value)}
              placeholder="e.g. wegovy"
              disabled={!isNew}
            />
            {!isNew && (
              <p className="admin-field-hint">Slug cannot be changed after creation.</p>
            )}
          </div>
          <div className="admin-field">
            <label className="admin-label">Order</label>
            <input
              className="admin-input"
              type="number"
              value={project.order}
              onChange={e => set('order', Number(e.target.value))}
            />
          </div>
        </div>
        <div className="admin-form-row">
          <label className="admin-checkbox-label">
            <input
              type="checkbox"
              checked={project.visible}
              onChange={e => set('visible', e.target.checked)}
            />
            Visible on site
          </label>
          <label className="admin-checkbox-label">
            <input
              type="checkbox"
              checked={project.reversed}
              onChange={e => set('reversed', e.target.checked)}
            />
            Reversed card layout
          </label>
        </div>
      </section>

      {/* ── Card ─────────────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Home Card</h2>
        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-label">Brand</label>
            <input
              className="admin-input"
              value={project.card.brand}
              onChange={e => setCard('brand', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Role</label>
            <input
              className="admin-input"
              value={project.card.role}
              onChange={e => setCard('role', e.target.value)}
            />
          </div>
        </div>
        <div className="admin-field">
          <label className="admin-label">Card Title</label>
          <input
            className="admin-input"
            value={project.card.title}
            onChange={e => setCard('title', e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Card Description</label>
          <textarea
            className="admin-textarea"
            rows={3}
            value={project.card.description}
            onChange={e => setCard('description', e.target.value)}
          />
        </div>
        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-label">Card Image path</label>
            <input
              className="admin-input"
              value={project.card.image}
              onChange={e => setCard('image', e.target.value)}
              placeholder="/images/home/slug-card.png"
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Card Image Alt</label>
            <input
              className="admin-input"
              value={project.card.imageAlt}
              onChange={e => setCard('imageAlt', e.target.value)}
            />
          </div>
        </div>

        {/* Metrics */}
        <div className="admin-field">
          <label className="admin-label">Card Metrics</label>
          {project.card.metrics.map((m, i) => (
            <div key={i} className="admin-metric-row">
              <input
                className="admin-input"
                placeholder="Value (e.g. 45)"
                value={m.value}
                onChange={e => setMetric(i, 'value', e.target.value)}
              />
              <input
                className="admin-input"
                placeholder="Label (e.g. Unique quiz\noutcomes)"
                value={m.label}
                onChange={e => setMetric(i, 'label', e.target.value)}
              />
              <button
                className="admin-btn-danger admin-btn-sm"
                onClick={() => removeMetric(i)}
              >
                ✕
              </button>
            </div>
          ))}
          <button className="admin-btn-ghost admin-btn-sm" onClick={addMetric}>
            + Add metric
          </button>
        </div>
      </section>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Case Study Hero</h2>
        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-label">Hero Title</label>
            <input
              className="admin-input"
              value={project.hero.title}
              onChange={e => setHero('title', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Hero Subtitle</label>
            <input
              className="admin-input"
              value={project.hero.subtitle}
              onChange={e => setHero('subtitle', e.target.value)}
            />
          </div>
        </div>
        <div className="admin-field">
          <label className="admin-label">Meta fields</label>
          {project.hero.meta.map((m, i) => (
            <div key={i} className="admin-metric-row">
              <input
                className="admin-input"
                placeholder="Label"
                value={m.label}
                onChange={e => setMeta(i, 'label', e.target.value)}
              />
              <input
                className="admin-input"
                placeholder="Value"
                value={m.value}
                onChange={e => setMeta(i, 'value', e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Sections (raw JSON) ───────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Sections (JSON)</h2>
        <p className="admin-field-hint">
          Advanced: edit the typed section array directly. Validate JSON before saving.
        </p>
        <textarea
          className="admin-textarea admin-json-editor"
          rows={20}
          value={JSON.stringify(project.sections, null, 2)}
          onChange={e => {
            try {
              const parsed = JSON.parse(e.target.value)
              set('sections', parsed)
              setError('')
            } catch {
              setError('Invalid JSON in sections editor.')
            }
          }}
          spellCheck={false}
        />
      </section>

      {/* ── Reflection ───────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Reflection</h2>
        <div className="admin-field">
          <label className="admin-label">Quote</label>
          <textarea
            className="admin-textarea"
            rows={3}
            value={project.reflection.quote}
            onChange={e =>
              set('reflection', { ...project.reflection, quote: e.target.value })
            }
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Follow-up paragraph (optional)</label>
          <textarea
            className="admin-textarea"
            rows={2}
            value={project.reflection.followUp ?? ''}
            onChange={e =>
              set('reflection', {
                ...project.reflection,
                followUp: e.target.value || null,
              })
            }
          />
        </div>
      </section>

      {/* ── Next Project ──────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Next Project</h2>
        <label className="admin-checkbox-label" style={{ marginBottom: '0.75rem' }}>
          <input
            type="checkbox"
            checked={project.nextProject !== null}
            onChange={e =>
              set(
                'nextProject',
                e.target.checked
                  ? { slug: '', title: '', blurb: null }
                  : null
              )
            }
          />
          Show a &ldquo;Next project&rdquo; link
        </label>
        {project.nextProject && (
          <div className="admin-form-row">
            <div className="admin-field">
              <label className="admin-label">Slug</label>
              <input
                className="admin-input"
                value={project.nextProject.slug}
                onChange={e =>
                  set('nextProject', { ...project.nextProject!, slug: e.target.value })
                }
              />
            </div>
            <div className="admin-field">
              <label className="admin-label">Title</label>
              <input
                className="admin-input"
                value={project.nextProject.title}
                onChange={e =>
                  set('nextProject', { ...project.nextProject!, title: e.target.value })
                }
              />
            </div>
            <div className="admin-field">
              <label className="admin-label">Blurb (optional)</label>
              <input
                className="admin-input"
                value={project.nextProject.blurb ?? ''}
                onChange={e =>
                  set('nextProject', {
                    ...project.nextProject!,
                    blurb: e.target.value || null,
                  })
                }
              />
            </div>
          </div>
        )}
      </section>

      {/* ── Save ─────────────────────────────────────── */}
      <div className="admin-form-actions">
        <button
          className="admin-btn-primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving…' : isNew ? 'Create project' : 'Save changes'}
        </button>
        <button
          className="admin-btn-secondary"
          onClick={() => router.push('/admin/projects')}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
