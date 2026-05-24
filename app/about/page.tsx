import type { Metadata } from 'next'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FadeUp from '@/components/FadeUp'
import { getSiteContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Design leader based in Richmond, VA — directing UX strategy, product design, and AI-integrated processes.',
  alternates: { canonical: 'https://codyeanes.com/about' },
}

export default function AboutPage() {
  const { about } = getSiteContent()
  const a = about as {
    eyebrow: string
    heroHeadline: string
    heroSubtext: string
    headshotImage: string
    bio: string
    facts: { value: string; label: string }[]
    humanStuff: { body: string; pullQuote: string; pullQuoteAttr: string }
    setsApart: { heading: string; paragraphs: string[] }
    howIWork: {
      heading: string
      paragraphs: string[]
      aiProof: { stat: string; title: string; description: string }[]
    }
  }

  return (
    <>
      <Nav />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div>
              <FadeUp immediate delay={80}>
                <p className="eyebrow page-hero-eyebrow">{a.eyebrow}</p>
              </FadeUp>
              <FadeUp immediate delay={180}>
                <h1>
                  {a.heroHeadline.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i === 0 && <br />}
                    </span>
                  ))}
                </h1>
              </FadeUp>
              <FadeUp immediate delay={280}>
                <p className="page-hero-sub">{a.heroSubtext}</p>
              </FadeUp>
            </div>
            <FadeUp immediate delay={380} className="page-hero-image">
              <Image
                src={a.headshotImage}
                alt="Cody Eanes"
                width={480}
                height={560}
                loading="lazy"
                style={{ objectPosition: 'center top' }}
              />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Background */}
      <section className="about-section">
        <div className="container">
          <FadeUp>
            <p className="eyebrow section-eyebrow">Background</p>
          </FadeUp>
          <FadeUp>
            <p className="section-body">{a.bio}</p>
          </FadeUp>
          <FadeUp>
            <div className="fact-strip">
              {a.facts.map((f, i) => (
                <div key={i} className="fact-item">
                  <span className="fact-value">{f.value}</span>
                  <span className="fact-label">{f.label}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Human Stuff */}
      <section className="about-section on-surface">
        <div className="container">
          <FadeUp>
            <p className="eyebrow section-eyebrow">The Human Stuff</p>
          </FadeUp>
          <div className="life-grid">
            <FadeUp>
              <p className="section-body">{a.humanStuff.body}</p>
            </FadeUp>
            <FadeUp>
              <div className="pull-quote">
                <span className="pull-quote-mark">&ldquo;</span>
                <p className="pull-quote-text">{a.humanStuff.pullQuote}</p>
                <span className="pull-quote-attr">{a.humanStuff.pullQuoteAttr}</span>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* What Sets Me Apart */}
      <section className="about-section">
        <div className="container">
          <FadeUp>
            <p className="eyebrow section-eyebrow">What Sets Me Apart</p>
          </FadeUp>
          <FadeUp>
            <h2 className="section-headline">
              {a.setsApart.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </h2>
          </FadeUp>
          {a.setsApart.paragraphs.map((p, i) => (
            <FadeUp key={i}>
              <p className="section-body">{p}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* How I Work */}
      <section className="about-section on-surface">
        <div className="container">
          <FadeUp>
            <p className="eyebrow section-eyebrow">How I Work</p>
          </FadeUp>
          <FadeUp>
            <h2 className="section-headline">
              {a.howIWork.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </h2>
          </FadeUp>
          {a.howIWork.paragraphs.map((p, i) => (
            <FadeUp key={i}>
              <p className="section-body">{p}</p>
            </FadeUp>
          ))}
          <div className="ai-proof-grid">
            {a.howIWork.aiProof.map((item, i) => (
              <FadeUp key={i}>
                <div className="ai-proof-item">
                  <span className="ai-proof-number">{item.stat}</span>
                  <p className="ai-proof-title">{item.title}</p>
                  <p className="ai-proof-desc">{item.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Footer variant="home" />
    </>
  )
}
