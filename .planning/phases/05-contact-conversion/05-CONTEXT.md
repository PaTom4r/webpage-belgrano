# Phase 5: Contact & Conversion - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Wire the contact form to actually send emails via Resend Server Action. Add Calendly embed for direct booking. Add floating WhatsApp CTA. Implement rate limiting (honeypot + IP-based). Form success/error states.

Requirements: CONV-01 through CONV-07.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices at Claude's discretion:
- Server Action with Zod validation (reuse existing contactSchema from Phase 2)
- Resend email delivery (branded HTML templates for lead confirmation + team notification)
- Calendly embed alongside contact form (dual conversion path)
- Floating WhatsApp button on all pages (pre-filled chat link)
- Rate limiting: honeypot hidden field + simple in-memory IP rate limit
- Form success/error states with clear user feedback
- Email: contacto@belgrano.cl

Key constraints:
- RESEND_API_KEY needed in env vars (will be set in Phase 7 deploy)
- Calendly account URL needed (use placeholder if unknown)
- WhatsApp Business number needed (use placeholder if unknown)
- react-email for branded templates (already in CLAUDE.md stack)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- src/components/forms/contact-form.tsx — RHF + Zod form (UI shell from Phase 2, needs Server Action wiring)
- src/lib/schemas/contact.ts — Zod contactSchema + ContactFormData type
- src/components/sections/cta-section.tsx — CTA section layout (hosts the form)

### Established Patterns
- Server Components by default
- "use client" only for interactive components
- Server Actions in app/actions/ or co-located

### Integration Points
- contact-form.tsx needs Server Action binding
- CTA section on landing + vertical pages already renders the form
- WhatsApp button goes in layout.tsx (global)
- Calendly embed alongside form in CTA section

</code_context>

<specifics>
## Specific Ideas

- Use react-email for branded HTML email templates
- Two email templates: lead confirmation + team notification
- Rate limit: 5 submissions per IP per hour (in-memory Map, resets on deploy)

</specifics>

<deferred>
## Deferred Ideas

None.

</deferred>
