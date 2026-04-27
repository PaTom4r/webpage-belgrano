<!-- GSD:project-start source:PROJECT.md -->
## Project

**Webpage Belgrano**

Corporate website for Grupo Belgrano, a Chilean AI, marketing, and business strategy agency. A multi-page site with a landing page and dedicated pages for each business vertical (Conversational Bots, DOOH, Productions, Academy) plus an About page. Targets potential B2B clients in Chile looking for AI-powered marketing and automation solutions.

**Core Value:** The website must clearly communicate what Belgrano does across its 4 verticals and convert visitors into leads through strategic CTAs — if the site doesn't generate meetings, nothing else matters.

### Constraints

- **Stack:** Next.js (latest stable) + Tailwind CSS v4 + Framer Motion + GSAP + Three.js (R3F + @react-three/drei) confined to the hero. No Lenis.
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
| 3D | Three.js + R3F + drei (hero only) | — | Reintroduced for the hero particle entity (Slam Dunk-inspired). Confined to the hero canvas — Stats, CTA, vertical pages stay JS-light. Justified by GPU shaders + 10-20k particles at 60fps with cursor reactivity, which Framer Motion + GSAP cannot deliver. |
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

## Estado actual (2026-04-17)

- **Branch principal**: `main` (reestructurado 2026-04-17). `feature/21st-dev-ui-improvements` mergeado. Vercel deploys desde `main`.
- **Branch archivo**: `feature/landing-v2-template1` preservada en `.worktrees/landing-v2-template1/` — contiene diseño alternativo template-1 (hero accordion horizontal distinto). NO borrar.
- **Caso de éxito CLC removido** de `/verticales/intelligence` (commit `6afe25b`)
- **Home — Hero cinematográfico**: imagen oficina BELGRANO en hormigón + Costanera + Andes nevados, full opacity + gradient overlay (`from-black/90 via-black/50 to-black/10`). Min-h-[78vh]. Headline `BELGRANO GROUP` (text-4xl→6xl) alineado a la derecha sobre la cordillera. Bajada larga del metadata con doble textShadow para legibilidad.
- **Cards del hero**: accordion horizontal tipo Apple Music (hover crece a flexGrow 2.2, otras se comprimen). Default expandida: Intelligence. Mockups v2 (Intelligence/Media/Brand) con chats/canales/activación. 3D tilt removido — el accordion ya comunica interactividad.
- **Navbar**: "Belgrano" wordmark restaurado a la izquierda, lógica `heroInView` con IntersectionObserver, glass effect al scrollear fuera del hero. CTA Hablemos con magnetic spring.
- **Landing**: Hero → Stats → CTA → Footer. `MarqueeSection` (Empresas que confían) y `VerticalesSection` (Qué hacemos) **desactivadas** (código comentado para reactivar cuando haya contenido real).
- **`/verticales/intelligence` premium**: composición dedicada via slug conditional. TracingBeam morada scroll-driven (Aceternity-style, Framer Motion + SVG, respeta prefers-reduced-motion). IntelligenceHero con grid + glow morado + brain icon. IntelligenceCapabilities (5 chips pulsing). **IntelligenceCaseStudy CLC** (Vida Cámara-style 2 columnas: logo CLC + bullets + 4 metric cards: $780M recuperados marzo / 300x+ ROI / +3.000 personas / 24/7 WhatsApp Business API oficial). IntelligenceBranches con hover lift. IntelligenceMetrics counter-animated (parser para "$780M"/"24/7"/"40-70%").
- **`/verticales/media` + `/verticales/brand`**: mantienen template default. Aislados via `slug === 'intelligence'` conditional en `[slug]/page.tsx`.
- **SENCE eliminado**: removido de chips, caseCard footnote, Academy tags, features y FAQ en `verticales.ts`. Belgrano no tiene esa certificación.
- **Header bug fix**: `pt-16` en `<main>` de `/nosotros` y `/verticales/[slug]` para compensar altura del navbar fijo (el observer no dispara sin `#hero`).
- **Sección clientes desactivada**: `MarqueeSection` (home) y `VerticalClientsSection` (3 verticales) comentadas. Reactivar cuando los clientes finales estén definidos.
- **Calendly**: reactivado en CTA section.
- **Stats**: 4 métricas — $750MM+, 289x ROI, 500K+ Personas alcanzadas, 98% Satisfacción

## Decisiones técnicas

- **Patrón de variants por vertical**: para no contaminar Media/Brand con cambios Intelligence, se creó `src/components/sections/intelligence/*` con 5 componentes premium dedicados. `[slug]/page.tsx` decide qué layout renderizar según el slug. Cero impacto en otras verticales.
- **TracingBeam**: SVG + Framer Motion (`useScroll`, `useTransform`, `useSpring`). `ResizeObserver` para dimensionar dinámicamente la altura. Respeta `prefers-reduced-motion` (línea estática sin gradient).
- **AnimatedCounter en Intelligence metrics**: parser que extrae `{prefix, target, suffix}` de strings tipo "$780M" / "300x+" y fallback a plain text para "24/7" o "40-70%" (no numéricos puros).
- **Three.js confinado al hero** (Phase 1 hero-particle-entity, branch `feature/hero-particle-entity`). El resto del sitio sigue JS-light (Framer Motion + GSAP). Frame-sequence scroll-driven (Apple AirPods style) postergado — requiere assets WebP de NanoBanana cuando Pato los exporte.

## Próximo

- **Deploy** `feature/21st-dev-ui-improvements` → Vercel para validar imagen del hero (cache local impidió ver la nueva) y probar TracingBeam + Intelligence en producción.
- **Merge → `main`** después del visual OK post-deploy.
- **Mejorar `/verticales/media`**: Pato tiene 2-3 videos TNT Sports / Warner Bros — esperando que los dropee en `public/media/` (MP4/WebM <5MB ideal).
- **Mejorar `/verticales/brand`**: esperando input del equipo interno; podemos proponer mejoras de layout/tipografía.
- **Mejorar `/nosotros`**: alinear con look premium del home y de Intelligence.
- **Reactivar sección de clientes** cuando tengan logos finales y narrativa definidos.
- **Frame-sequence 3D scroll-driven** para Intelligence v2, condicionado a frames WebP de NanoBanana.
- **Caso completo CLC** (página `/casos/clc`) — CTA disabled hasta tener post real.
- **Color terciario indigo #635BFF** — deferido.
