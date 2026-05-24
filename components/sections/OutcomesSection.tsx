import type { OutcomesSection } from '@/lib/content'
import FadeUp from '@/components/FadeUp'
import { bgClass, SectionEyebrow, SectionHeadline } from './shared'

export default function OutcomesSection({ s }: { s: OutcomesSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        <SectionEyebrow text={s.eyebrow} />
        <SectionHeadline text={s.heading} />
        {s.stats.length > 0 && (
          <div className="outcomes-stats">
            {s.stats.map((stat, i) => (
              <FadeUp key={i}>
                <div className="outcome-stat">
                  <span className="outcome-stat-value">{stat.value}</span>
                  <span className="outcome-stat-label">{stat.label}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        )}
        {s.list.length > 0 && (
          <FadeUp>
            <ul className="outcomes-list">
              {s.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </FadeUp>
        )}
      </div>
    </section>
  )
}
