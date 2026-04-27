// Hero — Living Pillar Canvas 2D + dominant text presence.
// Layout:
//   Zone 1 (full-bleed, pure black, min-h ~88vh):
//     · Two columns (lg+): left = Living Pillar particle canvas, right = eyebrow + headline + subhead + CTAs
//     · Mobile: stacked — particle canvas on top, text below
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
      <div className="relative isolate overflow-hidden bg-black">
        {/* Two-column content. Padding-top accounts for the fixed navbar. */}
        <div
          className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-28 pb-20 sm:px-8 sm:pt-32 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-12 lg:pt-36 lg:pb-32"
          style={{ minHeight: '88vh' }}
        >
          {/* Left — Living Pillar Canvas 2D. Wrapper needs height + relative for the absolute canvas. */}
          <div className="relative h-[55vh] w-full sm:h-[62vh] lg:h-[78vh]">
            <LivingPillarCanvas />
          </div>

          {/* Right — eyebrow + dominant headline + subhead + CTAs */}
          <div className="flex flex-col gap-6 text-left lg:gap-8">
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
              className="text-6xl font-black uppercase leading-[0.88] tracking-tighter text-white sm:text-7xl lg:text-8xl xl:text-[8.5rem]"
              style={{ letterSpacing: '-0.045em' }}
            >
              BELGRANO
              <br />
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
