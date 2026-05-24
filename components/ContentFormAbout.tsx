'use client'

import { useState } from 'react'
import type { SiteContent } from '@/lib/content'

type Fact = { value: string; label: string }
type AiProof = { stat: string; title: string; description: string }

type AboutData = {
  eyebrow: string
  heroHeadline: string
  heroSubtext: string
  headshotImage: string
  bio: string
  facts: Fact[]
  humanStuff: { body: string; pullQuote: string; pullQuoteAttr: string }
  setsApart: { heading: string; paragraphs: string[] }
  howIWork: { heading: string; paragraphs: string[]; aiProof: AiProof[] }
}

export default function ContentFormAbout({ initialContent }: { initialContent: SiteContent }) {
  const [about, setAboutState] = useState<AboutData>(initialContent.about as AboutData)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function set<K extends keyof AboutData>(key: K, value: AboutData[K]) {
    setAboutState(prev => ({ ...prev, [key]: value }))
  }

  function setFact(idx: number, field: keyof Fact, value: string) {
    setAboutState(prev => {
      const facts = prev.facts.map((f, i) => (i === idx ? { ...f, [field]: value } : f))
      return { ...prev, facts }
    })
  }

  function setHumanStuff(field: keyof AboutData['humanStuff'], value: string) {
    setAboutState(prev => ({ ...prev, humanStuff: { ...prev.humanStuff, [field]: value } }))
  }

  function setSetsApartParagraph(idx: number, value: string) {
    setAboutState(prev => {
      const paragraphs = prev.setsApart.paragraphs.map((p, i) => (i === idx ? value : p))
      return { ...prev, setsApart: { ...prev.setsApart, paragraphs } }
    })
  }

  function setHowIWorkParagraph(idx: number, value: string) {
    setAboutState(prev => {
      const paragraphs = prev.howIWork.paragraphs.map((p, i) => (i === idx ? value : p))
      return { ...prev, howIWork: { ...prev.howIWork, paragraphs } }
    })
  }

  function setAiProof(idx: number, field: keyof AiProof, value: string) {
    setAboutState(prev => {
      const aiProof = prev.howIWork.aiProof.map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      )
      return { ...prev, howIWork: { ...prev.howIWork, aiProof } }
    })
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const latest = await fetch('/api/admin/content').then(r => r.json())
      const updated = { ...latest, about }
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

  return (
    <div className="admin-form">
      {error && <p className="admin-form-error">{error}</p>}
      {success && <p className="admin-form-success">{success}</p>}

      {/* ── Page Hero ─────────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Page Hero</h2>
        <div className="admin-field">
          <label className="admin-label">Eyebrow</label>
          <input
            className="admin-input"
            value={about.eyebrow}
            onChange={e => set('eyebrow', e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Headline</label>
          <p className="admin-field-hint">Use \n for a line break.</p>
          <textarea
            className="admin-textarea"
            rows={3}
            value={about.heroHeadline}
            onChange={e => set('heroHeadline', e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Subtext</label>
          <textarea
            className="admin-textarea"
            rows={2}
            value={about.heroSubtext}
            onChange={e => set('heroSubtext', e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Headshot Image Path</label>
          <input
            className="admin-input"
            value={about.headshotImage}
            onChange={e => set('headshotImage', e.target.value)}
          />
        </div>
      </section>

      {/* ── Background ────────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Background / Bio</h2>
        <div className="admin-field">
          <textarea
            className="admin-textarea"
            rows={5}
            value={about.bio}
            onChange={e => set('bio', e.target.value)}
          />
        </div>
      </section>

      {/* ── Facts ─────────────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Fact Strip</h2>
        <div className="admin-form-row" style={{ flexWrap: 'wrap', gap: '12px' }}>
          {about.facts.map((fact, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', flex: '1 1 200px' }}>
              <div className="admin-field" style={{ flex: '0 0 80px' }}>
                <label className="admin-label">Value</label>
                <input
                  className="admin-input"
                  value={fact.value}
                  onChange={e => setFact(i, 'value', e.target.value)}
                />
              </div>
              <div className="admin-field" style={{ flex: 1 }}>
                <label className="admin-label">Label</label>
                <input
                  className="admin-input"
                  value={fact.label}
                  onChange={e => setFact(i, 'label', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Human Stuff ───────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">The Human Stuff</h2>
        <div className="admin-field">
          <label className="admin-label">Body</label>
          <textarea
            className="admin-textarea"
            rows={4}
            value={about.humanStuff.body}
            onChange={e => setHumanStuff('body', e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Pull Quote</label>
          <textarea
            className="admin-textarea"
            rows={3}
            value={about.humanStuff.pullQuote}
            onChange={e => setHumanStuff('pullQuote', e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Pull Quote Attribution</label>
          <input
            className="admin-input"
            value={about.humanStuff.pullQuoteAttr}
            onChange={e => setHumanStuff('pullQuoteAttr', e.target.value)}
          />
        </div>
      </section>

      {/* ── What Sets Me Apart ────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">What Sets Me Apart</h2>
        <div className="admin-field">
          <label className="admin-label">Heading</label>
          <p className="admin-field-hint">Use \n for a line break.</p>
          <textarea
            className="admin-textarea"
            rows={2}
            value={about.setsApart.heading}
            onChange={e => set('setsApart', { ...about.setsApart, heading: e.target.value })}
          />
        </div>
        {about.setsApart.paragraphs.map((p, i) => (
          <div key={i} className="admin-field">
            <label className="admin-label">Paragraph {i + 1}</label>
            <textarea
              className="admin-textarea"
              rows={4}
              value={p}
              onChange={e => setSetsApartParagraph(i, e.target.value)}
            />
          </div>
        ))}
      </section>

      {/* ── How I Work ────────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">How I Work</h2>
        <div className="admin-field">
          <label className="admin-label">Heading</label>
          <p className="admin-field-hint">Use \n for a line break.</p>
          <textarea
            className="admin-textarea"
            rows={2}
            value={about.howIWork.heading}
            onChange={e => setAboutState(prev => ({
              ...prev,
              howIWork: { ...prev.howIWork, heading: e.target.value },
            }))}
          />
        </div>
        {about.howIWork.paragraphs.map((p, i) => (
          <div key={i} className="admin-field">
            <label className="admin-label">Paragraph {i + 1}</label>
            <textarea
              className="admin-textarea"
              rows={3}
              value={p}
              onChange={e => setHowIWorkParagraph(i, e.target.value)}
            />
          </div>
        ))}
      </section>

      {/* ── AI Proof ──────────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">How I Work — AI Proof Cards</h2>
        {about.howIWork.aiProof.map((item, i) => (
          <div key={i} className="admin-form-section" style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', marginBottom: '12px' }}>
            <p className="admin-form-section-title" style={{ marginBottom: '12px' }}>Card {i + 1}</p>
            <div className="admin-form-row">
              <div className="admin-field" style={{ flex: '0 0 80px' }}>
                <label className="admin-label">Stat</label>
                <input
                  className="admin-input"
                  value={item.stat}
                  onChange={e => setAiProof(i, 'stat', e.target.value)}
                />
              </div>
              <div className="admin-field">
                <label className="admin-label">Title</label>
                <input
                  className="admin-input"
                  value={item.title}
                  onChange={e => setAiProof(i, 'title', e.target.value)}
                />
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-label">Description</label>
              <textarea
                className="admin-textarea"
                rows={3}
                value={item.description}
                onChange={e => setAiProof(i, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
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
