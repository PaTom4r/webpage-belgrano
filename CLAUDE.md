<!-- GSD:project-start source:PROJECT.md -->
## Project

**Webpage Belgrano**

Corporate website for Grupo Belgrano, a Chilean AI, marketing, and business strategy agency. A multi-page site with a landing page and dedicated pages for each business vertical (Conversational Bots, DOOH, Productions, Academy) plus an About page. Targets potential B2B clients in Chile looking for AI-powered marketing and automation solutions.

**Core Value:** The website must clearly communicate what Belgrano does across its 4 verticals and convert visitors into leads through strategic CTAs — if the site doesn't generate meetings, nothing else matters.

### Constraints

- **Stack:** Next.js (latest stable) + Tailwind CSS v4 + Framer Motion + GSAP. Hero particle entity uses Canvas 2D (no Three.js). No Lenis.
- **Design:** Minimalist, Linear.app-inspired. White backgrounds, black typography, generous whitespace. Dark sections for contrast.
- **Typography:** Geist Sans (primary), Inter as fallback. Headlines 800-900 weight, tight tracking.
- **Colors:** #ffffff (bg), #f9fafb (section bg), #09090B (dark sections), #111827 (text), #6B7280 (secondary text), #000000 (accent/CTAs).
- **Email:** Resend API for contact form submissions.
- **Deploy:** Vercel + belgrano.cl domain.
- **No code migration:** Build from scratch, do not copy from landing-belgrano.
- **Package manager:** npm.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 16.2.1 | Full-stack React framework | Latest stable as of March 2026. Turbopack is now default for dev and build — faster cold starts. App Router is fully mature. React Compiler integration (automatic memoization) ships built-in. No configuration needed beyond `create-next-app`. |
| React | 19.x (bundled with Next.js 16) | UI library | Comes with Next.js 16. React 19 Server Components are the default — zero JS for static sections (navbar, footer, most content) means faster LCP. |
| TypeScript | 6.0.2 | Type safety | Mandatory for maintainability. Next.js 16 ships with TypeScript support out of the box. |
### Styling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.2.2 | Utility-first CSS | v4 is CSS-first: no `tailwind.config.js`, configuration lives in CSS via `@theme`. Content detection is automatic. Production CSS is ~70% smaller than v3 (6-12 KB gzipped vs 20-30 KB). Matches the project's minimalist, whitespace-heavy design perfectly. |
| @tailwindcss/postcss | 4.2.2 | PostCSS integration | Required for Tailwind v4 in Next.js via PostCSS. Replaces `tailwindcss` + `autoprefixer` from v3. Single plugin in `postcss.config.mjs`. |
### Animation
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| framer-motion (motion) | 12.38.0 | Entrance animations, scroll triggers | Rebranded to "Motion" — import from `motion/react` in new code, `framer-motion` still works. Requires `'use client'` directive. Use `whileInView` for section entrances, `useScroll` + `useTransform` for parallax. Zero breaking changes in v12. |
| gsap | 3.14.2 | Counter animations, scroll-scrubbed sequences | Industry standard for timeline-based and scroll-synchronized animations. `ScrollTrigger` plugin handles the Stats section counters and any scrubbed horizontal/vertical sequences. Lighter than Framer for this use case. |
| @gsap/react | 2.1.2 | GSAP React integration | Provides `useGSAP()` hook — replaces `useEffect` for GSAP code, handles automatic cleanup on unmount and route changes. Prevents memory leaks across Next.js navigation. |
### Forms and Validation
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| react-hook-form | 7.72.0 | Form state management | v7 stable; v8 is in beta (breaking changes), do not use yet. Uncontrolled components = minimal re-renders. Pairs with Zod via resolver. |
| zod | 4.3.6 | Schema validation | v4 is stable and is the industry standard for TypeScript-first validation. Validate both client-side (RHF resolver) and server-side (in the Server Action) with the same schema. |
| @hookform/resolvers | 5.2.2 | Bridge between RHF and Zod | Required adapter. v5.2.2 is verified compatible with RHF 7.x and Zod 4.x. |
### Email Delivery
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| resend | 6.10.0 | Email API | Purpose-built for developers. Free tier covers a startup's contact form volume easily. Official Next.js integration with Server Actions. Configured domain on belgrano.cl for trusted deliverability. |
| react-email | 5.2.10 | Email template rendering | React component syntax for email templates. `npx react-email dev` for local preview. Eliminates raw HTML strings. Maintained by the Resend team — guaranteed compatibility. |
### SEO
| Capability | How | Notes |
|------------|-----|-------|
| Title, description, OG | `export const metadata` or `generateMetadata()` in each `page.tsx` | Built-in. No `next-seo` needed in 2026. |
| Open Graph images | `opengraph-image.png` static file or `opengraph-image.tsx` dynamic | Place per route for per-page OG cards. |
| Structured data (JSON-LD) | Inline `<script type="application/ld+json">` in Server Component | Use `Organization` + `WebSite` schema on root layout, `Service` schema on vertical pages. |
| Sitemap | `app/sitemap.ts` returning `MetadataRoute.Sitemap` | Auto-served at `/sitemap.xml`. No package needed. |
| robots.txt | `app/robots.ts` returning `MetadataRoute.Robots` | Auto-served at `/robots.txt`. No package needed. |
| Canonical URLs | `alternates.canonical` in metadata object | Prevents duplicate content issues. |
### Image Optimization
| Capability | How | Notes |
|------------|-----|-------|
| next/image | Built-in Next.js component | Auto-converts to WebP/AVIF, lazy-loads, prevents CLS via `width`/`height` or `fill`. Use for all client logos, team photos, vertical screenshots. |
| sharp | 0.34.5 | Server-side image processing | Installed as a dependency — Next.js uses it automatically on Vercel. No configuration needed. Add as `npm install sharp` to ensure it is in `dependencies` (not dev). |
| formats | `['image/avif', 'image/webp']` in `next.config.ts` | AVIF has better compression but WebP has broader support. Declare both and Next.js negotiates via `Accept` header. |
### Analytics
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| @vercel/analytics | 2.0.1 | Page view and event tracking | Zero-config on Vercel. Privacy-first (no cookies, no GDPR banner needed). Free on Hobby plan up to 50K events/month — more than enough for a B2B agency site. Add `<Analytics />` to root layout. Done. |
### Deployment
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | — | Hosting and CI/CD | First-class Next.js support (same team). Zero-config deploy. Automatic preview URLs per branch. Domain management for belgrano.cl is straightforward. Edge CDN included. |
## Alternatives Considered
| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 16 | Astro | Astro is excellent for static sites but Framer Motion + GSAP work better in React. The contact form Server Action needs Node runtime. Next.js is the correct choice given animation requirements. |
| Styling | Tailwind v4 | Tailwind v3 | v3 is in maintenance mode. v4 has smaller output and CSS-first config. New project should start on v4. |
| Animation | framer-motion + GSAP | GSAP only | GSAP alone lacks the React-native `whileInView` / variant system that Framer Motion provides for component-level entrance animations. Using both is the industry standard for agency sites. |
| Animation | framer-motion + GSAP | Lenis + GSAP | Explicitly out of scope. Native scroll is sufficient; Lenis adds complexity without meaningful benefit on a multi-page corporate site. |
| Email | Resend + react-email | Nodemailer + SendGrid | Nodemailer requires SMTP config and has no preview tooling. SendGrid is enterprise-oriented and more expensive. Resend + react-email is the current standard for Next.js projects. |
| Forms | react-hook-form v7 | react-hook-form v8 | v8 is beta (released 2026-01-11) with breaking changes. Not production-ready. Stay on v7. |
| SEO | Built-in metadata API | next-seo | next-seo is a Pages Router pattern. In App Router, `generateMetadata()` is the official API. Using both creates conflicts. |
| Sitemap | `app/sitemap.ts` | next-sitemap | next-sitemap is a post-build script pattern from Pages Router days. App Router's built-in `sitemap.ts` is cleaner and has no build step dependency. |
| Analytics | @vercel/analytics | Plausible | Plausible costs $9/month for what @vercel/analytics gives for free on Vercel. No meaningful difference in features for a B2B corporate site. |
| 3D / particles | Canvas 2D for the hero particle entity | Three.js / R3F | Three.js was tried for the hero (branch `feature/hero-particle-entity`, commits up to `d5704a7`) and dropped. Canvas 2D delivers the organic flow + real cursor repulsion the hero needs without 150KB of bundle weight. No other section needs 3D. |
## Installation
# Bootstrap
# Animation
# Forms & Validation
# Email
# Image processing (ensure it's in dependencies, not devDependencies)
# Analytics
# Tailwind v4 PostCSS (if create-next-app doesn't set it up)
## Key Configuration Files
## Sources
- Next.js 16 release: https://nextjs.org/blog/next-16
- Tailwind CSS v4 PostCSS setup: https://tailwindcss.com/docs/installation/using-postcss
- Tailwind v4 Next.js guide: https://tailwindcss.com/docs/guides/nextjs
- Motion (Framer Motion v12): https://motion.dev/docs/react
- GSAP React guide: https://gsap.com/resources/React/
- GSAP in Next.js 15: https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232
- Next.js Metadata API: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Next.js sitemap built-in: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Next.js robots built-in: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- Resend + Next.js: https://resend.com/docs/send-with-nextjs
- Vercel Analytics quickstart: https://vercel.com/docs/analytics/quickstart
- `next@16.2.1`, `tailwindcss@4.2.2`, `@tailwindcss/postcss@4.2.2`
- `framer-motion@12.38.0`, `gsap@3.14.2`, `@gsap/react@2.1.2`
- `react-hook-form@7.72.0`, `zod@4.3.6`, `@hookform/resolvers@5.2.2`
- `resend@6.10.0`, `react-email@5.2.10`
- `@vercel/analytics@2.0.1`, `sharp@0.34.5`, `typescript@6.0.2`
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

