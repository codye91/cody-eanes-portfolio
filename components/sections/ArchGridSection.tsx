import type { ArchGridSection } from '@/lib/content'
import FadeUp from '@/components/FadeUp'
import { bgClass, SectionEyebrow, SectionHeadline, SectionBody } from './shared'

export default function ArchGridSection({ s }: { s: ArchGridSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        <SectionEyebrow text={s.eyebrow} />
        <SectionHeadline text={s.heading} />
        <SectionBody text={s.body} />
        <div className="arch-grid">
          {s.items.map((item, i) => (
            <FadeUp key={i}>
              <div className="arch-item">
                <span className="arch-number">{item.number}</span>
                <h3 className="arch-title">{item.title}</h3>
                <p className="arch-body">{item.body}</p>
                <p className="arch-impact">
                  <strong>Impact:</strong> {item.impact}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
