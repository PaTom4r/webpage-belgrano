'use client'
// FooterCtaSection — closing CTA with copy + contact form. id="cta" for nav anchor.
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ContactForm } from '@/components/forms/contact-form'

export function FooterCtaSection() {
  return (
    <section
      id="cta"
      className="py-20 lg:py-28"
      style={{ background: 'var(--color-bg-landing)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="overflow-hidden rounded-2xl border bg-text"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
            {/* Left: copy on dark */}
            <div className="flex flex-col p-8 lg:p-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
                Hablemos
              </span>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white lg:text-5xl">
                Opera el crecimiento de tu marca con nosotros.
              </h2>
              <p className="mt-5 max-w-md text-base text-white/60">
                Una reunión de 30 minutos para entender tu negocio y ver si podemos ayudarte.
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {[
                  'Diagnóstico inicial gratuito',
                  'Propuesta en menos de 48 horas',
                  'Sin contratos largos ni costos ocultos',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                    <span aria-hidden="true" className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-white/30 text-[10px] text-white/80">
                      &#10003;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/nosotros#casos"
                  className="text-sm font-medium text-white/60 transition-colors hover:text-white"
                >
                  Ver casos de éxito →
                </Link>
                <span className="text-xs text-white/40">
                  · Respondemos en menos de 4 horas hábiles
                </span>
              </div>
            </div>

            {/* Right: form on light panel */}
            <div className="bg-white p-8 lg:p-12">
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
