// src/app/nosotros/page.tsx
// The /nosotros route composing all three About sections plus the shared CtaSection.
// Server Component — static route, no generateStaticParams needed.
import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { AboutNarrativeSection } from '@/components/sections/about-narrative-section'
import { AboutValuesSection } from '@/components/sections/about-values-section'
import { AboutTeamSection } from '@/components/sections/about-team-section'
import { CtaSection } from '@/components/sections/cta-section'
import { aboutPageJsonLd, breadcrumbJsonLd } from '@/lib/seo/jsonld'

const NOSOTROS_TITLE = 'Nosotros'
const NOSOTROS_DESCRIPTION =
  'Conoce a Grupo Belgrano: empresa chilena de IA aplicada, marketing digital y estrategia de negocio. Un equipo integrado que construye, instala y forma.'

export const metadata: Metadata = {
  title: NOSOTROS_TITLE,
  description: NOSOTROS_DESCRIPTION,
  openGraph: {
    title: 'Nosotros | Belgrano',
    description: NOSOTROS_DESCRIPTION,
    url: 'https://belgrano.cl/nosotros',
    images: [
      {
        url: '/og/og-nosotros.png',
        width: 1200,
        height: 630,
        alt: 'Nosotros — Grupo Belgrano',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nosotros | Belgrano',
    description: NOSOTROS_DESCRIPTION,
    images: ['/og/og-nosotros.png'],
  },
  alternates: { canonical: 'https://belgrano.cl/nosotros' },
}

const aboutLd = aboutPageJsonLd()
const breadcrumbLd = breadcrumbJsonLd([
  { name: 'Home', url: 'https://belgrano.cl' },
  { name: 'Nosotros', url: 'https://belgrano.cl/nosotros' },
])

export default function NosotrosPage() {
  return (
    // pt-16 compensa la altura del navbar fijo (h-16). En p\u00e1ginas internas
    // no hay #hero que el observer esconda, as\u00ed que el navbar queda siempre
    // visible y necesitamos padding-top para que no tape la breadcrumb.
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <main className="pt-16">
      {/* Breadcrumb bar — same pattern as vertical pages */}
      <div className="border-b border-border bg-bg">
        <Container>
          <nav aria-label="Breadcrumb" className="py-4">
            <ol className="flex items-center gap-2 text-sm text-text-secondary">
              <li>
                <Link href="/" className="transition-opacity hover:opacity-60">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-border">
                /
              </li>
              <li className="font-medium text-text" aria-current="page">
                Nosotros
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      {/* ABOUT-01: Company story, mission — light bg */}
      <AboutNarrativeSection />

      {/* ABOUT-02: Values / differentiators grid — dark bg */}
      <AboutValuesSection />

      {/* ABOUT-03: How we work + 4-step process — light alternate bg */}
      <AboutTeamSection />

      {/* Consistent conversion point reused from landing */}
      <CtaSection />
      </main>
    </>
  )
}
