import type { PocketsGridSection } from '@/lib/content'
import FadeUp from '@/components/FadeUp'
import { bgClass, SectionEyebrow, SectionHeadline, SectionBody } from './shared'

export default function PocketsGridSection({ s }: { s: PocketsGridSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        <SectionEyebrow text={s.eyebrow} />
        <SectionHeadline text={s.heading} />
        <SectionBody text={s.body} />
        <div className="pockets-grid">
          {s.pockets.map((pocket, i) => (
            <FadeUp key={i}>
              <div className="pocket-item">
                <span className="pocket-number">{pocket.number}</span>
                <h3 className="pocket-title">{pocket.title}</h3>
                {pocket.problem && (
                  <p className="pocket-problem">
                    <strong>Problem:</strong> {pocket.problem}
                  </p>
                )}
                <p className="pocket-solution">
                  <strong>Solution:</strong> {pocket.solution}
                </p>
                <p className="pocket-impact">
                  <strong>Impact:</strong> {pocket.impact}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
