import type { BigStatSection } from '@/lib/content'
import FadeUp from '@/components/FadeUp'
import { bgClass, SectionEyebrow, SectionHeadline, InlineLines } from './shared'

export default function BigStatSection({ s }: { s: BigStatSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        <SectionEyebrow text={s.eyebrow} />
        <SectionHeadline text={s.heading} />
        <FadeUp>
          <div className="big-stat-number-block">
            <span className="big-stat-num">{s.number}</span>
            <div>
              <p className="big-stat-strong"><InlineLines text={s.numberStrong} /></p>
              <p className="big-stat-sub">{s.numberSub}</p>
            </div>
          </div>
        </FadeUp>
        {s.bodyTexts.map((p, i) => (
          <FadeUp key={i}>
            <p className="section-body">{p}</p>
          </FadeUp>
        ))}
        {s.pullquote && (
          <FadeUp>
            <blockquote className="case-pullquote">{s.pullquote}</blockquote>
          </FadeUp>
        )}
        {s.details.length > 0 && (
          <div className="stat-details-grid">
            {s.details.map((d, i) => (
              <FadeUp key={i}>
                <div className="stat-detail">
                  <h3 className="stat-detail-heading">{d.heading}</h3>
                  <p className="stat-detail-body">{d.body}</p>
                  {d.toolTags && d.toolTags.length > 0 && (
                    <div className="tool-tags">
                      {d.toolTags.map((tag, ti) => (
                        <span key={ti} className="tool-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
