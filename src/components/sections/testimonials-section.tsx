'use client'
// TestimonialsSection — 3-column testimonial grid with placeholder data.
// TODO: reemplazar con testimonios reales (nombre, cargo, empresa, cita)
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote:
      'Belgrano integró IA a nuestro proceso de atención al cliente en menos de un mes. La tasa de resolución automática subió a 87%.',
    name: 'Nombre Apellido',
    role: 'Gerente de Operaciones',
    company: 'Empresa A',
  },
  {
    quote:
      'La planificación de medios que hacen es diferente — no nos venden lo que más comisión deja, nos venden lo que funciona. Eso vale.',
    name: 'Nombre Apellido',
    role: 'Directora de Marketing',
    company: 'Empresa B',
  },
  {
    quote:
      'La activación BTL que diseñaron se convirtió en el evento más hablado de la feria. Y lo medimos: +340% en leads ese día.',
    name: 'Nombre Apellido',
    role: 'Brand Manager',
    company: 'Empresa C',
  },
]

import type { Variants } from 'framer-motion'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0, 0, 1] } },
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-text text-xs font-bold text-white">
      {initials}
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
          {testimonials.map((t) => {
            const initials = t.name
              .split(' ')
              .slice(0, 2)
              .map((n) => n[0])
              .join('')
            return (
              <motion.div
                key={t.company}
                variants={item}
                className="flex flex-col rounded-2xl border bg-white p-7"
                style={{ borderColor: 'var(--color-border-soft)' }}
              >
                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 text-text"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.449a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.37 2.449c-.784.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.363-1.118L2.643 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                    </svg>
                  ))}
                </div>

                <p className="flex-1 text-sm leading-relaxed text-text-secondary">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <Avatar initials={initials} />
                  <div>
                    <p className="text-sm font-semibold text-text">{t.name}</p>
                    <p className="text-xs text-text-secondary">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
