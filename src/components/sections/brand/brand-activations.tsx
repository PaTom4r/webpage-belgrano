// Activations grid for Brand vertical — replaces the "case study" slot used by
// Intelligence (CLC) and Media (Point Cola). Brand doesn't have a single
// flagship case yet, so we show the catalogue of activation types instead.
// Card style mirrors BusinessSuite + IntelligenceBranches: dark bg + accent
// gradient + glass border + hover-lift + accent glow.
'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Container } from '@/components/layout/container'

const easing = [0.25, 0.1, 0.25, 1] as const

interface BrandActivationsProps {
  accent?: string
}

interface Activation {
  index: string
  label: string
  title: string
  description: string
  iconPath: React.ReactNode
}

const activations: Activation[] = [
  {
    index: '01',
    label: 'BTL · Punto de venta',
    title: 'Activaciones en góndola y trade marketing',
    description:
      'Promotoras, cabezales, samplings e impulso en punto de venta. Diseño y ejecución integrada para que la marca esté donde se decide la compra.',
    iconPath: (
      <>
        <path d="M3 9h18l-2 9H5L3 9Z" />
        <path d="M3 9 5 4h14l2 5" />
        <path d="M9 14h6" />
      </>
    ),
  },
  {
    index: '02',
    label: 'Stands · Ferias',
    title: 'Stands con producción propia',
    description:
      'Diseño 3D, fabricación, montaje y operación en ferias corporativas, eventos sectoriales y lanzamientos. Un solo equipo del concepto al armado.',
    iconPath: (
      <>
        <rect x="3" y="9" width="18" height="11" rx="1" />
        <path d="M3 13h18" />
        <path d="M8 9V5h8v4" />
      </>
    ),
  },
  {
    index: '03',
    label: 'Eventos · Lanzamientos',
    title: 'Eventos de marca y experiencias',
    description:
      'Lanzamientos, convenciones, after-office, summits internos. Conceptualización, producción técnica y curaduría de la experiencia completa.',
    iconPath: (
      <>
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect x="3" y="6" width="18" height="15" rx="2" />
        <path d="M3 11h18" />
      </>
    ),
  },
  {
    index: '04',
    label: 'Vía pública · Universidades',
    title: 'Activaciones outdoor de impacto',
    description:
      'Sampling y guerrilla en vía pública, campus universitarios y zonas de flujo. Operación táctica con permisos, equipo y reporte por ubicación.',
    iconPath: (
      <>
        <path d="M12 22s-8-7.5-8-13a8 8 0 0 1 16 0c0 5.5-8 13-8 13Z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    ),
  },
  {
    index: '05',
    label: 'Pantallas interactivas',
    title: 'Activaciones inteligentes con tecnología',
    description:
      'Pantallas interactivas, captura de datos, experiencias personalizadas con IA. Tecnología de Belgrano Intelligence integrada cuando suma.',
    iconPath: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M9 21h6" />
        <path d="M12 17v4" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
  },
  {
    index: '06',
    label: 'Diseño creativo',
    title: 'Conceptualización y diseño 360°',
    description:
      'Idea creativa, key visual, estrategia de marca y diseño de pieza por pieza. La parte que da alma a cada activación antes de salir al mundo.',
    iconPath: (
      <>
        <path d="M12 2v6" />
        <path d="m4.93 4.93 4.24 4.24" />
        <path d="M2 12h6" />
        <path d="m4.93 19.07 4.24-4.24" />
        <path d="M12 22v-6" />
        <path d="m19.07 19.07-4.24-4.24" />
        <path d="M22 12h-6" />
        <path d="m19.07 4.93-4.24 4.24" />
      </>
    ),
  },
]

const headingChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
}

const headingContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const gridContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const cardItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing } },
}

export function BrandActivations({ accent = '#F97316' }: BrandActivationsProps) {
  const reduceMotion = useReducedMotion()
  const initial = reduceMotion ? 'visible' : 'hidden'

  return (
    <section
      className="relative overflow-hidden bg-dark py-20 sm:py-24 lg:py-28"
      aria-label="Tipos de activaciones que hacemos"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at top, ${accent}1A 0%, transparent 60%)`,
        }}
      />

      <Container>
        <motion.div
          className="mb-14 mx-auto max-w-3xl text-center"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headingContainer}
        >
          <motion.span
            variants={headingChild}
            className="text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            Lo que ejecutamos
          </motion.span>
          <motion.h2
            variants={headingChild}
            className="mt-3 font-black uppercase leading-[0.95] tracking-tighter text-white text-3xl sm:text-4xl lg:text-5xl"
            style={{ letterSpacing: '-0.035em' }}
          >
            Seis formatos, una sola operación
          </motion.h2>
          <motion.p
            variants={headingChild}
            className="mt-5 text-base text-white/70 sm:text-lg"
          >
            Cada activación es un puente entre la marca y la persona en
            terreno. Diseñamos, fabricamos, operamos y medimos cada una con
            un solo equipo.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={gridContainer}
        >
          {activations.map((activation) => (
            <motion.article
              key={activation.index}
              variants={cardItem}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] sm:p-8"
              style={{
                backgroundImage: `linear-gradient(135deg, ${accent}10 0%, transparent 60%)`,
              }}
            >
              {/* Top — icon + index */}
              <div className="flex items-center gap-3">
                <span
                  className="flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] transition-colors duration-300 group-hover:border-white/30"
                  style={{ color: accent }}
                  aria-hidden
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    {activation.iconPath}
                  </svg>
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                  {activation.label}
                </span>
              </div>

              {/* Mid — title */}
              <h3 className="mt-6 text-lg font-bold text-white sm:text-xl">
                {activation.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {activation.description}
              </p>

              {/* Hover-only glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse at top, ${accent}25, transparent 60%)`,
                }}
              />
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
