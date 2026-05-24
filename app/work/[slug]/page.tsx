import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FadeUp from '@/components/FadeUp'
import {
  getAllProjects,
  getProjectBySlug,
  type ProjectSection,
  type ProjectOverviewSection,
  type ProblemCardsSection,
  type JourneyStagesSection,
  type BigStatSection,
  type ExecutionGridSection,
  type PocketsGridSection,
  type BrandsGridSection,
  type SwBrandsGridSection,
  type ContextCardsSection,
  type AudienceGridSection,
  type ArchGridSection,
  type BriefCalloutSection,
  type FindingsGridSection,
  type OutcomesSection,
} from '@/lib/content'

// ─── Static Params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map(p => ({ slug: p.slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.hero.title} — Case Study`,
    description: project.card.description,
    alternates: { canonical: `https://codyeanes.com/work/${slug}` },
  }
}

// ─── Section Backgrounds ──────────────────────────────────────────────────────

function bgClass(bg: string) {
  if (bg === 'surface') return 'on-surface'
  if (bg === 'surface-alt') return 'on-surface-alt'
  return ''
}

// ─── Section Renderers ────────────────────────────────────────────────────────

function ProjectOverview({ s }: { s: ProjectOverviewSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        {s.eyebrow && (
          <FadeUp>
            <p className="eyebrow section-eyebrow">{s.eyebrow}</p>
          </FadeUp>
        )}
        <div className="overview-grid">
          <div className="overview-text">
            {s.paragraphs.map((p, i) => (
              <FadeUp key={i}>
                <p
                  className="section-body"
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              </FadeUp>
            ))}
          </div>
          <FadeUp className="overview-image">
            <Image
              src={s.image}
              alt={s.imageAlt}
              width={720}
              height={480}
              loading="lazy"
            />
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function ProblemCards({ s }: { s: ProblemCardsSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        {s.eyebrow && (
          <FadeUp>
            <p className="eyebrow section-eyebrow">{s.eyebrow}</p>
          </FadeUp>
        )}
        {s.heading && (
          <FadeUp>
            <h2 className="section-headline">
              {s.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < s.heading!.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
          </FadeUp>
        )}
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

function JourneyStages({ s }: { s: JourneyStagesSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        {s.eyebrow && (
          <FadeUp>
            <p className="eyebrow section-eyebrow">{s.eyebrow}</p>
          </FadeUp>
        )}
        {s.heading && (
          <FadeUp>
            <h2 className="section-headline">
              {s.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < s.heading!.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
          </FadeUp>
        )}
        {s.body && (
          <FadeUp>
            <p className="section-body">{s.body}</p>
          </FadeUp>
        )}
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

function BigStat({ s }: { s: BigStatSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        {s.eyebrow && (
          <FadeUp>
            <p className="eyebrow section-eyebrow">{s.eyebrow}</p>
          </FadeUp>
        )}
        {s.heading && (
          <FadeUp>
            <h2 className="section-headline">
              {s.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < s.heading!.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
          </FadeUp>
        )}
        <div className="big-stat-grid">
          <FadeUp>
            <div className="big-stat-number-block">
              <span className="big-stat-num">{s.number}</span>
              <div>
                <p className="big-stat-strong">
                  {s.numberStrong.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < s.numberStrong.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <p className="big-stat-sub">{s.numberSub}</p>
              </div>
            </div>
          </FadeUp>
          <div className="big-stat-content">
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
      </div>
    </section>
  )
}

function ExecutionGrid({ s }: { s: ExecutionGridSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        {s.eyebrow && (
          <FadeUp>
            <p className="eyebrow section-eyebrow">{s.eyebrow}</p>
          </FadeUp>
        )}
        {s.heading && (
          <FadeUp>
            <h2 className="section-headline">
              {s.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < s.heading!.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
          </FadeUp>
        )}
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

function PocketsGrid({ s }: { s: PocketsGridSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        {s.eyebrow && (
          <FadeUp>
            <p className="eyebrow section-eyebrow">{s.eyebrow}</p>
          </FadeUp>
        )}
        {s.heading && (
          <FadeUp>
            <h2 className="section-headline">
              {s.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < s.heading!.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
          </FadeUp>
        )}
        {s.body && (
          <FadeUp>
            <p className="section-body">{s.body}</p>
          </FadeUp>
        )}
        <div className="pockets-grid">
          {s.pockets.map((pocket, i) => (
            <FadeUp key={i}>
              <div className="pocket-item">
                <span className="pocket-number">{pocket.number}</span>
                <h3 className="pocket-title">{pocket.title}</h3>
                {pocket.problem && (
                  <p className="pocket-problem">
                    <strong>Problem:</strong> {pocket.problem}
                  </p>
                )}
                <p className="pocket-solution">
                  <strong>Solution:</strong> {pocket.solution}
                </p>
                <p className="pocket-impact">
                  <strong>Impact:</strong> {pocket.impact}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function BrandsGrid({ s }: { s: BrandsGridSection | SwBrandsGridSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        {s.eyebrow && (
          <FadeUp>
            <p className="eyebrow section-eyebrow">{s.eyebrow}</p>
          </FadeUp>
        )}
        {s.heading && (
          <FadeUp>
            <h2 className="section-headline">
              {s.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < s.heading!.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
          </FadeUp>
        )}
        {s.body && (
          <FadeUp>
            <p className="section-body">{s.body}</p>
          </FadeUp>
        )}
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

function ContextCards({ s }: { s: ContextCardsSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        {s.eyebrow && (
          <FadeUp>
            <p className="eyebrow section-eyebrow">{s.eyebrow}</p>
          </FadeUp>
        )}
        {s.heading && (
          <FadeUp>
            <h2 className="section-headline">
              {s.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < s.heading!.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
          </FadeUp>
        )}
        {s.body && (
          <FadeUp>
            <p className="section-body">{s.body}</p>
          </FadeUp>
        )}
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

function AudienceGrid({ s }: { s: AudienceGridSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        {s.eyebrow && (
          <FadeUp>
            <p className="eyebrow section-eyebrow">{s.eyebrow}</p>
          </FadeUp>
        )}
        {s.heading && (
          <FadeUp>
            <h2 className="section-headline">
              {s.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < s.heading!.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
          </FadeUp>
        )}
        <div className="audience-layout">
          <FadeUp>
            <div className="audience-big-number">
              <span className="big-stat-num">{s.bigNumber}</span>
              <div>
                <p className="big-stat-strong">
                  {s.bigNumberStrong.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < s.bigNumberStrong.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
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

function ArchGrid({ s }: { s: ArchGridSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        {s.eyebrow && (
          <FadeUp>
            <p className="eyebrow section-eyebrow">{s.eyebrow}</p>
          </FadeUp>
        )}
        {s.heading && (
          <FadeUp>
            <h2 className="section-headline">
              {s.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < s.heading!.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
          </FadeUp>
        )}
        {s.body && (
          <FadeUp>
            <p className="section-body">{s.body}</p>
          </FadeUp>
        )}
        <div className="arch-grid">
          {s.items.map((item, i) => (
            <FadeUp key={i}>
              <div className="arch-item">
                <span className="arch-number">{item.number}</span>
                <h3 className="arch-title">{item.title}</h3>
                <p className="arch-body">{item.body}</p>
                <p className="arch-impact">
                  <strong>Impact:</strong> {item.impact}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function BriefCallout({ s }: { s: BriefCalloutSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        {s.eyebrow && (
          <FadeUp>
            <p className="eyebrow section-eyebrow">{s.eyebrow}</p>
          </FadeUp>
        )}
        {s.heading && (
          <FadeUp>
            <h2 className="section-headline">
              {s.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < s.heading!.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
          </FadeUp>
        )}
        <FadeUp>
          <blockquote className="brief-callout">{s.quote}</blockquote>
        </FadeUp>
        <FadeUp>
          <p className="brief-source">{s.source}</p>
        </FadeUp>
        {s.bodyTexts.map((p, i) => (
          <FadeUp key={i}>
            <p className="section-body">{p}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

function FindingsGrid({ s }: { s: FindingsGridSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        {s.eyebrow && (
          <FadeUp>
            <p className="eyebrow section-eyebrow">{s.eyebrow}</p>
          </FadeUp>
        )}
        {s.heading && (
          <FadeUp>
            <h2 className="section-headline">
              {s.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < s.heading!.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
          </FadeUp>
        )}
        {s.body && (
          <FadeUp>
            <p className="section-body">{s.body}</p>
          </FadeUp>
        )}
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

function Outcomes({ s }: { s: OutcomesSection }) {
  return (
    <section className={`case-section ${bgClass(s.background)}`.trim()}>
      <div className="container">
        {s.eyebrow && (
          <FadeUp>
            <p className="eyebrow section-eyebrow">{s.eyebrow}</p>
          </FadeUp>
        )}
        {s.heading && (
          <FadeUp>
            <h2 className="section-headline">
              {s.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < s.heading!.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
          </FadeUp>
        )}
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

// ─── Section Dispatcher ───────────────────────────────────────────────────────

function Section({ section }: { section: ProjectSection }) {
  switch (section.type) {
    case 'projectOverview':
      return <ProjectOverview s={section} />
    case 'problemCards':
      return <ProblemCards s={section} />
    case 'journeyStages':
      return <JourneyStages s={section} />
    case 'bigStat':
      return <BigStat s={section} />
    case 'executionGrid':
      return <ExecutionGrid s={section} />
    case 'pocketsGrid':
      return <PocketsGrid s={section} />
    case 'brandsGrid':
    case 'swBrandsGrid':
      return <BrandsGrid s={section} />
    case 'contextCards':
      return <ContextCards s={section} />
    case 'audienceGrid':
      return <AudienceGrid s={section} />
    case 'archGrid':
      return <ArchGrid s={section} />
    case 'briefCallout':
      return <BriefCallout s={section} />
    case 'findingsGrid':
      return <FindingsGrid s={section} />
    case 'outcomes':
      return <Outcomes s={section} />
    default:
      return null
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <>
      <Nav />

      {/* Case Study Hero */}
      <section className="case-hero">
        <div className="container">
          <FadeUp immediate delay={80}>
            <p className="eyebrow case-hero-eyebrow">{project.card.role}</p>
          </FadeUp>
          <FadeUp immediate delay={180}>
            <h1 className="case-hero-title">{project.hero.title}</h1>
          </FadeUp>
          <FadeUp immediate delay={280}>
            <p className="case-hero-subtitle">{project.hero.subtitle}</p>
          </FadeUp>
          <FadeUp immediate delay={380}>
            <div className="case-meta">
              {project.hero.meta.map((m, i) => (
                <div key={i} className="case-meta-item">
                  <span className="case-meta-label">{m.label}</span>
                  <span className="case-meta-value">{m.value}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Sections */}
      {project.sections.map((section, i) => (
        <Section key={i} section={section} />
      ))}

      {/* Reflection */}
      <section className="reflection-section">
        <div className="container">
          <FadeUp>
            <p className="eyebrow section-eyebrow">Reflection</p>
          </FadeUp>
          <FadeUp>
            <blockquote className="reflection-quote">{project.reflection.quote}</blockquote>
          </FadeUp>
          {project.reflection.followUp && (
            <FadeUp>
              <p className="section-body reflection-followup">{project.reflection.followUp}</p>
            </FadeUp>
          )}
        </div>
      </section>

      {/* Next Project */}
      {project.nextProject ? (
        <section className="next-project">
          <div className="container">
            <FadeUp>
              <p className="eyebrow">Next Case Study</p>
            </FadeUp>
            <FadeUp>
              <Link href={`/work/${project.nextProject.slug}`} className="next-project-link">
                <span className="next-project-title">{project.nextProject.title}</span>
                {project.nextProject.blurb && (
                  <span className="next-project-blurb">{project.nextProject.blurb}</span>
                )}
                <span className="next-arrow">→</span>
              </Link>
            </FadeUp>
          </div>
        </section>
      ) : (
        <section className="next-project back-to-work">
          <div className="container">
            <FadeUp>
              <p className="eyebrow">That&apos;s a wrap</p>
            </FadeUp>
            <FadeUp>
              <Link href="/#work" className="next-project-link">
                <span className="next-project-title">Back to all work</span>
                <span className="next-arrow">↑</span>
              </Link>
            </FadeUp>
          </div>
        </section>
      )}

      <Footer variant="casestudy" />
    </>
  )
}
