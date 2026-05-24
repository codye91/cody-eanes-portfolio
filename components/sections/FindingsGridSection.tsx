import type { FindingsGridSection } from '@/lib/content'
import FadeUp from '@/components/FadeUp'
import { bgClass, SectionEyebrow, SectionHeadline, SectionBody } from './shared'

export default function FindingsGridSection({ s }: { s: FindingsGridSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        <SectionEyebrow text={s.eyebrow} />
        <SectionHeadline text={s.heading} />
        <SectionBody text={s.body} />
        <div className="findings-grid">
          {s.findings.map((finding, i) => (
            <FadeUp key={i}>
              <div className="finding-item">
                <h3 className="finding-title">{finding.title}</h3>
                <ul className="finding-list">
                  {finding.items.map((item, ii) => (
                    <li key={ii}>{item}</li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
