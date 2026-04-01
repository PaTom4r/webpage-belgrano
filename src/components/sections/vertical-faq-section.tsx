// src/components/sections/vertical-faq-section.tsx
// FAQ section for vertical detail pages.
// Server Component shell — FaqAccordion is the "use client" leaf.
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { Container } from '@/components/layout/container'
import { FaqAccordion } from '@/components/ui/faq-accordion'
import type { FaqItem } from '@/lib/content/verticales'

interface VerticalFaqSectionProps {
  items: FaqItem[]
  verticalName: string
}

export function VerticalFaqSection({ items, verticalName }: VerticalFaqSectionProps) {
  return (
    <section className="bg-bg py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
              Preguntas frecuentes
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
              Todo lo que querias saber sobre {verticalName}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="mt-10">
            <FaqAccordion items={items} />
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
