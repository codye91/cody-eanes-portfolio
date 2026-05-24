import Image from 'next/image'
import type { ProjectOverviewSection } from '@/lib/content'
import FadeUp from '@/components/FadeUp'
import { bgClass, SectionEyebrow } from './shared'

export default function ProjectOverviewSection({ s }: { s: ProjectOverviewSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        <SectionEyebrow text={s.eyebrow} />
        <div className="overview-grid">
          <div className="overview-text">
            {s.paragraphs.map((p, i) => (
              <FadeUp key={i}>
                <p className="section-body" dangerouslySetInnerHTML={{ __html: p }} />
              </FadeUp>
            ))}
          </div>
          <FadeUp className="overview-image">
            <Image src={s.image} alt={s.imageAlt} width={720} height={480} loading="lazy" />
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
