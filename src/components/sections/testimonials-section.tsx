'use client'
// TestimonialsSection — 3-column testimonial grid with B2B placeholders.
// TODO: reemplazar con testimonios reales antes de publicar (nombre, cargo, empresa, cita, logo)
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const testimonials = [
  {
    quote:
      'Integraron IA a nuestra atención al paciente en cinco semanas. La tasa de resolución automática llegó a 87% sin perder calidad de servicio.',
    name: 'Pendiente',
    role: 'Gerencia de Operaciones',
    company: 'Sector salud',
  },
  {
    quote:
      'No nos venden el medio que más comisión deja, nos venden el que funciona. Esa diferencia se nota en el reporte mensual.',
    name: 'Pendiente',
    role: 'Dirección de Marketing',
    company: 'Sector entretenimiento',
  },
  {
    quote:
      'La activación BTL terminó siendo el evento más comentado de la feria. Y lo más importante: lo medimos. +340% en leads ese fin de semana.',
    name: 'Pendiente',
    role: 'Brand Manager',
    company: 'Sector consumo',
  },
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0, 0, 1] } },
}

function LogoSlot() {
  return (
    <div className="mb-5 flex h-7 w-24 items-center justify-center rounded border border-dashed border-gray-300 bg-gray-50">
      <span className="text-[9px] font-medium uppercase tracking-widest text-gray-400">Logo</span>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: 'var(--color-bg-landing)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12"
        >
          <h2 className="text-3xl font-black leading-tight tracking-tight text-text lg:text-4xl">
            Lo que dicen nuestros clientes.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={item}
              className="flex flex-col rounded-2xl border bg-white p-7"
              style={{ borderColor: 'var(--color-border-soft)' }}
            >
              <LogoSlot />

              <p className="flex-1 text-sm leading-relaxed text-text">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-6 border-t pt-4" style={{ borderColor: 'var(--color-border-soft)' }}>
                <p className="text-sm font-semibold text-text">{t.name}</p>
                <p className="text-xs text-text-secondary">
                  {t.role} · {t.company}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
