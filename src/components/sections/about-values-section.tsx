// src/components/sections/about-values-section.tsx
// ABOUT-02 — Values/differentiators section with icon cards.
// Server Component. Dark background for contrast. 4-card grid.
import { Section } from '@/components/layout/section'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { aboutContent, type ValueItem } from '@/lib/content/about'

function ValueIcon({ icon }: { icon: ValueItem['icon'] }) {
  const commonProps = {
    width: 24,
    height: 24,
    stroke: 'currentColor' as const,
    strokeWidth: 1.5,
    fill: 'none' as const,
    viewBox: '0 0 24 24',
    'aria-hidden': true as const,
  }

  if (icon === 'bot') {
    // Simple bot/chat-bot: square body with two dot eyes and a mouth line
    return (
      <svg {...commonProps}>
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <circle cx="9" cy="13" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none" />
        <path d="M9 17h6" strokeLinecap="round" />
        <path d="M12 6V3" strokeLinecap="round" />
      </svg>
    )
  }

  if (icon === 'layers') {
    // Three stacked horizontal rectangles
    return (
      <svg {...commonProps}>
        <rect x="3" y="4" width="18" height="5" rx="1" />
        <rect x="3" y="10" width="18" height="5" rx="1" />
        <rect x="3" y="16" width="18" height="5" rx="1" />
      </svg>
    )
  }

  if (icon === 'map-pin') {
    // Location pin icon
    return (
      <svg {...commonProps}>
        <path d="M12 2C8.686 2 6 4.686 6 8c0 5 6 13 6 13s6-8 6-13c0-3.314-2.686-6-6-6z" />
        <circle cx="12" cy="8" r="2" />
      </svg>
    )
  }

  // users: two overlapping person silhouettes
  return (
    <svg {...commonProps}>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 20c0-3.314 2.686-6 6-6s6 2.686 6 6" strokeLinecap="round" />
      <circle cx="17" cy="7" r="2.5" />
      <path d="M14 20c0-2.761 1.567-5.055 3.5-5.793" strokeLinecap="round" />
    </svg>
  )
}

export function AboutValuesSection() {
  const { values } = aboutContent

  return (
    <Section dark={true} aria-labelledby="about-values-heading">
      {/* Heading — centered, text-bg because dark section */}
      <div className="text-center">
        <h2 id="about-values-heading" className="-tracking-tighter text-4xl font-black text-bg sm:text-5xl">
          {values.headline}
        </h2>
        <p className="mt-4 text-xl text-bg/70">{values.subheadline}</p>
      </div>

      {/* 4-card grid */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.items.map((item, i) => (
          <ScrollReveal key={item.icon} delay={i * 0.1}>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <span className="text-bg/70">
                <ValueIcon icon={item.icon} />
              </span>
              <h3 className="mt-4 text-base font-bold text-bg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bg/70">{item.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  )
}
