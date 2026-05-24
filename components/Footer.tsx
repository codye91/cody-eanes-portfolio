import Link from 'next/link'

interface FooterProps {
  variant?: 'home' | 'casestudy'
  heading?: string
  description?: string
}

const DEFAULTS = {
  home: {
    eyebrow: "Let's Build Something",
    heading: "Hey, you're way\nbelow the fold!",
    description:
      "Whether you need a design leader who can run a workshop in the morning and challenge an engineering assumption in the afternoon — let's talk.",
  },
  casestudy: {
    eyebrow: "Let's Build Something",
    heading: "Ready to ship\nsomething great?",
    description:
      "If you're looking for a design leader who can run a workshop in the morning, challenge an engineering assumption in the afternoon, and ship something worth shipping — let's talk.",
  },
}

export default function Footer({
  variant = 'casestudy',
  heading,
  description,
}: FooterProps) {
  const defaults = DEFAULTS[variant]
  const finalHeading = heading ?? defaults.heading
  const finalDescription = description ?? defaults.description

  return (
    <footer className="footer-cta">
      <div className="container">
        <span className="eyebrow">{defaults.eyebrow}</span>
        <h2>
          {finalHeading.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < finalHeading.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h2>
        <p>{finalDescription}</p>
        <a href="mailto:cody@codyeanes.com" className="btn-primary">
          Hit me up <span className="arrow">→</span>
        </a>
        <div className="footer-bottom">
          <p>© 2026 Cody Eanes</p>
          <a href="https://eanescreative.co" target="_blank" rel="noopener noreferrer">
            eanescreative.co ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
