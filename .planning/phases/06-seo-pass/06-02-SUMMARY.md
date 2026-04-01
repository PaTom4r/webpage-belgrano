---
phase: 06-seo-pass
plan: 02
subsystem: seo
tags: [json-ld, structured-data, schema-org, semantic-html, accessibility, aria]

# Dependency graph
requires:
  - phase: 06-01
    provides: per-page metadata, OG images, sitemap.xml, robots.txt
provides:
  - Organization + LocalBusiness JSON-LD schema on homepage
  - Service JSON-LD schema on each of 4 vertical pages
  - aria-labelledby on all section landmark elements
  - id attributes on all page headings for accessibility
  - Section layout component extended with aria-labelledby prop
affects: [07-deploy]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - JSON-LD injected via dangerouslySetInnerHTML in Server Components (no hydration cost)
    - React fragment wrapper (script + main) pattern for injecting script siblings
    - aria-labelledby ties each section landmark to its visible heading for screen readers

key-files:
  created: []
  modified:
    - src/app/page.tsx
    - src/app/verticales/[slug]/page.tsx
    - src/components/layout/section.tsx
    - src/components/sections/hero-section.tsx
    - src/components/sections/verticales-section.tsx
    - src/components/sections/how-it-works-section.tsx
    - src/components/sections/stats-section.tsx
    - src/components/sections/cta-section.tsx
    - src/components/sections/about-narrative-section.tsx
    - src/components/sections/about-values-section.tsx
    - src/components/sections/about-team-section.tsx
    - src/components/sections/vertical-hero-section.tsx
    - src/components/sections/vertical-faq-section.tsx

key-decisions:
  - "JSON-LD injected as dangerouslySetInnerHTML in Server Component — no runtime JS cost, static HTML output"
  - "React fragment wraps script + main — sibling pattern for script injection without wrapping div"
  - "Section layout component extended with aria-labelledby prop — reusable pattern, zero visual change"
  - "Hardcoded belgrano.cl URL in vertical pages JSON-LD — minimal change per plan instructions"

patterns-established:
  - "aria-labelledby pattern: section[id][aria-labelledby] + heading[id] — applied consistently across all 13 sections"
  - "JSON-LD pattern: build object in component, stringify inline via dangerouslySetInnerHTML"

requirements-completed: [SEO-05, SEO-06]

# Metrics
duration: 4min
completed: 2026-04-01
---

# Phase 06 Plan 02: SEO Pass — JSON-LD & Semantic HTML Summary

**Organization + LocalBusiness JSON-LD on homepage, Service JSON-LD on 4 vertical pages, and aria-labelledby on all 13 section landmarks for accessibility compliance**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-01T02:42:04Z
- **Completed:** 2026-04-01T02:48:38Z
- **Tasks:** 2
- **Files modified:** 13

## Accomplishments

- JSON-LD Organization + LocalBusiness schema injected into homepage — eligible for Google rich results
- JSON-LD Service schema per vertical page — all 4 verticals have their own structured data block using vertical.name + vertical.description from content data
- Semantic HTML audit completed — every `<section>` now has `aria-labelledby` pointing to its visible heading id, covering homepage (5 sections), nosotros (3 sections), and vertical pages (2 sections)
- Section layout component extended with `aria-labelledby` prop — backward-compatible, no existing callers broken

## Task Commits

Each task was committed atomically:

1. **Task 1: JSON-LD structured data — Organization on home, Service on verticals** - `d2b3a73` (feat)
2. **Task 2: Semantic HTML audit — heading hierarchy and landmark elements** - `8d58bd0` (feat)

**Plan metadata:** (in final commit)

## Files Created/Modified

- `src/app/page.tsx` — Added Organization + LocalBusiness JSON-LD; imports siteConfig; React fragment wraps script + main
- `src/app/verticales/[slug]/page.tsx` — Added Service JSON-LD per vertical; React fragment wraps script + main
- `src/components/layout/section.tsx` — Extended with `aria-labelledby` prop support
- `src/components/sections/hero-section.tsx` — Added `id="hero-heading"` to h1, `aria-labelledby="hero-heading"` to section
- `src/components/sections/verticales-section.tsx` — Added `id="what-we-do-heading"` to h2, `aria-labelledby` to section
- `src/components/sections/how-it-works-section.tsx` — Added `id="how-it-works-heading"` to h2, `aria-labelledby` to section
- `src/components/sections/stats-section.tsx` — Added `id="stats-heading"` to h2, `aria-labelledby` to section
- `src/components/sections/cta-section.tsx` — Added `id="cta-heading"` to h2, `aria-labelledby` to section
- `src/components/sections/about-narrative-section.tsx` — Added `id="about-heading"` to h1, passed `aria-labelledby` to Section
- `src/components/sections/about-values-section.tsx` — Added `id="about-values-heading"` to h2, passed `aria-labelledby` to Section
- `src/components/sections/about-team-section.tsx` — Added `id="about-team-heading"` to h2, passed `aria-labelledby` to Section
- `src/components/sections/vertical-hero-section.tsx` — Added `id="vertical-hero-heading"` to h1, `aria-labelledby` to section
- `src/components/sections/vertical-faq-section.tsx` — Added `id="faq-heading"` to h2, `aria-labelledby` to section

## Decisions Made

- JSON-LD injected as `dangerouslySetInnerHTML` in Server Components — no runtime JS, renders directly in static HTML output
- React fragment wraps `<script>` and `<main>` as siblings — cleanest pattern for injecting script without introducing extra DOM wrapper
- Extended `Section` layout component with `aria-labelledby` prop — preserves DRY principle, zero visual regression
- Hardcoded `belgrano.cl` in vertical page JSON-LD — minimal import footprint per plan spec

## Deviations from Plan

None — plan executed exactly as written. The Section layout component extension was required to apply `aria-labelledby` through the existing abstraction, which is the correct approach rather than bypassing it.

## Issues Encountered

None — both tasks completed cleanly, build passed after each change.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All SEO requirements (SEO-05, SEO-06) complete
- JSON-LD validates structurally — ready for Google Rich Results Test verification at deploy time
- Heading hierarchy verified correct: exactly one h1 per page across homepage, nosotros, and all 4 vertical pages
- Section landmarks correctly associated with headings via aria-labelledby
- Phase 07 (deploy) can proceed — site is SEO-complete

---
*Phase: 06-seo-pass*
*Completed: 2026-04-01*

## Self-Check: PASSED

- FOUND: src/app/page.tsx
- FOUND: src/app/verticales/[slug]/page.tsx
- FOUND: .planning/phases/06-seo-pass/06-02-SUMMARY.md
- FOUND commit: d2b3a73 (feat: JSON-LD Organization + Service schemas)
- FOUND commit: 8d58bd0 (feat: semantic HTML audit — aria-labelledby)
