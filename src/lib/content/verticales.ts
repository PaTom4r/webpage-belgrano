// src/lib/content/verticales.ts
// Content for the 4 Belgrano service verticals.
// Used by: VerticalesSection (landing), vertical detail pages (Phase 3).

export interface Vertical {
  slug: string
  name: string
  tagline: string
  description: string
  icon: string // Lucide icon name (used as string label — actual icon rendered by section component)
  metrics?: string[]
  clients?: string[]
}

export const verticales: Vertical[] = [
  {
    slug: 'bots',
    name: 'Bots Conversacionales',
    tagline: 'Tu negocio responde solo. Siempre.',
    description:
      'Chatbots con IA que atienden, califican y derivan leads en WhatsApp, web y redes sociales — 24/7, sin costo operacional adicional. Automatizamos la primera línea de atención para que tu equipo se enfoque en cerrar, no en contestar.',
    icon: 'MessageCircle',
    metrics: ['70–85% resolución automática', '30–50% reducción de costos de atención'],
    clients: ['Clínica Las Condes', 'Seguros CLC'],
  },
  {
    slug: 'dooh',
    name: 'DOOH & Señalética Digital',
    tagline: 'Tu marca en movimiento, donde importa.',
    description:
      'Diseñamos, producimos y operamos redes de pantallas digitales en puntos de alto tráfico — malls, clínicas, corporativos y espacios públicos. Contenido dinámico, actualizable en tiempo real, con métricas de impacto.',
    icon: 'Monitor',
    metrics: ['500+ pantallas gestionadas', '+40% recordación de marca vs. señalética estática'],
    clients: ['TNT Sports', 'Warner Bros.', 'AFP Modelo'],
  },
  {
    slug: 'producciones',
    name: 'Producciones Digitales',
    tagline: 'Contenido que convierte, no solo impresiona.',
    description:
      'Videos, motion graphics, fotografía y assets digitales producidos con IA y talento humano. Desde reels de producto hasta campañas integradas. Velocidad de agencia boutique, calidad de producción profesional.',
    icon: 'Film',
    metrics: ['3x velocidad vs. producción tradicional', 'Costos 40% menores'],
  },
  {
    slug: 'academy',
    name: 'Belgrano Academy',
    tagline: 'Tu equipo con superpoderes de IA.',
    description:
      'Programas de formación y talleres prácticos para equipos de marketing, ventas y operaciones que quieren incorporar IA de verdad — no solo hablar de ella. Desde fundamentos hasta implementación de herramientas.',
    icon: 'GraduationCap',
    metrics: ['200+ profesionales formados', '98% satisfacción'],
    clients: ['Clínica Las Condes', 'AFP Modelo'],
  },
]
