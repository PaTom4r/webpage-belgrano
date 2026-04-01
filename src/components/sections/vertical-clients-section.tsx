// src/components/sections/vertical-clients-section.tsx
// Client references section. Only renders when clients array has items.
// Producciones has no clients — this component returns null in that case.
// Server Component.
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { Container } from '@/components/layout/container'

interface VerticalClientsSectionProps {
  clients: string[]
}

export function VerticalClientsSection({ clients }: VerticalClientsSectionProps) {
  if (!clients || clients.length === 0) return null

  return (
    <section className="bg-bg-section py-16 sm:py-20">
      <Container>
        <ScrollReveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
            Clientes que confian en nosotros
          </span>
        </ScrollReveal>
        <div className="mt-8 flex flex-wrap gap-4">
          {clients.map((client) => (
            <ScrollReveal key={client}>
              <span className="inline-flex items-center rounded-full border border-border bg-bg px-5 py-2 text-sm font-medium text-text">
                {client}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
