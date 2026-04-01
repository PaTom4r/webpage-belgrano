---
phase: 06-seo-pass
plan: 01
subsystem: seo
tags: [next.js, metadata, open-graph, sitemap, robots, sharp]

# Dependency graph
requires:
  - phase: 05-contact-conversion
    provides: complete pages with all routes — /, /nosotros, /verticales/[slug]
  - phase: 04-about-page
    provides: nosotros/page.tsx with basic metadata
  - phase: 03-vertical-pages
    provides: generateMetadata on vertical pages
provides:
  - Unique per-page metadata (title + description + openGraph) on all 6 public routes
  - 6 static OG PNG images (1200x630) in public/og/
  - /sitemap.xml served via src/app/sitemap.ts listing all 6 routes
  - /robots.txt served via src/app/robots.ts allowing all crawlers
affects: [07-deploy-vercel, future-seo-structured-data]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Per-page metadata export pattern (static pages use export const metadata, dynamic pages use generateMetadata)
    - OG image map pattern for slug-to-image resolution in dynamic routes
    - MetadataRoute.Sitemap and MetadataRoute.Robots Next.js built-in conventions

key-files:
  created:
    - src/app/sitemap.ts
    - src/app/robots.ts
    - public/og/og-default.png
    - public/og/og-bots.png
    - public/og/og-dooh.png
    - public/og/og-producciones.png
    - public/og/og-academy.png
    - public/og/og-nosotros.png
    - scripts/generate-og.mjs
  modified:
    - src/app/page.tsx
    - src/app/nosotros/page.tsx
    - src/app/verticales/[slug]/page.tsx

key-decisions:
  - "Static OG images via sharp SVG-to-PNG (scripts/generate-og.mjs) — no dynamic OG generation needed for v1 static placeholder images"
  - "Home page title set as plain string to override layout template, prevents double-appending Belgrano brand name"
  - "Vertical OG image map (ogImages record) inside generateMetadata with fallback to og-default.png for unknown slugs"

patterns-established:
  - "OG image pattern: static PNGs in public/og/, referenced by absolute path /og/filename.png in metadata"
  - "Sitemap pattern: src/app/sitemap.ts returning MetadataRoute.Sitemap — auto-served at /sitemap.xml"

requirements-completed: [SEO-01, SEO-02, SEO-03, SEO-04]

# Metrics
duration: 2min
completed: 2026-04-01
---

# Phase 06 Plan 01: SEO Pass Summary

**Per-page metadata with unique titles, descriptions, OG images, sitemap.xml, and robots.txt covering all 6 public routes using Next.js built-in metadata API and sharp-generated PNG assets**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-01T02:36:26Z
- **Completed:** 2026-04-01T02:38:26Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments

- Added unique metadata (title, description, openGraph, alternates.canonical) to all 6 public routes: /, /nosotros, /verticales/bots, /verticales/dooh, /verticales/producciones, /verticales/academy
- Generated 6 static OG PNG images (1200x630, dark brand design) using sharp from SVG templates
- Created sitemap.ts and robots.ts served as /sitemap.xml and /robots.txt by Next.js built-in file conventions

## Task Commits

Each task was committed atomically:

1. **Task 1: Per-page metadata — home, nosotros, vertical pages** - `96e550f` (feat)
2. **Task 2: OG images, sitemap.ts, robots.ts** - `d2e6e9c` (feat)

**Plan metadata:** (see final commit below)

## Files Created/Modified

- `src/app/page.tsx` - Added metadata export with title, description, OG image, canonical URL
- `src/app/nosotros/page.tsx` - Enriched existing metadata with openGraph and canonical URL
- `src/app/verticales/[slug]/page.tsx` - Enriched generateMetadata with ogImages map, openGraph, and canonical URL
- `src/app/sitemap.ts` - New: MetadataRoute.Sitemap listing all 6 routes, served at /sitemap.xml
- `src/app/robots.ts` - New: MetadataRoute.Robots allowing all crawlers, served at /robots.txt
- `public/og/og-default.png` - New: 1200x630 OG image for home page
- `public/og/og-bots.png` - New: 1200x630 OG image for Bots Conversacionales
- `public/og/og-dooh.png` - New: 1200x630 OG image for DOOH & Senaletica Digital
- `public/og/og-producciones.png` - New: 1200x630 OG image for Producciones Digitales
- `public/og/og-academy.png` - New: 1200x630 OG image for Belgrano Academy
- `public/og/og-nosotros.png` - New: 1200x630 OG image for Nosotros
- `scripts/generate-og.mjs` - New: One-time sharp script for OG PNG generation from SVG templates

## Decisions Made

- Used sharp SVG-to-PNG conversion for OG images — sharp is already a declared dependency, no new packages needed
- Home page metadata.title set as plain string (not via template) to render exactly as written without double-appending brand name
- OG image map as inline Record<string, string> inside generateMetadata — cleaner than importing a separate config file for 4 entries
- Committed generate-og.mjs to repo for future regeneration

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All SEO metadata in place for all 6 public routes
- /sitemap.xml and /robots.txt ready for crawlers
- OG images ready for social sharing previews
- Ready for Phase 07: Deploy on Vercel with belgrano.cl domain

## Self-Check: PASSED

- FOUND: src/app/sitemap.ts
- FOUND: src/app/robots.ts
- FOUND: public/og/og-default.png
- FOUND: public/og/og-bots.png
- FOUND: public/og/og-dooh.png
- FOUND: public/og/og-producciones.png
- FOUND: public/og/og-academy.png
- FOUND: public/og/og-nosotros.png
- Commit 96e550f: feat(06-01): add per-page metadata
- Commit d2e6e9c: feat(06-01): add OG images, sitemap.xml, and robots.txt

---
*Phase: 06-seo-pass*
*Completed: 2026-04-01*
