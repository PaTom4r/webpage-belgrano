// src/lib/content/about.ts
// All About page copy as typed TypeScript constants.
// Used by: AboutNarrativeSection, AboutValuesSection, AboutTeamSection

export interface NarrativeContent {
  headline: string
  subheadline: string
  paragraphs: string[]
}

export interface ValueItem {
  icon: 'bot' | 'layers' | 'map-pin' | 'users'
  title: string
  description: string
}

export interface ValuesContent {
  headline: string
  subheadline: string
  items: ValueItem[]
}

export interface TeamHighlight {
  label: string
  description: string
}

export interface TeamContent {
  headline: string
  subheadline: string
  paragraphs: string[]
  highlights: TeamHighlight[]
}

export interface AboutContent {
  narrative: NarrativeContent
  values: ValuesContent
  team: TeamContent
}

export const aboutContent: AboutContent = {
  narrative: {
    headline: 'Quiénes somos',
    subheadline: 'Una agencia chilena construida sobre IA real, no promesas.',
    paragraphs: [
      'Grupo Belgrano nació en Santiago con una convicción clara: la inteligencia artificial no es una moda — es la herramienta más poderosa que una empresa puede poner a trabajar hoy. Desde el primer día, construimos todo en torno a esa idea.',
      'Somos una agencia integrada de marketing, IA y estrategia de negocios. Esto significa que no derivamos a terceros: el mismo equipo que diseña la estrategia, la ejecuta. Sin teléfono descompuesto, sin pérdida de contexto.',
      'Nuestros clientes incluyen aseguradoras, canales de televisión y empresas de servicios que eligieron crecer de forma inteligente. Hoy los acompañamos en automatización de conversaciones, presencia digital en pantallas, producción de contenido y formación de equipos.',
    ],
  },

  values: {
    headline: 'Por qué Belgrano',
    subheadline: 'Cuatro verticales. Un solo equipo. Ningún intermediario.',
    items: [
      {
        icon: 'bot',
        title: 'IA aplicada desde el día uno',
        description:
          'No usamos IA como buzz word. Construimos bots reales, flujos de automatización y sistemas que tu equipo puede operar desde mañana.',
      },
      {
        icon: 'layers',
        title: 'Servicios integrados',
        description:
          'Bots + pantallas + contenido + formación. Somos la única agencia que cubre todos estos frentes sin subcontratar ni fragmentar la estrategia.',
      },
      {
        icon: 'map-pin',
        title: '100% chilena',
        description:
          'Entendemos el mercado local, los canales locales y cómo hablan tus clientes. No adaptamos plantillas de afuera — creamos estrategias desde adentro.',
      },
      {
        icon: 'users',
        title: 'Tu equipo, no solo tu agencia',
        description:
          'Formamos a tu gente a través de nuestra Academy. Cuando terminamos, tu equipo sabe usar las herramientas que instalamos. El conocimiento se queda.',
      },
    ],
  },

  team: {
    headline: 'Cómo trabajamos',
    subheadline: 'Un equipo pequeño, capaz de moverse rápido.',
    paragraphs: [
      'Belgrano opera con un modelo de equipo integrado: estrategas, productores, desarrolladores y especialistas en IA trabajando en el mismo proyecto, sin silos. Cada vertical tiene su líder técnico, y todos reportan a un solo punto de contacto.',
      'No tercerizamos la parte crítica. Las herramientas que te recomendamos son las que usamos todos los días. Si algo no funciona, somos los primeros en saberlo — y los primeros en arreglarlo.',
      'Trabajamos con contratos por proyecto o retainerías mensuales. El proceso empieza siempre igual: diagnóstico honesto, propuesta con números reales, ejecución medible.',
    ],
    highlights: [
      { label: 'Diagnóstico', description: 'Entendemos tu negocio antes de proponer nada.' },
      { label: 'Estrategia', description: 'Plan claro con métricas definidas desde el inicio.' },
      { label: 'Ejecución', description: 'Implementación sin intermediarios ni sorpresas.' },
      { label: 'Formación', description: 'Tu equipo aprende a operar lo que construimos.' },
    ],
  },
}
