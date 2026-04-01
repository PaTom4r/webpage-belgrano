// src/components/ui/hero-mockups.tsx
// 4 mini browser window mockups for the hero section.
// Each shows real vertical data (icon, name, tagline, metrics, CTA).
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

function BrowserChrome() {
  return (
    <div className="flex items-center gap-1.5 border-b border-gray-800 bg-gray-950 px-3 py-2">
      <div className="h-2 w-2 rounded-full" style={{ background: '#FF5F57' }} />
      <div className="h-2 w-2 rounded-full" style={{ background: '#FEBC2E' }} />
      <div className="h-2 w-2 rounded-full" style={{ background: '#28C840' }} />
      <div className="ml-2 h-3.5 flex-1 rounded bg-gray-800" />
    </div>
  )
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
          <Link
            href={`/verticales/${vertical.slug}`}
            className="group block"
          >
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2, ease: easing }}
              className="overflow-hidden rounded-xl bg-gray-950 shadow-lg shadow-black/20 transition-shadow group-hover:shadow-xl group-hover:shadow-black/30"
            >
              <BrowserChrome />
              <div className="p-4 sm:p-5">
                {/* Icon */}
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-300">
                  <VerticalIcon name={vertical.icon} className="h-5 w-5" />
                </div>

                {/* Name */}
                <h3 className="text-sm font-extrabold tracking-tight text-white sm:text-base">
                  {vertical.name}
                </h3>

                {/* Tagline */}
                <p className="mt-1 text-xs leading-relaxed text-gray-400 sm:text-sm">
                  {vertical.tagline}
                </p>

                {/* 2 key metrics */}
                {vertical.metrics && vertical.metrics.length > 0 && (
                  <ul className="mt-3 space-y-1.5 border-t border-gray-800 pt-3">
                    {vertical.metrics.slice(0, 2).map((m) => (
                      <li key={m.value} className="flex items-center gap-1.5 text-[11px] text-gray-400 sm:text-xs">
                        <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-white" />
                        <span className="font-semibold text-white">{m.value}</span>
                        <span className="truncate">{m.label}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                <p className="mt-3 text-xs font-semibold text-white transition-opacity group-hover:opacity-60 sm:text-sm">
                  Saber más →
                </p>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
