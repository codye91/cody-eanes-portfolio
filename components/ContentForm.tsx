'use client'

import { useState } from 'react'
import type { SiteContent } from '@/lib/content'

export default function ContentForm({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState(initialContent)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function setHero<K extends keyof SiteContent['hero']>(
    key: K,
    value: SiteContent['hero'][K]
  ) {
    setContent(prev => ({ ...prev, hero: { ...prev.hero, [key]: value } }))
  }

  function setContact<K extends keyof SiteContent['contact']>(
    key: K,
    value: string
  ) {
    setContent(prev => ({ ...prev, contact: { ...prev.contact, [key]: value } }))
  }

  function setTestimonial(idx: number, value: string) {
    setContent(prev => {
      const testimonials = [...prev.ticker.testimonials]
      testimonials[idx] = value
      return { ...prev, ticker: { testimonials } }
    })
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      if (res.ok) {
        setSuccess('Saved successfully.')
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
      {error && <p className="admin-form-error">{error}</p>}
      {success && <p className="admin-form-success">{success}</p>}

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Homepage Hero</h2>
        <div className="admin-field">
          <label className="admin-label">Eyebrow</label>
          <input
            className="admin-input"
            value={content.hero.eyebrow}
            onChange={e => setHero('eyebrow', e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Headline</label>
          <textarea
            className="admin-textarea"
            rows={3}
            value={content.hero.headline}
            onChange={e => setHero('headline', e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Subtext</label>
          <textarea
            className="admin-textarea"
            rows={2}
            value={content.hero.subtext}
            onChange={e => setHero('subtext', e.target.value)}
          />
        </div>
        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-label">Primary CTA Label</label>
            <input
              className="admin-input"
              value={content.hero.primaryCta.label}
              onChange={e =>
                setHero('primaryCta', { ...content.hero.primaryCta, label: e.target.value })
              }
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Primary CTA href</label>
            <input
              className="admin-input"
              value={content.hero.primaryCta.href}
              onChange={e =>
                setHero('primaryCta', { ...content.hero.primaryCta, href: e.target.value })
              }
            />
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-label">Secondary CTA Label</label>
            <input
              className="admin-input"
              value={content.hero.secondaryCta.label}
              onChange={e =>
                setHero('secondaryCta', {
                  ...content.hero.secondaryCta,
                  label: e.target.value,
                })
              }
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Secondary CTA href</label>
            <input
              className="admin-input"
              value={content.hero.secondaryCta.href}
              onChange={e =>
                setHero('secondaryCta', {
                  ...content.hero.secondaryCta,
                  href: e.target.value,
                })
              }
            />
          </div>
        </div>
      </section>

      {/* ── Ticker ───────────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Ticker Testimonials</h2>
        {content.ticker.testimonials.map((t, i) => (
          <div key={i} className="admin-field">
            <label className="admin-label">Testimonial {i + 1}</label>
            <input
              className="admin-input"
              value={t}
              onChange={e => setTestimonial(i, e.target.value)}
            />
          </div>
        ))}
      </section>

      {/* ── About (raw JSON) ──────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">About Page Content (JSON)</h2>
        <p className="admin-field-hint">
          Edit all about page content including bio, facts, human stuff, and how I work sections.
        </p>
        <textarea
          className="admin-textarea admin-json-editor"
          rows={30}
          value={JSON.stringify(content.about, null, 2)}
          onChange={e => {
            try {
              const parsed = JSON.parse(e.target.value)
              setContent(prev => ({ ...prev, about: parsed }))
              setError('')
            } catch {
              setError('Invalid JSON in About editor.')
            }
          }}
          spellCheck={false}
        />
      </section>

      {/* ── Contact ──────────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Contact</h2>
        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-label">Email</label>
            <input
              className="admin-input"
              type="email"
              value={content.contact.email}
              onChange={e => setContact('email', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Resume URL</label>
            <input
              className="admin-input"
              type="url"
              value={content.contact.resumeUrl}
              onChange={e => setContact('resumeUrl', e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ── Save ─────────────────────────────────────── */}
      <div className="admin-form-actions">
        <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}
