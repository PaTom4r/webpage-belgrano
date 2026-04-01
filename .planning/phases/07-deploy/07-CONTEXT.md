# Phase 7: Deploy - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning
**Mode:** Auto-generated (infrastructure phase — discuss skipped)

<domain>
## Phase Boundary

Deploy the site to Vercel, connect belgrano.cl domain, configure environment variables (RESEND_API_KEY), and verify Lighthouse mobile score >= 90.

Requirements: DEPLOY-01 through DEPLOY-04.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices at Claude's discretion:
- Create GitHub repo and push code
- Deploy to Vercel via CLI or GitHub integration
- Connect belgrano.cl custom domain
- Set RESEND_API_KEY in Vercel env vars
- Run Lighthouse audit and optimize if needed
- Performance optimizations: image optimization, bundle analysis, lazy loading

Note: This phase requires real credentials and domain DNS access that Pato will need to provide. The plan should prepare everything that can be done locally and document what needs manual action.

</decisions>

<code_context>
## Existing Code Insights

### Already Configured
- metadataBase: https://belgrano.cl
- next.config.ts with AVIF/WebP image formats
- @vercel/analytics already in layout.tsx
- sharp installed for image processing
- All pages statically generated (SSG)

### Integration Points
- .env.local has RESEND_API_KEY placeholder
- WhatsApp number placeholder in floating-whatsapp.tsx
- Calendly URL placeholder in calendly-embed.tsx

</code_context>

<specifics>
## Specific Ideas

Focus on what can be automated:
- GitHub repo creation via gh CLI
- Vercel project creation via vercel CLI
- Performance audit via Lighthouse CLI
- Document manual steps clearly

</specifics>

<deferred>
## Deferred Ideas

None.

</deferred>
