// Premium dark hero for /verticales/media.
// Mirrors Intelligence hero structure: animated grid bg, radial sky-blue glow,
//   monitor icon with pulse, eyebrow + h1 + benefit + dual CTA.
// Client Component for the entrance animations.
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/container'
import type { Vertical } from '@/lib/content/verticales'

const easing = [0.25, 0.1, 0.25, 1] as const

interface MediaHeroProps {
  vertical: Vertical
}

export function MediaHero({ vertical }: MediaHeroProps) {
  const accent = vertical.accentColor ?? '#0EA5E9'

  return (
    <section
      aria-labelledby="vertical-hero-heading"
      className="relative isolate overflow-hidden bg-dark py-20 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(60% 50% at 50% 0%, ${accent}33 0%, transparent 70%)`,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '3.5rem 3.5rem',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      <Container>
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: easing }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border"
            style={{
              borderColor: `${accent}55`,
              backgroundColor: `${accent}14`,
              color: accent,
              boxShadow: `0 0 40px ${accent}40`,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8"
              aria-hidden="true"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: easing }}
            className="mt-8 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            {vertical.eyebrow ?? 'PLANIFICACIÓN DE MEDIOS'}
          </motion.p>

          <motion.h1
            id="vertical-hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: easing }}
            className="mt-3 text-5xl font-extrabold tracking-tight text-bg sm:text-6xl lg:text-7xl"
          >
            {vertical.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: easing }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-bg/70 sm:text-xl"
          >
            {vertical.benefitHeadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: easing }}
            className="mt-10 flex justify-center"
          >
            <Link
              href="/#cta"
              className="inline-flex items-center gap-2 rounded-full bg-bg px-7 py-3.5 text-sm font-semibold text-text transition-opacity hover:opacity-85"
            >
              Hablemos
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
