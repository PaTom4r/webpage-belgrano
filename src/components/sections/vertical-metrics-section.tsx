// src/components/sections/vertical-metrics-section.tsx
// Metrics proof grid for vertical detail pages.
// Dark bg with large numbers — consistent with StatsSection on landing.
// Server Component.
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { Container } from '@/components/layout/container'
import type { VerticalMetric } from '@/lib/content/verticales'

interface VerticalMetricsSectionProps {
  metrics: VerticalMetric[]
}

export function VerticalMetricsSection({ metrics }: VerticalMetricsSectionProps) {
  if (!metrics || metrics.length === 0) return null

  return (
    <section className="bg-dark py-16 sm:py-20">
      <Container>
        <ScrollReveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-bg/40">
            Resultados
          </span>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <ScrollReveal key={metric.value} delay={i * 0.07}>
              <div className="flex flex-col">
                <span className="text-4xl font-extrabold tracking-tight text-bg sm:text-5xl">
                  {metric.value}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-bg/60">
                  {metric.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