- `framer-motion` import from `'framer-motion'` (not `'motion/react'` — not installed)
- Hero cards: `src/components/ui/hero-mockups.tsx` + `src/components/ui/vertical-mockups.tsx`
- Vertical slugs: `bots`, `dooh`, `producciones`, `academy`
- Mockup components are `aria-hidden` decorative elements, no images/SVGs — pure Tailwind divs
- Cards use `items-stretch` + `h-full flex-col` for equal heights; CTA pinned bottom with `mt-auto`
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

- `src/components/ui/hero-mockups.tsx` — 4 hero cards grid (HeroMockups)
- `src/components/ui/vertical-mockups.tsx` — HTML/CSS product mockups per vertical (ChatMockup, ScreenMockup, VideoMockup, SlideMockup)
- `src/components/ui/vertical-icon.tsx` — Lucide icon resolver, still used in other sections
- `src/lib/content/verticales.ts` — source of truth for all vertical content (slug, name, benefitHeadline, tagline, tags, faq, clients)
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->

## Estado actual (2026-04-27)

- **Branch activa**: `feature/hero-threads-refactor`, 11 commits propios encima de `feature/hero-particle-entity` (PR original con wave field). Ambos branches viajan juntos al merge a `main`. Último commit `52c6587`. Origin sincronizada.
- **Hero — Living Threads Canvas 2D** (`src/components/particles/living-pillar/`): 6 bandas horizontales (2-2-2 back/mid/front) con amp/freq/speed/fase/grosor propios. Partículas paramétricas (t ∈ [0,1] sobre la curva de cada banda) **conectadas por líneas finas translúcidas** que leen como fibras musculares / corrientes de datos. 1100 partículas desktop / 540 mobile (densidad baja compensada por el lineado y partículas más grandes). Render en 3 pasadas back-to-front: lines (source-over alpha 0.42) + glow (lighter, solo bandas depth ≥ 1, sprite radial cacheado por bucket de radio) + core (arc fill modulado por depth alpha/size).
- **Tablas de profundidad**: `DEPTH_ALPHA_MULT [0.55, 0.85, 1.0]` y `DEPTH_SIZE_MULT [1.6, 1.0, 0.85]` (back grande/dim, front sharp/bright). Reemplaza al blur real de `ctx.filter` (lento en Safari/FF) y al doble canvas (memoria innecesaria).
- **Cursor repulsion física**: distance check + force outward + spring + damping. Softened (`CURSOR_RADIUS=140`, `CURSOR_STRENGTH=2.6`, fueron 160/4.5 en wave field). Listener en `window` para sortear z-index alto de los overlays.
- **Skip de segments largos**: `MAX_SEGMENT_PX=32` evita que las fibras dibujen diagonales feas cuando el cursor empuja una partícula fuera de banda.
- **Hero full viewport siempre** (`min-h-screen lg:min-h-[100svh]`). lg+ canvas `absolute inset-0` z-0; dos overlays z-10 (Tailwind `bg-gradient-to-l from-black via-black/70 to-transparent` + radial inline `at 75% 50%` rgba 0.75→0.35→transparent, desktop only); contenido z-20 a `lg:pl-[40vw]` (xl:42vw) con `max-w-[680px]`. Mobile: canvas arriba con `opacity-60`, texto abajo, sin radial.
- **Headline**: `BELGRANO` arriba / `GROUP` abajo, **dos líneas siempre** vía `<span className="block">` (sin `lg:whitespace-nowrap`). Tamaños fluidos: text-5xl → text-6xl → text-[4.75rem] → text-[5.75rem] → text-[6.5rem]. Subtítulo `max-w-[560px]`.
- **Badge**: `AI · MEDIA · BRAND` (uppercase literal en la fuente, no solo CSS).
- **Home composition v2**: HeroSection (full viewport) → **`<BusinessSuite />`** → StatsSection → CtaSection. **VerticalesReveal pausada** — el archivo `verticales-reveal.tsx` y los assets `public/home/intelligence.mp4` (2.3MB) + `intelligence.png` siguen en el repo pero el import + mount están comentados en `page.tsx` (revert path: descomentar = restaurar en menos de 1 minuto).
- **`<BusinessSuite />`** (`src/components/sections/home/business-suite.tsx`): client component flat con 3 cards horizontales (Intelligence, Media, Brand) en grid 3-col desktop / stacked mobile. Lee de `verticales` array. Card pattern dark + accent gradient + glass border + hover-lift + glow. Framer Motion entrance variants con stagger (`headingChild`, `gridContainer`, `cardItem`), `useReducedMotion` gate. Server-render para FCP, animations al hidratar. Reemplaza al sticky 700vh para que el cliente entienda las 3 verticales en un solo viewport.
- **Three.js / R3F / drei descartados**: primer intento (commits `1b4a6b3` → `d5704a7`) usaba shaders + esfera/cluster/torus. Falló por bundle weight + bug de pointSize. Stack queda en Next + Tailwind v4 + Framer + GSAP, motor de partículas Canvas 2D vanilla.
- **Branch principal**: `main`. Vercel deploys desde `main`. `feature/landing-v2-template1` preservada como archivo. NO borrar.
- **Stats**: 4 métricas — $750MM+, 289x ROI, 500K+ Personas alcanzadas, 98% Satisfacción.
- **`/verticales/intelligence` premium**: TracingBeam morada + IntelligenceHero (single CTA Hablemos, **sin botón CLC** por compliance) + Capabilities + IntelligenceBranches **restyled al pattern BusinessSuite** (dark bg + accent gradient + glass + hover lift + glow, reemplaza la versión light + ✓ checkbox) + Metrics counter-animated.
- **`/verticales/media` premium**: MediaHero (single CTA Hablemos, **sin botón Point Cola**) + TracingBeam sky + Capabilities + **MediaShowcase compacto** (2 cards autoplay-on-view + caption, reemplaza los 200vh sticky theaters anteriores) + Metrics.
- **`/verticales/brand` premium**: completamente nuevo — BrandHero (orange megaphone) + TracingBeam orange + BrandCapabilities (chips con pulse) + **BrandActivations** (grid 6 cards: BTL/Stands/Eventos/Vía pública/Pantallas/Diseño con SVG iconos custom) + BrandMetrics. Era la última vertical con template default. Ahora está al estándar premium del resto.
- **Imports legacy en `[slug]/page.tsx`**: `VerticalHeroSection`, `VerticalMetricsSection`, `VerticalBranchesSection` ya no se usan en la ruta de verticales (siguen existiendo como archivos para evitar tocar otras rutas que pudieran usarlos — limpieza opcional para sesión futura).

