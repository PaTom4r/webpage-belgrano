// src/components/sections/how-it-works-section.tsx
// 3-step process section. Hover reveal cards inspired by 21st.dev gallery-hover-carousel.
// Grid layout (no carousel) — shows all 3 steps at once.
// At rest: full-bleed image with step number + title overlay.
// On hover: image shrinks to top half, bottom half reveals full description + CTA arrow.
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/scroll-reveal'

function ArrowRight({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    description:
      'Analizamos tu negocio, tus procesos y tus objetivos. Identificamos dónde la IA puede generar el mayor impacto inmediato — sin hype, sin vender lo que no necesitás.',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=80',
    alt: 'Ejecutivo analizando reportes financieros',
  },
  {
    number: '02',
    title: 'Estrategia',
    description:
      'Diseñamos un plan de acción concreto con hitos medibles, tecnologías seleccionadas y estimaciones reales. Sabés exactamente qué vas a lograr y cuándo.',
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80',
    alt: 'Reunión ejecutiva de estrategia corporativa',
  },
  {
    number: '03',
    title: 'Ejecución',
    description:
      'Implementamos, iteramos y medimos. Acompañamos el proceso completo hasta que los resultados sean consistentes y tu equipo pueda operar de forma independiente.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    alt: 'Ejecutivos avanzando en oficina corporativa',
  },
]

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-bg py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="mb-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
            Cómo trabajamos
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.05} className="mb-16 text-center">
          <h2 id="how-it-works-heading" className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
            Tres pasos.{' '}
            <br className="hidden sm:block" />
            Resultados reales.
          </h2>
        </ScrollReveal>

        {/* Hover reveal cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.1}>
              <article className="group relative h-[340px] w-full overflow-hidden rounded-3xl border border-border shadow-sm md:h-[400px]">
                {/* Image layer — shrinks to top half on hover */}
                <div className="relative h-full w-full overflow-hidden transition-[height] duration-500 ease-out group-hover:h-1/2">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center brightness-[0.55] saturate-[0.85] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Dark tint overlay — uniform darken for corporate tone */}
                  <div className="absolute inset-0 bg-black/35" />
                  {/* Rest-state bottom gradient with step number + title */}
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 transition-opacity duration-300 group-hover:opacity-0">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 tabular-nums">
                      Paso {step.number}
                    </span>
                    <h3 className="text-2xl font-extrabold tracking-tight text-white">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Detail layer — revealed on hover, fills bottom half */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-1/2 flex-col justify-between bg-bg p-6 opacity-0 transition-opacity duration-500 group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-text-secondary tabular-nums">
                      Paso {step.number}
                    </span>
                    <h3 className="text-2xl font-extrabold tracking-tight text-text">
                      {step.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text transition-transform duration-500 group-hover:-rotate-45"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
