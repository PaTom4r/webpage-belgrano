# Project Research Summary

**Project:** Grupo Belgrano — Corporate Agency Website (webpage-belgrano)
**Domain:** B2B agency corporate website — lead generation, multi-vertical, Chilean market
**Researched:** 2026-03-31
**Confidence:** HIGH

## Executive Summary

Grupo Belgrano's website is a multi-page B2B agency site for a Chilean AI/marketing/strategy firm with 4 service verticals (Bots, DOOH, Producciones, Academy). The established approach for this type of site is a static-first Next.js App Router build with React Server Components as the default — nearly all content is static HTML served from Vercel's CDN, with client-side JavaScript limited strictly to animated elements (Framer Motion + GSAP) and the contact form. This pattern delivers sub-2s load times, which research confirms directly impacts conversion rates (5.7s pages convert at 0.6% vs 1.9% at 2.4s).

The recommended stack is Next.js 16 + Tailwind v4 + Framer Motion 12 + GSAP 3 + Resend. All versions are verified against live npm as of 2026-03-31. The key strategic decision is keeping the site genuinely static — no CMS, no database, content as TypeScript data files — which is appropriate for an agency site that changes quarterly at most. The contact form uses Server Actions (no API route), SEO uses the built-in Next.js metadata API (no next-seo), and analytics uses Vercel Analytics (no Plausible, no PostHog).

The dominant risks are in the animation layer, not the content layer. GSAP and Framer Motion must never animate the same DOM element, GSAP requires a body style fix to prevent Next.js hydration errors, and all GSAP instances must be scoped via `useGSAP()` to prevent memory leaks on page navigation. Mobile performance is the second major risk: scroll animations that look polished on desktop can tank Lighthouse mobile scores and hurt Google ranking. Both risks are preventable with established patterns applied from day one of the project.

## Key Findings

### Recommended Stack

Next.js 16 is the correct framework choice — Turbopack is default, React 19 Server Components ship zero JS for static sections, and the App Router is fully mature. Tailwind v4's CSS-first configuration (no `tailwind.config.js`, `@theme` block in CSS) produces ~70% smaller output than v3 and matches the minimalist design intent. The dual-animation approach (Framer Motion for React-idiomatic entrance animations + GSAP for timeline/counter animations) is the verified industry standard for agency sites, not over-engineering.

**Core technologies:**
- **Next.js 16.2.1**: Full-stack React framework — App Router + RSC = max static performance with minimal JS
- **TypeScript 6.0.2**: Type safety — mandatory for `lib/content/` data layer and Server Actions
- **Tailwind CSS 4.2.2**: Utility-first CSS — CSS-first config, smaller output, matches minimalist brand
- **Framer Motion 12.38.0** (`motion/react`): Entrance animations — React-native `whileInView`, declarative, handles cleanup
- **GSAP 3.14.2 + @gsap/react 2.1.2**: Counter/timeline animations — `useGSAP()` hook for safe Next.js integration
- **react-hook-form 7.72.0 + Zod 4.3.6**: Form validation — uncontrolled components, shared schema for client + server
- **Resend 6.10.0 + react-email 5.2.10**: Email delivery — developer-first, React component templates, free tier sufficient
- **@vercel/analytics 2.0.1**: Analytics — zero-config, privacy-first, no GDPR banner needed
- **Vercel**: Deployment — first-class Next.js support, preview URLs, automatic CDN

**Critical version constraint:** react-hook-form v8 is in beta with breaking changes — stay on v7.

### Expected Features

**Must have (table stakes):**
- Hero with clear value proposition + primary CTA above the fold — visitors decide to stay in under 5 seconds
- Sticky responsive navbar — 64%+ of B2B searches happen on mobile
- Mobile-first layout throughout — not just the navbar
- Individual vertical detail pages (Bots, DOOH, Producciones, Academy) — generic service listings don't convert
- Client logo marquee (CLC, Seguros CLC, TNT Sports, AFP Modelo) — social proof from recognizable brands
- Contact form with email delivery (Resend) — core conversion mechanism
- About / Nosotros page — B2B buyers buy from people
- Animated stats counters — quantified results land harder when counted up
- SEO fundamentals (title, meta, OG, schema, sitemap) — without SEO the site doesn't exist organically
- Fast load time under 2s — direct correlation with conversion rate

