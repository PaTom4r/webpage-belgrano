// src/lib/content/site.ts
// Global site strings: nav links, footer copy, company metadata.
// Used by: Navbar, Footer, metadata in page.tsx.

export const siteConfig = {
  name: 'Belgrano',
  tagline: 'Operamos el crecimiento de tu marca',
  description:
    'Somos un operador de crecimiento de marca. Conectamos IA, medios y experiencias para que las marcas crezcan y vendan.',
  url: 'https://belgrano.cl',
  email: 'hola@belgrano.cl',
  whatsapp: '+56965360205',
}

export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: 'Intelligence', href: '/verticales/intelligence' },
  { label: 'Media',        href: '/verticales/media' },
  { label: 'Brand',        href: '/verticales/brand' },
]

export const footerData = {
  tagline: 'Hacemos que la IA trabaje para tu negocio.',
  links: [
    { label: 'Belgrano Media', href: '/verticales/media' },
    { label: 'Belgrano Intelligence', href: '/verticales/intelligence' },
    { label: 'Belgrano Brand', href: '/verticales/brand' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Contacto', href: '#cta' },
  ],
  copyright: `© ${new Date().getFullYear()} Grupo Belgrano SpA. Todos los derechos reservados.`,
}
