// Home page — composes 4 landing sections.
// Navbar and Footer are in layout.tsx (persistent across all pages).
// Organization + WebSite JSON-LD live in layout.tsx (sitewide); this page
// only declares page-level metadata overrides.
import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/hero-section'
// import { VerticalesReveal } from '@/components/sections/home/verticales-reveal' // Pausada — reemplazada por <BusinessSuite /> (las 3 cards horizontales). Reactivar si querés volver al scroll-driven.
import { BusinessSuite } from '@/components/sections/home/business-suite'
// import { VerticalesSection } from '@/components/sections/verticales-section' // Reemplazada por VerticalesReveal scroll-driven
// import { MarqueeSection } from '@/components/sections/marquee-section' // Desactivada — clientes "que confían en nosotros" quitada a pedido de Pato
import { StatsSection } from '@/components/sections/stats-section'
import { CtaSection } from '@/components/sections/cta-section'

const HOME_TITLE = 'Belgrano Group — Operamos el crecimiento de tu marca'
const HOME_DESCRIPTION =
  'Belgrano Group: Media, Intelligence y Brand. Conectamos IA, medios y ejecución en terreno para impulsar resultados reales en cada punto de contacto.'

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: 'https://belgrano.cl' },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
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
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ['/og/og-default.png'],
  },
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <BusinessSuite />
      <StatsSection />
      {/* <MarqueeSection /> — Desactivada: sección "Empresas que confían en nosotros" */}
      <CtaSection />
    </main>
  )
}