**Should have (differentiators for v1):**
- FAQ section on each vertical page — handle top 4-5 sales objections before the call
- WhatsApp floating CTA — Chilean B2B buyers communicate heavily via WhatsApp, single component
- Calendly embed alongside the contact form — removes the waiting game, reported 30-70% conversion lift
- Open Graph images per page — when prospects share the link on WhatsApp, a proper thumbnail builds credibility
- Testimonials with name + company + role — attributed quotes convert far better than anonymous ones
- Vertical-specific proof metrics on detail pages — each service gets its own results block

**Defer to v2:**
- Blog / content section — risks becoming stale, no content strategy in place
- CMS integration (Contentful, Sanity) — overkill for quarterly-updated site
- Video testimonials
- A/B testing setup
- Personalization by industry

**Explicit anti-features (do not build):**
- Three.js / 3D scenes — already removed in v2, correct decision
- Lenis smooth scroll — complexity without benefit
- Pop-ups / interstitials — dark patterns damage B2B trust
- Pricing tables — Chilean agency deals are always custom
- Chat bot / live chat — adds load, degrades premium positioning

### Architecture Approach

The architecture is a static-first multi-page site with a strict RSC-by-default rule. Every section component is a Server Component; only the Navbar, MarqueeTrack, AnimatedCounter, ScrollReveal wrappers, ContactForm, and MobileMenu are marked `'use client'`. Content lives in `lib/content/verticales.ts` and `lib/content/site.ts` as TypeScript objects — pages are pure renderers. The 4 vertical pages are generated from a single dynamic route `app/verticales/[slug]/page.tsx` with `generateStaticParams()`, not 4 separate files. The contact form submits to a Server Action in `app/contacto/actions.ts` — no `/api/contact` route needed.

**Major components:**
1. **`app/layout.tsx`** — Root HTML, Geist Sans font, global CSS tokens, metadata defaults with `metadataBase`
2. **`lib/content/verticales.ts` + `lib/content/site.ts`** — Single source of truth for all copy and data
3. **`app/verticales/[slug]/page.tsx`** — Dynamic vertical detail pages via `generateStaticParams()`
4. **`components/animations/AnimatedCounter.tsx`** — GSAP stats counter, client-only, scoped with `useGSAP()`
5. **`components/animations/ScrollReveal.tsx`** — Framer Motion entrance wrapper, client-only
6. **`app/contacto/actions.ts`** — Server Action: Zod validation + Resend SDK call
7. **`app/sitemap.ts` + `app/robots.ts`** — Built-in Next.js metadata files, no packages needed

### Critical Pitfalls

1. **GSAP hydration errors in Next.js** — ScrollTrigger mutates `<body>` inline styles, triggering hydration mismatches. Fix: add `style={{ borderTopStyle: 'solid' }}` to body in `layout.tsx` before any animation work. Apply in Phase 1.

2. **GSAP memory leaks on navigation** — ScrollTrigger instances accumulate across Next.js client-side transitions. Fix: use `useGSAP()` exclusively (wraps `gsap.context()` for automatic cleanup). Never use `ScrollTrigger.killAll()`. Apply as a non-negotiable pattern from Phase 2.

3. **Framer Motion + GSAP fighting over the same DOM element** — Both write inline `transform`/`opacity` styles; the last to run wins, causing flickering and snap-to-wrong-position bugs. Fix: strict division — Framer Motion owns entrances and hover states, GSAP owns counters and scrubbed sequences. Never apply both to the same node.

4. **Mobile animation performance killing Core Web Vitals** — Scroll animations built on desktop create jank (INP > 200ms) and layout shift (CLS > 0.1) on mobile. Fix: wrap all Framer animations in `MotionConfig reducedMotion="user"`, animate only `transform` and `opacity`, limit concurrent `whileInView` to 3-4 per viewport, reduce complexity on mobile via media query check.

5. **Missing `metadataBase` breaks OG images everywhere** — Without it, OG image URLs are relative and social platforms (LinkedIn, WhatsApp) cannot fetch them. Fix: set `metadataBase: new URL('https://belgrano.cl')` in root layout on Day 1, never defer.

## Implications for Roadmap

Based on combined research, the architecture file already defines the natural build order based on dependencies. The suggested phase structure maps directly to it.

