'use client'

/**
 * components/SectionBuilder.tsx
 *
 * Visual section builder for the project admin editor.
 * Replaces the raw JSON textarea with a structured, pick-and-fill UI.
 *
 * Each section renders its editable fields automatically.
 * String arrays (paragraphs, bodyTexts, list) get per-line inputs with add/remove.
 * Object arrays (cards, stages, pockets, etc.) get per-item sub-editors.
 * The `background` field always renders as a <select>.
 */

import type { ProjectSection } from '@/lib/content'
import { getSectionOptions, SECTION_DEFAULTS } from '@/lib/sections'

// ─── Types ────────────────────────────────────────────────────────────────────

type SectionData = Record<string, unknown>

// ─── Utility ──────────────────────────────────────────────────────────────────

function uid() {
  return `s_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
}

// ─── Background selector ──────────────────────────────────────────────────────

function BackgroundSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="admin-field">
      <label className="admin-label">Background</label>
      <select
        className="admin-input"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="default">Default (dark)</option>
        <option value="surface">Surface (mid)</option>
        <option value="surface-alt">Surface Alt (light)</option>
      </select>
    </div>
  )
}

// ─── String array editor (paragraphs, bodyTexts, list, items[]) ───────────────

function StringArrayEditor({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string
  values: string[]
  onChange: (v: string[]) => void
  placeholder?: string
}) {
  return (
    <div className="admin-field">
      <label className="admin-label">{label}</label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {values.map((val, i) => (
          <div key={i} style={{ display: 'flex', gap: '6px' }}>
            <input
              className="admin-input"
              value={val}
              placeholder={placeholder}
              onChange={e => {
                const next = [...values]
                next[i] = e.target.value
                onChange(next)
              }}
            />
            <button
              className="admin-btn-danger-sm"
              onClick={() => onChange(values.filter((_, idx) => idx !== i))}
              title="Remove"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          className="admin-btn-ghost admin-btn-sm"
          onClick={() => onChange([...values, ''])}
        >
          + Add item
        </button>
      </div>
    </div>
  )
}

// ─── Object array editor (cards, stages, brands, etc.) ───────────────────────

function ObjectArrayEditor({
  label,
  items,
  onChange,
}: {
  label: string
  items: Record<string, string | null>[]
  onChange: (v: Record<string, string | null>[]) => void
}) {
  if (items.length === 0) return null

  const template = items[0]
  const keys = Object.keys(template)

  return (
    <div className="admin-field">
      <label className="admin-label">{label}</label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span className="admin-field-hint" style={{ fontWeight: 600 }}>Item {idx + 1}</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {idx > 0 && (
                  <button
                    className="admin-btn-secondary"
                    title="Move up"
                    onClick={() => {
                      const next = [...items]
                      ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
                      onChange(next)
                    }}
                  >↑</button>
                )}
                {idx < items.length - 1 && (
                  <button
                    className="admin-btn-secondary"
                    title="Move down"
                    onClick={() => {
                      const next = [...items]
                      ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
                      onChange(next)
                    }}
                  >↓</button>
                )}
                <button
                  className="admin-btn-danger-sm"
                  onClick={() => onChange(items.filter((_, i) => i !== idx))}
                >
                  Remove
                </button>
              </div>
            </div>
            {keys.map(key => {
              const val = item[key]
              // toolTags is a string array nested inside a detail object
              if (key === 'toolTags' && Array.isArray(val)) {
                return (
                  <StringArrayEditor
                    key={key}
                    label="Tool tags"
                    values={val as string[]}
                    placeholder="e.g. Figma"
                    onChange={next => {
                      const updated = [...items]
                      updated[idx] = { ...updated[idx], [key]: next as unknown as string }
                      onChange(updated)
                    }}
                  />
                )
              }
              // items[] nested inside findings
              if (key === 'items' && Array.isArray(val)) {
                return (
                  <StringArrayEditor
                    key={key}
                    label="Items"
                    values={val as string[]}
                    onChange={next => {
                      const updated = [...items]
                      updated[idx] = { ...updated[idx], [key]: next as unknown as string }
                      onChange(updated)
                    }}
                  />
                )
              }
              const isLong = key === 'body' || key === 'description' || key === 'solution' || key === 'impact' || key === 'note' || (typeof val === 'string' && val.length > 60)
              if (isLong) {
                return (
                  <div key={key} className="admin-field">
                    <label className="admin-label">{key}</label>
                    <textarea
                      className="admin-textarea"
                      rows={2}
                      value={(val as string) ?? ''}
                      onChange={e => {
                        const updated = [...items]
                        updated[idx] = { ...updated[idx], [key]: e.target.value }
                        onChange(updated)
                      }}
                    />
                  </div>
                )
              }
              return (
                <div key={key} className="admin-field">
                  <label className="admin-label">{key}</label>
                  <input
                    className="admin-input"
                    value={(val as string) ?? ''}
                    onChange={e => {
                      const updated = [...items]
                      updated[idx] = { ...updated[idx], [key]: e.target.value }
                      onChange(updated)
                    }}
                  />
                </div>
              )
            })}
          </div>
        ))}
        <button
          className="admin-btn-ghost admin-btn-sm"
          onClick={() => {
            const empty = Object.fromEntries(
              Object.entries(template).map(([k, v]) =>
                Array.isArray(v) ? [k, []] : [k, '']
              )
            ) as Record<string, string | null>
            onChange([...items, empty])
          }}
        >
          + Add item
        </button>
      </div>
    </div>
  )
}

// ─── Single section field editor ─────────────────────────────────────────────

function SectionFieldEditor({
  data,
  onChange,
}: {
  data: SectionData
  onChange: (updated: SectionData) => void
}) {
  function set(key: string, value: unknown) {
    onChange({ ...data, [key]: value })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {/* Background always first */}
      <BackgroundSelect
        value={(data.background as string) ?? 'default'}
        onChange={v => set('background', v)}
      />

      {Object.entries(data).map(([key, value]) => {
        if (key === 'type' || key === 'background') return null

        // String arrays (paragraphs, bodyTexts, list)
        if (Array.isArray(value) && (value.length === 0 || typeof value[0] === 'string')) {
          return (
            <StringArrayEditor
              key={key}
              label={key}
              values={value as string[]}
              onChange={v => set(key, v)}
            />
          )
        }

        // Object arrays (cards, stages, pockets, brands, audiences, items, findings, stats, details, columns)
        if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
          return (
            <ObjectArrayEditor
              key={key}
              label={key}
              items={value as Record<string, string | null>[]}
              onChange={v => set(key, v)}
            />
          )
        }

        // Long text fields
        const isLong = key === 'body' || key === 'pullquote' || (typeof value === 'string' && value.length > 80)
        if (typeof value === 'string' && isLong) {
          return (
            <div key={key} className="admin-field">
              <label className="admin-label">{key}</label>
              <textarea
                className="admin-textarea"
                rows={3}
                value={value}
                onChange={e => set(key, e.target.value)}
              />
              {(key === 'heading') && (
                <p className="admin-field-hint">Use \n for line breaks in headings.</p>
              )}
            </div>
          )
        }

        // Short text
        if (typeof value === 'string') {
          return (
            <div key={key} className="admin-field">
              <label className="admin-label">{key}</label>
              <input
                className="admin-input"
                value={value}
                onChange={e => set(key, e.target.value)}
              />
              {key === 'heading' && (
                <p className="admin-field-hint">Use \n for line breaks.</p>
              )}
            </div>
          )
        }

        return null
      })}
    </div>
  )
}

// ─── Main SectionBuilder ──────────────────────────────────────────────────────

export default function SectionBuilder({
  sections,
  onChange,
}: {
  sections: ProjectSection[]
  onChange: (updated: ProjectSection[]) => void
}) {
  const sectionOptions = getSectionOptions()
  const [expandedIdx, setExpandedIdx] = [
    // Simple local expand state baked in via closure — avoids lifting state
    ...(() => {
      // We use a module-level ref trick: just render all open
      // (admins typically work on one section at a time anyway)
      return [-1, (_: number) => {}]
    })(),
  ]

  function addSection(type: string) {
    const defaults = SECTION_DEFAULTS[type] ?? {}
    const newSection = { type, ...defaults } as ProjectSection
    onChange([...sections, newSection])
  }

  function updateSection(idx: number, updated: SectionData) {
    const next = [...sections]
    next[idx] = updated as ProjectSection
    onChange(next)
  }

  function removeSection(idx: number) {
    onChange(sections.filter((_, i) => i !== idx))
  }

  function moveSection(idx: number, direction: 'up' | 'down') {
    const next = [...sections]
    const target = direction === 'up' ? idx - 1 : idx + 1
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]]
    onChange(next)
  }

  return (
    <div>
      {sections.length === 0 && (
        <p className="admin-empty" style={{ marginBottom: '16px' }}>
          No sections yet. Add one below.
        </p>
      )}

      {sections.map((section, idx) => {
        const label = sectionOptions.find(o => o.type === section.type)?.label ?? section.type

        return (
          <details key={idx} style={{ marginBottom: '10px' }}>
            <summary
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                cursor: 'pointer',
                listStyle: 'none',
                background: 'var(--surface)',
                userSelect: 'none',
              }}
            >
              <span style={{ flex: 1, fontWeight: 600, fontSize: '13px' }}>{label}</span>
              <span
                className="admin-field-hint"
                style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}
              >
                {section.type}
              </span>
              <div style={{ display: 'flex', gap: '6px' }} onClick={e => e.preventDefault()}>
                <button
                  className="admin-btn-secondary"
                  onClick={() => moveSection(idx, 'up')}
                  disabled={idx === 0}
                  title="Move up"
                >↑</button>
                <button
                  className="admin-btn-secondary"
                  onClick={() => moveSection(idx, 'down')}
                  disabled={idx === sections.length - 1}
                  title="Move down"
                >↓</button>
                <button
                  className="admin-btn-danger-sm"
                  onClick={() => removeSection(idx)}
                >
                  Remove
                </button>
              </div>
            </summary>

            <div
              style={{
                border: '1px solid var(--border)',
                borderTop: 'none',
                borderRadius: '0 0 8px 8px',
                padding: '16px',
              }}
            >
              <SectionFieldEditor
                data={section as unknown as SectionData}
                onChange={updated => updateSection(idx, updated)}
              />
            </div>
          </details>
        )
      })}

      {/* Add section picker */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
        {sectionOptions.map(opt => (
          <button
            key={opt.type}
            className="admin-btn-ghost admin-btn-sm"
            onClick={() => addSection(opt.type)}
          >
            + {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
