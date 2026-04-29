// src/lib/content/site.ts
// Global site strings: nav links, footer copy, company metadata.
// Used by: Navbar, Footer, metadata in page.tsx, src/lib/seo/jsonld.ts.

export const siteConfig = {
  name: 'Belgrano',
  legalName: 'Grupo Belgrano SpA',
  tagline: 'Operamos el crecimiento de tu marca',
  description:
    'Somos un operador de crecimiento de marca. Conectamos IA, medios y experiencias para que las marcas crezcan y vendan.',
  url: 'https://belgrano.cl',
  email: 'hola@belgrano.cl',
  whatsapp: '+56965360205',
  // foundedYear queda null intencionalmente — schema no emite foundingDate.
  foundedYear: null as number | null,
  address: {
    street: 'Av. Presidente Kennedy 5600',
    city: 'Santiago',
    region: 'Región Metropolitana',
    postalCode: null as string | null,
    country: 'CL',
  },
  // Cobertura geográfica para schema.org y AI engines.
  areaServed: ['CL'] as const,
  // Áreas de conocimiento — alimenta Organization.knowsAbout para entity graph + GEO.
  knowsAbout: [
    'Marketing',
    'Inteligencia Artificial',
    'DOOH',
    'Activaciones BTL',
    'Trade Marketing',
    'Compra de medios',
    'Capacitación en IA',
  ] as const,
  // Redes pendientes (Instagram de Belgrano Intelligence en preparación).
  // Strings vacíos se filtran fuera del Organization.sameAs automáticamente.
  social: {
    linkedin: '',
    instagram: '',
    x: '',
    youtube: '',
  },
}

export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: 'Intelligence', href: '/intelligence' },
  { label: 'Media',        href: '/media' },
  { label: 'Brand',        href: '/brand' },
]

export const footerData = {
  tagline: 'Hacemos que la IA trabaje para tu negocio.',
  links: [
    { label: 'Belgrano Media', href: '/media' },
    { label: 'Belgrano Intelligence', href: '/intelligence' },
    { label: 'Belgrano Brand', href: '/brand' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Contacto', href: '#cta' },
  ],
  copyright: `© ${new Date().getFullYear()} Grupo Belgrano SpA. Todos los derechos reservados.`,
}
