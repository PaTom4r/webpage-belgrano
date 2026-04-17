// src/app/verticales/[slug]/page.tsx
// Dynamic vertical detail pages: /verticales/media, /verticales/intelligence,
//   /verticales/brand
// generateStaticParams() ensures static generation of all 3 routes.
// notFound() handles invalid slugs.
//
// Intelligence uses a premium layout with tracing beam + case study.
// Media and Brand use the default template.
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { verticales } from '@/lib/content/verticales'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { VerticalHeroSection } from '@/components/sections/vertical-hero-section'
import { VerticalMetricsSection } from '@/components/sections/vertical-metrics-section'
// import { VerticalClientsSection } from '@/components/sections/vertical-clients-section' // Desactivada — secci\u00f3n "Clientes que conf\u00edan en nosotros"
import { VerticalFaqSection } from '@/components/sections/vertical-faq-section'
import { VerticalBranchesSection } from '@/components/sections/vertical-branches-section'
import { CtaSection } from '@/components/sections/cta-section'
import { Container } from '@/components/layout/container'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { TracingBeam } from '@/components/animations/tracing-beam'
import { IntelligenceHero } from '@/components/sections/intelligence/intelligence-hero'
import { IntelligenceCapabilities } from '@/components/sections/intelligence/intelligence-capabilities'
import { IntelligenceBranches } from '@/components/sections/intelligence/intelligence-branches'
import { IntelligenceMetrics } from '@/components/sections/intelligence/intelligence-metrics'

interface VerticalPageProps {
  params: Promise<{ slug: string }>
}

const ogImages: Record<string, string> = {
  media: '/og/og-media.png',
  intelligence: '/og/og-intelligence.png',
  brand: '/og/og-brand.png',
}

export async function generateStaticParams() {
  return verticales.map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: VerticalPageProps): Promise<Metadata> {
  const { slug } = await params
  const vertical = verticales.find((v) => v.slug === slug)
  if (!vertical) return {}

  const descriptionText = `${vertical.tagline} ${vertical.description.slice(0, 120)}`

  return {
    title: vertical.name,
    description: descriptionText,
    openGraph: {
      title: `${vertical.name} | Belgrano`,
      description: descriptionText,
      url: `https://belgrano.cl/verticales/${slug}`,
      images: [
        {
          url: ogImages[slug] ?? '/og/og-default.png',
          width: 1200,
          height: 630,
          alt: `${vertical.name} — Belgrano`,
        },
      ],
    },
    alternates: { canonical: `https://belgrano.cl/verticales/${slug}` },
  }
}

export default async function VerticalPage({ params }: VerticalPageProps) {
  const { slug } = await params
  const vertical = verticales.find((v) => v.slug === slug)

  if (!vertical) {
    notFound()
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: vertical.name,
    description: vertical.description,
    url: `https://belgrano.cl/verticales/${slug}`,
    provider: {
      '@type': 'Organization',
      name: 'Grupo Belgrano',
      url: 'https://belgrano.cl',
    },
    serviceType: vertical.name,
    areaServed: {
      '@type': 'Country',
      name: 'Chile',
    },
  }

  const accent = vertical.accentColor ?? '#A855F7'
  const isIntelligence = slug === 'intelligence'

  // Long description block — reused by both layouts.
  const longDescriptionBlock = (
    <section className="bg-bg py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          {vertical.longDescription.split('\n\n').map((paragraph, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <p
                className={`text-lg leading-relaxed text-text-secondary ${
                  i > 0 ? 'mt-6' : ''
                }`}
              >
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {/* pt-16 compensa la altura del navbar fijo (h-16). En páginas internas
          no hay #hero que el observer esconda, así que el navbar queda siempre
          visible y necesitamos padding-top para que no tape la breadcrumb. */}
      <main className="pt-16">
        {/* Breadcrumb — shared by all verticals */}
        <div className="border-b border-border bg-bg">
          <Container>
            <Breadcrumb verticalName={vertical.name} />
          </Container>
        </div>

        {isIntelligence ? (
          /* ============= PREMIUM INTELLIGENCE LAYOUT ============= */
          <>
            <IntelligenceHero vertical={vertical} />

            {/* TracingBeam wraps the content body, animating a purple beam
                down the left margin as the user scrolls through sections. */}
            <TracingBeam accent={accent}>
              {longDescriptionBlock}

              <IntelligenceCapabilities chips={vertical.chips ?? []} accent={accent} />

              {vertical.branches && vertical.branches.length > 0 && (
                <IntelligenceBranches branches={vertical.branches} accent={accent} />
              )}

              {vertical.metrics && vertical.metrics.length > 0 && (
                <IntelligenceMetrics metrics={vertical.metrics} accent={accent} />
              )}
            </TracingBeam>

            {/* <VerticalClientsSection clients={vertical.clients ?? []} /> — Desactivada: secci\u00f3n "Clientes que conf\u00edan en nosotros" */}
            <VerticalFaqSection items={vertical.faq} verticalName={vertical.name} />
            <CtaSection />
          </>
        ) : (
          /* ============= DEFAULT TEMPLATE (Media + Brand) ============= */
          <>
            <VerticalHeroSection vertical={vertical} />
            {longDescriptionBlock}

            {vertical.branches && vertical.branches.length > 0 && (
              <VerticalBranchesSection branches={vertical.branches} />
            )}

            {vertical.metrics && vertical.metrics.length > 0 && (
              <VerticalMetricsSection metrics={vertical.metrics} />
            )}

            {/* <VerticalClientsSection clients={vertical.clients ?? []} /> — Desactivada: secci\u00f3n "Clientes que conf\u00edan en nosotros" */}
            <VerticalFaqSection items={vertical.faq} verticalName={vertical.name} />
            <CtaSection />
          </>
        )}
      </main>
    </>
  )
}
