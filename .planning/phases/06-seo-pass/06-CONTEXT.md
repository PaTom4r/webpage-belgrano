# Phase 6: SEO Pass - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning
**Mode:** Auto-generated (infrastructure-adjacent phase)

<domain>
## Phase Boundary

Per-page metadata (title, description), Open Graph images, sitemap.xml, robots.txt, JSON-LD structured data (Organization + LocalBusiness). All pages must have unique SEO. Semantic HTML audit.

Requirements: SEO-01 through SEO-06.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All choices at Claude's discretion:
- Use Next.js built-in metadata API (generateMetadata, metadata export)
- Static OG images per page (PNG files in route directories)
- app/sitemap.ts for automatic sitemap.xml
- app/robots.ts for robots.txt
- JSON-LD Organization + LocalBusiness schema on homepage
- Service schema on vertical pages
- Semantic HTML: proper heading hierarchy, landmark elements
- metadataBase already set to https://belgrano.cl in layout.tsx

</decisions>

<code_context>
## Existing Code Insights

### Already Done
- metadataBase set in layout.tsx (Phase 1)
- /nosotros page has basic metadata
- /verticales/[slug] has generateMetadata with per-vertical titles
- Root layout has title template

### Integration Points
- Each page.tsx needs metadata export or generateMetadata
- OG images: opengraph-image.png per route or root-level default
- sitemap.ts and robots.ts go in app/ directory

</code_context>

<specifics>
## Specific Ideas

- belgrano.cl as canonical domain
- Spanish language meta tags
- Company: Grupo Belgrano, Santiago, Chile
- Contact: contacto@belgrano.cl

</specifics>

<deferred>
## Deferred Ideas

None.

</deferred>
