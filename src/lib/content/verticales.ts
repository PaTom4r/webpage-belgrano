// src/lib/content/verticales.ts
// Content for the 3 Belgrano service verticals (new hierarchical structure).
// Belgrano Intelligence has 2 internal branches: AI Solutions + Academy.
// Used by: VerticalesSection (landing), vertical detail pages.

export interface FaqItem {
  question: string
  answer: string
}

export interface VerticalMetric {
  value: string
  label: string
}

export interface VerticalBranch {
  name: string
  headline: string
  description: string
  tags?: string[]
  features?: string[]
  faq?: FaqItem[]
}

export interface Vertical {
  slug: string
  name: string
  benefitHeadline: string
  tagline: string
  description: string       // short (used by landing cards)
  longDescription: string   // 2-3 paragraph expanded copy for detail page
  icon: string              // Lucide icon name label
  tags?: string[]
  metrics?: VerticalMetric[]
  clients?: string[]
  faq: FaqItem[]
  branches?: VerticalBranch[]
}

export const verticales: Vertical[] = [
  {
    slug: 'media',
    name: 'Belgrano Media',
    benefitHeadline: 'Tu marca presente donde tu audiencia vive',
    tagline: 'Medios tradicionales y digitales, planificados con cabeza.',
    description:
      'Planificación, compra y gestión de espacios publicitarios: TV, radio, vía pública, DOOH y digital. Diseñamos mixes de medios que llegan donde tu audiencia realmente está — con data, relación directa con los canales y foco en resultados medibles.',
    longDescription:
      'Belgrano Media es nuestra unidad de planificación y compra de medios. Trabajamos todo el mix: televisión abierta y cable, radio, vía pública tradicional, pantallas DOOH, pauta digital y plataformas de streaming. La combinación se define según tu audiencia y objetivos, no según lo que más comisión deja.\n\nTenemos relación directa con canales, concesionarias y operadores de medios en Chile. Eso se traduce en mejores precios, mejor inventario y velocidad para activar campañas cuando el mercado lo requiere. Negociamos, compramos y operamos las pautas de punta a punta — tú apruebas y nosotros ejecutamos.\n\nMedimos lo que importa: alcance, frecuencia efectiva, share of voice y el impacto real en el negocio. Integramos la data de medios tradicionales con la de digital para que la conversación con tu audiencia sea coherente en todos los puntos de contacto.',
    icon: 'Monitor',
    tags: ['Planificación de medios', 'TV', 'Radio', 'Vía Pública', 'DOOH', 'Pauta digital', 'Media buying'],
    metrics: [
      { value: '15+', label: 'años de experiencia en planificación de medios en Chile' },
      { value: '100%', label: 'mix de canales: ATL, BTL, DOOH y digital' },
      { value: '24h', label: 'para ajustar una pauta cuando el mercado cambia' },
    ],
    clients: ['TNT Sports', 'Warner Bros.'],
    faq: [
      {
        question: '¿Qué tipos de medios manejan?',
        answer:
          'Todo el mix: televisión abierta y de pago, radios nacionales y regionales, vía pública tradicional (paletas, vallas), pantallas DOOH en malls, clínicas y espacios corporativos, pauta digital programática y display, YouTube, y streaming audio. La recomendación depende de tu audiencia, no de lo que nos deja más comisión.',
      },
      {
        question: '¿Cómo es el proceso de planificación?',
        answer:
          'Empezamos con un brief corto — público, objetivo, presupuesto, ventanas de campaña. Luego presentamos un plan con alcance estimado, frecuencia, mix de canales y justificación. Una vez aprobado, negociamos, compramos y operamos las pautas. Tú recibes un solo punto de contacto y un reporte consolidado al cierre.',
      },
      {
        question: '¿Cómo miden el resultado de una campaña?',
        answer:
          'Combinamos fuentes oficiales (Kantar, Ibope, post-buy de los medios) con data propia de las pantallas DOOH y métricas digitales. Entregamos reportes con alcance, frecuencia efectiva, GRPs y — cuando se puede — correlación con ventas o tráfico a pie. Medimos lo que mueve el negocio, no solo lo que infla el reporte.',
      },
      {
        question: '¿Las pantallas DOOH están dentro de Belgrano Media?',
        answer:
          'Sí. La antigua vertical de pantallas forma parte ahora de Belgrano Media como un canal más del mix de medios. Seguimos operando redes de pantallas en clínicas, estadios y espacios corporativos, y las integramos con TV, radio y digital cuando la campaña lo pide.',
      },
      {
        question: '¿Trabajan con radio y TV o solo digital?',
        answer:
          'Trabajamos ambos. Tenemos equipos dedicados a medios tradicionales (TV, radio, vía pública) y a medios digitales. Lo importante es que la planificación sea integrada — no tiene sentido pensar la TV por un lado y digital por otro cuando la audiencia vive en todos los canales a la vez.',
      },
      {
        question: '¿Qué diferencia a Belgrano Media de una central de medios tradicional?',
        answer:
          'Tres cosas: (1) la data de Belgrano Intelligence alimenta decisiones de planificación y segmentación, (2) operamos nuestra propia red DOOH, lo que nos da inventario y control, y (3) trabajamos en equipos chicos y directos — sin cadenas de intermediarios entre tú y la persona que compra el medio.',
      },
    ],
  },
  {
    slug: 'intelligence',
    name: 'Belgrano Intelligence',
    benefitHeadline: 'IA aplicada que transforma cómo opera tu negocio',
    tagline: 'La inteligencia artificial puesta a trabajar por tu empresa.',
    description:
      'IA aplicada a problemas reales de tu negocio: agentes conversacionales, análisis de clientes, automatización de procesos y capacitación para que tu equipo se apropie de la tecnología. El tronco inteligente que potencia a Media y Brand.',
    longDescription:
      'Belgrano Intelligence es el corazón tecnológico de la empresa. Es donde desarrollamos soluciones con inteligencia artificial y donde formamos a los equipos que después las van a operar. Tiene dos ramas complementarias: AI Solutions — proyectos concretos de IA aplicada a empresas — y Academy — formación, certificaciones e incubadora de nuevos negocios con IA.\n\nLa diferencia con un proveedor de software tradicional es que no vendemos licencias de plataformas genéricas. Construimos soluciones a medida, integradas a los sistemas que tu empresa ya usa: CRM, ERP, sistemas de abastecimiento, bases de clientes. Cada proyecto empieza con un diagnóstico honesto — si la IA no resuelve el problema, te lo decimos.\n\nIntelligence también es el motor que potencia a las otras dos verticales de Belgrano: alimenta a Media con segmentación y análisis de audiencia, y a Brand con herramientas para activaciones inteligentes. Es la capa transversal que hace que todo el grupo funcione como una sola operación.',
    icon: 'Brain',
    tags: ['Inteligencia Artificial', 'Automatización', 'Chatbots', 'Análisis de datos', 'Capacitación', 'Incubadora'],
    metrics: [
      { value: '2', label: 'ramas: AI Solutions para proyectos y Academy para formación' },
      { value: '24/7', label: 'operación de agentes conversacionales en producción' },
      { value: '40–70%', label: 'reducción de tiempos operativos en procesos automatizados' },
    ],
    clients: ['Clínica Las Condes', 'Seguros CLC', 'AFP Modelo'],
    branches: [
      {
        name: 'AI Solutions',
        headline: 'IA que trabaja para tu empresa',
        description:
          'Construimos agentes conversacionales, modelos de análisis de clientes, automatización de procesos y mejoras operativas con IA. Cada proyecto está integrado a los sistemas internos de tu empresa y diseñado para generar retorno medible.',
        tags: ['Chatbots', 'Análisis predictivo', 'Automatización', 'Machine Learning', 'Integraciones'],
        features: [
          'Agentes conversacionales para ventas, soporte y atención en WhatsApp, web e Instagram',
          'Análisis de comportamiento y segmentación inteligente de clientes',
          'Automatización de procesos internos (abastecimiento, back office, facturación)',
          'Integración con CRM, ERP y sistemas propios existentes',
          'Modelos de predicción para churn, demanda y cross-sell',
        ],
        faq: [
          {
            question: '¿Qué tipo de empresas pueden usar AI Solutions?',
            answer:
              'Trabajamos mejor con empresas medianas y grandes que ya tienen un volumen razonable de datos y procesos. Nuestra experiencia se concentra en salud, seguros, AFP, retail y servicios financieros — pero la metodología aplica a cualquier industria con procesos repetitivos o interacción de clientes a escala.',
          },
          {
            question: '¿Cuánto demora implementar una solución de IA?',
            answer:
              'Un agente conversacional en producción toma entre 3 y 6 semanas. Un proyecto de automatización de procesos o análisis predictivo, entre 6 y 12 semanas. Empezamos siempre con un diagnóstico corto para definir alcance y KPIs antes de firmar cualquier cosa.',
          },
          {
            question: '¿La IA se conecta con nuestros sistemas actuales?',
            answer:
              'Sí — esa es la parte central de lo que hacemos. Integramos con CRMs (Salesforce, HubSpot, propios), ERPs, sistemas de agendamiento, bases de datos, APIs REST y webhooks. No vendemos soluciones desconectadas del resto de la operación.',
          },
          {
            question: '¿Qué pasa con los datos sensibles?',
            answer:
              'Tenemos experiencia en industrias reguladas (salud, seguros, pensiones) y diseñamos cada implementación pensando en cumplimiento, anonimización y trazabilidad. Firmamos NDAs y acuerdos de procesamiento de datos antes de tocar información sensible.',
          },
        ],
      },
      {
        name: 'Academy',
        headline: 'Formación e innovación con IA',
        description:
          'Capacitamos a los equipos de empresas para que usen IA de verdad en su trabajo diario. Talleres, cursos certificados, programas in-company y una incubadora para nuevos negocios basados en IA. Enseñamos lo que nosotros mismos usamos.',
        tags: ['Capacitación', 'Cursos SENCE', 'Incubadora', 'Talleres in-company', 'Innovación'],
        features: [
          'Talleres y cursos de IA para equipos de marketing, ventas y operaciones',
          'Programas de certificación con código SENCE para franquicia tributaria',
          'Incubadora de ideas: transformamos un concepto en un producto con IA',
          'Mentoría para emprendedores que quieren construir negocios con IA',
          'Formatos in-company, online sincrónico y asincrónico a escala',
        ],
        faq: [
          {
            question: '¿Los cursos son con código SENCE?',
            answer:
              'Sí, trabajamos con SENCE en cursos acreditados que permiten a las empresas usar su franquicia tributaria. Verificamos disponibilidad de códigos según el formato y la fecha que necesites.',
          },
          {
            question: '¿Qué herramientas enseñan?',
            answer:
              'ChatGPT y modelos generativos para trabajo cotidiano, Microsoft Copilot en Microsoft 365, n8n para automatización sin código, y herramientas específicas según la industria. No es teoría — son las mismas herramientas que usamos en AI Solutions.',
          },
          {
            question: '¿Qué es la incubadora de negocios con IA?',
            answer:
              'Es un programa donde tomamos una idea de negocio basada en IA y la llevamos de concepto a producto funcional. Combina mentoría, desarrollo con el equipo de AI Solutions y acompañamiento estratégico. Está pensada para emprendedores y también para unidades de innovación dentro de empresas establecidas.',
          },
          {
            question: '¿Tienen formato online o solo presencial?',
            answer:
              'Ambos. Hacemos talleres presenciales in-company, cursos online sincrónicos en vivo y contenidos asincrónicos para masificación interna. El formato lo elegimos según el tamaño del equipo y el objetivo.',
          },
        ],
      },
    ],
    faq: [
      {
        question: '¿Qué es exactamente Belgrano Intelligence?',
        answer:
          'Es la unidad tecnológica de Belgrano. Desarrolla soluciones con inteligencia artificial (AI Solutions) y forma a los equipos que las operan (Academy). Es el tronco que alimenta con capacidad técnica al resto del grupo.',
      },
      {
        question: '¿Cómo funcionan las dos ramas juntas?',
        answer:
          'AI Solutions construye la tecnología; Academy enseña a usarla. Muchos clientes parten con un proyecto de AI Solutions y siguen con capacitación Academy para que sus equipos tomen control total de la herramienta. También funciona al revés: un curso Academy suele dejar claro qué automatizar después.',
      },
      {
        question: '¿En qué se diferencian de otras agencias de IA?',
        answer:
          'No vendemos plataformas empaquetadas ni suscripciones genéricas. Construimos soluciones a medida, integradas a los sistemas que ya usas, con foco en retorno medible. Y después formamos a tu equipo para que la operación no dependa de nosotros para siempre.',
      },
      {
        question: '¿Intelligence solo trabaja con clientes directos o también con Media y Brand?',
        answer:
          'Ambas cosas. Intelligence es el motor transversal del grupo: alimenta a Media con segmentación y análisis de audiencia, y a Brand con herramientas para activaciones inteligentes (pantallas interactivas, experiencias personalizadas). Cuando contratas Media o Brand, ya estás accediendo — sin saberlo — a capacidades de Intelligence.',
      },
      {
        question: '¿Tienen experiencia en industrias reguladas?',
        answer:
          'Sí. Hemos implementado soluciones con IA en salud (clínicas), seguros, AFP y servicios financieros. Sabemos operar bajo marcos de cumplimiento, anonimización de datos y protocolos de seguridad.',
      },
      {
        question: '¿Cómo empieza un proyecto con Intelligence?',
        answer:
          'Con un diagnóstico corto y gratuito. Mapeamos el problema, evaluamos si la IA es la respuesta adecuada (a veces no lo es), y entregamos una propuesta con alcance, plazo y KPIs claros. Recién ahí se decide si avanzamos.',
      },
    ],
  },
  {
    slug: 'brand',
    name: 'Belgrano Brand',
    benefitHeadline: 'Experiencias de marca que activan, conectan y venden',
    tagline: 'Trade marketing y acciones creativas que dejan huella.',
    description:
      'Trade marketing, activaciones BTL, stands, eventos y desarrollo creativo para marcas que quieren presencia real donde están sus clientes. Diseñamos experiencias que integran presencia física, contenido y — cuando suma — tecnología inteligente.',
    longDescription:
      'Belgrano Brand es la unidad de trade marketing y experiencias de marca. Diseñamos y producimos activaciones BTL, stands para ferias y eventos, presencia en punto de venta, sampling, activaciones en vía pública y todo el desarrollo creativo alrededor. Donde otras agencias se quedan en el brief, nosotros ejecutamos la operación completa.\n\nCombinamos estrategia de marca, diseño, producción y logística. Un mismo equipo piensa la idea, la diseña, la fabrica y la opera en terreno. Esto baja los costos, acorta los tiempos y asegura que la ejecución no pierda el alma del concepto original.\n\nCuando suma, integramos tecnología de Belgrano Intelligence a las activaciones: pantallas interactivas, experiencias personalizadas, captura de datos de los asistentes para nutrir campañas posteriores. Una activación ya no tiene por qué ser solo un momento — puede ser el primer paso de una relación medible con el cliente.',
    icon: 'Megaphone',
    tags: ['Trade Marketing', 'Activaciones BTL', 'Stands', 'Eventos', 'Experiencia de marca', 'Marketing creativo'],
    metrics: [
      { value: '360°', label: 'idea, diseño, producción y ejecución en un solo equipo' },
      { value: 'BTL+', label: 'activaciones integradas con tecnología y data' },
      { value: '100%', label: 'producción propia — sin subcontratar la parte crítica' },
    ],
    clients: [],
    faq: [
      {
        question: '¿Qué tipo de activaciones hacen?',
        answer:
          'Activaciones BTL en punto de venta, stands para ferias y eventos corporativos, sampling, activaciones en vía pública y universidades, experiencias en retail y eventos de lanzamiento de producto. También hacemos el desarrollo creativo y la producción física de cada pieza.',
      },
      {
        question: '¿Integran tecnología en las activaciones?',
        answer:
          'Cuando suma, sí. Usamos pantallas interactivas, sistemas de captura de datos, experiencias personalizadas con IA y activaciones que se conectan a campañas digitales posteriores. La tecnología la aporta Belgrano Intelligence, así no pagas integradores externos.',
      },
      {
        question: '¿Qué los diferencia de una productora de eventos tradicional?',
        answer:
          'Somos una agencia de marca, no una productora. Pensamos la idea desde la estrategia del negocio, la integramos con los otros canales del cliente (medios, digital, CRM) y después la ejecutamos. Una productora te produce lo que le pides; nosotros te decimos si lo que pediste es lo correcto.',
      },
      {
        question: '¿Trabajan con todas las industrias?',
        answer:
          'Sí, siempre que haya una marca que comunicar. Tenemos experiencia en consumo masivo, retail, salud, servicios financieros y entretenimiento. La metodología se adapta al sector.',
      },
      {
        question: '¿Hacen el diseño y la producción, o solo una de las dos?',
        answer:
          'Las dos. Tenemos equipo de diseño creativo, producción gráfica, mobiliario/estructuras y operación en terreno. Poder hacer todo internamente es lo que nos permite mantener la calidad y el presupuesto bajo control.',
      },
      {
        question: '¿Cómo miden el éxito de una activación?',
        answer:
          'Depende del objetivo: cantidad de personas impactadas, leads capturados, ventas incrementales en el punto, tiempo promedio de interacción o alcance en redes sociales generado por la activación. Definimos los KPIs antes de salir a producción, no después.',
      },
    ],
  },
]
