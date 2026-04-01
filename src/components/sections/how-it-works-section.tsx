// src/components/sections/how-it-works-section.tsx
// 3-step process section. Uses ScrollReveal for entrance animations.
import { ScrollReveal } from '@/components/animations/scroll-reveal'

const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    description:
      'Analizamos tu negocio, tus procesos y tus objetivos. Identificamos dónde la IA puede generar el mayor impacto inmediato — sin hype, sin vender lo que no necesitás.',
  },
  {
    number: '02',
    title: 'Estrategia',
    description:
      'Diseñamos un plan de acción concreto con hitos medibles, tecnologías seleccionadas y estimaciones reales. Sabés exactamente qué vas a lograr y cuándo.',
  },
  {
    number: '03',
    title: 'Ejecución',
    description:
      'Implementamos, iteramos y medimos. Acompañamos el proceso completo hasta que los resultados sean consistentes y tu equipo pueda operar de forma independiente.',
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

        {/* Steps */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.1}>
              <div className="flex flex-col gap-4 rounded-2xl border border-border bg-bg p-8">
                <span className="text-5xl font-extrabold tabular-nums tracking-tight text-border">
                  {step.number}
                </span>
                <h3 className="text-xl font-bold tracking-tight text-text">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
