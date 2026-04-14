'use client'
// StatsV2Section — light background version of the stats counters.
import { AnimatedCounter } from '@/components/animations/animated-counter'
import { motion } from 'framer-motion'

const stats = [
  { prefix: '$', target: 750, suffix: 'MM+', label: 'en pauta gestionada' },
  { prefix: '', target: 289, suffix: 'x', label: 'ROI máximo alcanzado' },
  { prefix: '', target: 500, suffix: 'K+', label: 'personas alcanzadas' },
  { prefix: '', target: 98, suffix: '%', label: 'satisfacción de clientes' },
]

export function StatsV2Section() {
  return (
    <section
      className="py-20 lg:py-28 border-y"
      style={{
        background: 'var(--color-bg-landing)',
        borderColor: 'var(--color-border-soft)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mb-12 text-xs font-semibold uppercase tracking-widest text-text-secondary"
        >
          Resultados que operamos para marcas líderes
        </motion.p>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeOut' }}
            >
              <p className="text-4xl font-black tracking-tight text-text lg:text-5xl">
                <AnimatedCounter
                  target={s.target}
                  prefix={s.prefix}
                  suffix={s.suffix}
                />
              </p>
              <p className="mt-1.5 text-sm text-text-secondary">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
