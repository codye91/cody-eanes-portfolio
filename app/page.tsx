import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FadeUp from '@/components/FadeUp'
import { getAllProjects, getSiteContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Cody Eanes — Design Leader',
  alternates: { canonical: 'https://codyeanes.com/' },
}

export default function HomePage() {
  const projects = getAllProjects()
  const site = getSiteContent()
  const { hero, ticker, workSection } = site

  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="hero">
        <div className="hero-content container">
          <FadeUp immediate delay={80}>
            <p className="eyebrow hero-eyebrow">{hero.eyebrow}</p>
          </FadeUp>
          <FadeUp immediate delay={180}>
            <h1 className="hero-headline">
              {hero.headline.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </h1>
          </FadeUp>
          <FadeUp immediate delay={280}>
            <p className="hero-subtext">{hero.subtext}</p>
          </FadeUp>
          <FadeUp immediate delay={380}>
            <div className="hero-ctas">
              <a href={hero.primaryCta.href} className="btn-primary">
                {hero.primaryCta.label} <span className="arrow">→</span>
              </a>
              <Link href={hero.secondaryCta.href} className="btn-secondary">
                {hero.secondaryCta.label} <span className="arrow">→</span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker">
        <div className="ticker-track">
          {[...ticker.testimonials, ...ticker.testimonials].map((quote, i) => (
            <span key={i} className="ticker-item">
              &ldquo;{quote}&rdquo;
              {i < ticker.testimonials.length * 2 - 1 && (
                <span className="ticker-sep">·</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Work */}
      <section className="work" id="work">
        <div className="container">
          <div className="work-header">
            <span className="eyebrow">{workSection.eyebrow}</span>
            <h2>{workSection.heading}</h2>
            <p dangerouslySetInnerHTML={{ __html: workSection.description }} />
          </div>

          <div className="card-list">
            {projects.map(project => (
              <Link
                key={project.slug}
                href={`/${project.slug}`}
                className={`card${project.reversed ? ' reverse' : ''}`}
              >
                <div className="card-body">
                  <span className="card-role">{project.card.role}</span>
                  <p className="card-brand">{project.card.brand}</p>
                  <h3 className="card-title">{project.card.title}</h3>
                  <p className="card-desc">{project.card.description}</p>
                  {project.card.metrics.length > 0 && (
                    <div className="card-metrics">
                      {project.card.metrics.map((m, i) => (
                        <div key={i}>
                          <span className="metric-value">{m.value}</span>
                          <span className="metric-label">
                            {m.label.split('\n').map((line, j) => (
                              <span key={j}>
                                {line}
                                {j < m.label.split('\n').length - 1 && <br />}
                              </span>
                            ))}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <span className="card-cta">
                    View Case Study <span className="arrow">→</span>
                  </span>
                </div>
                <div className="card-image">
                  <Image
                    src={project.card.image}
                    alt={project.card.imageAlt}
                    width={800}
                    height={600}
                    loading="lazy"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer variant="home" />
    </>
  )
}
