// src/lib/content/site.ts
// Global site strings: nav links, footer copy, company metadata.
// Used by: Navbar, Footer, metadata in page.tsx.

export const siteConfig = {
  name: 'Belgrano',
  tagline: 'IA, Marketing & Estrategia',
  description:
    'Agencia chilena de IA aplicada, marketing digital y producción de contenido para empresas que quieren crecer en serio.',
  url: 'https://belgrano.cl',
  email: 'hola@belgrano.cl',
  whatsapp: '+56912345678', // placeholder — update before Phase 5
}

export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: 'Qué hacemos', href: '#what-we-do' },
  { label: 'Cómo trabajamos', href: '#how-it-works' },
  { label: 'Resultados', href: '#stats' },
  { label: 'Contacto', href: '#cta' },
]

export const footerData = {
  tagline: 'Hacemos que la IA trabaje para tu negocio.',
  links: [
    { label: 'Bots Conversacionales', href: '/verticales/bots' },
    { label: 'DOOH & Señalética', href: '/verticales/dooh' },
    { label: 'Producciones Digitales', href: '/verticales/producciones' },
    { label: 'Belgrano Academy', href: '/verticales/academy' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Contacto', href: '#cta' },
  ],
  copyright: `© ${new Date().getFullYear()} Grupo Belgrano SpA. Todos los derechos reservados.`,
}
