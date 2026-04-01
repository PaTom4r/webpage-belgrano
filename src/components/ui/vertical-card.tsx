// src/components/ui/vertical-card.tsx
// Single vertical service card with hover micro-animation.
// Framer Motion owns the hover — do NOT add Tailwind hover:scale-* here.
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Vertical } from '@/lib/content/verticales'

// Icon map: inline SVG icons for 4 Lucide-style icons.
// Avoids importing the full lucide-react library for just 4 icons.
function VerticalIcon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    MessageCircle: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    Monitor: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    Film: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="2" width="20" height="20" rx="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="7" x2="22" y2="7" /><line x1="17" y1="17" x2="22" y2="17" />
      </svg>
    ),
    GraduationCap: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  }
  return <>{icons[name] ?? null}</>
}

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
