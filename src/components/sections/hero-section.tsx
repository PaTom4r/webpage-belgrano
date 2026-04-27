// Hero — Living Pillar Canvas 2D + dominant text presence.
// Layout:
//   Mobile: stacked — particle canvas on top (centered strands), text below.
//   lg+: canvas absolute against the viewport's left edge so the leftmost
//        strand bleeds off-screen (no visible boundary). Text content sits to
//        the right with extra horizontal room for a single-line headline.
//   Zone 2: existing HeroMockups accordion, unchanged.
'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HeroMockups } from '@/components/ui/hero-mockups'

// Canvas 2D physics loop runs only in the browser. Dynamic import keeps the
// initial JS bundle for the home page lean and the hero text paints on SSR.
const LivingPillarCanvas = dynamic(
  () => import('@/components/particles/living-pillar/canvas').then((m) => m.LivingPillarCanvas),
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
      {/* Zone 1 — Living Pillar + dominant headline */}
      <div className="relative isolate overflow-hidden bg-black lg:min-h-[88vh]">
        {/* Single canvas, positioned responsively:
              · mobile: relative block stacked above the text (55-60vh tall)
              · lg+:    absolute against the viewport's left edge (44vw wide,
                        full hero height) so the leftmost strand bleeds off-screen */}
        <div className="relative h-[55vh] w-full sm:h-[60vh] lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[44vw] xl:w-[42vw]">
          <LivingPillarCanvas />
        </div>

        {/* Text content — right-aligned on lg+, full-width on mobile. */}
        <div className="relative z-10 flex w-full px-6 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24 lg:min-h-[88vh] lg:items-center lg:justify-end lg:py-0 lg:pl-[46vw] lg:pr-12 xl:pr-16">
          <div className="flex w-full max-w-[820px] flex-col gap-6 text-left lg:gap-8">
            <motion.span
              {...fadeUp(0)}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm sm:text-xs"
            >
              <span className="size-1.5 rounded-full bg-white/80" />
              AI · Media · Brand
            </motion.span>

            <motion.h1
              id="hero-heading"
              {...headlineFade}
              className="font-black uppercase leading-[0.92] tracking-tighter text-white text-5xl sm:text-6xl lg:whitespace-nowrap lg:text-[5rem] xl:text-[6rem] 2xl:text-[7rem]"
              style={{ letterSpacing: '-0.045em' }}
            >
              BELGRANO<br className="lg:hidden" />
              <span className="hidden lg:inline"> </span>
              GROUP
            </motion.h1>

            <motion.p
              {...fadeUp(0.12)}
              className="max-w-xl text-lg font-medium text-white/75 lg:text-xl"
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
