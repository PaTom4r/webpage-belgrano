// src/components/ui/vertical-card.tsx
// Horizontal accordion item — Apple Music / Stripe Connect style.
// Two visual states controlled by `expanded`:
//   compact  → SVG + name + short tagline
//   expanded → eyebrow + title + description + chips + mini mockup + case card + CTA
// Mobile (< md) renders fully expanded by default (handled by parent).
'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { Vertical } from '@/lib/content/verticales'
import { VerticalSvg } from '@/components/ui/vertical-svg'
import { VerticalMockup } from '@/components/ui/vertical-mockups'

interface VerticalCardProps {
  vertical: Vertical
  expanded: boolean
  onHover: () => void
  onLeave: () => void
  /** When true, ignore expand/compact and render the full panel (used on mobile). */
  alwaysExpanded?: boolean
}

const easing = [0.25, 0, 0, 1] as const

export function VerticalCard({
  vertical,
  expanded,
  onHover,
  onLeave,
  alwaysExpanded = false,
}: VerticalCardProps) {
  const accent = vertical.accentColor ?? '#ffffff'
  const isOpen = alwaysExpanded || expanded

  return (
    <motion.div
      layout
      transition={{ duration: 0.5, ease: easing }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className="group relative flex min-h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#161618] shadow-lg shadow-black/20 transition-colors duration-300 hover:border-white/25"
      style={{
        flexGrow: alwaysExpanded ? 1 : isOpen ? 3 : 1,
        flexBasis: 0,
      }}
    >
      {/* Accent glow when expanded */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: isOpen ? 0.18 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: `radial-gradient(80% 60% at 30% 0%, ${accent} 0%, transparent 70%)`,
        }}
      />

      {/* COMPACT layout */}
      {!isOpen && (
        <div className="relative z-10 flex w-full flex-col items-center justify-center p-6 text-center">
          <div style={{ color: accent }}>
            <VerticalSvg slug={vertical.slug} className="h-16 w-16" />
          </div>
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            {vertical.eyebrow}
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-white">
            {vertical.name.replace('Belgrano ', '')}
          </h3>
          <p className="mt-3 max-w-[18ch] text-sm leading-snug text-white/60">
            {vertical.shortTagline ?? vertical.tagline}
          </p>
        </div>
      )}

      {/* EXPANDED layout */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="relative z-10 flex w-full flex-col gap-5 p-7 lg:p-8"
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: accent }}
                >
                  {vertical.eyebrow}
                </p>
                <h3 className="mt-1 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  {vertical.name}
                </h3>
              </div>
              <div style={{ color: accent }} className="flex-shrink-0">
                <VerticalSvg slug={vertical.slug} className="h-14 w-14 sm:h-16 sm:w-16" />
              </div>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-white/75 lg:text-base">
              {vertical.benefitHeadline}
            </p>

            {/* Chips */}
            {vertical.chips && vertical.chips.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {vertical.chips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold"
                    style={{
                      borderColor: `${accent}55`,
                      backgroundColor: `${accent}14`,
                      color: '#ffffff',
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}

            {/* Mini mockup */}
            <div className="overflow-hidden rounded-xl border border-white/10">
              <VerticalMockup slug={vertical.slug} />
            </div>

            {/* Case card */}
            {vertical.caseCard && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className="text-2xl leading-none">
                    {vertical.caseCard.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white">
                      {vertical.caseCard.title}
                    </p>
                    <p className="mt-0.5 text-xs text-white/70">
                      {vertical.caseCard.metric}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-white/40">
                      {vertical.caseCard.footnote}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CTA — pinned at end via mt-auto */}
            <Link
              href={`/verticales/${vertical.slug}`}
              className="mt-auto inline-flex items-center gap-1.5 self-start rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white hover:text-black"
            >
              Ver {vertical.name.replace('Belgrano ', '')}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
