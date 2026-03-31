import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'

export default function HomePage() {
  return (
    <main>
      {/* Light section — verifies bg-bg, text-text, Geist font */}
      <Section>
        <h1 className="font-sans text-4xl font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl">
          Belgrano
        </h1>
        <p className="mt-4 text-lg text-text-secondary">
          IA, Marketing & Estrategia
        </p>
      </Section>

      {/* Dark section — verifies bg-dark, text-bg color tokens */}
      <Section dark>
        <h2 className="font-sans text-2xl font-bold text-bg">
          Foundation complete
        </h2>
        <p className="mt-2 text-bg opacity-70">
          Design tokens, fonts, and layout shell in place.
        </p>
      </Section>

      {/* Standalone Container — verifies direct Container usage outside Section */}
      <div className="bg-bg-section py-16 sm:py-20 lg:py-24">
        <Container>
          <p className="text-text-secondary text-sm">
            Phase 1 scaffold — this page will be replaced by the landing page in Phase 2.
          </p>
        </Container>
      </div>
    </main>
  )
}
