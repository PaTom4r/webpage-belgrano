---
phase: 02-landing-page
plan: 03
subsystem: landing-page/sections
tags: [framer-motion, stagger, forms, zod, react-hook-form, cta, verticales]
dependency_graph:
  requires:
    - 02-01  # verticales.ts content data, ScrollReveal animation primitive
  provides:
    - VerticalesSection  # 4-card grid with stagger entrance
    - VerticalCard       # hover-animated service card
    - CtaSection         # dark CTA with embedded contact form
    - ContactForm        # RHF + Zod validated form (UI only)
    - contactSchema      # Reusable Zod schema for Phase 5
  affects:
    - Phase 3  # vertical detail pages reuse Vertical type and card pattern
    - Phase 5  # contact form wiring reuses contactSchema from this plan
tech_stack:
  added: []
  patterns:
    - Framer Motion stagger with containerVariants + itemVariants
    - whileHover/whileTap on motion.div — no Tailwind hover:scale conflict
    - RHF + zodResolver for client-side validation
    - Intentional stub: onSubmit is placeholder pending Phase 5 Server Action
key_files:
  created:
    - src/components/sections/verticales-section.tsx
    - src/components/ui/vertical-card.tsx
    - src/components/sections/cta-section.tsx
    - src/components/forms/contact-form.tsx
    - src/lib/schemas/contact.ts
  modified: []
decisions:
  - "Inline SVG icons for 4 verticals instead of importing lucide-react — avoids full library for 4 icons"
  - "ContactForm onSubmit is an intentional placeholder (Phase 2 scope boundary) — Phase 5 replaces with Server Action"
  - "CtaSection is a Server Component (no 'use client') — ContactForm handles its own client boundary"
metrics:
  duration: "4 minutes"
  completed: "2026-04-01T00:41:57Z"
  tasks: 2
  files: 5
---

# Phase 02 Plan 03: Verticales Section and CTA Section Summary

VerticalesSection with 4-card Framer Motion stagger grid and CtaSection with dark background, RHF contact form validated via Zod — both building conversion-driving sections for the Belgrano landing page.

## What Was Built

### Task 1: Verticales section with stagger cards and hover animation

**`src/components/ui/vertical-card.tsx`**
- `motion.div` with `whileHover={{ scale: 1.02, y: -2 }}` and `whileTap={{ scale: 0.97 }}`
- Inline SVG icons (MessageCircle, Monitor, Film, GraduationCap) — no lucide-react
- Renders: icon, name, tagline, description, metrics list, "Saber más" → `/verticales/[slug]`
- No Tailwind `hover:scale-*` classes (Framer Motion owns transforms)

**`src/components/sections/verticales-section.tsx`**
- `containerVariants` with `staggerChildren: 0.1` for card entrance
- `whileInView="visible"` on grid container, `viewport={{ once: true, margin: '-50px' }}`
- Section heading with `ScrollReveal` wrappers (delay 0, 0.05, 0.1)
- 4-column responsive grid (1 → 2 → 4 cols)

### Task 2: Zod contact schema and CTA section with form UI

**`src/lib/schemas/contact.ts`**
- `contactSchema`: Zod v4 object with `name`, `email`, `company`, `message` fields
- Spanish error messages, length constraints
- Exports `contactSchema` and `ContactFormData` type — reusable in Phase 5

**`src/components/forms/contact-form.tsx`**
- RHF v7 with `zodResolver(contactSchema)`
- 4 fields: name, email, company, message with inline `role="alert"` error messages
- `submitted` state shows success message on form completion
- Phase 2 scope honored: `onSubmit` is a placeholder (setTimeout simulation, no Server Action)

**`src/components/sections/cta-section.tsx`**
- `bg-dark` class (maps to `#09090B` per locked decision)
- Server Component — no `'use client'` directive (ContactForm handles its own boundary)
- 2-column layout: left headline + proof points, right ContactForm
- ScrollReveal wrappers for all headline elements

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Changed import from `motion/react` to `framer-motion`**
- **Found during:** Task 1 setup
- **Issue:** Plan templates used `import { motion } from 'motion/react'` but `motion` package is not installed. STATE.md has logged decision: "Import from framer-motion (not motion/react)" from Plan 02-01.
- **Fix:** Used `import { motion } from 'framer-motion'` in both vertical-card.tsx and verticales-section.tsx, consistent with scroll-reveal.tsx.
- **Files modified:** src/components/ui/vertical-card.tsx, src/components/sections/verticales-section.tsx

**2. [Rule 1 - Bug] Replaced emoji checkmark with HTML entity in JSX**
- **Found during:** Task 2 (contact-form.tsx)
- **Issue:** Emoji character `✓` in JSX string can cause encoding issues on Windows/Git Bash. Used HTML entity `&#10003;` for safe rendering.
- **Fix:** `&#10003;` in both contact-form.tsx and cta-section.tsx
- **Files modified:** src/components/forms/contact-form.tsx, src/components/sections/cta-section.tsx

## Known Stubs

| File | Stub | Reason |
|------|------|--------|
| `src/components/forms/contact-form.tsx` | `onSubmit` placeholder (setTimeout, no Server Action) | Phase 2 scope boundary — plan explicitly defers Resend integration to Phase 5 |

The stub does NOT prevent the plan's goal (form UI renders and validates client-side with Zod). Phase 5 will wire the actual email submission.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | `df0ef3b` | feat(02-03): add VerticalesSection and VerticalCard with Framer Motion stagger |
| Task 2 | `d90a2f3` | feat(02-03): add contact schema, ContactForm, and CtaSection |

## Verification

```
npx tsc --noEmit: 0 type errors
grep "whileHover" vertical-card.tsx: FOUND
grep "hover:scale" vertical-card.tsx: NOT FOUND (good)
grep "staggerChildren" verticales-section.tsx: 0.1 FOUND
grep "bg-dark" cta-section.tsx: FOUND
grep "zodResolver" contact-form.tsx: FOUND
grep "export" contact.ts: contactSchema + ContactFormData FOUND
```

## Self-Check: PASSED
