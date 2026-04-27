// Capability chips with pulse, identical pattern to MediaCapabilities and
// IntelligenceCapabilities. Reuses the `chips` field from verticales.ts.
'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/container'
import { ScrollReveal } from '@/components/animations/scroll-reveal'

interface BrandCapabilitiesProps {
  chips: string[]
  accent?: string
}

const easing = [0.25, 0.1, 0.25, 1] as const

export function BrandCapabilities({
  chips,
  accent = '#F97316',
}: BrandCapabilitiesProps) {
  if (!chips || chips.length === 0) return null

  return (
    <section className="relative bg-bg py-16 sm:py-20 lg:py-24">
      <Container>
        <ScrollReveal className="mb-10 text-center">
          <span
            className="text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            Capacidades
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Lo que activamos en terreno
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary">
            Cada chip es un formato que ejecutamos — desde la idea creativa
            hasta la operación en punto de contacto.
          </p>
        </ScrollReveal>

        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
          {chips.map((chip, i) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: easing }}
              whileHover={{ scale: 1.05 }}
              className="group inline-flex cursor-default items-center gap-2 rounded-full border bg-white px-5 py-2.5 text-sm font-semibold text-text shadow-sm transition-all duration-300"
              style={{
                borderColor: `${accent}33`,
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ backgroundColor: accent }}
                />
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />
              </span>
              {chip}
            </motion.span>
          ))}
        </div>
      </Container>
    </section>
  )
}
