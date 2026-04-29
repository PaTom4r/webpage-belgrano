// src/components/ui/hero-mockups.tsx
// Horizontal accordion of 3 hero cards (Intelligence / Media / Brand).
// On hover, the active card grows (flexGrow: 2.2), others shrink (flexGrow: 1).
// Default expanded card: Intelligence. Mouse leaving the row resets to default.
// On mobile (< md): all 3 stack vertically and render fully expanded.
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { verticales } from '@/lib/content/verticales'
import {
  IntelligenceMockup,
  MediaMockup,
  BrandMockup,
} from '@/components/ui/hero-mockups-v2'

const easing = [0.25, 0, 0, 1] as const

const containerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.5 },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: easing },
  },
}

interface CardProps {
  slug: string
  name: string
  benefitHeadline: string
  shortTagline?: string
  eyebrow?: string
  chips?: string[]
  accentColor?: string
  mockupContent: React.ReactNode
  expanded: boolean
  onHover: () => void
  /** When true, ignore expand/compact and render the full panel (used on mobile). */
  alwaysExpanded?: boolean
}

function VerticalHeroCard({
  slug,
  name,
  benefitHeadline,
  shortTagline,
  eyebrow,
  chips,
  accentColor,
  mockupContent,
  expanded,
  onHover,
  alwaysExpanded = false,
}: CardProps) {
  const accent = accentColor ?? '#ffffff'
  const isOpen = alwaysExpanded || expanded
  const [prefix, ...rest] = name.split(' ')
  const verticalName = rest.join(' ')

  return (
    <Link
      href={`/${slug}`}
      onMouseEnter={onHover}
      onFocus={onHover}
      className="group block h-full"
    >
      <motion.div
        layout
        transition={{ duration: 0.5, ease: easing }}
        className="relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-xl border bg-gray-950 shadow-lg shadow-black/20 transition-colors duration-300"
        style={{
          borderColor: isOpen ? `${accent}55` : 'rgba(255,255,255,0.10)',
        }}
      >
        {/* Accent radial glow — only when expanded */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isOpen ? 0.12 : 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(70% 50% at 30% 0%, ${accent} 0%, transparent 70%)`,
          }}
        />

        {/* Mockup — visible only when expanded */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="mockup"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: easing }}
              className="relative z-10 flex-shrink-0 overflow-hidden"
            >
              {mockupContent}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Body — two layouts based on isOpen */}
        {!isOpen ? (
          // COMPACT
          <div className="relative z-10 flex flex-1 flex-col items-start justify-end gap-1.5 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
              {prefix}
            </p>
            <span className="text-2xl font-black leading-none tracking-tight text-white sm:text-3xl">
              {verticalName}
            </span>
            {shortTagline && (
              <p className="mt-2 line-clamp-2 text-sm leading-snug text-white/60">
                {shortTagline}
              </p>
            )}
          </div>
        ) : (
          // EXPANDED
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative z-10 flex flex-1 flex-col gap-3 p-5"
          >
            <div>
              {eyebrow && (
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: accent }}
                >
                  {eyebrow}
                </p>
              )}
              <h3 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
                {name}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-white/80">
              {benefitHeadline}
            </p>
            {chips && chips.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {chips.slice(0, 5).map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold"
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
            <span className="mt-auto inline-flex items-center gap-1.5 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 group-hover:border-white group-hover:bg-white group-hover:text-black">
              Saber más →
            </span>
          </motion.div>
        )}
      </motion.div>
    </Link>
  )
}

export function HeroMockups() {
  const [hoveredId, setHoveredId] = useState<string>('intelligence')

  const intelligence = verticales.find((v) => v.slug === 'intelligence')
  const media = verticales.find((v) => v.slug === 'media')
  const brand = verticales.find((v) => v.slug === 'brand')

  if (!intelligence || !media || !brand) return null

  const items = [
    { vertical: intelligence, mockupContent: <IntelligenceMockup /> },
    { vertical: media,        mockupContent: <MediaMockup /> },
    { vertical: brand,        mockupContent: <BrandMockup /> },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12"
    >
      {/* Mobile: stacked, all expanded */}
      <div className="flex flex-col gap-4 md:hidden">
        {items.map(({ vertical, mockupContent }) => (
          <motion.div key={vertical.slug} variants={itemVariants}>
            <VerticalHeroCard
              slug={vertical.slug}
              name={vertical.name}
              benefitHeadline={vertical.benefitHeadline}
              shortTagline={vertical.shortTagline}
              eyebrow={vertical.eyebrow}
              chips={vertical.chips}
              accentColor={vertical.accentColor}
              mockupContent={mockupContent}
              expanded
              onHover={() => undefined}
              alwaysExpanded
            />
          </motion.div>
        ))}
      </div>

      {/* Desktop: horizontal accordion */}
      <motion.div
        layout
        className="hidden gap-4 md:flex"
        onMouseLeave={() => setHoveredId('intelligence')}
      >
        {items.map(({ vertical, mockupContent }) => (
          <motion.div
            key={vertical.slug}
            layout
            style={{
              flexGrow: hoveredId === vertical.slug ? 2.2 : 1,
              flexBasis: 0,
            }}
            transition={{ duration: 0.5, ease: easing }}
            variants={itemVariants}
            className="min-w-0"
          >
            <VerticalHeroCard
              slug={vertical.slug}
              name={vertical.name}
              benefitHeadline={vertical.benefitHeadline}
              shortTagline={vertical.shortTagline}
              eyebrow={vertical.eyebrow}
              chips={vertical.chips}
              accentColor={vertical.accentColor}
              mockupContent={mockupContent}
              expanded={hoveredId === vertical.slug}
              onHover={() => setHoveredId(vertical.slug)}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
