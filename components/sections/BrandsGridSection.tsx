import type { BrandsGridSection, SwBrandsGridSection } from '@/lib/content'
import FadeUp from '@/components/FadeUp'
import { bgClass, SectionEyebrow, SectionHeadline, SectionBody } from './shared'

export default function BrandsGridSection({ s }: { s: BrandsGridSection | SwBrandsGridSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        <SectionEyebrow text={s.eyebrow} />
        <SectionHeadline text={s.heading} />
        <SectionBody text={s.body} />
        <div className={s.type === 'swBrandsGrid' ? 'sw-brands-grid' : 'brands-grid'}>
          {s.brands.map((brand, i) => (
            <FadeUp key={i}>
              <div className="brand-item">
                <span className="brand-number">{brand.number}</span>
                <h3 className="brand-name">{brand.name}</h3>
                <p className="brand-audience">{brand.audience}</p>
                <p className="brand-description">{brand.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
