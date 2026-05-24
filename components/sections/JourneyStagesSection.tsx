import type { JourneyStagesSection } from '@/lib/content'
import FadeUp from '@/components/FadeUp'
import { bgClass, SectionEyebrow, SectionHeadline, SectionBody } from './shared'

export default function JourneyStagesSection({ s }: { s: JourneyStagesSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        <SectionEyebrow text={s.eyebrow} />
        <SectionHeadline text={s.heading} />
        <SectionBody text={s.body} />
        <div className="journey-stages">
          {s.stages.map((stage, i) => (
            <FadeUp key={i}>
              <div className="journey-stage">
                <span className="journey-number">{stage.number}</span>
                <h3 className="journey-title">{stage.title}</h3>
                <p className="journey-subtitle">{stage.subtitle}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
