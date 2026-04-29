// BusinessSuite — flat 3-card section based on template-2 reference.
// Reads the 3 verticals from `verticales.ts` and renders them as Link cards.
// Client component with Framer Motion entrance animations:
//   · Heading + chip + paragraph fade-up when the heading enters the viewport.
//   · Cards stagger in (fade + slight Y) when the grid enters.
//   · Hover-lift + accent glow are pure CSS — they keep working without JS.
// Reduced-motion users get an instant no-animation render via Framer's
// useReducedMotion gate (variants resolve to opacity-1 / y-0 directly).
'use client'

import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { verticales } from '@/lib/content/verticales'
import { VerticalIcon } from '@/components/ui/vertical-icon'

const easing = [0.25, 0.1, 0.25, 1] as const

const headingChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
}

const headingContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const gridContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const cardItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
}

export function BusinessSuite() {
  const reduceMotion = useReducedMotion()
  // When reduced motion is on, snap straight to "visible" — no transitions.
  const initial = reduceMotion ? 'visible' : 'hidden'

  return (
    <section
      aria-labelledby="business-suite-heading"
      className="relative overflow-hidden bg-dark py-24 sm:py-32 lg:py-40"
    >
      {/* Subtle background gradient — pulls attention up toward the heading. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Heading block — centered, animates as one stagger group */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headingContainer}
        >
          <motion.span
            variants={headingChild}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm sm:text-xs"
          >
            <span className="size-1.5 rounded-full bg-white/80" aria-hidden />
            Tres unidades, una sola operación
          </motion.span>
          <motion.h2
            id="business-suite-heading"
            variants={headingChild}
            className="mt-6 font-black uppercase leading-[0.95] tracking-tighter text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"
            style={{ letterSpacing: '-0.035em' }}
          >
            Todo lo que necesitas
            <br />
            para hacer crecer tu negocio
          </motion.h2>
          <motion.p
            variants={headingChild}
            className="mt-6 text-base text-white/70 sm:text-lg"
          >
            Tres unidades dentro de Belgrano Group: medios, inteligencia
            artificial y experiencias de marca. Una sola operación, un punto de
            contacto, resultados medibles.
          </motion.p>
        </motion.div>

        {/* Grid 3-col desktop, 1-col mobile — staggered entrance per card */}
        <motion.div
          className="mt-14 grid gap-5 sm:gap-6 md:grid-cols-3 lg:mt-20 lg:gap-8"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridContainer}
        >
          {verticales.map((v) => {
            const accent = v.accentColor ?? '#ffffff'
            const chips = (v.chips ?? v.tags ?? []).slice(0, 3)

            return (
              <motion.div key={v.slug} variants={cardItem}>
                <Link
                  href={`/${v.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] sm:p-8 lg:p-10"
                  style={{
                    // Subtle accent-tinted gradient — gives each card its identity.
                    backgroundImage: `linear-gradient(135deg, ${accent}10 0%, transparent 60%)`,
                  }}
                >
                  {/* Top — icon + eyebrow */}
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] transition-colors duration-300 group-hover:border-white/30"
                      style={{ color: accent }}
                      aria-hidden
                    >
                      <VerticalIcon name={v.icon} />
                    </span>
                    {v.eyebrow && (
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                        {v.eyebrow}
                      </span>
                    )}
                  </div>

                  {/* Mid — vertical name + short tagline */}
                  <h3 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
                    {v.name}
                  </h3>
                  <p className="mt-3 text-base text-white/70">
                    {v.shortTagline ?? v.tagline}
                  </p>

                  {/* Bottom — chips + arrow CTA pinned to bottom of the card */}
                  <div className="mt-auto pt-8">
                    {chips.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {chips.map((chip) => (
                          <span
                            key={chip}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/75"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold">
                      <span style={{ color: accent }}>Conocer</span>
                      <span
                        aria-hidden
                        className="text-white transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </div>
                  </div>

                  {/* Hover-only glow — radial in the accent color over the card */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse at top, ${accent}25, transparent 60%)`,
                    }}
                  />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
