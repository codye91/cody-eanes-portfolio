import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FadeUp from '@/components/FadeUp'
import { getSiteContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'My Process',
  description:
    'From ambiguity to aligned teams to shipped products — the research, systems, and stakeholder dynamics behind every case study.',
  alternates: { canonical: 'https://codyeanes.com/my-process' },
}

type ProcessColumn = {
  heading: string
  items: string[]
  note: string | null
  noteBold: string | null
}

type Phase = {
  number: string
  eyebrow: string
  title: string
  surface: boolean
  columns: ProcessColumn[]
}

type Principle = {
  title: string
  body: string
}

export default function MyProcessPage() {
  const { myProcess } = getSiteContent()
  const { phases, principles } = myProcess as { phases: Phase[]; principles: Principle[] }

  return (
    <>
      <Nav />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <FadeUp immediate delay={80}>
              <p className="eyebrow hero-eyebrow">My Process</p>
            </FadeUp>
            <FadeUp immediate delay={180}>
              <h1>My Design Process</h1>
            </FadeUp>
            <FadeUp immediate delay={280}>
              <p className="hero-subhead">From ambiguity to aligned teams to shipped products.</p>
            </FadeUp>
            <FadeUp immediate delay={380}>
              <p className="hero-intro">
                The case studies show the outcomes. This page shows the thinking behind them — the
                research, the systems, the stakeholder dynamics, and the moments where process
                actually makes or breaks a project.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Phases */}
      {phases.map((phase) => (
        <section
          key={phase.number}
          className={`phase-section${phase.surface ? ' on-surface' : ''}`}
        >
          <div className="container">
            <FadeUp>
              <div className="phase-header">
                <span className="phase-number">{phase.number}</span>
                <div className="phase-header-text">
                  <p className="eyebrow">{phase.eyebrow}</p>
                  <h2 className="phase-title">
                    {phase.title.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i === 0 && <br />}
                      </span>
                    ))}
                  </h2>
                </div>
              </div>
            </FadeUp>
            <div className="phase-grid">
              {phase.columns.map((col, ci) => (
                <FadeUp key={ci}>
                  <h3 className="topic-title">{col.heading}</h3>
                  <ul className="phase-list">
                    {col.items.map((item, ii) => (
                      <li key={ii}>{item}</li>
                    ))}
                  </ul>
                  {col.note && (
                    <p className="phase-note">
                      <strong>{col.noteBold}</strong>{' '}
                      {col.note.slice((col.noteBold ?? '').length).trimStart()}
                    </p>
                  )}
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* What Makes My Process Different */}
      <section className="diff-section">
        <div className="container">
          <FadeUp>
            <p className="eyebrow">What Makes Me Different</p>
          </FadeUp>
          <FadeUp>
            <h2 className="diff-section-headline">
              Four principles that
              <br />
              shape every project.
            </h2>
          </FadeUp>
          <div className="diff-grid">
            {principles.map((p, i) => (
              <FadeUp key={i}>
                <div className="diff-item">
                  <h3 className="diff-title">
                    {p.title.split('\n').map((line, li) => (
                      <span key={li}>
                        {line}
                        {li === 0 && <br />}
                      </span>
                    ))}
                  </h3>
                  <p className="diff-body">{p.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Footer variant="casestudy" />
    </>
  )
}
