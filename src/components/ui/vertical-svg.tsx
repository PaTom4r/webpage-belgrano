// src/components/ui/vertical-svg.tsx
// Three custom SVG illustrations — one per vertical.
// Use `currentColor` so they pick up the accent of the parent card via `style={{ color: accent }}`.
// Decorative — aria-hidden.
'use client'

interface SvgProps {
  className?: string
}

/** Intelligence — stylised neural net with pulsing nodes. */
export function IntelligenceSvg({ className = 'h-16 w-16' }: SvgProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className={className}
    >
      {/* Connections */}
      <g opacity="0.45">
        <line x1="20" y1="25" x2="50" y2="50" />
        <line x1="20" y1="50" x2="50" y2="50" />
        <line x1="20" y1="75" x2="50" y2="50" />
        <line x1="50" y1="50" x2="80" y2="25" />
        <line x1="50" y1="50" x2="80" y2="50" />
        <line x1="50" y1="50" x2="80" y2="75" />
      </g>
      {/* Input nodes */}
      <circle cx="20" cy="25" r="3.5" fill="currentColor" opacity="0.6">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="20" cy="50" r="3.5" fill="currentColor" opacity="0.6">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" begin="0.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="20" cy="75" r="3.5" fill="currentColor" opacity="0.6">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
      </circle>
      {/* Hidden node */}
      <circle cx="50" cy="50" r="6" fill="currentColor">
        <animate attributeName="r" values="5;7;5" dur="2.4s" repeatCount="indefinite" />
      </circle>
      {/* Output nodes */}
      <circle cx="80" cy="25" r="3.5" fill="currentColor" opacity="0.6">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="50" r="3.5" fill="currentColor" opacity="0.6">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" begin="1.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="75" r="3.5" fill="currentColor" opacity="0.6">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" begin="2.0s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

/** Media — concentric waves radiating outward. */
export function MediaSvg({ className = 'h-16 w-16' }: SvgProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className={className}
    >
      {/* Source dot */}
      <circle cx="50" cy="50" r="4" fill="currentColor" />
      {/* Waves */}
      <circle cx="50" cy="50" r="14" opacity="0.7">
        <animate attributeName="r" values="10;14;10" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.85;0.4;0.85" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="50" r="24" opacity="0.5">
        <animate attributeName="r" values="20;26;20" dur="3s" begin="0.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0.25;0.6" dur="3s" begin="0.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="50" r="34" opacity="0.35">
        <animate attributeName="r" values="30;38;30" dur="3s" begin="0.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.15;0.4" dur="3s" begin="0.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="50" r="44" opacity="0.2">
        <animate attributeName="r" values="40;48;40" dur="3s" begin="1.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.25;0.08;0.25" dur="3s" begin="1.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

/** Brand — retail stand structure + audience figures. */
export function BrandSvg({ className = 'h-16 w-16' }: SvgProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className={className}
    >
      {/* Stand frame */}
      <rect x="28" y="18" width="44" height="32" rx="2" />
      {/* Stand screen content */}
      <line x1="36" y1="28" x2="58" y2="28" strokeWidth="2.5" />
      <line x1="36" y1="36" x2="50" y2="36" opacity="0.55" />
      <line x1="36" y1="42" x2="56" y2="42" opacity="0.55" />
      {/* Stand base */}
      <rect x="22" y="50" width="56" height="3" rx="1" fill="currentColor" />
      <line x1="35" y1="53" x2="35" y2="60" />
      <line x1="65" y1="53" x2="65" y2="60" />
      {/* Audience figures (head + body) */}
      <g fill="currentColor">
        <circle cx="22" cy="72" r="3" opacity="0.7">
          <animate attributeName="opacity" values="0.5;0.95;0.5" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <rect x="19" y="77" width="6" height="11" rx="1.5" opacity="0.7" />

        <circle cx="38" cy="70" r="3.5" opacity="0.85">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2.6s" begin="0.3s" repeatCount="indefinite" />
        </circle>
        <rect x="34.5" y="76" width="7" height="13" rx="1.5" opacity="0.85" />

        <circle cx="54" cy="70" r="3.5" opacity="0.85">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2.6s" begin="0.6s" repeatCount="indefinite" />
        </circle>
        <rect x="50.5" y="76" width="7" height="13" rx="1.5" opacity="0.85" />

        <circle cx="70" cy="70" r="3.5" opacity="0.85">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2.6s" begin="0.9s" repeatCount="indefinite" />
        </circle>
        <rect x="66.5" y="76" width="7" height="13" rx="1.5" opacity="0.85" />

        <circle cx="84" cy="72" r="3" opacity="0.7">
          <animate attributeName="opacity" values="0.5;0.95;0.5" dur="2.6s" begin="1.2s" repeatCount="indefinite" />
        </circle>
        <rect x="81" y="77" width="6" height="11" rx="1.5" opacity="0.7" />
      </g>
    </svg>
  )
}

/** Resolves the SVG by vertical slug. */
export function VerticalSvg({ slug, className }: { slug: string; className?: string }) {
  switch (slug) {
    case 'intelligence': return <IntelligenceSvg className={className} />
    case 'media':        return <MediaSvg className={className} />
    case 'brand':        return <BrandSvg className={className} />
    default:             return null
  }
}
