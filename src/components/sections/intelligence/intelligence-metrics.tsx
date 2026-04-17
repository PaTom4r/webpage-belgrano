// src/components/sections/intelligence/intelligence-metrics.tsx
// Premium variant of VerticalMetricsSection for Intelligence.
// Dark bg with accent glow + counter-animated numerics where parsable.
// Falls back to plain text for non-numeric values like "24/7" or "40\u201370%".
'use client'

import { Container } from '@/components/layout/container'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { AnimatedCounter } from '@/components/animations/animated-counter'
import type { VerticalMetric } from '@/lib/content/verticales'

interface IntelligenceMetricsProps {
  metrics: VerticalMetric[]
  accent?: string
}

// Parse "$780M" / "300x+" / "+3.000" / "24/7" / "40\u201370%" / "2"
// into { prefix, target, suffix } when possible. If unparsable, returns null
// and component renders the raw string.
function parseMetricValue(raw: string): {
  prefix: string
  target: number
  suffix: string
} | null {
  // Match: optional prefix (non-digit), then digits (with . or , as thousands),
  // then optional suffix (anything else).
  const match = raw.match(/^([^\d-]*)([\d.,]+)(.*)$/)
  if (!match) return null
  const [, prefix, numStr, suffix] = match
  const cleanNum = numStr.replace(/\./g, '').replace(/,/g, '.')
  const target = Number(cleanNum)
  if (Number.isNaN(target)) return null
  return { prefix, target, suffix }
}

export function IntelligenceMetrics({
  metrics,
  accent = '#A855F7',
}: IntelligenceMetricsProps) {
  if (!metrics || metrics.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-dark py-20 sm:py-24">
      {/* Subtle accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(60% 50% at 50% 0%, ${accent}1A 0%, transparent 70%)`,
        }}
      />

      <Container>
        <ScrollReveal className="mb-12 text-center">
          <span
            className="text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            Resultados
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-bg sm:text-4xl">
            En números
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {metrics.map((metric, i) => {
            const parsed = parseMetricValue(metric.value)
            return (
              <ScrollReveal key={metric.value + i} delay={i * 0.07}>
                <div className="flex flex-col">
                  <span
                    className="text-5xl font-extrabold tracking-tight tabular-nums sm:text-6xl"
                    style={{ color: accent }}
                  >
                    {parsed ? (
                      <AnimatedCounter
                        target={parsed.target}
                        prefix={parsed.prefix}
                        suffix={parsed.suffix}
                      />
                    ) : (
                      metric.value
                    )}
                  </span>
                  <span className="mt-3 text-sm leading-relaxed text-bg/60">
                    {metric.label}
                  </span>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
