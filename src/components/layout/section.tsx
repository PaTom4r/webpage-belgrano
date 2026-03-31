import { Container } from './container'

// Section wrapper with light and dark variants.
// dark=true: bg-dark text-bg (dark section for contrast, e.g. Hero, CTA)
// dark=false: bg-bg text-text (default white section)
// bg-bg-section: #f9fafb alternate for visual separation without going full dark
export function Section({
  children,
  className = '',
  dark = false,
  id,
}: {
  children: React.ReactNode
  className?: string
  dark?: boolean
  id?: string
}) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 lg:py-24 ${
        dark ? 'bg-dark text-bg' : 'bg-bg text-text'
      } ${className}`}
    >
      <Container>{children}</Container>
    </section>
  )
}
