// src/components/sections/cta-section.tsx
// Dark-background CTA section with contact form and Calendly booking widget.
// Per CONTEXT.md locked decision: dark bg (#09090B) for Stats + CTA sections.
import { ContactForm } from '@/components/forms/contact-form'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { CalendlyEmbed } from '@/components/conversion/calendly-embed'

export function CtaSection() {
  return (
    <section id="cta" aria-labelledby="cta-heading" className="relative overflow-hidden bg-bg py-16 sm:py-20 lg:py-24">
      {/* Radial glow — centro de la sección */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[600px] w-[900px] rounded-full bg-black/[0.03] blur-[120px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left: headline and value prop */}
          <div>
            <ScrollReveal>
              <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                Hablemos
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 id="cta-heading" className="mt-4 text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
                ¿Listo para crecer{' '}
                <br className="hidden sm:block" />
                con IA?
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-gray-700">
                Agenda una reunión de 30 minutos. Diagnóstico gratuito, propuesta inicial en 48 horas.
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
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <span aria-hidden="true" className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-black/20 text-xs text-text-secondary">
                      &#10003;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Right: Calendly — primary conversion action */}
          <ScrollReveal delay={0.1} className="w-full">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-text-secondary">
              Agenda directo
            </p>
            <CalendlyEmbed />
          </ScrollReveal>
        </div>

        {/* Contact form — secondary channel for those who prefer to write */}
        <div className="mt-16 border-t border-black/10 pt-16">
          <ScrollReveal>
            <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-text-secondary">
              O escríbenos y te respondemos en 24h
            </p>
          </ScrollReveal>
          <div className="mx-auto max-w-2xl">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
