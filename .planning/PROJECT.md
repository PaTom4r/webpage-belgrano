# Webpage Belgrano

## What This Is

Corporate website for Grupo Belgrano, a Chilean AI, marketing, and business strategy agency. A multi-page site with a landing page and dedicated pages for each business vertical (Conversational Bots, DOOH, Productions, Academy) plus an About page. Targets potential B2B clients in Chile looking for AI-powered marketing and automation solutions.

## Core Value

The website must clearly communicate what Belgrano does across its 4 verticals and convert visitors into leads through strategic CTAs — if the site doesn't generate meetings, nothing else matters.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Landing page with 8 sections (Navbar, Hero, Marquee, Verticales, HowItWorks, Stats, CTA, Footer)
- [ ] 4 vertical detail pages (Bots Conversacionales, DOOH, Producciones, Academy) with expanded content, metrics, client references, and dedicated CTA
- [ ] About/Nosotros page with company narrative, values, and team positioning
- [ ] Contact form (CTA) integrated with Resend for email delivery
- [ ] Responsive design — mobile-first, works on all devices
- [ ] Minimalist visual design inspired by Linear.app and LatamOne (white + black, clean typography, generous whitespace)
- [ ] Scroll-triggered animations (Framer Motion for entrances, GSAP for counters and scroll-scrubbed elements)
- [ ] SEO fundamentals (meta tags, Open Graph, structured data, semantic HTML)
- [ ] Deploy on Vercel with belgrano.cl domain
- [ ] Sticky navbar with smooth scroll navigation and backdrop blur
- [ ] Client logo marquee (CLC, Seguros CLC, TNT Sports/Warner Bros)
- [ ] Animated stats counters (GSAP)

### Out of Scope

- Three.js / 3D scenes — v1 had this, v2 intentionally drops it for performance and simplicity
- Lenis smooth scroll — using native scroll instead
- Blog/content section — deferred, not core to lead generation MVP
- CMS integration — static content is sufficient for launch
- User authentication — no login needed
- E-commerce / payments — not applicable
- Blue/violet color scheme — that was v1, v2 is black + white minimalist

## Context

- **Prior work:** Two existing repos (`landing-belgrano/` and `belgrano/`) contain the v1 landing page built with Next.js 16, Three.js, GSAP, Framer Motion, and a "Belgrano Ilustrado" brand identity (navy + amber). The v2 is a complete redesign — no code migration.
- **Brand evolution:** v1 was navy/amber with serif display fonts. v2 shifts to minimalist black/white with Geist Sans. The wordmark "BELGRANO" remains in bold sans-serif.
- **Research available:** Detailed vertical research exists (`research-verticales-v2.md`) covering market analysis, competitors, client pain points, and copy suggestions for all 4 verticals.
- **Client references:** Clinica Las Condes, Seguros CLC, TNT Sports / Warner Bros, AFP Modelo.
- **Business model:** B2B agency selling custom AI implementations, DOOH ad space, content production, and corporate training.
- **Remotion assets:** The `belgrano/remotion-assets/` project has video compositions that could be adapted for the new design later.

## Constraints

- **Stack:** Next.js (latest stable) + Tailwind CSS v4 + Framer Motion + GSAP. No Three.js, no Lenis.
- **Design:** Minimalist, Linear.app-inspired. White backgrounds, black typography, generous whitespace. Dark sections for contrast.
- **Typography:** Geist Sans (primary), Inter as fallback. Headlines 800-900 weight, tight tracking.
- **Colors:** #ffffff (bg), #f9fafb (section bg), #09090B (dark sections), #111827 (text), #6B7280 (secondary text), #000000 (accent/CTAs).
- **Email:** Resend API for contact form submissions.
- **Deploy:** Vercel + belgrano.cl domain.
- **No code migration:** Build from scratch, do not copy from landing-belgrano.
- **Package manager:** npm.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Drop Three.js for v2 | Performance, simplicity, faster load times | -- Pending |
| Black/white instead of navy/amber | Modern minimalist aesthetic, inspired by Linear.app | -- Pending |
| Multi-page instead of single-page | Each vertical needs its own detailed landing for SEO and conversion | -- Pending |
| Native scroll instead of Lenis | Simpler, fewer dependencies, better mobile compat | -- Pending |
| Geist Sans over Playfair Display | Matches minimalist direction, consistent with modern SaaS aesthetic | -- Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-31 after initialization*
