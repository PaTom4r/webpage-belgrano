// src/components/sections/cta-section.tsx
// Dark-background CTA section with contact form.
// Per CONTEXT.md locked decision: dark bg (#09090B) for Stats + CTA sections.
// Form submission integration deferred to Phase 5.
import { ContactForm } from '@/components/forms/contact-form'
import { ScrollReveal } from '@/components/animations/scroll-reveal'

export function CtaSection() {
  return (
    <section id="cta" className="bg-dark py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left: headline and value prop */}
          <div>
            <ScrollReveal>
              <span className="text-xs font-semibold uppercase tracking-widest text-bg/40">
                Hablemos
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-bg sm:text-5xl">
                ¿Listo para crecer{' '}
                <br className="hidden sm:block" />
                con IA?
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-bg/70">
                Cuéntanos tu desafío. En 24 horas te respondemos con una propuesta inicial — sin compromiso.
              </p>
            </ScrollReveal>

            {/* Proof points */}
            <ScrollReveal delay={0.15}>
              <ul className="mt-10 flex flex-col gap-4">
                {[
                  'Diagnóstico gratuito en la primera reunión',
                  'Propuesta en 48 horas',
                  'Sin costos ocultos ni contratos largos',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-bg/70">
                    <span aria-hidden="true" className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-xs text-bg/50">
                      &#10003;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Right: form */}
          <ScrollReveal delay={0.1} className="w-full">
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
