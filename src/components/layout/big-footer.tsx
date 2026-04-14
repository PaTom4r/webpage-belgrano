// BigFooter — landing-specific footer with 4 link columns + giant logo.
// Server Component — zero client JS.
import Link from 'next/link'
import { siteConfig } from '@/lib/content/site'

const columns = [
  {
    heading: 'Verticales',
    links: [
      { label: 'Belgrano Intelligence', href: '/verticales/intelligence' },
      { label: 'Belgrano Media', href: '/verticales/media' },
      { label: 'Belgrano Brand', href: '/verticales/brand' },
      { label: 'Academy', href: '/verticales/intelligence#academy' },
    ],
  },
  {
    heading: 'Empresa',
    links: [
      { label: 'Nosotros', href: '/nosotros' },
      { label: 'Casos de éxito', href: '/nosotros#casos' },
      { label: 'Clientes', href: '/nosotros#clientes' },
    ],
  },
  {
    heading: 'Recursos',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'Guías de IA', href: '#' },
      { label: 'Webinars', href: '#' },
    ],
  },
  {
    heading: 'Contacto',
    links: [
      { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
      { label: 'WhatsApp', href: `https://wa.me/${siteConfig.whatsapp.replace('+', '')}` },
      { label: 'Agendar reunión', href: '#cta' },
    ],
  },
]

export function BigFooter() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t"
      style={{
        background: 'var(--color-bg-landing)',
        borderColor: 'var(--color-border-soft)',
      }}
    >
      {/* Link columns */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-secondary">
                {col.heading}
              </p>
              <nav className="flex flex-col gap-2.5">
                {col.links.map((link) => (
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
          ))}
        </div>

        {/* Giant logo + copyright */}
        <div
          className="border-t py-10"
          style={{ borderColor: 'var(--color-border-soft)' }}
        >
          <p
            className="select-none text-center font-black uppercase tracking-tighter text-text"
            style={{ fontSize: 'clamp(3rem, 12vw, 9rem)', lineHeight: 1, opacity: 0.06 }}
            aria-hidden="true"
          >
            {siteConfig.name}
          </p>
          <p className="mt-4 text-center text-xs text-text-secondary">
            © {year} Grupo Belgrano SpA · Santiago, Chile · Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
