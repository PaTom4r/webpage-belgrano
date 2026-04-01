// Home page — composes all 8 landing sections.
// Navbar and Footer are in layout.tsx (persistent across all pages).
import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/hero-section'
import { MarqueeSection } from '@/components/sections/marquee-section'
import { VerticalesSection } from '@/components/sections/verticales-section'
import { HowItWorksSection } from '@/components/sections/how-it-works-section'
import { StatsSection } from '@/components/sections/stats-section'
import { CtaSection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Belgrano — IA, Marketing & Estrategia',
  description:
    'Agencia chilena de IA aplicada, marketing digital y producción de contenido. Automatizamos, formamos y comunicamos para empresas que quieren crecer en serio.',
  openGraph: {
    title: 'Belgrano — IA, Marketing & Estrategia',
    description:
      'Agencia chilena de IA aplicada, marketing digital y producción de contenido. Automatizamos, formamos y comunicamos para empresas que quieren crecer en serio.',
    url: 'https://belgrano.cl',
    images: [
      {
        url: '/og/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Belgrano — IA, Marketing & Estrategia',
      },
    ],
  },
  alternates: { canonical: 'https://belgrano.cl' },
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <MarqueeSection />
      <VerticalesSection />
      <HowItWorksSection />
      <StatsSection />
      <CtaSection />
    </main>
  )
}
