'use client'
// ComparisonSection — side-by-side cards: sin Belgrano (pink) vs con Belgrano (green).
import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'

const without = [
  'Pauta dispersa sin estrategia integrada',
  'Sin data de audiencias ni segmentación',
  'Múltiples proveedores que no se hablan',
  'IA como buzzword, sin aplicación real',
  'Activaciones que no se miden',
]

const with_ = [
  'Mix de medios planificado con data real',
  'Segmentación inteligente con Belgrano Intelligence',
  'Un solo operador para media, IA y brand',
  'IA integrada a tus sistemas y medible',
  'Activaciones BTL con KPIs definidos antes de salir',
]

export function ComparisonSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12"
        >
          <h2 className="text-3xl font-black leading-tight tracking-tight text-text lg:text-4xl">
            Así se ve tu marca{' '}
            <span className="text-text-secondary">sin</span> y{' '}
            <span>con</span> Belgrano.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Sin Belgrano */}
          <motion.div
            initial={{ x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="rounded-2xl border p-8"
            style={{
              background: 'var(--color-accent-pink)',
              borderColor: 'rgba(0,0,0,0.06)',
            }}
          >
            <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-[#7a4040]">
              Sin Belgrano
            </p>
            <ul className="space-y-3">
              {without.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c47070]/30">
                    <X className="h-3 w-3 text-[#c47070]" />
                  </span>
                  <span className="text-sm leading-relaxed text-[#5a3030]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Con Belgrano */}
          <motion.div
            initial={{ x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
            className="rounded-2xl border p-8"
            style={{
              background: 'var(--color-accent-green)',
              borderColor: 'rgba(0,0,0,0.06)',
            }}
          >
            <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-[#2d6645]">
              Con Belgrano
            </p>
            <ul className="space-y-3">
              {with_.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4a9966]/30">
                    <Check className="h-3 w-3 text-[#4a9966]" />
                  </span>
                  <span className="text-sm leading-relaxed text-[#1e4a30]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
