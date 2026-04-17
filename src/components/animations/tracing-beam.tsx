// src/components/animations/tracing-beam.tsx
// Vertical scroll-driven beam that lights up as the user scrolls through children.
// Inspired by Aceternity UI's TracingBeam — Framer Motion + SVG, no extra deps.
// Wraps a vertical stack of sections; the gradient grows from top to bottom.
// Respects prefers-reduced-motion (line stays static).
'use client'

import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion'

interface TracingBeamProps {
  children: React.ReactNode
  /** Hex color for the beam gradient (default: Intelligence purple). */
  accent?: string
  /** Secondary stop color in the gradient (default: pink for premium feel). */
  accentSecondary?: string
  className?: string
}

export function TracingBeam({
  children,
  accent = '#A855F7',
  accentSecondary = '#FF8FFF',
  className = '',
}: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [svgHeight, setSvgHeight] = useState(0)
  const reduced = useReducedMotion()

  // Measure inner content height to size the SVG path correctly.
  useEffect(() => {
    if (!contentRef.current) return
    const update = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight)
      }
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(contentRef.current)
    return () => observer.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 30%', 'end end'],
  })

  // Smoothed progress for buttery beam motion.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 500,
    damping: 90,
  })

  // Gradient endpoints follow the smoothed progress.
  const y1 = useTransform(smooth, [0, 0.8], [50, svgHeight - 50])
  const y2 = useTransform(smooth, [0, 1], [50, svgHeight])

  return (
    <div ref={ref} className={`relative mx-auto w-full ${className}`}>
      {/* Beam column — hidden on small screens (page just stacks) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-0 hidden h-full md:block lg:left-8"
      >
        {/* Pin at the top */}
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? 'none'
                : `rgba(0, 0, 0, 0.24) 0px 3px 8px`,
          }}
          className="ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            animate={{
              backgroundColor:
                scrollYProgress.get() > 0 ? 'white' : accent,
              borderColor:
                scrollYProgress.get() > 0 ? 'white' : accent,
            }}
            className="h-2 w-2 rounded-full border"
            style={{ backgroundColor: accent, borderColor: accent }}
          />
        </motion.div>

        {/* Vertical line — gray static + animated colored gradient */}
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          {/* Static faint base line */}
          <motion.path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            strokeWidth="1.25"
          />
          {/* Animated colored line that brightens with scroll */}
          {!reduced && (
            <motion.path
              d={`M 1 0 V ${svgHeight}`}
              fill="none"
              stroke="url(#beamGradient)"
              strokeWidth="1.25"
              transition={{ duration: 10 }}
            />
          )}
          <defs>
            <motion.linearGradient
              id="beamGradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor={accent} stopOpacity="0" />
              <stop stopColor={accent} />
              <stop offset="0.325" stopColor={accentSecondary} />
              <stop offset="1" stopColor={accent} stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>

      {/* Children rendered with content ref so we can measure height */}
      <div ref={contentRef}>{children}</div>
    </div>
  )
}
