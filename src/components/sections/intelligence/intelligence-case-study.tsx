// src/components/sections/intelligence/intelligence-case-study.tsx
// Case study card for /verticales/intelligence — Cl\u00ednica Las Condes bot.
// Layout inspired by Vida C\u00e1mara: 2 columns on desktop, stacked on mobile.
//   Left: client logo + context + capabilities bullets + CTA (disabled until post exists)
//   Right: 4 metric cards with icon + value + label
// Light bg with soft accent gradient.
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/container'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import type { CaseStudy, CaseStudyIcon } from '@/lib/content/verticales'

const easing = [0.25, 0.1, 0.25, 1] as const

interface IntelligenceCaseStudyProps {
  caseStudy: CaseStudy
  accent?: string
}

// Inline SVG icons — keep deps minimal, follow existing pattern (vertical-icon.tsx style).
function MetricIcon({ name }: { name: CaseStudyIcon }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-5 w-5',
  }
  switch (name) {
    case 'dollar':
      return (
        <svg {...common} aria-hidden="true">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      )
    case 'roi':
      return (
        <svg {...common} aria-hidden="true">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      )
    case 'users':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      )
    case 'bolt':
      return (
        <svg {...common} aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    case 'chart':
      return (
        <svg {...common} aria-hidden="true">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    default:
      return null
  }
}

export function IntelligenceCaseStudy({
  caseStudy,
  accent = '#A855F7',
}: IntelligenceCaseStudyProps) {
  return (
    <section
      id="caso-clc"
      aria-labelledby="case-study-heading"
      className="relative bg-bg-section py-20 sm:py-24 lg:py-32"
    >
      {/* Soft accent gradient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(50% 40% at 50% 0%, ${accent}10 0%, transparent 70%)`,
        }}
      />

      <Container>
        {/* Section eyebrow + title */}
        <ScrollReveal className="mb-12 text-center">
          <span
            className="text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            Caso de éxito
          </span>
          <h2
            id="case-study-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl"
          >
            Bot conversacional para presupuestos quirúrgicos
          </h2>
        </ScrollReveal>

        {/* The card — 2 columns on lg, stacked on mobile */}
        <ScrollReveal>
          <div
            className="mx-auto max-w-6xl rounded-3xl border border-border bg-bg p-6 shadow-sm sm:p-8 lg:p-10"
            style={{
              boxShadow: `0 20px 40px -12px ${accent}1A, 0 0 0 1px rgba(0,0,0,0.04)`,
            }}
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
              {/* LEFT: logo + context + bullets + CTA */}
              <div className="flex flex-col">
                {/* Client logo */}
                <div className="flex items-center gap-3">
                  <Image
                    src={caseStudy.logoSrc}
                    alt={caseStudy.client}
                    width={caseStudy.logoWidth ?? 160}
                    height={caseStudy.logoHeight ?? 40}
                    className="h-auto w-auto max-h-12 object-contain"
                  />
                </div>

                {/* Context */}
                <p className="mt-6 text-base leading-relaxed text-text-secondary">
                  {caseStudy.context}
                </p>

                {/* Capabilities bullets */}
                {caseStudy.capabilities.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {caseStudy.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-3 text-sm text-text">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-bg"
                          style={{ backgroundColor: accent }}
                        >
                          ✓
                        </span>
                        <span className="leading-relaxed">{cap}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                {caseStudy.cta && (
                  <div className="mt-8">
                    {caseStudy.cta.disabled ? (
                      <span
                        className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-border bg-bg-section px-5 py-2.5 text-sm font-semibold text-text-secondary opacity-70"
                        aria-disabled="true"
                      >
                        {caseStudy.cta.label}
                      </span>
                    ) : (
                      <a
                        href={caseStudy.cta.href ?? '#'}
                        className="inline-flex items-center gap-2 rounded-full bg-text px-5 py-2.5 text-sm font-semibold text-bg transition-opacity hover:opacity-85"
                      >
                        {caseStudy.cta.label}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path
                            d="M3 7h8M7 3l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* RIGHT: 4 metric cards */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {caseStudy.metrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.4, delay: i * 0.07, ease: easing }}
                    className="rounded-2xl border border-border bg-bg-section p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: `${accent}18`,
                          color: accent,
                        }}
                      >
                        <MetricIcon name={metric.icon} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p
                          className="text-2xl font-extrabold tracking-tight tabular-nums text-text sm:text-3xl"
                          style={{ lineHeight: 1.05 }}
                        >
                          {metric.value}
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-text-secondary sm:text-sm">
                          {metric.label}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
