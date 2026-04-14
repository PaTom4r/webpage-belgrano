// src/components/ui/hero-mockups.tsx
// 3 equal vertical cards for the hero section.
// All cards: mockup expands from top on hover, title shifts up, description fades in.
'use client'

import { useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { verticales } from '@/lib/content/verticales'
import { VerticalMockup } from '@/components/ui/vertical-mockups'

const easing = [0.25, 0.1, 0.25, 1] as const

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
  tagline: string
  branches?: { name: string }[]
}

function VerticalHeroCard({ slug, name, benefitHeadline, tagline, branches }: CardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [spotlight, setSpotlight] = useState({ x: '50%', y: '50%' })
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const onEnter = useCallback(() => setIsHovered(true), [])
  const onLeave = useCallback(() => {
    setIsHovered(false)
    setTilt({ rx: 0, ry: 0 })
  }, [])
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setSpotlight({ x: `${x}px`, y: `${y}px` })
    // Normalized -0.5..0.5 → rotate up to 8deg
    const nx = x / rect.width - 0.5
    const ny = y / rect.height - 0.5
    setTilt({ rx: -ny * 8, ry: nx * 8 })
  }, [])

  const [prefix, ...rest] = name.split(' ')
  const verticalName = rest.join(' ')

  return (
    <Link
      href={`/verticales/${slug}`}
      className="group block h-full"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMouseMove}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-gray-950 shadow-lg shadow-black/20 transition-[border-color,box-shadow] duration-200 group-hover:border-white/25 group-hover:shadow-xl group-hover:shadow-black/30"
      >
        {/* Spotlight glow that follows cursor */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${spotlight.x} ${spotlight.y}, rgba(255,255,255,0.07), transparent 40%)`,
          }}
        />

        {/* Mockup expands from top on hover */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isHovered ? 'auto' : 0 }}
          transition={{ duration: 0.4, ease: easing }}
          style={{ overflow: 'hidden', flexShrink: 0 }}
        >
          <VerticalMockup slug={slug} />
        </motion.div>

        {/* Body */}
        <div className="relative z-10 flex flex-1 flex-col p-5">

          {/* Title — shifts up on hover */}
          <motion.div
            animate={isHovered ? { y: 0 } : { y: '30%' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
              {prefix}
            </p>
            <span className="block text-2xl font-black leading-none tracking-tight text-white sm:text-3xl">
              {verticalName}
            </span>
          </motion.div>

          {/* Description fades in on hover */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.25, delay: isHovered ? 0.18 : 0, ease: 'easeOut' }}
          >
            <h3 className="mt-3 text-base font-semibold leading-snug text-white/80">
              {benefitHeadline}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-400">
              {tagline}
            </p>
            {branches && branches.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {branches.map((b) => (
                  <span
                    key={b.name}
                    className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
                  >
                    {b.name}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* CTA */}
          <div className="mt-auto pt-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 group-hover:border-white group-hover:bg-white group-hover:text-black">
              Saber más →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export function HeroMockups() {
  const intelligence = verticales.find((v) => v.slug === 'intelligence')
  const media = verticales.find((v) => v.slug === 'media')
  const brand = verticales.find((v) => v.slug === 'brand')

  if (!intelligence || !media || !brand) return null

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-4 px-6 sm:px-8 md:grid-cols-3 lg:gap-5 lg:px-12"
    >
      <motion.div variants={itemVariants}>
        <VerticalHeroCard
          slug={intelligence.slug}
          name={intelligence.name}
          benefitHeadline={intelligence.benefitHeadline}
          tagline={intelligence.tagline}
          branches={intelligence.branches}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <VerticalHeroCard
          slug={media.slug}
          name={media.name}
          benefitHeadline={media.benefitHeadline}
          tagline={media.tagline}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <VerticalHeroCard
          slug={brand.slug}
          name={brand.name}
          benefitHeadline={brand.benefitHeadline}
          tagline={brand.tagline}
        />
      </motion.div>
    </motion.div>
  )
}
