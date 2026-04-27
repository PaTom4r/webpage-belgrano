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
    subheadline: 'Una empresa chilena construida sobre IA real, no promesas.',
    paragraphs: [
      'Grupo Belgrano nació en Santiago con una convicción clara: la inteligencia artificial no es una moda — es la herramienta más poderosa que una empresa puede poner a trabajar hoy. Desde el primer día, construimos todo en torno a esa idea.',
      'Somos una empresa integrada de marketing, IA y estrategia de negocios. Esto significa que no derivamos a terceros: el mismo equipo que diseña la estrategia, la ejecuta. Sin teléfono descompuesto, sin pérdida de contexto.',
      'Nuestros clientes incluyen aseguradoras, canales de televisión y empresas de servicios que eligieron crecer de forma inteligente. Hoy los acompañamos con planificación y compra de medios tradicionales y digitales, inteligencia artificial aplicada a sus procesos y experiencias de marca que conectan con su audiencia.',
    ],
  },

  values: {
    headline: 'Por qué Belgrano',
    subheadline: 'Tres verticales. Una sola inteligencia.',
    items: [
      {
        icon: 'bot',
        title: 'IA aplicada desde el día uno',
        description:
          'Belgrano Intelligence es el tronco tecnológico del grupo. Construimos agentes, modelos y automatizaciones reales — y formamos a tu equipo para que los opere.',
      },
      {
        icon: 'layers',
        title: 'Tres verticales integradas',
        description:
          'Belgrano Media, Intelligence y Brand: medios tradicionales y digitales, inteligencia artificial aplicada y experiencias de marca. Un solo equipo, sin intermediarios.',
      },
      {
        icon: 'users',
        title: 'Tu equipo, no solo tu proveedor',
        description:
          'A través de Academy — la rama formativa de Intelligence — capacitamos a tu gente para operar lo que construimos. El conocimiento se queda en tu empresa.',
      },
    ],
  },

  team: {
    headline: 'Cómo trabajamos',
    subheadline: 'Agilidad, integración y ejecución sin intermediarios.',
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