### Phase 1: Foundation
**Rationale:** Nothing can be built without this. Fonts, design tokens, layout shell, and GSAP/Tailwind conflict resolution must all be established before any UI work begins. Pitfalls 1, 5, and 9 (hydration fix, metadataBase, font FOUT) must all be addressed here — they cannot be retrofitted later without pain.
**Delivers:** Working Next.js 16 app with Tailwind v4 CSS tokens, Geist Sans font (no FOUT), Navbar, Footer, root layout with metadataBase set, GSAP plugin registration centralized, body style hydration fix applied.
**Addresses:** HTTPS (automatic on Vercel), consistent brand identity, responsive shell
**Avoids:** Pitfalls 1 (GSAP hydration), 5 (metadataBase), 9 (font FOUT) — all require Phase 1 setup

### Phase 2: Landing Page Sections
**Rationale:** The landing page is the highest-traffic entry point and the primary conversion surface. Building it second (after foundation) ensures the design system is in place. Each section is isolated, so they can be built in DOM order without blocking each other. This phase also proves out the animation architecture (Framer + GSAP division-of-responsibility).
**Delivers:** Hero, client logo marquee (CSS-only per Pitfall 11), Verticales cards, HowItWorks, Stats with AnimatedCounter (GSAP), CTA section
**Uses:** Framer Motion 12, GSAP 3 + @gsap/react, `lib/content/site.ts`, Tailwind v4 tokens
**Implements:** RSC-by-default pattern with client leaf components, `ScrollReveal` wrapper
**Avoids:** Pitfalls 2 (memory leaks), 3 (dual-library DOM conflict), 4 (Tailwind transform/GSAP clash), 7 (mobile animation performance), 11 (marquee fragility)

### Phase 3: Vertical Detail Pages
**Rationale:** Vertical pages are the second most important conversion surface — B2B buyers who click "learn more" on a vertical need dedicated proof per service. They depend on the Verticales cards from Phase 2 (slug names must match) and the `lib/content/verticales.ts` data structure established in foundation.
**Delivers:** 4 vertical pages (bots, dooh, producciones, academy) with outcome-oriented copy, proof metrics, FAQ section per vertical, dedicated CTA per service, `generateStaticParams()` dynamic route
**Addresses:** Individual vertical detail pages (table stakes), FAQ/objection handling (differentiator), vertical-specific proof metrics (differentiator)
**Avoids:** Pitfall 6 (duplicate metadata) — each vertical page gets tailored `generateMetadata()` targeting its specific B2B buyer keyword

### Phase 4: About Page
**Rationale:** Lower priority than vertical pages for conversion but required for B2B trust. No new architectural patterns needed — reuses section layouts from Phase 2. Can be built quickly.
**Delivers:** Nosotros page with company narrative, founding story, values, team
**Addresses:** About page (table stakes) — B2B buyers buy from people

### Phase 5: Contact Form + Email
**Rationale:** The contact form is the core conversion mechanism but has its own pitfalls (spam, env vars) that benefit from being addressed as a focused unit. Rate limiting and honeypot field must be built before any production exposure.
**Delivers:** Contact page with ContactForm (Client), Server Action with Zod validation, Resend email delivery, IP rate limiting, honeypot field, `.env.example`
**Addresses:** Contact form with email delivery (table stakes), optional Calendly embed (differentiator)
**Avoids:** Pitfalls 8 (spam/rate limiting), 12 (missing env vars at deploy)

### Phase 6: SEO + Metadata Pass
**Rationale:** SEO metadata requires all page copy to be finalized first — you cannot write accurate meta descriptions until content is locked. This is correctly a final pass, not an ongoing concern. One dedicated phase prevents duplicate metadata across pages.
**Delivers:** Root metadata with `title.template`, per-page unique titles + descriptions, per-vertical `generateMetadata()`, `app/sitemap.ts`, `app/robots.ts`, OG image files per route, JSON-LD schema (Organization + Service)
**Addresses:** SEO fundamentals (table stakes), Open Graph per page (differentiator)
**Avoids:** Pitfall 6 (duplicate metadata killing SEO)

### Phase 7: Polish + Deploy
**Rationale:** Final integration phase. Mobile performance audit with real device testing, Core Web Vitals check, Vercel project setup with DNS and all env vars configured. WhatsApp floating CTA (single component) fits here as a low-effort differentiator.
**Delivers:** Mobile-optimized animations (Lighthouse mobile score target: 90+), WhatsApp floating CTA, Vercel production deploy with `belgrano.cl` DNS, all env vars verified
**Addresses:** Mobile-first layout (table stakes), WhatsApp CTA (differentiator), sub-2s load time
**Avoids:** Pitfall 7 (mobile animation performance), Pitfall 12 (missing env vars in production)

