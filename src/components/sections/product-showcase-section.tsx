'use client'
// ProductShowcaseSection — large mockup + 3 feature bullets (template-1 style).
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const features = [
  {
    title: 'IA a medida',
    desc: 'Construimos agentes y modelos adaptados a tus procesos, no plataformas genéricas.',
  },
  {
    title: 'Integración a tus sistemas',
    desc: 'CRM, ERP, bases de datos, APIs. La IA se conecta a lo que ya usas.',
  },
  {
    title: 'Capacitamos a tu equipo',
    desc: 'Academy forma a las personas que van a operar la tecnología. Sin dependencia eterna.',
  },
]

function DashboardMockup() {
  return (
    <div
      className="w-full rounded-2xl border overflow-hidden bg-white"
      style={{ borderColor: 'var(--color-border-soft)', aspectRatio: '16/10' }}
      aria-hidden="true"
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between border-b px-5 py-3"
        style={{ borderColor: 'var(--color-border-soft)' }}
      >
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-[#111827]" />
          <div className="h-2 w-24 rounded-full bg-[#e2e2e2]" />
        </div>
        <div className="flex gap-2">
          <div className="h-2 w-12 rounded-full bg-[#e2e2e2]" />
          <div className="h-2 w-16 rounded-full bg-[#e2e2e2]" />
        </div>
      </div>

      {/* Body */}
      <div className="flex h-full">
        {/* Sidebar */}
        <div
          className="w-14 shrink-0 border-r py-4 space-y-3 px-3"
          style={{ borderColor: 'var(--color-border-soft)' }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-8 w-8 rounded-lg ${i === 1 ? 'bg-[#111827]' : 'bg-[#f3f3f3]'}`}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Conversaciones', val: '12.4K' },
              { label: 'Resolución IA', val: '87%' },
              { label: 'Tiempo resp.', val: '1.2s' },
            ].map(({ label, val }) => (
              <div
                key={label}
                className="rounded-xl border p-3"
                style={{ borderColor: 'var(--color-border-soft)' }}
              >
                <p className="text-[10px] text-[#6b7280] mb-1">{label}</p>
                <p className="text-base font-bold text-[#111827]">{val}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div
            className="rounded-xl border p-4"
            style={{ borderColor: 'var(--color-border-soft)' }}
          >
            <div className="mb-3 h-2 w-24 rounded-full bg-[#e2e2e2]" />
            <div className="flex items-end gap-1.5 h-16">
              {[55, 70, 45, 85, 60, 95, 80, 70, 90, 65].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${h}%`,
                    background: i === 5 ? '#111827' : '#f3f3f3',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Table rows */}
          <div className="space-y-1.5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg px-2 py-1.5"
                style={{ background: 'var(--color-bg-landing)' }}
              >
                <div className="h-5 w-5 rounded-full bg-[#e2e2e2]" />
                <div className="h-2 flex-1 rounded-full bg-[#e2e2e2]" />
                <div className="h-2 w-12 rounded-full bg-[#e2e2e2]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProductShowcaseSection() {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: 'var(--color-bg-landing)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[3fr_2fr]">
          {/* Mockup */}
          <motion.div
            initial={{ x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <DashboardMockup />
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                Belgrano Intelligence
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-text lg:text-4xl">
                La inteligencia artificial puesta a trabajar por tu empresa.
              </h2>
            </div>

            <ul className="space-y-5">
              {features.map((f) => (
                <li key={f.title} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-text" />
                  <div>
                    <p className="font-semibold text-text">{f.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-text-secondary">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
