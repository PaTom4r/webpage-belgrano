// src/components/ui/hero-mockups.tsx
// 4 vertical cards for the hero section.
// Shows a HTML/CSS product mockup + brand label, benefit headline, tagline, and pill CTA.
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

const mockupVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easing },
  },
}

export function HeroMockups() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="mx-auto grid w-full max-w-7xl grid-cols-2 items-stretch gap-4 px-6 sm:px-8 lg:grid-cols-4 lg:gap-5 lg:px-12"
    >
      {verticales.map((vertical) => (
        <motion.div key={vertical.slug} variants={mockupVariants} className="h-full">
          <Link href={`/verticales/${vertical.slug}`} className="group block h-full">
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2, ease: easing }}
              className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-gray-950 shadow-lg shadow-black/20 transition-all duration-200 group-hover:border-white/25 group-hover:shadow-xl group-hover:shadow-black/30"
            >
              {/* Mockup area — edge-to-edge, top ~50% of card */}
              <VerticalMockup slug={vertical.slug} />

              {/* Text content — left-aligned, stretches to fill remaining height */}
              <div className="flex flex-1 flex-col p-5">
                {/* Brand label */}
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                  {vertical.name}
                </p>

                {/* Benefit headline */}
                <h3 className="mt-1.5 text-base font-black leading-tight tracking-tight text-white sm:text-lg">
                  {vertical.benefitHeadline}
                </h3>

                {/* Tagline */}
                <p className="mt-2 text-xs leading-relaxed text-gray-400 sm:text-sm">
                  {vertical.tagline}
                </p>

                {/* CTA pill — pushed to bottom */}
                <div className="mt-auto pt-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition-all duration-200 group-hover:border-white group-hover:bg-white group-hover:text-black">
                    Saber más →
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
