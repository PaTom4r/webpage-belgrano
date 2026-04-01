// Home page — composes all 8 landing sections.
// Navbar and Footer are in layout.tsx (persistent across all pages).
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/content/site'
import { HeroSection } from '@/components/sections/hero-section'
import { MarqueeSection } from '@/components/sections/marquee-section'
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
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: 'Grupo Belgrano',
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
        <MarqueeSection />
        <HowItWorksSection />
        <StatsSection />
        <CtaSection />
      </main>
    </>
  )
}
