'use client'

import { useState } from 'react'
import type { SiteContent } from '@/lib/content'

export default function ContentFormMyProcess({ initialContent }: { initialContent: SiteContent }) {
  const [raw, setRaw] = useState(JSON.stringify(initialContent.myProcess, null, 2))
  const [jsonError, setJsonError] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleChange(value: string) {
    setRaw(value)
    try {
      JSON.parse(value)
      setJsonError('')
    } catch {
      setJsonError('Invalid JSON — fix before saving.')
    }
  }

  async function handleSave() {
    if (jsonError) return
    let parsed: Record<string, unknown>
    try {
      parsed = JSON.parse(raw)
    } catch {
      setJsonError('Invalid JSON — fix before saving.')
      return
    }

    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const latest = await fetch('/api/admin/content').then(r => r.json())
      const updated = { ...latest, myProcess: parsed }
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

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Phases &amp; Principles</h2>
        <p className="admin-field-hint" style={{ marginBottom: '16px' }}>
          Edit the JSON directly. The top-level keys are <code>phases</code> (array of 4 phases)
          and <code>principles</code> (array of 4 principles). Each phase has{' '}
          <code>number</code>, <code>eyebrow</code>, <code>title</code> (use \n for line breaks),{' '}
          <code>surface</code> (boolean), and <code>columns</code> (array of 2). Each column has{' '}
          <code>heading</code>, <code>items</code> (string array), <code>note</code>, and{' '}
          <code>noteBold</code>.
        </p>
        {jsonError && <p className="admin-form-error" style={{ marginBottom: '12px' }}>{jsonError}</p>}
        <textarea
          className="admin-textarea admin-json-editor"
          rows={40}
          value={raw}
          onChange={e => handleChange(e.target.value)}
          spellCheck={false}
        />
      </section>

      <div className="admin-form-actions">
        <button
          className="admin-btn-primary"
          onClick={handleSave}
          disabled={saving || !!jsonError}
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}
