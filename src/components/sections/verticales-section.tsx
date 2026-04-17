// src/components/sections/verticales-section.tsx
// Horizontal accordion of 3 verticals. On hover, the active card grows (flex-grow: 3),
// others shrink (flex-grow: 1). On mobile (< md) the accordion is disabled and all
// cards stack vertically, fully expanded.
// The cards container has a scroll-triggered 3D entry animation (rotateY + rotateX + scale)
// that resolves to identity once the section reaches center of viewport.
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { verticales } from '@/lib/content/verticales'
import { VerticalCard } from '@/components/ui/vertical-card'
import { ScrollReveal } from '@/components/animations/scroll-reveal'

export function VerticalesSection() {
  const [hoveredId, setHoveredId] = useState<string | null>('intelligence')
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // Detect mobile to skip rotation (only opacity + y on small screens)
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    setIsMobile(mql.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  const rotateY = useTransform(scrollYProgress, [0, 1], [-35, 0])
  const rotateX = useTransform(scrollYProgress, [0, 1], [12, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])
  const y = useTransform(scrollYProgress, [0, 1], [80, 0])

  // On mobile or reduced motion: only opacity + y
  const motionStyle =
    reduced || isMobile
      ? { opacity, y }
      : { rotateY, rotateX, scale, opacity, y, transformPerspective: 1400 }

  return (
    <section
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      className="bg-dark py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="mb-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
            Qué hacemos
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.05} className="text-center">
          <h2
            id="what-we-do-heading"
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Tres verticales.{' '}
            <br className="hidden sm:block" />
            Una sola inteligencia.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="mb-12 text-center sm:mb-16">
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Belgrano Media, Intelligence y Brand: medios tradicionales y digitales,
            IA aplicada y experiencias de marca — todo integrado en un solo equipo.
          </p>
        </ScrollReveal>

        {/* Mobile: stacked, fully expanded — sin animación 3D */}
        <div className="flex flex-col gap-4 md:hidden">
          {verticales.map((vertical) => (
            <VerticalCard
              key={vertical.slug}
              vertical={vertical}
              expanded={true}
              onHover={() => undefined}
              onLeave={() => undefined}
              alwaysExpanded
            />
          ))}
        </div>

        {/* Desktop: horizontal accordion con 3D entry animation */}
        <motion.div
          ref={sectionRef}
          style={motionStyle}
          className="hidden md:block"
        >
          <motion.div
            layout
            className="flex gap-4"
            onMouseLeave={() => setHoveredId('intelligence')}
          >
            {verticales.map((vertical, i) => (
              <motion.div
                key={vertical.slug}
                style={{ flexGrow: hoveredId === vertical.slug ? 3 : 1, flexBasis: 0 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="min-w-0"
              >
                <VerticalCard
                  vertical={vertical}
                  expanded={hoveredId === vertical.slug}
                  onHover={() => setHoveredId(vertical.slug)}
                  onLeave={() => undefined}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
