// src/components/layout/footer.tsx
// Static footer — Server Component, zero client JS.
// Added to app/layout.tsx in Plan 05.
import Link from 'next/link'
import { siteConfig, footerData } from '@/lib/content/site'

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-2xl font-black uppercase tracking-tighter text-accent">
              {siteConfig.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
              {footerData.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-text">
              Servicios
            </p>
            <nav className="flex flex-col gap-3">
              {footerData.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary transition-colors hover:text-text"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-text">
              Contacto
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-text-secondary transition-colors hover:text-text"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs text-text-secondary">
            {footerData.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
