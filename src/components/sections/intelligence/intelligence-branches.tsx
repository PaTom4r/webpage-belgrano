// src/components/sections/intelligence/intelligence-branches.tsx
// AI Solutions + Academy branches, styled like BusinessSuite cards on the home:
// dark bg + accent-tinted gradient + glass border + hover-lift + accent glow.
'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Container } from '@/components/layout/container'
import type { VerticalBranch } from '@/lib/content/verticales'

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
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const cardItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
}

interface IntelligenceBranchesProps {
  branches: VerticalBranch[]
  accent?: string
}

export function IntelligenceBranches({
  branches,
  accent = '#A855F7',
}: IntelligenceBranchesProps) {
  const reduceMotion = useReducedMotion()
  const initial = reduceMotion ? 'visible' : 'hidden'

  if (!branches || branches.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-dark py-20 sm:py-24 lg:py-28">
      {/* Subtle accent glow at top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at top, ${accent}1A 0%, transparent 60%)`,
        }}
      />

      <Container>
        <motion.div
          className="mb-14 mx-auto max-w-3xl text-center"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headingContainer}
        >
          <motion.span
            variants={headingChild}
            className="text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            Dos ramas, un solo tronco
          </motion.span>
          <motion.h2
            variants={headingChild}
            className="mt-3 font-black uppercase leading-[0.95] tracking-tighter text-white text-3xl sm:text-4xl lg:text-5xl"
            style={{ letterSpacing: '-0.035em' }}
          >
            Cómo trabaja Intelligence por dentro
          </motion.h2>
          <motion.p
            variants={headingChild}
            className="mt-5 text-base text-white/70 sm:text-lg"
          >
            Una rama construye los sistemas que tu empresa va a operar todos
            los días. La otra forma a tu equipo para que los manejen sin
            depender de nosotros.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:gap-8"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridContainer}
        >
          {branches.map((branch) => (
            <motion.div key={branch.name} variants={cardItem}>
              <div
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] sm:p-8 lg:p-10"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${accent}10 0%, transparent 60%)`,
                }}
              >
                {/* Branch label eyebrow */}
                <span
                  className="text-xs font-semibold uppercase tracking-[0.16em]"
                  style={{ color: accent }}
                >
                  {branch.name}
                </span>

                {/* Headline */}
                <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                  {branch.headline}
                </h3>

                {/* Description */}
                <p className="mt-3 text-base text-white/70">
                  {branch.description}
                </p>

                {/* Features */}
                {branch.features && branch.features.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {branch.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-white/85"
                      >
                        <span
                          aria-hidden
                          className="mt-0.5 flex size-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-black"
                          style={{ backgroundColor: accent }}
                        >
                          ✓
                        </span>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tags chips — pinned to bottom */}
                {branch.tags && branch.tags.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-2 pt-8">
                    {branch.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Hover-only glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at top, ${accent}25, transparent 60%)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
