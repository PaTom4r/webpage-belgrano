import type { Metadata } from 'next'
import { Geist, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ClientProviders } from '@/components/client-providers'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { FloatingWhatsApp } from '@/components/conversion/floating-whatsapp'
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
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
  },
  openGraph: {
    siteName: 'Belgrano',
    locale: 'es_CL',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${inter.variable}`}>
      {/* GSAP hydration fix: borderTopStyle pre-matches what ScrollTrigger injects — do not remove */}
      <body style={{ borderTopStyle: 'solid' }}>
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
