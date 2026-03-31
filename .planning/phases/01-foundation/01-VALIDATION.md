# Phase 1: Foundation - Validation Strategy

**Phase:** 01-foundation
**Created:** 2026-03-31
**Source:** RESEARCH.md Validation Architecture

## Validation Approach

Pure infrastructure phase — no business logic to unit test. Validation is via build verification and visual checks.

## Automated Verification

| Requirement | Verification Command | Expected |
|-------------|---------------------|----------|
| FOUND-01 | `npm run build` | Exit code 0, no errors |
| FOUND-02 | `grep '@theme' src/app/globals.css` | @theme block with brand tokens |
| FOUND-03 | `grep 'Geist' src/app/layout.tsx` | Geist font import present |
| FOUND-04 | `grep 'useGSAP' src/lib/gsap-config.ts` | useGSAP re-export present |
| FOUND-05 | `grep 'metadataBase' src/app/layout.tsx` | metadataBase set |
| FOUND-06 | `grep 'container' src/components/layout/container.tsx` | Container component exists |

## Visual Verification

1. `npm run dev` serves the app with Geist Sans rendered (no FOUT)
2. Browser console shows zero hydration errors
3. Layout reflows correctly at 375px, 768px, 1280px viewports

## Rationale

No unit tests for Phase 1 — infrastructure concerns (font loading, CSS tokens, GSAP plugin registration) are verified by successful build + visual smoke test. Unit tests would test framework internals, not our code.
