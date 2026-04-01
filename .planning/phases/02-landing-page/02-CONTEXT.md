# Phase 2: Landing Page - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Visitors land on a complete, animated landing page that communicates what Belgrano does and drives them toward a meeting. 8 sections: Navbar, Hero, Marquee, Verticales, HowItWorks, Stats, CTA, Footer. All animations (Framer Motion entrances + GSAP counters/scroll-scrub).

Requirements: LAND-01 through LAND-08, ANIM-01 through ANIM-06.

</domain>

<decisions>
## Implementation Decisions

### Layout & Visual Density
- Navbar: 64px height, transparent on top → glass (backdrop-blur) on scroll
- Hero: full viewport (100vh), centered content, maximizes first impression
- Section vertical spacing: py-24 (96px) desktop, py-16 (64px) mobile — generous whitespace
- Dark sections: Stats + CTA get dark bg (#09090B), rest is light (#ffffff or #f9fafb)

### Animation Strategy
- Framer Motion entrances: fade-in + slide-up 30px, stagger 0.1s between siblings. Use whileInView with once: true
- Stats counters: GSAP countUp on ScrollTrigger enter, duration 2s, ease power2.out
- HowItWorks: GSAP ScrollTrigger pin + scrub — steps reveal sequentially as user scrolls
- Reduced motion: disable all motion completely, show final state instantly (no fade, no counter)
- Element ownership rule: Framer Motion handles entrance/hover, GSAP handles counters and scroll-scrub. NEVER both on the same DOM element.

### Claude's Discretion
- Content & CTA approach — dual form+CTA, card hover effects, marquee style, stats numbers — Claude has full flexibility here
- Specific copy text — use CLAUDE-webpage-belgrano.md content (already defined in spec)
- Visual micro-interactions on buttons and links
- Exact marquee implementation details

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- src/components/layout/container.tsx — responsive max-w-7xl wrapper
- src/components/layout/section.tsx — section wrapper with dark/light variants
- src/lib/gsap-config.ts — centralized GSAP with ScrollTrigger + useGSAP exports
- src/app/globals.css — full @theme brand tokens (colors, fonts, spacing)

### Established Patterns
- Server Components by default, "use client" only for animation/interaction components
- Tailwind v4 CSS-first — tokens via @theme in globals.css
- Container > Section component hierarchy for page layout
- GSAP uses useGSAP() hook only — no raw useEffect for GSAP

### Integration Points
- page.tsx is the home page — compose all 8 sections here
- Navbar goes in layout (persistent) or page (scroll-aware) — decide during planning
- Section IDs for in-page navigation (#what-we-do, #how-it-works, etc.)

</code_context>

<specifics>
## Specific Ideas

- Reference linear.app and latamone.com for visual style inspiration
- Copy and content from the CLAUDE-webpage-belgrano.md spec (all section content is pre-defined)
- Client logos for marquee: CLC, Seguros CLC, TNT Sports/Warner Bros, AFP Modelo
- Verticales cards link to /verticales/[slug] routes (built in Phase 3)
- Stats: 200+ empresas, 10x ROI, 98% satisfaccion, $80M+ generados

</specifics>

<deferred>
## Deferred Ideas

- Calendly embed — Phase 5 (Contact & Conversion)
- WhatsApp floating button — Phase 5
- Resend form integration — Phase 5 (form UI built here, integration later)
- Testimonials carousel — v2

</deferred>
