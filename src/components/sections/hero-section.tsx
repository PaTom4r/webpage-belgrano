// Hero rebuilt around a particle entity (Phase 1 of the hero-particle-entity plan).
// Layout:
//   Zone 1 (full-bleed, dark, min-h ~88vh):
//     · Background: bg-dark + grid texture + GIANT "BELGRANO" wordmark behind everything
//     · Two columns (lg+): left = R3F particle canvas, right = headline + subhead + CTA
//     · Mobile: stacked — particle canvas on top, text below
//   Zone 2: existing HeroMockups accordion, unchanged.
'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { HeroMockups } from '@/components/ui/hero-mockups'

// R3F Canvas + Three.js are heavy and only run on the client.
// Dynamic import keeps the initial JS bundle for the home page lean.
const HeroParticleEntity = dynamic(
  () => import('@/components/particles/hero-particle-entity').then((m) => m.HeroParticleEntity),
  { ssr: false },
)

const easing = [0.25, 0.1, 0.25, 1] as const

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: easing },
})

// LCP-safe — the headline starts visible so Lighthouse can measure it on first paint.
const headlineFade = {
  initial: { opacity: 1, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: easing },
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="flex flex-col"
    >
      {/* Zone 1 — particle entity + headline */}
      <div className="relative isolate overflow-hidden bg-dark">
        {/* Grid texture — same subtle pattern from the previous hero. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '4rem 4rem',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 70% at 30% 50%, black 30%, transparent 100%)',
            maskImage:
              'radial-gradient(ellipse 80% 70% at 30% 50%, black 30%, transparent 100%)',
          }}
        />

        {/* Giant background wordmark — "BELGRANO" tucked behind the particle entity.
            Low opacity so the entity reads in front. Positioned to the left so it
            partially overlaps the canvas column on desktop. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-start overflow-hidden pl-2 sm:pl-6 lg:pl-10"
        >
          <span
            className="select-none font-black uppercase leading-[0.85] text-white/[0.045]"
            style={{
              fontSize: 'clamp(8rem, 22vw, 22rem)',
              letterSpacing: '-0.06em',
              transform: 'translateY(-2vh)',
            }}
          >
            BELGRANO
          </span>
        </div>

        {/* Soft radial vignette to push the entity into the foreground. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 25% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)',
          }}
        />

        {/* Two-column content. Padding-top accounts for the fixed navbar. */}
        <div
          className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-28 pb-20 sm:px-8 sm:pt-32 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-12 lg:pt-36 lg:pb-32"
          style={{ minHeight: '88vh', zIndex: 2 }}
        >
          {/* Left — particle canvas. Container needs an explicit height for the canvas to size itself. */}
          <div className="relative h-[52vh] w-full sm:h-[60vh] lg:h-[72vh]">
            <HeroParticleEntity scrollTriggerRef={heroRef} bgColor="#09090B" baseColor="#ffffff" />
          </div>

          {/* Right — headline + subhead + CTA */}
          <div className="flex flex-col gap-6 text-left lg:gap-8">
            <motion.h1
              id="hero-heading"
              {...headlineFade}
              className="text-5xl font-black uppercase leading-[0.92] tracking-tighter text-white sm:text-6xl lg:text-7xl"
            >
              BELGRANO
              <br />
              GROUP
            </motion.h1>

            <motion.p
              {...fadeUp(0.1)}
              className="max-w-xl text-base font-medium text-white/80 sm:text-lg lg:text-xl"
            >
              Belgrano Group: Media, Intelligence y Brand. Conectamos IA, medios y ejecución
              en terreno para impulsar resultados reales en cada punto de contacto.
            </motion.p>

            <motion.div {...fadeUp(0.2)} className="mt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/#cta"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-white/90 sm:text-base"
              >
                Hablemos
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/5 sm:text-base"
              >
                Conocernos
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Zone 2 — vertical cards (kept as-is; cards may fold into Zone 1 in a later iteration). */}
      <div className="relative bg-dark pb-8 pt-16 sm:pb-10 sm:pt-20 lg:pb-14 lg:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent"
        />
        <HeroMockups />
      </div>
    </section>
  )
}
