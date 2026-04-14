'use client'
// FeaturesGridSection — 2×2 card grid, "Construido para marcas que operan en serio".
import { motion } from 'framer-motion'
import { Brain, Monitor, Megaphone, GraduationCap } from 'lucide-react'
import { verticales } from '@/lib/content/verticales'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Monitor,
  Megaphone,
  GraduationCap,
}

const cards = [
  ...verticales.map((v) => ({
    icon: v.icon,
    title: v.name,
    desc: v.tagline,
  })),
  {
    icon: 'GraduationCap',
    title: 'Belgrano Academy',
    desc: 'Formación certificada para que tu equipo opere IA de verdad en su trabajo diario.',
  },
]

import type { Variants } from 'framer-motion'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0, 0, 1] } },
}

export function FeaturesGridSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12 max-w-xl"
        >
          <h2 className="text-3xl font-black leading-tight tracking-tight text-text lg:text-4xl">
            Construido para marcas que operan en serio.
          </h2>
          <p className="mt-3 text-base text-text-secondary">
            Un grupo con tres verticales integradas y un objetivo: que tu marca crezca de forma medible.
          </p>
        </motion.div>

        {/* 2×2 grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map((card) => {
            const Icon = iconMap[card.icon] ?? Brain
            return (
              <motion.div
                key={card.title}
                variants={item}
                className="rounded-2xl border p-6 transition-shadow hover:shadow-md"
                style={{
                  background: 'var(--color-bg-landing)',
                  borderColor: 'var(--color-border-soft)',
                }}
              >
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-text">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-base font-bold text-text">{card.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{card.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
