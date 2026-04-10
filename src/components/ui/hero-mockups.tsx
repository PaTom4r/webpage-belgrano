// src/components/ui/hero-mockups.tsx
// 3 vertical cards for the hero section — asymmetric hierarchical layout.
// Intelligence is the featured card (larger, spans 2 rows on desktop).
// Media + Brand are secondary cards on the right column.
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { verticales } from '@/lib/content/verticales'
import { VerticalMockup } from '@/components/ui/vertical-mockups'

const easing = [0.25, 0.1, 0.25, 1] as const

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easing },
  },
}

interface CardProps {
  slug: string
  name: string
  benefitHeadline: string
  tagline: string
  featured?: boolean
  branches?: { name: string }[]
}

function VerticalHeroCard({ slug, name, benefitHeadline, tagline, featured, branches }: CardProps) {
  return (
    <Link href={`/verticales/${slug}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.2, ease: easing }}
        className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-gray-950 shadow-lg shadow-black/20 transition-all duration-200 group-hover:border-white/25 group-hover:shadow-xl group-hover:shadow-black/30"
      >
        <VerticalMockup slug={slug} />

        <div className="flex flex-1 flex-col p-4">
          <h3
            className={`mt-0 font-black leading-tight tracking-tight text-white ${
              featured ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-base sm:text-lg'
            }`}
          >
            {benefitHeadline}
          </h3>

          <p
            className={`mt-2 leading-relaxed text-gray-400 ${
              featured ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'
            }`}
          >
            {tagline}
          </p>

          {/* Branch chips — only for featured (Intelligence) */}
          {featured && branches && branches.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {branches.map((b) => (
                <span
                  key={b.name}
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white"
                >
                  {b.name}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto pt-4">
            <span className={`inline-flex items-center gap-1.5 rounded-full border border-white/20 font-semibold text-white transition-all duration-200 group-hover:border-white group-hover:bg-white group-hover:text-black ${featured ? 'px-5 py-2.5 text-sm' : 'px-4 py-2 text-xs'}`}>
              Saber más →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export function HeroMockups() {
  const media = verticales.find((v) => v.slug === 'media')
  const intelligence = verticales.find((v) => v.slug === 'intelligence')
  const brand = verticales.find((v) => v.slug === 'brand')

  if (!media || !intelligence || !brand) return null

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-4 px-6 sm:px-8 md:h-[500px] md:grid-cols-3 md:grid-rows-2 lg:gap-5 lg:px-12"
    >
      {/* Intelligence — featured, spans 2 rows on desktop, ocupa 2 columnas para ser más ancho */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-2 md:row-span-2"
      >
        <VerticalHeroCard
          slug={intelligence.slug}
          name={intelligence.name}
          benefitHeadline={intelligence.benefitHeadline}
          tagline={intelligence.tagline}
          featured
          branches={intelligence.branches}
        />
      </motion.div>

      {/* Media — top right */}
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
        <VerticalHeroCard
          slug={media.slug}
          name={media.name}
          benefitHeadline={media.benefitHeadline}
          tagline={media.tagline}
        />
      </motion.div>

      {/* Brand — bottom right */}
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
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
