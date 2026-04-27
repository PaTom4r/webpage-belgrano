// Hero — Living Threads Canvas 2D + dominant text presence.
// Layout:
//   Mobile: stacked — particle canvas on top (full-width, dim opacity), text below.
//   lg+:    canvas absolute spanning the full hero. Text content sits to the
//           right starting at x≈51vw with max-width 620px so the threads breathe
//           on the left while the headline reads cleanly. Two z-10 overlays
//           (linear right→center + radial behind text) attenuate the threads
//           without erasing them, so the fibers still show through.
//   Zone 2: existing HeroMockups accordion, unchanged.
'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HeroMockups } from '@/components/ui/hero-mockups'

// Canvas 2D physics loop runs only in the browser. Dynamic import keeps the
// initial JS bundle for the home page lean and the hero text paints on SSR.
const LivingThreadsCanvas = dynamic(
  () => import('@/components/particles/living-pillar/canvas').then((m) => m.LivingThreadsCanvas),
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
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="flex flex-col"
    >
      {/* Zone 1 — Living Threads + dominant headline */}
      <div className="relative isolate overflow-hidden bg-black lg:min-h-[88vh]">
        {/* Single canvas, positioned responsively:
              · mobile: relative block stacked above the text (55-60vh tall),
                        dimmed so the text below stays the focus.
              · lg+:    absolute, spans the full hero width and height. The
                        engine's internal right-edge fade plus the overlays
                        below keep threads dim behind the headline. */}
        <div className="relative h-[55vh] w-full opacity-60 sm:h-[60vh] lg:absolute lg:inset-0 lg:h-auto lg:w-full lg:opacity-100">
          <LivingThreadsCanvas />
        </div>

        {/* Overlay 1 — linear fade right→center for legibility on the text side. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-l from-black via-black/70 to-transparent"
        />
        {/* Overlay 2 — radial pool behind the text block (desktop only).
            Mobile: text sits below the canvas, no radial needed. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 55% 70% at 75% 50%, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 45%, transparent 80%)',
          }}
        />

        {/* Text content — starts at x≈51vw on lg+, full-width on mobile.
            z-20 keeps the headline above the threads + overlays.
            pointer-events-none on the outer wrapper lets cursor events fall
            through to the canvas in the empty area on the left; pointer-events
            is re-enabled on the inner content block so the chip / paragraph /
            buttons stay interactive. */}
        <div className="pointer-events-none relative z-20 flex w-full px-6 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24 lg:min-h-[88vh] lg:items-center lg:justify-end lg:py-0 lg:pl-[51vw] lg:pr-12 xl:pr-16">
          <div className="pointer-events-auto flex w-full max-w-[620px] flex-col gap-6 text-left lg:gap-8">
            <motion.span
              {...fadeUp(0)}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm sm:text-xs"
            >
              <span className="size-1.5 rounded-full bg-white/80" aria-hidden />
              AI · MEDIA · BRAND
            </motion.span>

            <motion.h1
              id="hero-heading"
              {...headlineFade}
              className="font-black uppercase leading-[0.92] tracking-tighter text-white text-5xl sm:text-6xl lg:text-[5rem] xl:text-[6rem] 2xl:text-[7rem]"
              style={{ letterSpacing: '-0.045em' }}
            >
              <span className="block">BELGRANO</span>
              <span className="block">GROUP</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.12)}
              className="max-w-[560px] text-lg font-medium text-white/75 lg:text-xl"
            >
              Conectamos IA, medios y ejecución en terreno para impulsar resultados
              reales en cada punto de contacto.
            </motion.p>

            <motion.div {...fadeUp(0.22)} className="mt-3 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/#cta"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-black transition-all duration-200 hover:bg-white/90 lg:text-lg"
              >
                Hablemos
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-base font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/5 lg:text-lg"
              >
                Conocernos
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Zone 2 — vertical cards (HeroMockups accordion, unchanged). */}
      <div className="relative bg-black pb-8 pt-16 sm:pb-10 sm:pt-20 lg:pb-14 lg:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent"
        />
        <HeroMockups />
      </div>
    </section>
  )
}
