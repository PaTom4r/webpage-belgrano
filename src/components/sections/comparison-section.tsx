'use client'
// ComparisonSection — side-by-side cards: sin Belgrano (pink) vs con Belgrano (green).
import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'

const without = [
  'Cinco proveedores distintos que no comparten data',
  'Reportes que llegan tarde y no se accionan',
  'Pauta que se decide por costumbre, no por audiencia',
  'IA como demo bonita que nunca se conecta al CRM',
  'Activaciones BTL sin métricas claras de retorno',
]

const with_ = [
  'Un solo equipo que opera medios, IA y activaciones',
  'Dashboards en vivo, decisiones cada semana',
  'Mix de medios planificado con data de audiencia real',
  'Agentes de IA integrados a tu CRM y medibles desde día 1',
  'Activaciones BTL con KPIs definidos antes de salir a terreno',
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
          className="mb-10"
        >
          <h2 className="text-3xl font-black leading-tight tracking-tight text-text lg:text-4xl">
            Así se ve tu marca{' '}
            <span className="text-text-secondary">sin</span> y{' '}
            <span className="relative inline-block">
              con
              <span
                className="absolute bottom-0.5 left-0 w-full rounded-full"
                style={{ height: '3px', background: 'var(--color-text)' }}
              />
            </span>{' '}
            Belgrano.
          </h2>
        </motion.div>

        {/* Visual: 5 dots scattered → 1 Belgrano logo */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10 flex items-center justify-center gap-6 lg:gap-10"
          aria-hidden="true"
        >
          <div className="flex items-center gap-2">
            {['A', 'B', 'C', 'D', 'E'].map((l, i) => (
              <div
                key={l}
                className="flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold text-text-secondary"
                style={{
                  background: 'var(--color-accent-pink)',
                  borderColor: 'rgba(0,0,0,0.06)',
                  transform: `translateY(${[0, -6, 4, -2, 6][i]}px) rotate(${[-4, 3, -2, 5, -3][i]}deg)`,
                }}
              >
                {l}
              </div>
            ))}
          </div>
          <svg className="h-6 w-10 shrink-0 text-text-secondary" viewBox="0 0 40 24" fill="none">
            <path d="M2 12 H32 M24 5 L34 12 L24 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div
            className="flex h-12 items-center justify-center rounded-xl border px-5 text-sm font-black uppercase tracking-tight text-text"
            style={{ background: 'var(--color-accent-green)', borderColor: 'rgba(0,0,0,0.06)' }}
          >
            Belgrano
          </div>
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
