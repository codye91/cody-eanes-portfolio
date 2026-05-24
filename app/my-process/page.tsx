import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FadeUp from '@/components/FadeUp'

export const metadata: Metadata = {
  title: 'My Process',
  description:
    'From ambiguity to aligned teams to shipped products — the research, systems, and stakeholder dynamics behind every case study.',
  alternates: { canonical: 'https://codyeanes.com/my-process' },
}

const phases = [
  {
    number: '01',
    eyebrow: 'Phase One',
    title: 'Understanding the\nProblem Space',
    surface: false,
    columns: [
      {
        heading: 'Discovery & Research',
        items: [
          'Stakeholder interviews to understand business goals and constraints',
          'User research to uncover real needs and pain points',
          'Competitive analysis to identify opportunities and patterns',
        ],
        note: null,
      },
      {
        heading: 'AI-Powered Content Analysis',
        items: [
          'Analyze existing content for patterns and gaps',
          'Extract key themes from user feedback at scale',
          'Generate initial content inventories and audit reports',
        ],
        note: "In practice: On a recent e-commerce redesign, I fed an entire website into ChatGPT to identify the top 10 friction points in the primary user flow — work that would've taken weeks happened in an afternoon.",
        noteBold: 'In practice:',
      },
    ],
  },
  {
    number: '02',
    eyebrow: 'Phase Two',
    title: 'Making Sense\nof Chaos',
    surface: true,
    columns: [
      {
        heading: 'Heuristic Evaluation',
        items: [
          "Nielsen's 10 usability heuristics",
          'Accessibility standards (WCAG 2.2)',
          'Industry-specific best practices',
        ],
        note: null,
      },
      {
        heading: 'Information Architecture',
        items: [
          'Content buckets that group related information logically',
          'User flow diagrams showing key pathways',
          'Sitemaps that visualize the entire information ecosystem',
        ],
        note: 'A core belief: Good IA is invisible — users should find what they need without thinking about how it\'s organized. When navigation becomes the subject, something has already gone wrong.',
        noteBold: 'A core belief:',
      },
    ],
  },
  {
    number: '03',
    eyebrow: 'Phase Three',
    title: 'Bringing Ideas\nto Life',
    surface: false,
    columns: [
      {
        heading: 'Wireframing & Prototyping',
        items: [
          'Lo-fi wireframes to test information hierarchy',
          'High-fidelity wireframes for design system work',
          'Interactive prototypes for usability testing',
        ],
        note: null,
      },
      {
        heading: 'Design System Thinking',
        items: [
          'Creating reusable component libraries',
          'Documenting interaction patterns',
          'Establishing design tokens for consistency',
        ],
        note: "The reason this matters: It's not just about efficiency. It's about creating experiences that feel cohesive across every touchpoint — whether someone is on the homepage or a deeply nested product page.",
        noteBold: 'The reason this matters:',
      },
    ],
  },
  {
    number: '04',
    eyebrow: 'Phase Four',
    title: 'Collaboration\n& Refinement',
    surface: true,
    columns: [
      {
        heading: 'Developer Partnership',
        items: [
          'Co-creating during the design phase to ensure feasibility',
          'Providing detailed specs with interaction states and edge cases',
          'Participating in sprint planning to prioritize features',
          'Conducting design QA during implementation',
        ],
        note: null,
      },
      {
        heading: 'Iterative Improvement',
        items: [
          'Monitor analytics and user feedback post-launch',
          'Conduct usability testing on live products',
          'Create optimization roadmaps based on data',
        ],
        note: "The work doesn't end at launch. The best products I've shipped have been improved meaningfully in the 90 days after go-live — because that's when real usage data starts telling the truth.",
        noteBold: "The work doesn't end at launch.",
      },
    ],
  },
]

const principles = [
  {
    title: 'AI-Augmented,\nHuman-Centered',
    body: 'AI accelerates the work — synthesis, content analysis, logic mapping. But it doesn\'t replace the judgment calls. Every AI output runs through a human lens before it informs a decision.',
  },
  {
    title: 'Systems Over\nScreens',
    body: "I design patterns and components, not just individual interfaces. A screen is a snapshot. A system is a strategy — and it's what makes design scale without falling apart.",
  },
  {
    title: 'Collaborative\nby Design',
    body: "Stakeholders, developers, and users aren't interruptions to the process — they're inputs to it. The best design decisions I've made came from conversations I didn't expect to matter.",
  },
  {
    title: 'Data-Informed,\nNot Data-Driven',
    body: 'Numbers tell you what happened. Research tells you why. I balance quantitative signals with qualitative understanding — because optimizing for metrics alone often produces products that test well and feel wrong.',
  },
]

export default function MyProcessPage() {
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
