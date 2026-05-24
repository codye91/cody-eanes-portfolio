import type { ExecutionGridSection } from '@/lib/content'
import FadeUp from '@/components/FadeUp'
import { bgClass, SectionEyebrow, SectionHeadline } from './shared'

export default function ExecutionGridSection({ s }: { s: ExecutionGridSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        <SectionEyebrow text={s.eyebrow} />
        <SectionHeadline text={s.heading} />
        {s.bodyTexts?.map((p, i) => (
          <FadeUp key={i}>
            <p className="section-body">{p}</p>
          </FadeUp>
        ))}
        <div className="execution-grid">
          {s.columns.map((col, i) => (
            <FadeUp key={i}>
              <div className="execution-col">
                <h3 className="execution-col-title">{col.title}</h3>
                <ul className="execution-list">
                  {col.items.map((item, ii) => (
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
