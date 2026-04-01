---
phase: 05-contact-conversion
plan: 01
subsystem: email
tags: [resend, react-email, server-action, rate-limiting, honeypot, zod, contact-form]

# Dependency graph
requires:
  - phase: 02-landing-page
    provides: ContactForm component UI shell with react-hook-form + zod resolver
provides:
  - submitContact Server Action with Zod validation, IP rate limiting (5/hr), Resend email delivery
  - checkRateLimit in-memory rate limiter module
  - TeamNotificationEmail react-email template (branded dark header, lead data)
  - LeadConfirmationEmail react-email template (branded dark header, 24h response promise)
  - ContactForm wired to real Server Action with success/error states and honeypot protection
affects: [06-seo-polish, 07-deploy]

# Tech tracking
tech-stack:
  added: [resend@6.10.0, react-email@5.2.10, @react-email/components]
  patterns:
    - Server Action pattern: 'use server' file in src/app/actions/, called directly from Client Component
    - react-email template pattern: default export + named export for dual import flexibility
    - In-memory rate limiter: Map<ip, {count, resetAt}> — acceptable for agency contact form volume

key-files:
  created:
    - src/app/actions/contact.ts
    - src/lib/rate-limiter.ts
    - src/emails/team-notification.tsx
    - src/emails/lead-confirmation.tsx
  modified:
    - src/lib/schemas/contact.ts
    - src/components/forms/contact-form.tsx
    - package.json

key-decisions:
  - "In-memory rate limiter chosen over Upstash Redis — resets on redeploy, acceptable for low-volume agency contact form"
  - "Email templates created with both default and named exports — Server Action uses default, named export available for future react-email dev server"
  - "honeypot field uses absolute positioning off-screen (-left-[9999px]) rather than display:none — more bot-resistant"
  - "Both emails sent in parallel via Promise.all — reduces total latency"

patterns-established:
  - "Server Action in src/app/actions/: 'use server' directive, typed return { success: boolean; error?: string }"
  - "react-email templates in src/emails/: functional components with inline styles for email client compatibility"

requirements-completed: [CONV-01, CONV-02, CONV-03, CONV-06, CONV-07]

# Metrics
duration: 18min
completed: 2026-04-01
---

# Phase 05 Plan 01: Contact Conversion Summary

**Resend email delivery wired to contact form via Server Action with in-memory rate limiting (5/hr), honeypot bot protection, and two branded react-email templates**

## Performance

- **Duration:** ~18 min
- **Started:** 2026-04-01T02:01:00Z
- **Completed:** 2026-04-01T02:19:00Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Contact form now delivers real emails — team gets a branded HTML notification, lead gets a confirmation
- IP-based rate limiting (5 req/hr) prevents spam without external infrastructure
- Honeypot field silently rejects bot submissions before any email is sent
- Build passes TypeScript clean — zero errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Install packages, rate limiter, extend schema, create Server Action** - `6216cb5` (feat)
2. **Task 2: Create email templates and wire form to Server Action** - `56f3c44` (feat)

## Files Created/Modified
- `src/app/actions/contact.ts` - Server Action: validates, rate-limits, sends two emails via Resend
- `src/lib/rate-limiter.ts` - In-memory Map rate limiter: 5 req/hr per IP
- `src/emails/team-notification.tsx` - Belgrano-branded team notification email (dark header, lead data rows)
- `src/emails/lead-confirmation.tsx` - Belgrano-branded lead confirmation email (dark header, 24h promise)
- `src/lib/schemas/contact.ts` - Extended with optional honeypot field
- `src/components/forms/contact-form.tsx` - Wired to submitContact, added error state + honeypot input
- `package.json` - Added resend, react-email, @react-email/components

## Decisions Made
- Used in-memory rate limiter instead of Upstash Redis — the form is low-volume and resets on redeploy are acceptable. Saves $0/month and zero infra to manage.
- Both email sends use Promise.all — reduces p99 latency vs sequential awaits.
- Email templates use both default and named exports for maximum import flexibility (default for Server Action, named for potential react-email dev preview server).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] npm install required --legacy-peer-deps**
- **Found during:** Task 1 (package installation)
- **Issue:** Peer dependency conflict between @eslint/js@10.0.1 and eslint@9.39.4. npm refused to install without the flag.
- **Fix:** Used `npm install resend react-email @react-email/components --legacy-peer-deps`
- **Files modified:** package.json, package-lock.json
- **Verification:** Packages installed, build passes cleanly
- **Committed in:** 6216cb5 (Task 1 commit)

**2. [Rule 2 - Missing Critical] Email templates created in Task 1 (not just stubs)**
- **Found during:** Task 1 — the Server Action imports the templates, so they must exist at build time
- **Issue:** Plan created them as "stubs for now" in Task 1 and "fully implemented in Task 2". However, since the Server Action imports them, a real stub (not a broken import) is required. I created fully implemented templates in Task 1 to avoid a non-building intermediate state.
- **Fix:** Created full branded email templates as part of Task 1 commit, then Task 2 only needed to update the contact form
- **Files modified:** src/emails/team-notification.tsx, src/emails/lead-confirmation.tsx
- **Verification:** Build passes at end of Task 1 with templates implemented
- **Committed in:** 6216cb5 (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 missing critical)
**Impact on plan:** Both auto-fixes necessary for correctness. No scope creep.

## Issues Encountered
- None beyond the npm peer deps conflict documented above.

## User Setup Required

**RESEND_API_KEY must be configured before emails will deliver.** The `.env.local` currently contains a placeholder value `re_placeholder_replace_in_phase7`.

To enable real email delivery before Phase 7:
1. Create a Resend account at resend.com
2. Verify the `belgrano.cl` domain in the Resend dashboard
3. Generate an API key
4. Replace `re_placeholder_replace_in_phase7` in `.env.local` with the real key
5. Set `RESEND_FROM_EMAIL=contacto@belgrano.cl` and `TEAM_EMAIL=contacto@belgrano.cl`

In production (Vercel), add these as environment variables in the project settings.

**Current behavior with placeholder key:** The Server Action will catch the Resend error and return `{ success: false, error: 'Error al enviar...' }` — the form shows the error message.

## Next Phase Readiness
- Phase 05-02 (Calendly CTA button) can proceed independently — contact form email delivery is complete
- Phase 07 (deploy) will need the real RESEND_API_KEY added as a Vercel environment variable
- Rate limiter is in-memory — if high traffic is ever needed, replace checkRateLimit with Upstash Redis (Rule 4 architectural change)

---
*Phase: 05-contact-conversion*
*Completed: 2026-04-01*
