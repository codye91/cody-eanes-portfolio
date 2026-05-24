import type { ContextCardsSection } from '@/lib/content'
import FadeUp from '@/components/FadeUp'
import { bgClass, SectionEyebrow, SectionHeadline, SectionBody } from './shared'

export default function ContextCardsSection({ s }: { s: ContextCardsSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        <SectionEyebrow text={s.eyebrow} />
        <SectionHeadline text={s.heading} />
        <SectionBody text={s.body} />
        <div className="context-cards">
          {s.cards.map((card, i) => (
            <FadeUp key={i}>
              <div className="context-card">
                <span className="context-card-label">{card.label}</span>
                <h3 className="context-card-title">{card.title}</h3>
                <p className="context-card-body">{card.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
