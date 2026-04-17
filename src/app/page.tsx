// Home page — composes 4 landing sections.
// Navbar and Footer are in layout.tsx (persistent across all pages).
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/content/site'
import { HeroSection } from '@/components/sections/hero-section'
// import { VerticalesSection } from '@/components/sections/verticales-section' // Desactivada — se vuelve a habilitar cuando se decida volver a mostrar 'Qué hacemos'
import { MarqueeSection } from '@/components/sections/marquee-section'
import { StatsSection } from '@/components/sections/stats-section'
import { CtaSection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Belgrano Group — Operamos el crecimiento de tu marca',
  description:
    'Belgrano Group: Media, Intelligence y Brand. Conectamos IA, medios y ejecución en terreno para impulsar resultados reales en cada punto de contacto.',
  openGraph: {
    title: 'Belgrano Group — Operamos el crecimiento de tu marca',
    description:
      'Belgrano Group: Media, Intelligence y Brand. Conectamos IA, medios y ejecución en terreno para impulsar resultados reales en cada punto de contacto.',
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
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: 'Belgrano Group',
    alternateName: 'Belgrano',
    url: siteConfig.url,
    logo: `${siteConfig.url}/og/og-default.png`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Santiago',
      addressRegion: 'Región Metropolitana',
      addressCountry: 'CL',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: siteConfig.email,
      availableLanguage: 'Spanish',
    },
    sameAs: [siteConfig.url],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <main>
        <HeroSection />
        {/* <VerticalesSection /> — Desactivada temporalmente */}
        <StatsSection />
        <MarqueeSection />
        <CtaSection />
      </main>
    </>
  )
}