## Decisiones técnicas

- **Patrón de variants por vertical**: para no contaminar Media/Brand con cambios Intelligence, se creó `src/components/sections/intelligence/*` con 5 componentes premium dedicados. `[slug]/page.tsx` decide qué layout renderizar según el slug. Cero impacto en otras verticales.
- **TracingBeam**: SVG + Framer Motion (`useScroll`, `useTransform`, `useSpring`). `ResizeObserver` para dimensionar dinámicamente la altura. Respeta `prefers-reduced-motion` (línea estática sin gradient).
- **AnimatedCounter en Intelligence metrics**: parser que extrae `{prefix, target, suffix}` de strings tipo "$780M" / "300x+" y fallback a plain text para "24/7" o "40-70%" (no numéricos puros).
- **Sin Three.js — hero en Canvas 2D vanilla**. El motor de partículas vive en `src/components/particles/living-pillar/` (4 archivos: `config.ts`, `particles.ts`, `use-pillar.ts`, `canvas.tsx` — el export público es `LivingThreadsCanvas`). Cero deps externas — sólo `requestAnimationFrame` + Canvas 2D API. Three.js + R3F + drei se intentaron al inicio de la branch y se descartaron por bundle weight + lectura visual estática.
- **Pattern band-based para particle fields**: cada banda es un objeto en `BAND_SPECS` (yRatio, amp, freq, speed, phase, thickness, density, depth). Las partículas se generan paramétricamente sobre la curva sinusoidal de su banda y la spring chasea ese target ondulante por frame. Editar visuales = ajustar `BAND_SPECS` y `FIELD_CONFIG` sin tocar el motor.
- **Render 3-pass back-to-front**: las bandas se ordenan por `depth` ascendente, se dibujan primero las líneas de fibras (source-over alpha bajo, skip segments > MAX_SEGMENT_PX), luego la pasada de glow aditivo (`globalCompositeOperation = 'lighter'`, solo bandas con `depth ≥ GLOW_DEPTH_MIN`, sprite radial cacheado en `field.glowSprites: Map<number, HTMLCanvasElement>` por bucket de radio entero), y finalmente el core (`ctx.arc` con tamaño/alpha modulados por `DEPTH_ALPHA_MULT` y `DEPTH_SIZE_MULT`). El glow aditivo asume fondo negro (hero `bg-black`) — documentado en el comment del módulo.
- **WaveField struct**: `createWaveField` retorna `{ particles, bandSlices, glowSprites }`. `bandSlices[bandIdx]` son los índices de las partículas de esa banda en orden ascendente de `t`, sin sort (las partículas se push-ean en ese orden). `step/draw` reciben el field, no el array. El hook (`use-pillar.ts`) mantiene `field: WaveField | null` en su closure.
- **Cursor listener en `window`**: en use-pillar.ts el `pointermove` se attachea a `window`, no al canvas. Convierte coords del viewport a canvas-local con `getBoundingClientRect`. Razón: cualquier overlay z-index alto encima del canvas robaba el evento si el listener estaba en el canvas. `window` es invulnerable a eso.
- **`useElementProgress` custom hook (verticales-reveal)**: en vez de `useScroll` de framer-motion (con glitches bajo Next 16 + Turbopack + React 19), un scroll listener manual + `requestAnimationFrame` + `MotionValue`. Garantiza progreso 0..1 reactivo y consistente sobre el container 700vh, base para los cross-fades entre Intelligence/Media/Brand. Pointer-events por panel atado al progreso (solo el panel activo recibe clicks).
- **Paleta A "Sophisticated distinct"** (en `verticales.ts` accentColor): Intelligence `#A855F7 → #20808D` deep teal (rompe con saturated AI purple), Brand `#F59E0B → #F97316` warm orange (Momentum/Mistral-adjacent, experiential), Media `#0EA5E9` sky-blue preservado. Estos colores los leen BusinessSuite, IntelligenceBranches, BrandActivations y MediaShowcase para tints, glows y borders por card.
- **Patrón de cards reusable** (BusinessSuite + IntelligenceBranches + BrandActivations): `bg-white/[0.03]` + `linear-gradient(135deg, ${accent}10 0%, transparent 60%)` + `border-white/10` + hover `-translate-y-1` + radial glow `${accent}25` solo on hover. Si Pato pide cards en otro lado del site, tomar este patrón como referencia.
- **VerticalesReveal pausada vs eliminada**: el archivo `src/components/sections/home/verticales-reveal.tsx` (456 líneas + 437 líneas de patches) sigue en el repo. Útil como referencia o para reactivar en A/B real con cliente. No tocar a menos que Pato pida `git rm` (junto con `public/home/intelligence.*`).
- **Frame-sequence scroll-driven (Apple AirPods style)** sigue postergado — requiere assets WebP de NanoBanana cuando Pato los exporte.

