// src/components/sections/hero-section.tsx
// Two-zone hero: compact headline → gradient → dark zone with 4 browser mockups.
// Everything visible in the first viewport — no scroll needed to see the cards.
// Uses Framer Motion animate (fires on mount) — NOT whileInView.
'use client'

import { motion } from 'framer-motion'
import { HeroMockups } from '@/components/ui/hero-mockups'

const easing = [0.25, 0.1, 0.25, 1] as const

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: easing },
})

// LCP-safe variant: headline starts visible so Lighthouse can measure it immediately.
const headlineFade = {
  initial: { opacity: 1, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: easing },
}

export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="flex min-h-svh flex-col">
      {/* Zone 1: Headline — generous spacing like Linear */}
      <div className="relative overflow-hidden bg-bg pt-28 pb-6 sm:pt-32 sm:pb-8 lg:pt-36 lg:pb-10">
        {/* Subtle grid background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40"
        />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Headline — large, left-aligned */}
          <motion.h1
            id="hero-heading"
            {...headlineFade}
            className="text-4xl font-extrabold leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Tu negocio.{' '}
            <br className="hidden sm:block" />
            <span className="text-accent">Nuestra inteligencia.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.15)}
            className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            Medios tradicionales con IA, soluciones inteligentes para tu empresa
            y experiencias de marca que conectan — todo Belgrano.
          </motion.p>
        </div>
      </div>

      {/* Zone 2: Cards on white background — fills remaining viewport */}
      <div className="relative flex flex-1 flex-col pb-6 sm:pb-8">
        {/* Background fade — behind cards */}
        <div className="absolute inset-0 bg-bg" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-dark via-dark/80 to-transparent sm:h-64"
        />

        {/* Cards — on top of fade */}
        <div className="relative z-10 flex-1">
          <HeroMockups />
        </div>
      </div>
    </section>
  )
}
