'use client'

import { useState } from 'react'
import type { SiteContent } from '@/lib/content'

type FooterData = {
  eyebrow: string
  heading: string
  description: string
  ctaLabel: string
  copyright: string
  secondaryLink: { label: string; href: string }
}

type FooterCaseStudyData = {
  eyebrow: string
  heading: string
  description: string
  ctaLabel: string
}

export default function ContentForm({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState(initialContent)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function setHero<K extends keyof SiteContent['hero']>(key: K, value: SiteContent['hero'][K]) {
    setContent(prev => ({ ...prev, hero: { ...prev.hero, [key]: value } }))
  }

  function setWorkSection<K extends keyof SiteContent['workSection']>(key: K, value: string) {
    setContent(prev => ({ ...prev, workSection: { ...prev.workSection, [key]: value } }))
  }

  function setTestimonial(idx: number, value: string) {
    setContent(prev => {
      const testimonials = [...prev.ticker.testimonials]
      testimonials[idx] = value
      return { ...prev, ticker: { testimonials } }
    })
  }

  function setFooter<K extends keyof FooterData>(key: K, value: FooterData[K]) {
    setContent(prev => ({ ...prev, footer: { ...(prev.footer as FooterData), [key]: value } }))
  }

  function setFooterCaseStudy<K extends keyof FooterCaseStudyData>(key: K, value: string) {
    setContent(prev => ({
      ...prev,
      footerCaseStudy: { ...(prev.footerCaseStudy as FooterCaseStudyData), [key]: value },
    }))
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const latest = await fetch('/api/admin/content').then(r => r.json())
      const updated = {
        ...latest,
        hero: content.hero,
        ticker: content.ticker,
        workSection: content.workSection,
        footer: content.footer,
        footerCaseStudy: content.footerCaseStudy,
      }
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
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

  const footer = content.footer as FooterData
  const footerCS = content.footerCaseStudy as FooterCaseStudyData

  return (
    <div className="admin-form">
      {error && <p className="admin-form-error">{error}</p>}
      {success && <p className="admin-form-success">{success}</p>}

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Hero</h2>
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
              onChange={e => setHero('primaryCta', { ...content.hero.primaryCta, label: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Primary CTA href</label>
            <input
              className="admin-input"
              value={content.hero.primaryCta.href}
              onChange={e => setHero('primaryCta', { ...content.hero.primaryCta, href: e.target.value })}
            />
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-label">Secondary CTA Label</label>
            <input
              className="admin-input"
              value={content.hero.secondaryCta.label}
              onChange={e => setHero('secondaryCta', { ...content.hero.secondaryCta, label: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Secondary CTA href</label>
            <input
              className="admin-input"
              value={content.hero.secondaryCta.href}
              onChange={e => setHero('secondaryCta', { ...content.hero.secondaryCta, href: e.target.value })}
            />
          </div>
        </div>
      </section>

      {/* ── Ticker ────────────────────────────────────── */}
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

      {/* ── Work Section ──────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Work Section</h2>
        <div className="admin-field">
          <label className="admin-label">Eyebrow</label>
          <input
            className="admin-input"
            value={content.workSection.eyebrow}
            onChange={e => setWorkSection('eyebrow', e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Heading</label>
          <input
            className="admin-input"
            value={content.workSection.heading}
            onChange={e => setWorkSection('heading', e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Description</label>
          <p className="admin-field-hint">Supports inline HTML for links.</p>
          <textarea
            className="admin-textarea"
            rows={3}
            value={content.workSection.description}
            onChange={e => setWorkSection('description', e.target.value)}
          />
        </div>
      </section>

      {/* ── Footer (homepage) ─────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Footer — Homepage</h2>
        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-label">Eyebrow</label>
            <input
              className="admin-input"
              value={footer.eyebrow ?? ''}
              onChange={e => setFooter('eyebrow', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Heading</label>
            <input
              className="admin-input"
              value={footer.heading ?? ''}
              onChange={e => setFooter('heading', e.target.value)}
            />
          </div>
        </div>
        <div className="admin-field">
          <label className="admin-label">Description</label>
          <textarea
            className="admin-textarea"
            rows={3}
            value={footer.description ?? ''}
            onChange={e => setFooter('description', e.target.value)}
          />
        </div>
        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-label">CTA Label</label>
            <input
              className="admin-input"
              value={footer.ctaLabel ?? ''}
              onChange={e => setFooter('ctaLabel', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Copyright</label>
            <input
              className="admin-input"
              value={footer.copyright ?? ''}
              onChange={e => setFooter('copyright', e.target.value)}
            />
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-label">Secondary Link Label</label>
            <input
              className="admin-input"
              value={footer.secondaryLink?.label ?? ''}
              onChange={e =>
                setFooter('secondaryLink', { ...footer.secondaryLink, label: e.target.value })
              }
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Secondary Link href</label>
            <input
              className="admin-input"
              value={footer.secondaryLink?.href ?? ''}
              onChange={e =>
                setFooter('secondaryLink', { ...footer.secondaryLink, href: e.target.value })
              }
            />
          </div>
        </div>
      </section>

      {/* ── Footer (case study) ───────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Footer — Case Study</h2>
        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-label">Eyebrow</label>
            <input
              className="admin-input"
              value={footerCS.eyebrow ?? ''}
              onChange={e => setFooterCaseStudy('eyebrow', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Heading</label>
            <input
              className="admin-input"
              value={footerCS.heading ?? ''}
              onChange={e => setFooterCaseStudy('heading', e.target.value)}
            />
          </div>
        </div>
        <div className="admin-field">
          <label className="admin-label">Description</label>
          <textarea
            className="admin-textarea"
            rows={3}
            value={footerCS.description ?? ''}
            onChange={e => setFooterCaseStudy('description', e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">CTA Label</label>
          <input
            className="admin-input"
            value={footerCS.ctaLabel ?? ''}
            onChange={e => setFooterCaseStudy('ctaLabel', e.target.value)}
          />
        </div>
      </section>

      {/* ── Save ──────────────────────────────────────── */}
      <div className="admin-form-actions">
        <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}
