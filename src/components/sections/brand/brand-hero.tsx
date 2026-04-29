// Premium dark hero for /brand.
// Mirrors Intelligence and Media heroes: animated grid bg, radial orange glow,
//   megaphone icon with pulse, eyebrow + h1 + benefit + single CTA.
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/container'
import type { Vertical } from '@/lib/content/verticales'

const easing = [0.25, 0.1, 0.25, 1] as const

interface BrandHeroProps {
  vertical: Vertical
}

export function BrandHero({ vertical }: BrandHeroProps) {
  const accent = vertical.accentColor ?? '#F97316'

  return (
    <section
      aria-labelledby="vertical-hero-heading"
      className="relative isolate overflow-hidden bg-dark py-20 sm:py-24 lg:py-32"
    >
      {/* Radial glow accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(60% 50% at 50% 0%, ${accent}33 0%, transparent 70%)`,
        }}
      />

      {/* Grid pattern overlay (radial masked) */}
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
          {/* Megaphone icon with glow */}
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
              <path d="m3 11 18-5v12L3 14v-3z" />
              <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
            </svg>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: easing }}
            className="mt-8 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            {vertical.eyebrow ?? 'TRADE & EXPERIENCIAS'}
          </motion.p>

          {/* Headline */}
          <motion.h1
            id="vertical-hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: easing }}
            className="mt-3 text-5xl font-extrabold tracking-tight text-bg sm:text-6xl lg:text-7xl"
          >
            {vertical.name}
          </motion.h1>

          {/* Benefit */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: easing }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-bg/70 sm:text-xl"
          >
            {vertical.benefitHeadline}
          </motion.p>

          {/* Single CTA */}
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
