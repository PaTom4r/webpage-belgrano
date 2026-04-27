// src/components/sections/faq-landing-section.tsx
// Two-column FAQ: title + description left, accordion right.
// Questions compiled from general Belgrano FAQs (not vertical-specific).
import { FaqAccordion } from '@/components/ui/faq-accordion'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import type { FaqItem } from '@/lib/content/verticales'

const faqs: FaqItem[] = [
  {
    question: '¿Con qué tipo de empresas trabajan?',
    answer:
      'Trabajamos con empresas medianas y grandes en Chile y LATAM que quieren escalar con IA, mejorar su presencia en medios o ejecutar activaciones de marca. No tenemos restricción de industria — hemos trabajado con salud, entretenimiento, retail y consumo masivo.',
  },
  {
    question: '¿Cuánto tarda en verse resultados?',
    answer:
      'Depende del vertical. Una campaña de medios puede generar impacto en 2–4 semanas. Un agente de IA tarda 4–8 semanas en estar operativo. Las activaciones BTL tienen resultados inmediatos en terreno. En todos los casos entregamos métricas desde el día uno.',
  },
  {
    question: '¿Trabajan con empresas fuera de Chile?',
    answer:
      'Sí. Tenemos clientes en México, Argentina, Colombia y Perú. La operación es remota para inteligencia y medios digitales; las activaciones físicas se coordinan con socios locales certificados.',
  },
  {
    question: '¿Qué pasa si ya tenemos un proveedor de medios o de IA?',
    answer:
      'Podemos trabajar en paralelo o reemplazar — depende del diagnóstico. Lo habitual es que nuestros servicios se complementen con lo que ya tienen, especialmente cuando el cliente necesita integrar IA con su estrategia de medios existente.',
  },
  {
    question: '¿Cómo es el proceso para empezar?',
    answer:
      'La primera reunión es un diagnóstico gratuito de 45 minutos. Luego preparamos una propuesta en 48 horas con alcance, timeline y presupuesto. Sin letra chica ni compromisos previos.',
  },
  {
    question: '¿Cuál es el tamaño mínimo de proyecto?',
    answer:
      'No manejamos proyectos por debajo de $5M CLP mensuales. Esto nos permite asignar un equipo dedicado y garantizar calidad de entrega. Para proyectos más pequeños, tenemos un programa de acompañamiento mensual.',
  },
]

export function FaqLandingSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-bg py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: title + description */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ScrollReveal>
              <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                Preguntas frecuentes
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2
                id="faq-heading"
                className="mt-4 text-4xl font-extrabold tracking-tight text-text sm:text-5xl"
              >
                Todo lo que necesitas saber.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-text-secondary sm:text-lg">
                Si tienes más preguntas, escríbenos directamente — respondemos en menos de 24 horas.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <a
                href="/#cta"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-text underline-offset-4 hover:underline"
              >
                Hablar con el equipo →
              </a>
            </ScrollReveal>
          </div>

          {/* Right: accordion */}
          <ScrollReveal delay={0.05}>
            <FaqAccordion items={faqs} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
