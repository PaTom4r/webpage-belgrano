// src/app/verticales/[slug]/page.tsx
// Dynamic vertical detail pages: /verticales/media, /verticales/intelligence,
//   /verticales/brand
// generateStaticParams() ensures static generation of all 3 routes.
// notFound() handles invalid slugs.
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { verticales } from '@/lib/content/verticales'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { VerticalHeroSection } from '@/components/sections/vertical-hero-section'
import { VerticalMetricsSection } from '@/components/sections/vertical-metrics-section'
import { VerticalClientsSection } from '@/components/sections/vertical-clients-section'
import { VerticalFaqSection } from '@/components/sections/vertical-faq-section'
import { VerticalBranchesSection } from '@/components/sections/vertical-branches-section'
import { CtaSection } from '@/components/sections/cta-section'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'
import { ScrollReveal } from '@/components/animations/scroll-reveal'

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <main>
      {/* Breadcrumb — inside a light bg container above the dark hero */}
      <div className="bg-bg border-b border-border">
        <Container>
          <Breadcrumb verticalName={vertical.name} />
        </Container>
      </div>

      {/* Hero — dark bg, icon + name + tagline */}
      <VerticalHeroSection vertical={vertical} />

      {/* Long description — light bg, 2-3 paragraphs */}
      <section className="bg-bg py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            {vertical.longDescription.split('\n\n').map((paragraph, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <p className={`text-lg leading-relaxed text-text-secondary ${i > 0 ? 'mt-6' : ''}`}>
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Branches — only for verticals with internal sub-divisions (Intelligence) */}
      {vertical.branches && vertical.branches.length > 0 && (
        <VerticalBranchesSection branches={vertical.branches} />
      )}

      {/* Metrics — dark bg grid of value+label pairs */}
      {vertical.metrics && vertical.metrics.length > 0 && (
        <VerticalMetricsSection metrics={vertical.metrics} />
      )}

      {/* Client references — light bg, pill badges (only if clients exist) */}
      <VerticalClientsSection clients={vertical.clients ?? []} />

      {/* FAQ — accordion with 5-6 questions per vertical */}
      <VerticalFaqSection items={vertical.faq} verticalName={vertical.name} />

      {/* CTA — reuse landing CTA section as-is */}
      <CtaSection />
    </main>
    <Footer />
    </>
  )
}
