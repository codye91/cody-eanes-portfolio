/**
 * components/sections/shared.tsx
 *
 * Shared primitives used by every section renderer.
 * Import these rather than repeating the patterns inline.
 */

import FadeUp from '@/components/FadeUp'

// ─── Background class helper ─────────────────────────────────────────────────

export function bgClass(bg: string) {
  if (bg === 'surface') return 'on-surface'
  if (bg === 'surface-alt') return 'on-surface-alt'
  return ''
}

// ─── Shared section header primitives ────────────────────────────────────────

export function SectionEyebrow({ text }: { text?: string | null }) {
  if (!text) return null
  return (
    <FadeUp>
      <p className="eyebrow section-eyebrow">{text}</p>
    </FadeUp>
  )
}

export function SectionHeadline({ text }: { text?: string | null }) {
  if (!text) return null
  const lines = text.split('\n')
  return (
    <FadeUp>
      <h2 className="section-headline">
        {lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </h2>
    </FadeUp>
  )
}

export function SectionBody({ text }: { text?: string | null }) {
  if (!text) return null
  return (
    <FadeUp>
      <p className="section-body">{text}</p>
    </FadeUp>
  )
}

/** Renders text with possible \n line-breaks inside a given element. */
export function InlineLines({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  )
}
