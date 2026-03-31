// Responsive max-width wrapper used by every page section.
// Tailwind breakpoints: px-4 (mobile) → sm:px-6 → lg:px-8
// Max width: 7xl (1280px) — suits the whitespace-heavy B2B design
export function Container({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