### Phase Ordering Rationale

- Foundation before everything because Tailwind v4 tokens, GSAP hydration fix, font configuration, and `metadataBase` cannot be retrofitted — they break things if added mid-build.
- Landing before vertical pages because vertical cards must exist (and slug names must be stable) before detail pages can link to them.
- Contact form is independent from content phases but benefits from being a focused unit — rate limiting is easy to forget if mixed into another phase.
- SEO pass at the end because meta descriptions require final copy to be accurate.
- Mobile performance check is part of Phase 7 polish but animation budget decisions must be made in Phase 2 — do not defer the `MotionConfig` setup.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 5 (Contact Form):** Rate limiting implementation options for Next.js Server Actions are multiple (in-memory, Upstash Redis, Arcjet) — needs a concrete decision based on expected traffic volume and whether Redis is available in the environment.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Next.js 16 + Tailwind v4 setup is fully documented with verified config files in STACK.md. No research needed.
- **Phase 2 (Landing Sections):** Framer Motion + GSAP patterns are well-documented. PITFALLS.md covers all known failure modes.
- **Phase 3 (Vertical Pages):** Standard Next.js dynamic routes with `generateStaticParams()`. Textbook pattern.
- **Phase 6 (SEO):** Next.js built-in metadata API is the official path. No third-party libraries. Well-documented.
- **Phase 7 (Deploy):** Standard Vercel deploy flow. No research needed.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified against live npm registry 2026-03-31. Official docs confirm Next.js 16, Tailwind v4, Framer Motion v12, GSAP 3 patterns. |
| Features | HIGH | Multiple authoritative B2B agency conversion sources cross-confirmed. Anti-features backed by consistent CRO research patterns. |
| Architecture | HIGH | Verified against official Next.js App Router docs. RSC-by-default, Server Actions, `generateStaticParams()` are canonical patterns. |
| Pitfalls | HIGH | Community-verified issues with reproducible fixes (GSAP hydration, memory leaks, Tailwind v4 transform conflict). Multiple sources per pitfall. |

**Overall confidence:** HIGH

### Gaps to Address

- **Client content readiness:** Vertical pages, testimonials, stats, and case study snippets require real data from Belgrano (client permissions, actual numbers, confirmed quotes). These are content gaps, not technical ones. The architecture accommodates late content via TypeScript data files.
- **WhatsApp Business number:** WhatsApp floating CTA requires a dedicated WA Business number for the agency. Needs confirmation before Phase 7.
- **Calendly account:** The Calendly embed in the CTA section requires account setup and event type configuration. Can be deferred to Phase 7 if not ready.
- **Chilean market conversion data:** WhatsApp usage pattern for B2B in Chile is directionally confirmed for LATAM but Chile-specific quantitative data is limited. Treat as a high-confidence directional recommendation.
- **Rate limiting choice for contact form:** In-memory rate limiting is recommended for low-traffic agency sites but Upstash Redis or Arcjet are better options if the site scales. Decision can be made in Phase 5 planning.

## Sources

### Primary (HIGH confidence)
- Next.js 16 official docs — App Router, RSC, Server Actions, Metadata API, sitemap, robots
- Tailwind CSS v4 official docs — PostCSS setup, Next.js guide, upgrade guide breaking changes
- GSAP official docs — React integration, ScrollTrigger, useGSAP() hook
- motion.dev official docs — Framer Motion v12, accessibility, performance

### Secondary (MEDIUM confidence)
- ManyRequests, Axon Garside, Webstacks, Grafit Agency — B2B agency website conversion best practices
- GSAP Community Forums — hydration error in Next.js 15 (community-verified fix)
- Thomas Augot (Medium) — GSAP optimization in Next.js 15
- Webgate Digital — Calendly conversion lift (vendor-reported, directional)
- Arcjet, Next.js Weekly — contact form rate limiting patterns

### Tertiary (directional)
- LATAM/WhatsApp B2B usage data — confirmed pattern, limited Chile-specific quantification

---
*Research completed: 2026-03-31*
*Ready for roadmap: yes*
