'use client'
// Hero v2 — template-1 style: split layout, headline with underline, yellow card right.
// Initial states keep opacity:1 so SSR renders visible content; only y transforms animate.
import Link from 'next/link'
import { motion } from 'framer-motion'

function YellowMockup() {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ background: 'var(--color-accent-yellow)', aspectRatio: '4/3' }}
      aria-hidden="true"
    >
      {/* Top bar */}
      <div className="flex items-center gap-2 px-5 pt-5 pb-3">
        <div className="h-2 w-2 rounded-full bg-black/25" />
        <div className="h-2 w-2 rounded-full bg-black/25" />
        <div className="h-2 w-2 rounded-full bg-black/25" />
        <div className="ml-3 h-2 w-32 rounded-full bg-black/15" />
      </div>

      {/* Content area */}
      <div className="px-5 pb-5 space-y-3">
        {/* Headline mock */}
        <div className="h-5 w-3/4 rounded-lg bg-black/20" />
        <div className="h-3 w-1/2 rounded-full bg-black/15" />

        {/* Grid cards */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl bg-white/50 p-3 space-y-2">
              <div className="h-2 w-8 rounded-full bg-black/20" />
              <div className="h-6 w-10 rounded bg-black/15" />
              <div className="h-1.5 w-12 rounded-full bg-black/10" />
            </div>
          ))}
        </div>

        {/* Chart bar mock */}
        <div className="rounded-xl bg-white/40 p-3">
          <div className="flex items-end gap-1.5 h-12">
            {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-black/25"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Footer labels */}
        <div className="flex gap-3">
          <div className="h-2 w-16 rounded-full bg-black/15" />
          <div className="h-2 w-20 rounded-full bg-black/10" />
        </div>
      </div>
    </div>
  )
}

export function HeroV2() {
  return (
    <section
      className="min-h-screen pb-16 pt-28 lg:pt-32"
      style={{ background: 'var(--color-bg-landing)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <div>
            <motion.h1
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0, 0, 1] }}
              className="text-5xl font-black leading-[1.02] tracking-tight text-text sm:text-6xl lg:text-7xl"
            >
              Operamos el{' '}
              <span className="relative inline-block">
                crecimiento
                <span
                  className="absolute bottom-0.5 left-0 w-full rounded-full"
                  style={{ height: '3px', background: 'var(--color-text)' }}
                />
              </span>{' '}
              de tu marca.
            </motion.h1>

            <p className="mt-6 max-w-sm text-lg leading-relaxed text-text-secondary">
              Intelligence, Media y Brand. Tres verticales, un solo operador.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/#cta"
                className="inline-flex items-center rounded-lg bg-text px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              >
                Hablemos
              </Link>
              <Link
                href="/verticales/intelligence"
                className="text-sm font-medium text-text-secondary transition-colors hover:text-text"
              >
                Ver servicios →
              </Link>
            </div>
          </div>

          {/* Right: yellow card */}
          <motion.div
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0, 0, 1] }}
          >
            <YellowMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
