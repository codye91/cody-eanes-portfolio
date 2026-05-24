import type { ProblemCardsSection } from '@/lib/content'
import FadeUp from '@/components/FadeUp'
import { bgClass, SectionEyebrow, SectionHeadline } from './shared'

export default function ProblemCardsSection({ s }: { s: ProblemCardsSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        <SectionEyebrow text={s.eyebrow} />
        <SectionHeadline text={s.heading} />
        <div className="problem-cards">
          {s.cards.map((card, i) => (
            <FadeUp key={i}>
              <div className="problem-card">
                <span className="problem-card-label">{card.label}</span>
                <h3 className="problem-card-title">{card.title}</h3>
                <p className="problem-card-body">{card.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
