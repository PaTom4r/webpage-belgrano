# CLAUDE.md — Belgrano Landing Page v2

## Descripción
Landing page para Grupo Belgrano — agencia chilena de IA, tecnología y negocios. Proyecto desde cero. No migrar código de `../landing-belgrano/`.

## Referencia visual
Tomar como referencia principal el estilo de **linear.app** y **latamone.com**:
- Minimalista, fondo claro/blanco, tipografía moderna y precisa
- Secciones con mucho aire, scroll storytelling
- Animaciones suaves y funcionales (no decorativas)
- Dark sections intercaladas para contraste (como linear.app usa secciones oscuras para features)

## Paleta de colores
```
Fondo principal:     #ffffff (blanco puro)
Fondo secciones:     #f9fafb (gris ultra claro)
Fondo contraste:     #09090B (negro — para secciones destacadas)
Texto principal:     #111827 (negro cálido)
Texto secundario:    #6B7280 (gris medio)
Acento primario:     #000000 (negro — CTAs, bordes, badges)
Acento secundario:   A definir (puede ser un color terciario sutil)
```

No usar azul ni violeta — eso era la v1. Esta versión es blanco + negro minimalista.

## Tipografía
- **Geist Sans** (principal) — o Inter como fallback
- Headlines: peso 800-900, tracking tight (-0.02em a -0.03em)
- Labels/tags: peso 500-600, uppercase, tracking wide (0.05em+)
- Cuerpo: peso 400, color gris medio

## Stack
- **Next.js** (última versión estable) con App Router
- **Tailwind CSS v4** via PostCSS
- **Framer Motion** — animaciones de entrada, scroll-triggered
- **GSAP** — animaciones complejas (counters, scroll-scrubbed)
- **NO Three.js** — no usar escenas 3D
- **NO Lenis** — usar scroll nativo

## Estructura del proyecto
```
webpage-belgrano/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/     # Navbar, Footer
│   │   ├── sections/   # Hero, Verticales, HowItWorks, Stats, CTA
│   │   └── ui/         # Button, Badge, Card
│   └── lib/
│       └── utils.ts
├── public/
├── package.json
└── CLAUDE.md
```

## Secciones de la landing (en orden de scroll)

### 1. Navbar
- Logo "BELGRANO" en negro bold (Inter 900 o Geist 900)
- Links: Servicios, Nosotros, Contacto
- CTA: "Agendar reunión" (botón negro)
- Sticky con backdrop-blur al hacer scroll

### 2. Hero
- Headline grande: "Tu negocio." (línea 1) + "Nuestra inteligencia." (línea 2)
- Subtítulo: "Marketing, inteligencia artificial y estrategia de negocios para empresas que se rehúsan a quedarse quietas."
- CTA: "Agenda una evaluación gratuita" (botón negro)
- Subcopy: "Sin compromiso · 30 minutos · Personalizada"
- Animación: fade-in + slide-up con stagger

### 3. Marquee/Logos (opcional)
- "Confían en nosotros" — logos de clientes (CLC, Seguros CLC, TNT Sports/Warner Bros)
- Scroll horizontal infinito estilo Linear

### 4. Verticales — "Cuatro unidades. Un ecosistema."
4 cards, una por vertical. Cada card tiene: ícono, nombre, descripción corta, link "Saber más →"

**Vertical 1: Bots Conversacionales**
- Tagline: "Tu negocio responde solo. Siempre."
- Descripción: Chatbots WhatsApp con IA que atienden, venden y derivan 24/7. Implementaciones custom para industrias reguladas.
- Métricas: 70-85% resolución automática · 30-50% reducción costos
- Clientes referencia: Clínica Las Condes, Seguros CLC

**Vertical 2: Publicidad Digital (DOOH)**
- Tagline: "Tu marca donde más importa."
- Descripción: Comercialización de espacios publicitarios en pantallas digitales. Modelo revenue share que transforma centros de costo en fuentes de ingreso.
- Métricas: 80% revenue share para el venue · 62 pantallas + 11 video walls
- Clientes referencia: Clínica Las Condes, TNT Sports / Warner Bros

**Vertical 3: Producciones**
- Tagline: "Contenido que funciona. Producido con IA."
- Descripción: Producción de contenido audiovisual y digital potenciada por IA. Creativos, videos, campañas — producidos más rápido y con mayor impacto.

**Vertical 4: Belgrano Academy**
- Tagline: "IA que se aprende haciendo. No explicando."
- Descripción: Capacitaciones presenciales de IA, Copilot y automatización para equipos corporativos. Learning by doing con casos reales de cada área.
- Métricas: 100+ profesionales capacitados · Copilot, n8n, Claude
- Clientes referencia: AFP Modelo, Clínica Las Condes

### 5. Cómo trabajamos — "De la idea al resultado."
3 pasos visuales (como timeline o cards numeradas):
1. Diagnóstico — "Entendemos tu negocio en 30 minutos"
2. Estrategia — "Diseñamos la solución que mueve la aguja"
3. Ejecución — "Implementamos y medimos resultados reales"

### 6. Stats/Números
Contadores animados (GSAP):
- "200+ empresas atendidas"
- "10x ROI promedio en 12 meses"
- "98% satisfacción"
- "$80M+ generados para clientes"

### 7. CTA Final
- "Hablemos."
- Formulario: nombre, email, empresa, mensaje
- Submit → POST /api/contact (Resend)
- "Sesión estratégica de 30 minutos gratis · Sin compromiso"

### 8. Footer
- Logo BELGRANO
- Tagline: "Marketing, inteligencia artificial y estrategia"
- Links: Servicios, Nosotros, Contacto
- © 2026 Grupo Belgrano

## Herramientas disponibles (MCPs y Skills)
- **Stitch MCP** — usar para generar la estructura visual base inicial
- **21st.dev MCP** — componentes UI premium
- **ux-ui-pro-max-skill** — consultar para decisiones de diseño
- **frontend-design skill** — principios de diseño web
- **GSAP** — para animaciones (counters, scroll)
- **Framer Motion** — para animaciones de entrada

## Flujo de trabajo sugerido
1. Usar Stitch MCP para generar un template visual base
2. Configurar Next.js + Tailwind v4 desde cero
3. Implementar las secciones una por una
4. Agregar animaciones con Framer Motion + GSAP
5. Conectar formulario CTA con Resend
6. Optimizar para mobile y performance

## Empresa — Contexto
- **Nombre:** Grupo Belgrano
- **Tagline:** "Tu negocio. Nuestra inteligencia."
- **Ubicación:** Santiago, Chile
- **Qué hace:** Marketing + IA + Estrategia de negocios integrados
- **Diferenciador:** AI-native — la única agencia chilena que construye el bot, instala las pantallas, produce el contenido y capacita al equipo
- **Tono:** Directo, seguro, cálido. No corporativo ni frío.
- **Email contacto:** contacto@belgrano.cl

## Importante
- No copiar código de `../landing-belgrano/` — proyecto limpio
- Puedes consultar `../landing-belgrano/docs/` para contexto de marca
- Research de verticales disponible en: `/home/pato/clawd/projects/belgrano-brand/research-verticales-v2.md`
- El logo es texto puro "BELGRANO" en Inter/Geist Black — no hay isotipo
