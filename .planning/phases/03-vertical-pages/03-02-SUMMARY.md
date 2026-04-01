---
phase: 03-vertical-pages
plan: "02"
subsystem: vertical-pages
tags: [next.js, dynamic-routes, static-generation, server-components, seo]
dependency_graph:
  requires:
    - 03-01 (Vertical interface + FaqAccordion)
    - 02-05 (CtaSection reused from landing)
  provides:
    - 4 statically generated vertical detail pages at /verticales/[slug]
    - VerticalHeroSection, VerticalMetricsSection, VerticalClientsSection, VerticalFaqSection
    - Breadcrumb component
  affects:
    - 03-03 (About page — can reuse breadcrumb and section patterns)
tech_stack:
  added: []
  patterns:
    - generateStaticParams for static pre-rendering of dynamic routes
    - await params pattern for Next.js 15+ Promise params
    - Server Component shells wrapping "use client" leaf components
    - Inline SVG icon map (no lucide-react dependency)
    - Conditional render guards (return null for empty arrays)
key_files:
  created:
    - src/app/verticales/[slug]/page.tsx
    - src/components/sections/vertical-hero-section.tsx
    - src/components/sections/vertical-metrics-section.tsx
    - src/components/sections/vertical-clients-section.tsx
    - src/components/sections/vertical-faq-section.tsx
    - src/components/ui/breadcrumb.tsx
  modified: []
decisions:
  - "await params before slug destructuring — Next.js 15+ makes params a Promise, required for correct SSG behavior"
  - "Inline SVG icons in VerticalHeroSection instead of lucide-react — consistent with VerticalesSection pattern from Phase 02, avoids extra dependency"
  - "VerticalClientsSection returns null for empty clients array — Producciones has no clients, conditional rendering is cleaner than empty section"
  - "VerticalMetricsSection returns null when metrics empty — defensive guard for future verticals"
  - "Breadcrumb links to /#what-we-do anchor for Servicios — matches the what-we-do section id on the landing page"
metrics:
  duration_minutes: 3
  completed_date: "2026-04-01"
  tasks_completed: 2
  files_created: 6
  files_modified: 0
---

# Phase 03 Plan 02: Vertical Detail Pages Summary

## One-liner

4 statically-generated vertical detail pages at `/verticales/[slug]` using generateStaticParams, with dedicated section components for hero, metrics, clients, FAQ, and breadcrumb navigation.

## What Was Built

### Task 1: Section Components (commit a936084)

Created 5 Server Component files:

- **`src/components/ui/breadcrumb.tsx`** — Semantic `<nav>/<ol>` breadcrumb: Home / Servicios / [verticalName]. Links to `/` and `/#what-we-do`.
- **`src/components/sections/vertical-hero-section.tsx`** — Dark-bg hero section with inline SVG icon map (4 icons matching VerticalCard), h1, tagline. Reuses ScrollReveal for entrance animations.
- **`src/components/sections/vertical-metrics-section.tsx`** — Dark-bg metrics grid showing value+label pairs. Returns null when metrics array is empty.
- **`src/components/sections/vertical-clients-section.tsx`** — Light bg-section with client name pill badges. Returns null when clients array is empty (Producciones case).
- **`src/components/sections/vertical-faq-section.tsx`** — Server Component shell with title/label, wrapping the `FaqAccordion` client component leaf.

### Task 2: Dynamic Route Page (commit c4ef335)

Created `src/app/verticales/[slug]/page.tsx`:

- `generateStaticParams()` returns all 4 slugs: `bots`, `dooh`, `producciones`, `academy`
- `generateMetadata()` provides per-page SEO title (`${name} - Belgrano`) and description
- `await params` used before slug destructuring (Next.js 15+ Promise params requirement)
- `notFound()` called for unknown slugs — no unhandled 500 errors
- Full conversion funnel layout: Breadcrumb -> Hero -> LongDescription -> Metrics -> Clients -> FAQ -> CTA

## Build Verification

```
Route (app)
└ ● /verticales/[slug]
  ├ /verticales/bots
  ├ /verticales/dooh
  ├ /verticales/producciones
  └ /verticales/academy

●  (SSG) prerendered as static HTML (uses generateStaticParams)
```

TypeScript: 0 errors. Build: success. All 4 routes statically generated.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all content is wired directly from `verticales.ts`. The longDescription, metrics, clients, and FAQ data are fully populated for all 4 verticals. No placeholder text, no TODO items, no hardcoded empty values flowing to UI.

## Self-Check: PASSED

Files exist:
- FOUND: src/app/verticales/[slug]/page.tsx
- FOUND: src/components/sections/vertical-hero-section.tsx
- FOUND: src/components/sections/vertical-metrics-section.tsx
- FOUND: src/components/sections/vertical-clients-section.tsx
- FOUND: src/components/sections/vertical-faq-section.tsx
- FOUND: src/components/ui/breadcrumb.tsx

Commits exist:
- FOUND: a936084 (Task 1 — section components)
- FOUND: c4ef335 (Task 2 — dynamic route page)
