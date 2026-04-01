// src/components/sections/how-it-works-section.tsx
// GSAP ScrollTrigger pin + scrub: 3 steps reveal sequentially as user scrolls.
// Mobile (<768px): steps shown statically, no scroll-scrub (ANIM-06 mobile budget).
// Reduced motion: all steps visible immediately, no animation (ANIM-05).
'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-config'
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
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Desktop + no reduced motion: pin + scrub
      mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          const stepEls = gsap.utils.toArray<HTMLElement>('.hiw-step')

          // Initially hide step 2 and 3
          gsap.set(stepEls.slice(1), { opacity: 0, y: 30 })

          // Refresh after fonts load to avoid wrong pin offset (Pitfall 3 from RESEARCH.md)
          document.fonts.ready.then(() => ScrollTrigger.refresh())

          // Pin the section for the scroll budget
          const pinTrigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${steps.length * 500}`,
            pin: true,
            pinSpacing: true,
          })

          // Reveal each step as scroll progresses
          stepEls.slice(1).forEach((step, i) => {
            gsap.to(step, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `top+=${(i + 1) * 500} top`,
                end: `top+=${(i + 1) * 500 + 200} top`,
                scrub: 0.5,
              },
            })
          })

          return () => {
            pinTrigger.kill()
          }
        }
      )

      // Mobile or reduced motion: ensure all steps visible (CSS handles static display)
      mm.add(
        '(max-width: 767px), (prefers-reduced-motion: reduce)',
        () => {
          const stepEls = gsap.utils.toArray<HTMLElement>('.hiw-step')
          gsap.set(stepEls, { opacity: 1, y: 0 })
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
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
          <h2 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
            Tres pasos.{' '}
            <br className="hidden sm:block" />
            Resultados reales.
          </h2>
        </ScrollReveal>

        {/* Steps */}
        <div ref={stepsRef} className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="hiw-step flex flex-col gap-4 rounded-2xl border border-border bg-bg p-8"
            >
              {/* Step number */}
              <span className="text-5xl font-extrabold tabular-nums tracking-tight text-border">
                {step.number}
              </span>

              {/* Step title */}
              <h3 className="text-xl font-bold tracking-tight text-text">
                {step.title}
              </h3>

              {/* Step description */}
              <p className="text-sm leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
