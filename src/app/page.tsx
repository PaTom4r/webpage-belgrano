// Home page — Landing v2, template-1 style.
// Navbar and FloatingWhatsApp are in layout.tsx. Footer lives here (BigFooter).
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/content/site'
import { HeroV2 } from '@/components/sections/hero-v2'
import { StatsV2Section } from '@/components/sections/stats-v2-section'
import { ComparisonSection } from '@/components/sections/comparison-section'
import { HowWeWorkSection } from '@/components/sections/how-we-work-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { FooterCtaSection } from '@/components/sections/footer-cta-section'
import { BigFooter } from '@/components/layout/big-footer'
import { StickyCtaMobile } from '@/components/layout/sticky-cta-mobile'

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
        <HeroV2 />
        <StatsV2Section />
        <ComparisonSection />
        <HowWeWorkSection />
        <TestimonialsSection />
        <FooterCtaSection />
      </main>
      <BigFooter />
      <StickyCtaMobile />
    </>
  )
}
