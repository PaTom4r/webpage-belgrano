---
phase: 05-contact-conversion
plan: 02
subsystem: conversion
tags: [calendly, whatsapp, cta, floating-button, client-component]
dependency_graph:
  requires: []
  provides: [CalendlyEmbed, FloatingWhatsApp]
  affects: [src/app/layout.tsx, src/components/sections/cta-section.tsx]
tech_stack:
  added: []
  patterns: [useEffect script loader, useState hover state, fixed positioning z-50]
key_files:
  created:
    - src/components/conversion/calendly-embed.tsx
    - src/components/conversion/floating-whatsapp.tsx
  modified:
    - src/components/sections/cta-section.tsx
    - src/app/layout.tsx
decisions:
  - "CalendlyEmbed uses useEffect to dynamically append Calendly script — avoids SSR issues with third-party widget scripts"
  - "FloatingWhatsApp placed inside ClientProviders after Footer — ensures it renders on every page and has access to React state for hover"
  - "Placeholder WhatsApp number +56912345678 documented with TODO comment — must be replaced before production deploy"
metrics:
  duration: 13m
  completed_date: "2026-04-01T02:24:00Z"
  tasks_completed: 2
  files_changed: 4
---

# Phase 05 Plan 02: Calendly Embed + Floating WhatsApp Summary

**One-liner:** Dual conversion path via Calendly inline widget in CTA section and persistent floating WhatsApp button in root layout with pre-filled message.

## What Was Built

### CalendlyEmbed (`src/components/conversion/calendly-embed.tsx`)

Client component (`'use client'`) that dynamically loads the official Calendly inline widget script via `useEffect`. Avoids SSR issues by deferring script injection to the browser. Renders a `calendly-inline-widget` div with a minimum height of 630px. Accepts `url` and `className` props — defaults to the placeholder Calendly event URL.

### FloatingWhatsApp (`src/components/conversion/floating-whatsapp.tsx`)

Client component with `useState` hover tracking. Fixed position bottom-right (z-50), green (#25D366) circular button (56x56px) with official WhatsApp SVG path icon. Clicking opens a new tab to `wa.me` with a pre-filled message in Spanish. Desktop-only tooltip "Escríbenos" appears on hover via `sm:block hidden`. Scale transform on hover (1.1) and active (0.95) for tactile feedback.

### CtaSection update (`src/components/sections/cta-section.tsx`)

CalendlyEmbed added below the two-column contact form grid, separated by a `border-white/10` divider, with a "O agenda directo" uppercase label to provide visual context before the widget.

### Root layout update (`src/app/layout.tsx`)

FloatingWhatsApp imported and placed after `<Footer />` inside `<ClientProviders>`, ensuring it persists on every page route.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | CalendlyEmbed + CtaSection | f823578 | calendly-embed.tsx, cta-section.tsx |
| 2 | FloatingWhatsApp + layout | 964eeab | floating-whatsapp.tsx, layout.tsx |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

- **WhatsApp number placeholder** — `src/components/conversion/floating-whatsapp.tsx` line 5: `const WHATSAPP_NUMBER = '56912345678'` is a placeholder. Must be replaced with the real Belgrano WhatsApp Business number before production deploy. Widget is fully functional otherwise.
- **Calendly URL placeholder** — `src/components/conversion/calendly-embed.tsx` line 7: `url = 'https://calendly.com/belgrano/reunion-estrategica'` is a placeholder event URL. A real Calendly account and event type must be configured before deploy.

These stubs do not prevent the plan's goal from being achieved (components render correctly). They require configuration before go-live.

## Self-Check: PASSED

- [x] `src/components/conversion/calendly-embed.tsx` — EXISTS
- [x] `src/components/conversion/floating-whatsapp.tsx` — EXISTS
- [x] `src/components/sections/cta-section.tsx` — MODIFIED
- [x] `src/app/layout.tsx` — MODIFIED
- [x] Commit f823578 — EXISTS
- [x] Commit 964eeab — EXISTS
- [x] `npm run build` — PASSED (0 TypeScript errors, 8/8 pages generated)
