import type { Metadata } from 'next'
import { Geist, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ClientProviders } from '@/components/client-providers'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { FloatingWhatsApp } from '@/components/conversion/floating-whatsapp'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonld'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://belgrano.cl'),
  title: {
    template: '%s | Belgrano',
    default: 'Belgrano — IA, Marketing & Estrategia',
  },
  description: 'Grupo Belgrano: Media, Intelligence y Brand. Medios tradicionales, inteligencia artificial aplicada y experiencias de marca en Chile.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
  },
  openGraph: {
    siteName: 'Belgrano',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Belgrano — IA, Marketing & Estrategia',
    description: 'Grupo Belgrano: Media, Intelligence y Brand. Medios tradicionales, inteligencia artificial aplicada y experiencias de marca en Chile.',
    images: ['/og/og-default.png'],
  },
}

const orgLd = organizationJsonLd()
const siteLd = websiteJsonLd()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" className={`${geistSans.variable} ${inter.variable}`}>
      {/* GSAP hydration fix: borderTopStyle pre-matches what ScrollTrigger injects — do not remove */}
      <body style={{ borderTopStyle: 'solid' }}>
        {/* Sitewide entity graph — Organization + WebSite. Page-level schemas
            (Service, FAQPage, BreadcrumbList, AboutPage) reference these via @id. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
        <ClientProviders>
          <Navbar />
          {children}
          <Footer />
          <FloatingWhatsApp />
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  )
}
