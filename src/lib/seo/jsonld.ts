// src/lib/seo/jsonld.ts
// Pure functions returning schema.org objects. Call sites consume them with:
//   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />
// Every schema reads from siteConfig — single source of truth for org data.
// Cross-references use stable @id URLs so the entity graph hangs together
// (Service.provider → Organization, AboutPage.about → Organization, etc.).

import { siteConfig } from '@/lib/content/site'
import type { FaqItem, Vertical } from '@/lib/content/verticales'

export const ORGANIZATION_ID = `${siteConfig.url}/#organization`
export const WEBSITE_ID = `${siteConfig.url}/#website`

export interface BreadcrumbStep {
  name: string
  url: string
}

function buildAreaServed() {
  return siteConfig.areaServed.map((code) => ({
    '@type': 'Country' as const,
    name: code === 'CL' ? 'Chile' : code === 'LATAM' ? 'Latin America' : code,
  }))
}

export function organizationJsonLd() {
  const social = Object.values(siteConfig.social).filter(
    (url): url is string => typeof url === 'string' && url.length > 0
  )

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    image: `${siteConfig.url}/og/og-default.png`,
    description: siteConfig.description,
    ...(siteConfig.foundedYear && { foundingDate: String(siteConfig.foundedYear) }),
    address: {
      '@type': 'PostalAddress',
      ...(siteConfig.address.street && { streetAddress: siteConfig.address.street }),
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      ...(siteConfig.address.postalCode && { postalCode: siteConfig.address.postalCode }),
      addressCountry: siteConfig.address.country,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: siteConfig.email,
        telephone: siteConfig.whatsapp,
        availableLanguage: ['Spanish'],
        areaServed: siteConfig.areaServed,
      },
    ],
    areaServed: buildAreaServed(),
    knowsAbout: siteConfig.knowsAbout,
    ...(social.length > 0 && { sameAs: social }),
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: 'es-CL',
    publisher: { '@id': ORGANIZATION_ID },
  }
}

export function breadcrumbJsonLd(items: BreadcrumbStep[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function aboutPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `${siteConfig.url}/nosotros`,
    name: 'Nosotros — Grupo Belgrano',
    description:
      'Conoce a Grupo Belgrano: empresa chilena de IA aplicada, marketing digital y estrategia de negocio.',
    inLanguage: 'es-CL',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
  }
}

export function serviceJsonLd(vertical: Vertical) {
  const url = `${siteConfig.url}/verticales/${vertical.slug}`
  const primaryCategory = vertical.tags?.[0] ?? 'Marketing'

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: vertical.name,
    description: vertical.description,
    url,
    serviceType: primaryCategory,
    category: primaryCategory,
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'B2B',
    },
    areaServed: buildAreaServed(),
    provider: { '@id': ORGANIZATION_ID },
    ...(vertical.tags && vertical.tags.length > 0 && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${vertical.name} — capacidades`,
        itemListElement: vertical.tags.map((tag) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: tag,
          },
        })),
      },
    }),
  }
}
