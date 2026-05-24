'use client'

import { useState } from 'react'
import type { SiteContent } from '@/lib/content'

export default function ContentFormResume({ initialContent }: { initialContent: SiteContent }) {
  const [resumeUrl, setResumeUrl] = useState(initialContent.contact.resumeUrl)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSave() {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const latest = await fetch('/api/admin/content').then(r => r.json())
      const updated = {
        ...latest,
        contact: { ...latest.contact, resumeUrl },
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

  return (
    <div className="admin-form">
      {error && <p className="admin-form-error">{error}</p>}
      {success && <p className="admin-form-success">{success}</p>}

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Resume Link</h2>
        <p className="admin-field-hint" style={{ marginBottom: '16px' }}>
          This URL is used in the nav bar Resume link and anywhere else the resume is referenced.
        </p>
        <div className="admin-field">
          <label className="admin-label">Google Drive URL</label>
          <input
            className="admin-input"
            type="url"
            value={resumeUrl}
            onChange={e => setResumeUrl(e.target.value)}
          />
        </div>
        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-field-hint"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '8px', color: 'var(--accent)' }}
          >
            Preview current link ↗
          </a>
        )}
      </section>

      <div className="admin-form-actions">
        <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}
