---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [next.js, tailwind, geist, gsap, layout, responsive]

# Dependency graph
requires:
  - phase: 01-foundation/01-01
    provides: Tailwind v4 @theme brand tokens in globals.css, gsap-config.ts, Next.js scaffold
provides:
  - Root layout with Geist+Inter variable fonts, metadataBase=belgrano.cl, GSAP hydration fix
  - Container component (responsive max-w-7xl wrapper)
  - Section component (light/dark variants using brand tokens)
  - Smoke test page.tsx confirming layout shell works
affects: [02-landing, 03-vertical-pages, 04-about, 05-contact, 06-seo]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "All page content wrapped in Section > Container hierarchy"
    - "Dark sections use dark=true prop on Section (bg-dark/text-bg tokens)"
    - "Font variables (--font-geist, --font-inter) applied on <html> element, consumed via Tailwind font-sans utility"
    - "GSAP hydration fix via body style={{ borderTopStyle: 'solid' }} — never remove"

key-files:
  created:
    - src/components/layout/container.tsx
    - src/components/layout/section.tsx
  modified:
    - src/app/layout.tsx
    - src/app/page.tsx

key-decisions:
  - "Container max-w-7xl (1280px) matches the whitespace-heavy B2B design language from CLAUDE.md"
  - "Section composes Container internally — pages only need to wrap with Section for standard layout"
  - "Inter gets display: 'swap' to prevent FOUT while Geist (default display) loads"

patterns-established:
  - "Pattern 1: Section + Container hierarchy — every page section uses Section (with optional dark prop) wrapping Container"
  - "Pattern 2: Layout tokens are Tailwind utilities from @theme: bg-bg, bg-dark, text-text, text-text-secondary, text-bg, bg-bg-section"

requirements-completed: [FOUND-03, FOUND-05, FOUND-06]

# Metrics
duration: 5min
completed: 2026-03-31
---

# Phase 01 Plan 02: Root Layout + Layout Shell Summary

**Geist+Inter variable fonts wired to Tailwind --font-sans, metadataBase set to belgrano.cl, GSAP hydration fix applied, Container and Section primitives established as the responsive layout foundation for all phases**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-31T23:22:00Z
- **Completed:** 2026-03-31T23:27:32Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments
- Root layout fully configured: Geist Sans + Inter as variable fonts, metadataBase pointing to belgrano.cl, Analytics component, GSAP hydration fix (body borderTopStyle: solid)
- Container component created: responsive max-w-7xl with px-4 sm:px-6 lg:px-8 breakpoints — the standard wrapper for all page content
- Section component created: light (bg-bg/text-text) and dark (bg-dark/text-bg) variants with consistent py-16/20/24 vertical rhythm
- Smoke test page verifies all tokens, fonts, and layout variants work together — build and lint both pass clean

## Task Commits

Each task was committed atomically:

1. **Task 1: Configure root layout with fonts, metadataBase, and GSAP hydration fix** - `9128b62` (feat)
2. **Task 2: Create Container and Section layout components** - `24eb166` (feat)
3. **Task 3: Update home page as responsive smoke test** - `12569d5` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified
- `src/app/layout.tsx` - Root layout with Geist+Inter fonts, metadataBase, GSAP fix, Analytics
- `src/components/layout/container.tsx` - Responsive max-width wrapper, exports Container
- `src/components/layout/section.tsx` - Section wrapper with dark/light variants, exports Section
- `src/app/page.tsx` - Smoke test page using Section and Container to verify foundation

## Decisions Made
- Container set to max-w-7xl (1280px) — matches the whitespace-heavy B2B aesthetic in CLAUDE.md
- Section internally composes Container, keeping page components clean (only use Section for standard layout)
- Inter uses display: 'swap' to prevent flash of unstyled text; Geist loads without it (better default)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed unused import warning in page.tsx**
- **Found during:** Task 3 (smoke test page)
- **Issue:** Plan spec required both `Container` and `Section` imports in page.tsx, but initial implementation only used Section directly — ESLint reported unused Container import
- **Fix:** Replaced the `<Section className="bg-bg-section">` with a standalone `<div className="bg-bg-section ..."><Container>...</Container></div>` to demonstrate direct Container usage and eliminate the warning
- **Files modified:** src/app/page.tsx
- **Verification:** npm run lint exits 0 with no warnings
- **Committed in:** 12569d5 (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (1 bug/lint fix)
**Impact on plan:** Minor cosmetic fix. The smoke test now demonstrates both Container standalone usage and Section-composed usage, which is actually a better test than the original. No scope creep.

## Issues Encountered
- Plan 01-01 had already configured most of layout.tsx (Geist, Inter, metadataBase, Analytics, GSAP fix) — only `display: 'swap'` for Inter was missing. Added in Task 1 as a clean-up.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Foundation complete: Tailwind v4 tokens, fonts, layout primitives all wired
- Phase 02 (landing page) can start immediately — Container and Section are ready to use
- All OG metadata will correctly resolve to absolute URLs via metadataBase
- GSAP hydration fix in place before any animation component is added in Phase 2

---
*Phase: 01-foundation*
*Completed: 2026-03-31*
