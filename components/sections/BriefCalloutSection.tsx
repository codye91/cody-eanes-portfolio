import type { BriefCalloutSection } from '@/lib/content'
import FadeUp from '@/components/FadeUp'
import { bgClass, SectionEyebrow, SectionHeadline } from './shared'

export default function BriefCalloutSection({ s }: { s: BriefCalloutSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        <SectionEyebrow text={s.eyebrow} />
        <SectionHeadline text={s.heading} />
        <FadeUp>
          <blockquote className="brief-callout">{s.quote}</blockquote>
        </FadeUp>
        <FadeUp>
          <p className="brief-source">{s.source}</p>
        </FadeUp>
        {s.bodyTexts.map((p, i) => (
          <FadeUp key={i}>
            <p className="section-body">{p}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
