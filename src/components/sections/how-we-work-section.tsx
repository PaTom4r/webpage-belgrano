'use client'
// HowWeWorkSection — 4 pasos horizontales: Diagnóstico → Plan → Operación → Reporting.
// id="proceso" para anchor desde Hero CTA secundario.
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Search, Map, Cog, BarChart3 } from 'lucide-react'

const steps = [
  {
    n: '01',
    Icon: Search,
    title: 'Diagnóstico',
    desc: 'Entendemos tu negocio, tu audiencia y las métricas que ya tienes. Si algo no se mide, lo identificamos.',
  },
  {
    n: '02',
    Icon: Map,
    title: 'Plan',
    desc: 'Diseñamos el mix: medios, IA y activaciones. KPIs definidos antes de gastar el primer peso.',
  },
  {
    n: '03',
    Icon: Cog,
    title: 'Operación',
    desc: 'Ejecutamos pauta, agentes y activaciones. Tú apruebas hitos clave, nosotros sostenemos el día a día.',
  },
  {
    n: '04',
    Icon: BarChart3,
    title: 'Reporting',
    desc: 'Dashboards en vivo, reuniones semanales. Decisiones basadas en data, no en opiniones.',
  },
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0, 0, 1] } },
}

export function HowWeWorkSection() {
  return (
    <section id="proceso" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-secondary">
            Cómo trabajamos
          </p>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-text lg:text-4xl">
            Cuatro pasos. Un solo equipo de punta a punta.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map(({ n, Icon, title, desc }) => (
            <motion.div
              key={n}
              variants={item}
              className="flex flex-col rounded-2xl border bg-white p-6 transition-shadow hover:shadow-md"
              style={{ borderColor: 'var(--color-border-soft)' }}
            >
              <div className="mb-5 flex items-start justify-between">
                <span className="text-3xl font-black tracking-tighter text-text-secondary/40">
                  {n}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-text">
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-black leading-tight tracking-tight text-text">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
