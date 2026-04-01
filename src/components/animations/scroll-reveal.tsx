// src/components/animations/scroll-reveal.tsx
// Framer Motion scroll-triggered entrance animation wrapper.
// Use this for ALL section content below the fold.
// For above-fold (Hero), use initial/animate directly — NOT this component.
'use client'

import { motion } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  /** Override y-offset (default 30px). Set to 0 for fade-only on mobile. */
  y?: number
}

export function ScrollReveal({ children, delay = 0, className, y = 30 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
