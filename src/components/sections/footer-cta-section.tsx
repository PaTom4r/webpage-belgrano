'use client'
// FooterCtaSection — closing CTA card before footer. id="cta" for navbar magnetic button.
import Link from 'next/link'
import { motion } from 'framer-motion'

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
          className="rounded-2xl border bg-text p-12 text-center lg:p-20"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <h2 className="mx-auto max-w-2xl text-3xl font-black leading-tight tracking-tight text-white lg:text-5xl">
            Operá el crecimiento de tu marca con nosotros.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-white/60">
            Una reunión de 30 minutos para entender tu negocio y ver si podemos ayudarte.
            Sin compromiso.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="https://calendly.com/belgrano/reunion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-text transition-opacity hover:opacity-90"
            >
              Agendar reunión
            </Link>
            <a
              href="mailto:hola@belgrano.cl"
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              hola@belgrano.cl
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
