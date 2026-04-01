// src/components/sections/about-team-section.tsx
// ABOUT-03 — Team positioning section (no photos).
// Server Component. Light alternate background (#f9fafb). 4-step process strip.
import { Section } from '@/components/layout/section'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { aboutContent } from '@/lib/content/about'

export function AboutTeamSection() {
  const { team } = aboutContent

  return (
    <Section dark={false} className="bg-bg-section" aria-labelledby="about-team-heading">
      {/* Heading — centered */}
      <div className="text-center">
        <h2 id="about-team-heading" className="-tracking-tighter text-4xl font-black sm:text-5xl">{team.headline}</h2>
        <p className="mt-4 text-xl text-text-secondary">{team.subheadline}</p>
      </div>

      {/* First two paragraphs */}
      <div className="mx-auto mt-10 max-w-3xl space-y-6">
        {team.paragraphs.slice(0, 2).map((paragraph, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <p className="text-lg leading-relaxed text-text-secondary">{paragraph}</p>
          </ScrollReveal>
        ))}
      </div>

      {/* 4-step process strip */}
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {team.highlights.map((highlight, i) => (
          <ScrollReveal key={highlight.label} delay={i * 0.1}>
            <div className="rounded-xl border border-border bg-bg p-6">
              {/* Number badge */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-dark text-sm font-bold text-bg">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="mt-3 text-base font-bold text-text">{highlight.label}</h3>
              <p className="mt-1 text-sm text-text-secondary">{highlight.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Third paragraph — centered, below the grid */}
      <ScrollReveal delay={0.3}>
        <p className="mx-auto mt-10 max-w-2xl text-center text-base text-text-secondary">
          {team.paragraphs[2]}
        </p>
      </ScrollReveal>
    </Section>
  )
}
