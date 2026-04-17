// src/components/sections/intelligence/intelligence-branches.tsx
// Premium variant of VerticalBranchesSection for Intelligence (AI Solutions + Academy).
// Light bg with accent-tinted cards, hover lift + glow, larger features list.
'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/container'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import type { VerticalBranch } from '@/lib/content/verticales'

const easing = [0.25, 0.1, 0.25, 1] as const

interface IntelligenceBranchesProps {
  branches: VerticalBranch[]
  accent?: string
}

export function IntelligenceBranches({
  branches,
  accent = '#A855F7',
}: IntelligenceBranchesProps) {
  if (!branches || branches.length === 0) return null

  return (
    <section className="bg-bg py-20 sm:py-24 lg:py-28">
      <Container>
        <ScrollReveal className="mb-14 text-center">
          <span
            className="text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            Dos ramas, un solo tronco
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Cómo trabaja Intelligence por dentro
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary">
            Una rama construye los sistemas que tu empresa va a operar todos los días.
            La otra forma a tu equipo para que los manejen sin depender de nosotros.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {branches.map((branch, i) => (
            <motion.div
              key={branch.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: easing }}
              whileHover={{ y: -4 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-bg-section p-8 transition-all duration-300"
              style={{
                borderColor: `${accent}22`,
                boxShadow: `0 1px 0 0 rgba(0,0,0,0.02)`,
              }}
            >
              {/* Hover glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(60% 50% at 50% 0%, ${accent}10 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10 flex h-full flex-col">
                {/* Branch label */}
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: accent }}
                >
                  {branch.name}
                </p>

                {/* Headline */}
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-text sm:text-3xl">
                  {branch.headline}
                </h3>

                {/* Description */}
                <p className="mt-4 text-base leading-relaxed text-text-secondary">
                  {branch.description}
                </p>

                {/* Features */}
                {branch.features && branch.features.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {branch.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-text"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-bg"
                          style={{ backgroundColor: accent }}
                        >
                          ✓
                        </span>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tags */}
                {branch.tags && branch.tags.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {branch.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
                        style={{
                          borderColor: `${accent}33`,
                          backgroundColor: `${accent}10`,
                          color: '#4a5568',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
