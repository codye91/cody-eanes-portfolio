import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FadeUp from '@/components/FadeUp'
import { getAllProjects, getProjectBySlug } from '@/lib/content'
import { SECTION_REGISTRY } from '@/lib/sections'

// ─── Static Params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllProjects().map(p => ({ slug: p.slug }))
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

      {/* Sections — dispatched via registry */}
      {project.sections.map((section, i) => {
        const SectionComponent = SECTION_REGISTRY[section.type]
        if (!SectionComponent) return null
        return <SectionComponent key={i} s={section} />
      })}

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
