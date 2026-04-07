// src/components/ui/hero-mockups.tsx
// 4 vertical cards for the hero section.
// Shows benefitHeadline (big), name (brand label), tagline, metrics, and pill CTA.
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { verticales } from '@/lib/content/verticales'
import { VerticalIcon } from '@/components/ui/vertical-icon'

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
      className="mx-auto grid w-full max-w-7xl grid-cols-2 items-start gap-4 px-6 sm:px-8 lg:grid-cols-4 lg:gap-5 lg:px-12"
    >
      {verticales.map((vertical) => (
        <motion.div key={vertical.slug} variants={mockupVariants}>
          <Link href={`/verticales/${vertical.slug}`} className="group block">
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2, ease: easing }}
              className="overflow-hidden rounded-xl border border-white/10 bg-gray-950 shadow-lg shadow-black/20 transition-all duration-200 group-hover:border-white/25 group-hover:shadow-xl group-hover:shadow-black/30"
            >
              <div className="p-6 sm:p-7">
                {/* Icon */}
                <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-800 text-gray-300">
                  <VerticalIcon name={vertical.icon} className="h-6 w-6" />
                </div>

                {/* Benefit headline — the main message */}
                <h3 className="text-center text-lg font-black leading-tight tracking-tight text-white sm:text-xl">
                  {vertical.benefitHeadline}
                </h3>

                {/* Brand name — secondary label */}
                <p className="mt-1 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {vertical.name}
                </p>

                {/* Tagline */}
                <p className="mt-3 text-center text-xs leading-relaxed text-gray-400 sm:text-sm">
                  {vertical.tagline}
                </p>

                {/* 2 key metrics */}
                {vertical.metrics && vertical.metrics.length > 0 && (
                  <ul className="mt-4 space-y-2 border-t border-gray-800 pt-4">
                    {vertical.metrics.slice(0, 2).map((m) => (
                      <li key={m.value} className="flex items-center gap-2 text-[11px] text-gray-400 sm:text-xs">
                        <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-white/60" />
                        <span className="font-semibold text-white">{m.value}</span>
                        <span className="truncate">{m.label}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA — pill button */}
                <div className="mt-5">
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
