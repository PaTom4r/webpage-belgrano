// src/components/sections/stats-section.tsx
// Dark section (bg-dark per CONTEXT.md locked decision) with 4 GSAP-animated stats.
// AnimatedCounter handles prefers-reduced-motion and mobile behavior internally.
// This section itself is a Server Component — only the counters are client.
import { AnimatedCounter } from '@/components/animations/animated-counter'
import { ScrollReveal } from '@/components/animations/scroll-reveal'

const stats = [
  {
    target: 200,
    prefix: '+',
    suffix: '',
    label: 'Empresas atendidas',
    detail: 'en Chile y LATAM',
  },
  {
    target: 10,
    prefix: '',
    suffix: 'x',
    label: 'ROI promedio',
    detail: 'en automatización de atención',
  },
  {
    target: 98,
    prefix: '',
    suffix: '%',
    label: 'Satisfacción',
    detail: 'en encuestas post-proyecto',
  },
  {
    target: 80,
    prefix: '$',
    suffix: 'M+',
    label: 'Generados para clientes',
    detail: 'en ventas e impacto medible',
  },
]

export function StatsSection() {
  return (
    <section id="stats" className="bg-dark py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="mb-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-bg/40">
            Resultados
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.05} className="mb-16 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-bg sm:text-5xl">
            Números que hablan.
          </h2>
        </ScrollReveal>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <div className="flex flex-col items-center text-center">
                {/* Animated number */}
                <div className="text-5xl font-extrabold tabular-nums tracking-tight text-bg sm:text-6xl">
                  <AnimatedCounter
                    target={stat.target}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2}
                  />
                </div>

                {/* Label */}
                <p className="mt-3 text-base font-semibold text-bg sm:text-lg">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs text-bg/50">
                  {stat.detail}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
