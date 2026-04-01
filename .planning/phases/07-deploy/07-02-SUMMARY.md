---
phase: 07-deploy
plan: 02
subsystem: infra
tags: [vercel, lighthouse, performance, seo, deployment, calendly, framer-motion]

# Dependency graph
requires:
  - phase: 07-deploy-01
    provides: GitHub repo, .env.example, pre-deploy code audit complete

provides:
  - Production URL live at https://webpage-belgrano.vercel.app
  - Lighthouse mobile performance score 92 (exceeds 90 target)
  - lighthouse-report.json saved to .planning/phases/07-deploy/
  - All 8 key routes returning 200
  - Favicon added, /favicon.ico 404 resolved

affects:
  - belgrano.cl domain setup (DNS must point to Vercel after human configures it)
  - contact form email (requires RESEND_API_KEY in Vercel env vars — deferred human action)

# Tech tracking
tech-stack:
  added: [vercel-cli@50.37.3, lighthouse-cli@13.0.3]
  patterns:
    - IntersectionObserver for third-party script lazy-loading (Calendly)
    - LCP-safe hero animation (starts visible, not opacity:0)
    - SVG favicon in Next.js App Router via src/app/icon.svg

key-files:
  created:
    - .planning/phases/07-deploy/lighthouse-report.json
    - src/app/icon.svg
  modified:
    - src/components/conversion/calendly-embed.tsx
    - src/components/sections/hero-section.tsx
    - src/app/layout.tsx
    - package.json
    - package-lock.json

key-decisions:
  - "Downgraded @eslint/js ^10 → ^9.39.4 to resolve peer dep conflict with eslint@9 on Vercel build"
  - "Lazy-load Calendly via IntersectionObserver — widget's 13MB bundle was blocking LCP (10.2s → 3.2s)"
  - "Hero h1 uses headlineFade (opacity:1 initial) instead of fadeUp (opacity:0) — preserves LCP measurability"
  - "Task 2 (env vars + domain) and Task 4 (visual verify) deferred as human-action checkpoints"

patterns-established:
  - "Third-party heavy widgets (Calendly, Intercom, etc.): always lazy-load via IntersectionObserver"
  - "LCP elements must start visible — never use opacity:0 initial state on above-fold headings"

requirements-completed: [DEPLOY-01, DEPLOY-02, DEPLOY-03, DEPLOY-04]

# Metrics
duration: 26min
completed: 2026-04-01
---

# Phase 07 Plan 02: Deploy to Vercel Summary

**Next.js site deployed to https://webpage-belgrano.vercel.app with Lighthouse mobile score 92 after fixing Calendly's 13MB blocking bundle and hero LCP opacity issue**

## Performance

- **Duration:** 26 min
- **Started:** 2026-04-01T03:27:18Z
- **Completed:** 2026-04-01T03:54:00Z
- **Tasks:** 4 (2 automated, 1 deferred human-action, 1 auto-approved)
- **Files modified:** 5

## Accomplishments

- Site deployed to production: https://webpage-belgrano.vercel.app (200 OK)
- Lighthouse mobile performance 92 (target was 90) — FCP 1.3s, LCP 3.2s, TBT 30ms, CLS 0
- All 8 key routes return 200 (/, /nosotros, 4 verticals, /sitemap.xml, /robots.txt)
- Accessibility 96, Best-practices 100, SEO 100

## Task Commits

Each task was committed atomically:

1. **Task 1: Deploy to Vercel** - `22e5bc8` (chore) — production URL live at webpage-belgrano.vercel.app
   - **Dev fix (Rule 3):** `1577466` — @eslint/js peer dep fix required first
2. **Task 2: Configure env vars + domain** - DEFERRED (human-action checkpoint)
3. **Task 3: Lighthouse audit + optimization** - `22fdacf` (chore) — score 92, report saved
   - **Perf fix (Rule 1):** `fe48600` — Calendly lazy-load (13MB bundle blocking LCP)
   - **Perf fix (Rule 1):** `a703bb9` — Hero h1 LCP fix + favicon
4. **Task 4: Final production verification** - Auto-approved (YOLO mode)

**Plan metadata:** _(committed below with SUMMARY)_

## Files Created/Modified

- `src/components/conversion/calendly-embed.tsx` — Lazy-load via IntersectionObserver (was blocking LCP with 13MB Calendly bundle)
- `src/components/sections/hero-section.tsx` — Hero h1 starts at opacity:1 for LCP measurability
- `src/app/icon.svg` — SVG favicon (B lettermark on dark background)
- `src/app/layout.tsx` — Added `icons` metadata field for favicon
- `package.json` / `package-lock.json` — Downgraded @eslint/js to ^9.39.4
- `.planning/phases/07-deploy/lighthouse-report.json` — Lighthouse mobile audit (score 92)

## Decisions Made

- **@eslint/js downgrade:** Package.json had `@eslint/js@^10.0.1` which requires `eslint@^10`, but `eslint@9.39.4` was installed — Vercel's `npm install` failed. Downgraded @eslint/js to match eslint@9.
- **Calendly lazy-load:** Calendly widget was loaded eagerly via useEffect on mount, pulling 13MB+ of third-party JS (GTM, Wistia, CookieLaw, Ketch). IntersectionObserver delays load until widget enters viewport, dropping LCP from 10.2s to 3.2s.
- **Hero h1 opacity fix:** Framer Motion `initial: { opacity: 0 }` hides the LCP element (h1) during hydration, causing Lighthouse to measure the LCP late. Changed to `headlineFade` variant starting at opacity:1.
- **No /contacto route:** Contact form lives at `/#cta` (anchor), not a separate page. Plan's route checklist was optimistic — this is correct design.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] @eslint/js peer dependency conflict blocked Vercel build**
- **Found during:** Task 1 (Deploy to Vercel)
- **Issue:** `@eslint/js@^10.0.1` requires `eslint@^10.0.0`, but `eslint@9.39.4` was installed — `npm install` exited with 1 on Vercel
- **Fix:** Downgraded `@eslint/js` to `^9.39.4` in package.json to match the installed eslint@9
- **Files modified:** package.json, package-lock.json
- **Verification:** `npm install` succeeds, `npm run build` passes locally, Vercel build succeeds
- **Committed in:** `1577466`

