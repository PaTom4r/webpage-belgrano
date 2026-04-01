---
phase: 03-vertical-pages
plan: 01
subsystem: content-data
tags: [content, typescript, interfaces, faq, components]
dependency_graph:
  requires: []
  provides: [verticales-extended-data, FaqAccordion-component]
  affects: [vertical-card, vertical-detail-pages]
tech_stack:
  added: []
  patterns: [accordion-one-open, AnimatePresence-height, dl-dt-dd-faq-semantics]
key_files:
  created:
    - src/components/ui/faq-accordion.tsx
  modified:
    - src/lib/content/verticales.ts
    - src/components/ui/vertical-card.tsx
decisions:
  - "VerticalMetric as {value, label} object instead of string — enables separate styling of value vs label in UI"
  - "FaqAccordion uses dl/dt/dd semantic structure — correct HTML for Q&A content"
  - "AnimatePresence with height: 0 -> auto transition — smooth accordion without layout shift"
  - "VerticalCard updated in same commit as interface change — avoids intermediate TypeScript errors"
metrics:
  duration_minutes: 8
  completed_date: "2026-04-01T01:20:57Z"
  tasks_completed: 2
  files_changed: 3
---

# Phase 03 Plan 01: Content Data & FaqAccordion Summary

**One-liner:** Extended Vertical interface with FaqItem/VerticalMetric types and filled all 4 vertical data objects with production copy; built accessible animated FaqAccordion component.

## What Was Built

### Task 1: Extended Vertical interface and data objects
- Added `FaqItem { question, answer }` interface to verticales.ts
- Added `VerticalMetric { value, label }` interface to verticales.ts
- Extended `Vertical` interface with `longDescription: string` and `faq: FaqItem[]`
- Changed `metrics` type from `string[]` to `VerticalMetric[]`
- Filled all 4 verticals with complete copy:
  - **bots**: 4 metrics, 6 FAQ items, longDescription (3 paragraphs)
  - **dooh**: 4 metrics, 6 FAQ items, longDescription (3 paragraphs)
  - **producciones**: 3 metrics, 5 FAQ items, longDescription (3 paragraphs)
  - **academy**: 4 metrics, 6 FAQ items, longDescription (3 paragraphs)
- Updated `VerticalCard` to render `{m.value} {m.label}` for new metric structure

### Task 2: FaqAccordion component
- Created `src/components/ui/faq-accordion.tsx` as `'use client'` component
- Accordion behavior: one item open at a time via `useState<number | null>`
- Animation: `framer-motion` `AnimatePresence` with `height: 0 -> auto` + `opacity` transition
- Semantic structure: `dl` > `dt` (button) + `dd` (answer) — correct HTML for FAQ
- Accessibility: `aria-expanded` on each trigger button
- Plus/rotate icon (45deg rotation) signals open/closed state

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| VerticalMetric as {value, label} | Enables separate bold styling of metric value vs descriptive label in UI |
| dl/dt/dd structure for FAQ | Semantically correct HTML for definition/Q&A lists; accessibility benefit |
| AnimatePresence with height: 0->auto | Smooth accordion collapse without requiring fixed heights |
| VerticalCard updated in same commit | Avoids intermediate TypeScript error state during migration |
| framer-motion (not motion/react) | Consistent with project decision from Phase 02 — motion/react not installed |

## Deviations from Plan

None — plan executed exactly as written.

## Verification

- `npx tsc --noEmit` exits with 0 errors (verified twice: after Task 1, after Task 2)
- All 4 verticals have `faq:` array (grep confirms 4 data occurrences + 1 interface)
- All 4 verticals have `longDescription:` (grep confirms 4 data + 1 interface)
- 16 `value:` occurrences in verticales.ts (4 verticals × ~4 metrics each)
- FaqAccordion file starts with `'use client'`
- FaqAccordion imports from `framer-motion` (not `motion/react`)

## Commits

| Task | Commit | Message |
|------|--------|---------|
| Task 1 | 807ca96 | feat(03-01): extend Vertical interface with longDescription, VerticalMetric, FaqItem |
| Task 2 | 6b03d01 | feat(03-01): add FaqAccordion client component with AnimatePresence animation |

## Self-Check: PASSED

Files created/modified:
- FOUND: src/lib/content/verticales.ts
- FOUND: src/components/ui/vertical-card.tsx
- FOUND: src/components/ui/faq-accordion.tsx

Commits exist:
- FOUND: 807ca96
- FOUND: 6b03d01
