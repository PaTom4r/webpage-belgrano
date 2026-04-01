// src/components/sections/about-narrative-section.tsx
// ABOUT-01 — Company history and mission section.
// Server Component. Light background. ScrollReveal on paragraphs.
import { Section } from '@/components/layout/section'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { aboutContent } from '@/lib/content/about'

export function AboutNarrativeSection() {
  const { narrative } = aboutContent

  return (
    <Section dark={false} aria-labelledby="about-heading">
      {/* Heading — centered */}
      <div className="text-center">
        <h1 id="about-heading" className="-tracking-tighter text-4xl font-black sm:text-5xl">
          {narrative.headline}
        </h1>
        <p className="mt-4 text-xl text-text-secondary">{narrative.subheadline}</p>
      </div>

      {/* Paragraphs — prose width, left-aligned */}
      <div className="mx-auto mt-12 max-w-3xl space-y-6">
        {narrative.paragraphs.map((paragraph, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <p className="text-lg leading-relaxed text-text-secondary">{paragraph}</p>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  )
}
