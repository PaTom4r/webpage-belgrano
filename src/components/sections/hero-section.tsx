// src/components/sections/hero-section.tsx
// Full-viewport hero section. First thing visitors see.
// Uses Framer Motion animate (fires on mount) — NOT whileInView (only fires on scroll-enter).
// No "use client" needed on the section itself — motion.div is the client boundary.
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// Stagger children: each element delays 0.1s after the previous
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

// LCP-safe variant: headline starts visible so Lighthouse can measure it immediately.
// We still do a subtle lift animation but not from opacity:0, which would hide the LCP element.
const headlineFade = {
  initial: { opacity: 1, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
}

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-bg pt-16"
    >
      {/* Subtle grid background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40"
      />

      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div {...fadeUp(0)}>
          <span className="inline-flex items-center rounded-full border border-border bg-bg-section px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-text-secondary">
            Agencia IA · Marketing · Estrategia
          </span>
        </motion.div>

        {/* Main headline — uses headlineFade (starts visible) so Lighthouse LCP measures it immediately */}
        <motion.h1
          id="hero-heading"
          {...headlineFade}
          className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-text sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          Tu negocio.{' '}
          <br className="hidden sm:block" />
          <span className="text-accent">Nuestra inteligencia.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.2)}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl"
        >
          Automatizamos ventas, amplificamos tu marca y formamos a tu equipo —
          todo con IA aplicada y resultados medibles desde el día uno.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="#cta"
            className="inline-flex items-center rounded-lg bg-accent px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-80 active:scale-95"
          >
            Agenda una reunión →
          </Link>
          <Link
            href="#what-we-do"
            className="inline-flex items-center rounded-lg border border-border px-8 py-4 text-base font-medium text-text transition-colors hover:bg-bg-section"
          >
            Ver qué hacemos
          </Link>
        </motion.div>

        {/* Social proof line */}
        <motion.p
          {...fadeUp(0.4)}
          className="mt-8 text-sm text-text-secondary"
        >
          Más de{' '}
          <strong className="font-semibold text-text">200 empresas</strong>{' '}
          confían en Belgrano
        </motion.p>
      </div>
    </section>
  )
}
