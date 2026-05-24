import type { AudienceGridSection } from '@/lib/content'
import FadeUp from '@/components/FadeUp'
import { bgClass, SectionEyebrow, SectionHeadline, InlineLines } from './shared'

export default function AudienceGridSection({ s }: { s: AudienceGridSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        <SectionEyebrow text={s.eyebrow} />
        <SectionHeadline text={s.heading} />
        <div className="audience-layout">
          <FadeUp>
            <div className="audience-big-number">
              <span className="big-stat-num">{s.bigNumber}</span>
              <div>
                <p className="big-stat-strong"><InlineLines text={s.bigNumberStrong} /></p>
                <p className="big-stat-sub">{s.bigNumberSub}</p>
              </div>
            </div>
          </FadeUp>
          {s.body && (
            <FadeUp>
              <p className="section-body">{s.body}</p>
            </FadeUp>
          )}
          <div className="audience-grid">
            {s.audiences.map((aud, i) => (
              <FadeUp key={i}>
                <div className="audience-item">
                  <span className="audience-number">{aud.number}</span>
                  <h3 className="audience-title">{aud.title}</h3>
                  <p className="audience-note">{aud.note}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          {s.pullquote && (
            <FadeUp>
              <blockquote className="case-pullquote">{s.pullquote}</blockquote>
            </FadeUp>
          )}
          {s.details.map((d, i) => (
            <FadeUp key={i}>
              <div className="stat-detail">
                <h4 className="stat-detail-heading">{d.heading}</h4>
                <p className="stat-detail-body">{d.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
