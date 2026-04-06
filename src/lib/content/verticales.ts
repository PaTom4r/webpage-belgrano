// src/lib/content/verticales.ts
// Content for the 4 Belgrano service verticals.
// Used by: VerticalesSection (landing), vertical detail pages (Phase 3).

export interface FaqItem {
  question: string
  answer: string
}

export interface VerticalMetric {
  value: string   // e.g. "70–85%"
  label: string   // e.g. "consultas resueltas automáticamente"
}

export interface Vertical {
  slug: string
  name: string
  tagline: string
  description: string       // short (used by landing cards — keep existing)
  longDescription: string   // 2-3 paragraph expanded copy for detail page
  icon: string              // Lucide icon name (used as string label — actual icon rendered by section component)
  metrics?: VerticalMetric[]
  clients?: string[]
  faq: FaqItem[]            // 5-7 items per vertical, addressing sales objections
}

export const verticales: Vertical[] = [
  {
    slug: 'bots',
    name: 'Smart Agents',
    tagline: 'Tu negocio responde solo. Siempre.',
    description:
      'Chatbots con IA que atienden, califican y derivan leads en WhatsApp, web y redes sociales — 24/7, sin costo operacional adicional. Automatizamos la primera línea de atención para que tu equipo se enfoque en cerrar, no en contestar.',
    longDescription:
      'Construimos chatbots con IA que atienden, califican y derivan leads en WhatsApp, web y redes sociales — las 24 horas, los 7 días de la semana, sin costo operacional adicional. A diferencia de las plataformas SaaS genéricas, cada bot que construimos está integrado a los sistemas internos de tu empresa: CRM, agendas médicas, bases de clientes, pasarelas de pago.\n\nNuestras implementaciones en industrias reguladas (salud, seguros, AFP) resuelven desafíos que las soluciones estándar no pueden: flujos de derivación complejos, cumplimiento normativo, manejo de datos sensibles. El resultado: tu equipo se enfoca en cerrar, no en contestar.\n\nRespuesta en menos de 2 minutos aumenta 10 veces la probabilidad de conversión. Con un bot bien implementado, eso pasa automáticamente.',
    icon: 'MessageCircle',
    metrics: [
      { value: '70–85%', label: 'consultas resueltas sin intervención humana' },
      { value: '30–50%', label: 'reducción en costos de atención al cliente' },
      { value: '10x', label: 'más conversión cuando se responde en menos de 2 minutos' },
      { value: '24/7', label: 'disponibilidad sin costo incremental' },
    ],
    clients: ['Clínica Las Condes', 'Seguros CLC'],
    faq: [
      {
        question: '¿Cuánto tiempo toma implementar un bot?',
        answer:
          'Entre 3 y 6 semanas para un bot funcional en producción, dependiendo de la complejidad de los flujos y las integraciones requeridas. Empezamos con un diagnóstico gratuito para mapear los casos de uso y definir el alcance exacto.',
      },
      {
        question: '¿El bot puede conectarse a nuestros sistemas internos?',
        answer:
          'Sí. Integramos con CRMs (Salesforce, HubSpot, sistemas propios), sistemas de agendamiento, bases de datos de clientes y APIs REST. La integración es el núcleo de nuestra propuesta — no vendemos bots desconectados.',
      },
      {
        question: '¿Qué pasa cuando el bot no sabe responder?',
        answer:
          'El bot escala a un agente humano con contexto completo de la conversación. El traspaso es transparente para el cliente y el agente recibe toda la información necesaria para continuar sin que el usuario tenga que repetir nada.',
      },
      {
        question: '¿Funciona solo en WhatsApp o también en otros canales?',
        answer:
          'Principalmente WhatsApp Business API (el canal con mayor adopción en Chile), pero también web chat, Instagram DM y otros canales dependiendo del caso. Empezamos donde está tu audiencia.',
      },
      {
        question: '¿Necesitamos cuenta WhatsApp Business API?',
        answer:
          'Nosotros gestionamos el proceso de verificación y onboarding de WhatsApp Business API. No necesitas experiencia previa — lo configuramos como parte del proyecto.',
      },
      {
        question: '¿Cuánto cuesta el mantenimiento mensual?',
        answer:
          'Depende del volumen de conversaciones y las integraciones. Típicamente el mantenimiento incluye monitoreo, actualizaciones de flujos y soporte técnico. Lo definimos como parte de la propuesta inicial.',
      },
    ],
  },
  {
    slug: 'dooh',
    name: 'Digital Media',
    tagline: 'Tu marca en movimiento, donde importa.',
    description:
      'Diseñamos, producimos y operamos redes de pantallas digitales en puntos de alto tráfico — malls, clínicas, corporativos y espacios públicos. Contenido dinámico, actualizable en tiempo real, con métricas de impacto.',
    longDescription:
      'Operamos redes de pantallas digitales en espacios cautivos de alto valor: clínicas, estadios, corporativos y centros comerciales. A diferencia de la publicidad exterior tradicional (carteles estáticos), nuestras pantallas entregan contenido dinámico, actualizable en tiempo real y segmentado por horario o contexto.\n\nPara las marcas que se anuncian: acceso a audiencias con alta receptividad y tiempo de atención. Una sala de espera médica promedia 20-40 minutos de exposición. Eso no lo tiene ningún otro canal.\n\nPara los espacios que se suman a nuestra red: instalamos y operamos la infraestructura sin costo. El modelo de revenue share convierte metros cuadrados subutilizados en un activo que genera ingresos pasivos — sin esfuerzo operativo de tu parte.',
    icon: 'Monitor',
    metrics: [
      { value: '500+', label: 'pantallas gestionadas en la red' },
      { value: '2–3x', label: 'mayor recall vs. señalética estática' },
      { value: '20–40 min', label: 'tiempo promedio de exposición en espacios médicos' },
      { value: '3–5x', label: 'CPM más alto que OOH estático por calidad de audiencia' },
    ],
    clients: ['TNT Sports', 'Warner Bros.'],
    faq: [
      {
        question: '¿Qué espacios forman parte de la red?',
        answer:
          'Operamos pantallas en clínicas y espacios corporativos en Santiago. Gestionamos la intermediación entre los espacios y los canales de televisión para la exhibición de publicidad en sus pantallas. TNT Sports y Warner Bros. son clientes activos.',
      },
      {
        question: '¿Cómo funciona el modelo de revenue share para espacios?',
        answer:
          'Instalamos y operamos las pantallas sin costo para el espacio anfitrión. Los ingresos de publicidad se reparten en porcentajes acordados — el espacio recibe su parte automáticamente cada mes sin gestión operativa de su parte.',
      },
      {
        question: '¿Cómo actualizo el contenido de las pantallas?',
        answer:
          'A través de nuestra plataforma de gestión de contenido, puedes programar, actualizar y monitorear el contenido en tiempo real desde cualquier dispositivo. También ofrecemos gestión completa si prefieres delegar esa operación.',
      },
      {
        question: '¿Qué formatos de contenido soportan las pantallas?',
        answer:
          'Vídeo (MP4), imágenes estáticas (JPG/PNG), y contenido HTML5 animado. Trabajamos con tu equipo creativo o lo producimos internamente a través de nuestra vertical de Producciones.',
      },
      {
        question: '¿Cómo se mide el impacto de las campañas?',
        answer:
          'Reportamos impresiones estimadas por pantalla según afluencia del espacio, tiempo de reproducción y frecuencia. Para campañas digitales complementarias, cruzamos datos de conversión. No vendemos pantallas — vendemos resultados medibles.',
      },
      {
        question: '¿Pueden hacer contenido específico para el sector salud?',
        answer:
          'Sí. Tenemos experiencia con contenido regulado en contexto clínico: mensajes de salud preventiva, información de servicios, comunicación institucional. Cumplimos con las directrices de comunicación para entornos médicos.',
      },
    ],
  },
  {
    slug: 'producciones',
    name: 'Creative Studio',
    tagline: 'Contenido que convierte, no solo impresiona.',
    description:
      'Videos, motion graphics, fotografía y assets digitales producidos con IA y talento humano. Desde reels de producto hasta campañas integradas. Velocidad de agencia boutique, calidad de producción profesional.',
    longDescription:
      'Producimos video, motion graphics, fotografía y assets digitales potenciados por inteligencia artificial. La diferencia con una agencia de producción tradicional: velocidad, costo y volumen.\n\nUna producción tradicional tarda semanas y cuesta miles de dólares. Con nuestro proceso IA-asistido, producimos contenido de calidad profesional en días — no semanas — a un costo 40-60% menor. Eso permite escalar tu estrategia de contenido sin escalar tu presupuesto.\n\nEl contenido producido se integra directamente con las otras verticales de Belgrano: creatividades para pantallas DOOH, materiales de formación para la Academy, y assets para campañas de chatbot. Un solo proveedor para todo el ecosistema de contenido.',
    icon: 'Film',
    metrics: [
      { value: '3x', label: 'velocidad vs. producción audiovisual tradicional' },
      { value: '40–60%', label: 'reducción de costo vs. agencia tradicional' },
      { value: '1–3', label: 'días de turnaround para reels y contenido redes sociales' },
    ],
    clients: [],
    faq: [
      {
        question: '¿Qué tipo de contenido producen?',
        answer:
          'Videos y reels para redes sociales, spots para pantallas DOOH, material de capacitación, motion graphics, fotografía de producto/marca con IA generativa, y avatares digitales. Si necesitas contenido de forma consistente y a volumen, somos la opción.',
      },
      {
        question: '¿Cómo funciona el proceso de producción con IA?',
        answer:
          'Combinamos herramientas de IA generativa (video, imagen, voz) con revisión y dirección creativa humana. La IA acelera las iteraciones — en vez de semanas de preproducción, en días tienes versiones para revisar y aprobar.',
      },
      {
        question: '¿Mantienen el estilo y brand de nuestra empresa?',
        answer:
          'Sí. El proceso comienza con un brief de marca: colores, tipografía, tono, referencias visuales. A partir de ahí, todo el contenido producido sigue esas directrices. Ofrecemos un paquete de alineación de marca antes del primer entregable.',
      },
      {
        question: '¿Pueden producir contenido recurrente (retainer mensual)?',
        answer:
          'Es nuestro modelo preferido. Con un acuerdo mensual de volumen, el costo unitario baja y el contenido mejora con el tiempo porque conocemos mejor tu marca. Ideal para empresas que necesitan 10-30 piezas de contenido al mes.',
      },
      {
        question: '¿Trabajan con empresas que ya tienen agencia creativa?',
        answer:
          'Sí. Podemos funcionar como equipo de producción para agencias (white label) o como complemento cuando necesitan capacidad adicional rápidamente. Nos adaptamos al workflow del cliente.',
      },
    ],
  },
  {
    slug: 'academy',
    name: 'Academy',
    tagline: 'Tu equipo con superpoderes de IA.',
    description:
      'Programas de formación y talleres prácticos para equipos de marketing, ventas y operaciones que quieren incorporar IA de verdad — no solo hablar de ella. Desde fundamentos hasta implementación de herramientas.',
    longDescription:
      'Capacitamos equipos corporativos para adoptar inteligencia artificial de forma práctica y medible — no solo hablar de ella. Nuestros programas están diseñados desde casos reales: los mismos contextos de salud, seguros, AFP y marketing que ya implementamos en las otras verticales de Belgrano.\n\nLa diferencia con los cursos del mercado: no enseñamos teoría genérica. Enseñamos cómo usar IA en el trabajo específico de tu equipo — ya sea médicos, ejecutivos de ventas, equipo de RRHH o gerentes. El resultado es medible: productividad real, no solo certificados.\n\nTrabajamos con SENCE para capacitaciones acreditadas y ofrecemos formatos presenciales, online sincrónico y taller in-company. Desde fundamentos hasta automatización avanzada con n8n.',
    icon: 'GraduationCap',
    metrics: [
      { value: '200+', label: 'profesionales formados en empresas chilenas' },
      { value: '98%', label: 'satisfacción en evaluaciones post-taller' },
      { value: '20–40%', label: 'ganancia de productividad reportada por equipos capacitados' },
      { value: '2–3h', label: 'ahorro semanal por persona con Copilot bien implementado' },
    ],
    clients: ['Clínica Las Condes', 'AFP Modelo'],
    faq: [
      {
        question: '¿Los talleres son con SENCE?',
        answer:
          'Sí, trabajamos con SENCE para cursos acreditados que permiten a las empresas usar su franquicia tributaria. Contáctanos para verificar disponibilidad de códigos SENCE para el formato y fecha que necesitas.',
      },
      {
        question: '¿Cuántas personas pueden asistir a un taller in-company?',
        answer:
          'Los talleres presenciales in-company funcionan mejor con grupos de 10 a 30 personas. Para equipos más grandes, podemos dividir en grupos o diseñar un formato asincrónico escalable.',
      },
      {
        question: '¿Pueden adaptar el contenido a nuestra industria?',
        answer:
          'Es nuestra propuesta diferenciadora. Tenemos casos reales en salud, seguros, AFP y marketing. No damos el mismo curso a todos — personalizamos los ejemplos, ejercicios y herramientas al contexto de tu equipo.',
      },
      {
        question: '¿Qué herramientas enseñan?',
        answer:
          'Depende del nivel y el objetivo: ChatGPT y IA generativa para el trabajo cotidiano, Microsoft Copilot en Microsoft 365 (Teams, Outlook, Word, Excel), n8n para automatizaciones sin código, y herramientas específicas según la industria.',
      },
      {
        question: '¿Tienen modalidad online?',
        answer:
          'Sí. Ofrecemos talleres online sincrónicos (6-8 sesiones de 2 horas) para grupos distribuidos. También cursos asincrónicos para masificación interna. El formato se elige según el tamaño del equipo y el presupuesto.',
      },
      {
        question: '¿Cómo se mide el impacto post-capacitación?',
        answer:
          'Entregamos una encuesta de satisfacción y un assessment pre/post de habilidades. Para talleres de más de 20 personas, ofrecemos un seguimiento a los 30 días para medir adopción real de las herramientas en el trabajo diario.',
      },
    ],
  },
]