## Próximo

- **Validar Vercel preview** del branch `feature/hero-threads-refactor` (no se pudo screenshot durante la sesión por cierre del browser MCP de Playwright). Pato vio en local pero no en Vercel.
- **Abrir PR a `main`** desde `feature/hero-threads-refactor`: cierra todo el hilo del wave field + threads + verticales premium. Pato decide si bundle entero o split por criterio.
- **Mejorar StatsSection** — alinearla al lenguaje BusinessSuite (cards dark + accent + counters animados con transición scroll-driven). Hoy se ve heredada del template viejo.
- **Mejorar CtaSection / Calendly** — embeber Calendly en una card que matchee BusinessSuite (dark + glass + accent). Hoy se ve heredada del template viejo.
- **Mejorar `/nosotros`** — alinear con look premium del home y de las verticales.
- **Navbar magnetic CTA** — pulir el botón "Hablemos" para que matchee la jerarquía premium.
- **Reactivar sección de clientes** cuando tengan logos finales y narrativa definidos.
- **Color por vertical en partículas (Phase 2 diferida)**: bandas que cambian de tinte (Intelligence teal `#20808D` / Media sky `#0EA5E9` / Brand orange `#F97316`) según scroll a lo largo del hero o de la home. Diferido hasta que el motor esté validado en preview.
- **Decisión pendiente sobre wordmark "BELGRANO GROUP" gigante de fondo**: si el hero negro puro se siente vacío, reincorporar como capa con opacity ~0.04 detrás de las fibras. Postergado a feedback post-preview.
- **`/verticales/media`** — Pato tiene 2-3 videos TNT Sports / Warner Bros para dropear en `public/media/` (MP4/WebM <5MB ideal).
- **Decidir destino de VerticalesReveal**: pausada vs `git rm` definitivo (junto con `public/home/intelligence.mp4` 2.3MB + `intelligence.png`).
- **Frame-sequence 3D scroll-driven** para Intelligence v2, condicionado a frames WebP de NanoBanana.
- **Caso completo CLC** (página `/casos/clc`) — CTA disabled hasta tener post real.
- **Color terciario indigo #635BFF** — deferido.
