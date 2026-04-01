// src/components/ui/vertical-card.tsx
// Single vertical service card with hover micro-animation.
// Framer Motion owns the hover — do NOT add Tailwind hover:scale-* here.
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Vertical } from '@/lib/content/verticales'
import { VerticalIcon } from '@/components/ui/vertical-icon'

interface VerticalCardProps {
  vertical: Vertical
}

export function VerticalCard({ vertical }: VerticalCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex flex-col rounded-2xl border border-border bg-bg p-8 shadow-sm"
    >
      {/* Icon */}
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-bg-section text-text">
        <VerticalIcon name={vertical.icon} className="h-6 w-6" />
      </div>

      {/* Name + tagline */}
      <h3 className="text-lg font-bold tracking-tight text-text">
        {vertical.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-text-secondary">
        {vertical.tagline}
      </p>

      {/* Description */}
      <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
        {vertical.description}
      </p>

      {/* Metrics (if any) */}
      {vertical.metrics && vertical.metrics.length > 0 && (
        <ul className="mt-5 flex flex-col gap-1.5">
          {vertical.metrics.map((m) => (
            <li key={m.value} className="flex items-center gap-2 text-xs text-text-secondary">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-semibold">{m.value}</span>&nbsp;{m.label}
            </li>
          ))}
        </ul>
      )}

      {/* CTA link */}
      <Link
        href={`/verticales/${vertical.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-text transition-opacity hover:opacity-60"
      >
        Saber más
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </motion.div>
  )
}
