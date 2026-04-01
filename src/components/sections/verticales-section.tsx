// src/components/sections/verticales-section.tsx
// 4-column card grid with Framer Motion stagger entrance.
// Section heading reveals via ScrollReveal (whileInView).
// Cards stagger via containerVariants (staggerChildren: 0.1).
'use client'

import { motion } from 'framer-motion'
import { verticales } from '@/lib/content/verticales'
import { VerticalCard } from '@/components/ui/vertical-card'
import { ScrollReveal } from '@/components/animations/scroll-reveal'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
}

export function VerticalesSection() {
  return (
    <section
      id="what-we-do"
      className="bg-bg-section py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="mb-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
            Qué hacemos
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.05} className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
            Cuatro verticales.{' '}
            <br className="hidden sm:block" />
            Un solo equipo.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="mb-16 text-center">
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            Automatización conversacional, señalética digital, producción de contenido y formación en IA — todo integrado.
          </p>
        </ScrollReveal>

        {/* Card grid with stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {verticales.map((vertical) => (
            <motion.div key={vertical.slug} variants={itemVariants}>
              <VerticalCard vertical={vertical} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