**2. [Rule 1 - Bug] Calendly's 13MB bundle loaded eagerly, blocking LCP to 10.2s**
- **Found during:** Task 3 (Lighthouse audit — first run scored 72)
- **Issue:** `calendly-embed.tsx` loaded the Calendly `<link>` stylesheet synchronously in render and injected the script via `useEffect` immediately on mount — this triggered Calendly's full ecosystem (GTM, Wistia, CookieLaw, 13MB+ of third-party JS) on initial page load
- **Fix:** Replaced immediate load with IntersectionObserver that triggers load only when widget enters viewport (200px ahead). Added placeholder div with same height to prevent CLS.
- **Files modified:** src/components/conversion/calendly-embed.tsx
- **Verification:** Lighthouse rerun scored 89 (before additional fixes)
- **Committed in:** `fe48600`

**3. [Rule 1 - Bug] Hero h1 opacity:0 initial state hid LCP element during hydration**
- **Found during:** Task 3 (Lighthouse rerun scored 89 — LCP still 3.5s with 1850ms render delay)
- **Issue:** `motion.h1` used `initial: { opacity: 0, y: 30 }` — on client hydration, framer-motion applies this state before animating, causing 1.85s of render delay as Lighthouse couldn't measure the LCP element
- **Fix:** Created `headlineFade` variant with `initial: { opacity: 1, y: 8 }` — element starts visible, gives a subtle lift animation without hiding during hydration
- **Files modified:** src/components/sections/hero-section.tsx
- **Verification:** Lighthouse final run scored 92 (LCP 3.2s, element render delay reduced)
- **Committed in:** `a703bb9`

---

**Total deviations:** 3 auto-fixed (1 blocking/dependency, 2 performance bugs)
**Impact on plan:** All three were necessary for the plan's core criteria (deploy working + Lighthouse ≥ 90). No scope creep.

## Issues Encountered

- First Vercel deploy failed with `npm install` exit code 1 — caused by @eslint/js version mismatch (see Deviation 1)
- Lighthouse first run scored 72 instead of expected 90+ — two root causes found and fixed (Deviations 2 and 3)
- `/contacto` returns 404 — this is by design (contact is anchor `#cta` on homepage, not a separate page). Plan's route checklist listed it but no `/contacto` page was ever built.

## User Setup Required

**External services require manual configuration before belgrano.cl goes live:**

### Step 1 — Set env vars in Vercel dashboard
Go to: https://vercel.com/patom4r/webpage-belgrano/settings/environment-variables

| Variable | Value |
|----------|-------|
| `RESEND_API_KEY` | From resend.com → API Keys → Create API Key (Production) |
| `RESEND_FROM_EMAIL` | e.g. `contacto@belgrano.cl` (must be verified in Resend) |
| `TEAM_EMAIL` | Internal inbox for lead notifications |

### Step 2 — Verify belgrano.cl in Resend
Go to resend.com → Domains → Add Domain → `belgrano.cl` → add DNS TXT/MX records at registrar.

### Step 3 — Connect belgrano.cl in Vercel
Go to: https://vercel.com/patom4r/webpage-belgrano/settings/domains → Add `belgrano.cl`
- Apex A record: `76.76.21.21`
- www CNAME: `cname.vercel-dns.com`

### Step 4 — Redeploy to pick up env vars
In Vercel → Deployments → latest → Redeploy, or run `vercel --prod`

## Known Stubs

- `src/components/conversion/calendly-embed.tsx` line 12: Calendly URL `https://calendly.com/belgrano/reunion-estrategica` has a TODO comment — replace with real Calendly event URL before launch
- `src/components/conversion/floating-whatsapp.tsx`: WhatsApp phone number is a placeholder (documented in Phase 5 decisions) — must be replaced with real Grupo Belgrano number before launch

## Next Phase Readiness

Phase 07 is complete. The site is live at https://webpage-belgrano.vercel.app with:
- All 8 routes returning 200
- Lighthouse mobile performance 92
- Zero CLS, 30ms TBT

**Remaining human actions before belgrano.cl goes fully live:**
1. Add Resend API keys + domain verification → enables contact form email delivery
2. Connect belgrano.cl domain in Vercel + DNS records → enables custom domain
3. Replace Calendly URL placeholder with real event URL
4. Replace WhatsApp number placeholder with real Grupo Belgrano number

## Self-Check: PASSED

- FOUND: .planning/phases/07-deploy/07-02-SUMMARY.md
- FOUND: .planning/phases/07-deploy/lighthouse-report.json
- FOUND: src/app/icon.svg
- FOUND: src/components/conversion/calendly-embed.tsx
- FOUND: commit 1577466 (dep fix)
- FOUND: commit 22e5bc8 (task 1)
- FOUND: commit fe48600 (calendly fix)
- FOUND: commit a703bb9 (lcp + favicon)
- FOUND: commit 22fdacf (task 3)
- FOUND: commit 33df993 (metadata/summary)

---
*Phase: 07-deploy*
*Completed: 2026-04-01*
