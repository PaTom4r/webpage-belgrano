// src/components/ui/breadcrumb.tsx
// Simple breadcrumb for vertical detail pages.
// Server Component — static markup.
import Link from 'next/link'

interface BreadcrumbProps {
  verticalName: string
}

export function Breadcrumb({ verticalName }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm text-text-secondary">
        <li>
          <Link href="/" className="transition-opacity hover:opacity-60">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="text-border">/</li>
        <li>
          <Link href="/#what-we-do" className="transition-opacity hover:opacity-60">
            Servicios
          </Link>
        </li>
        <li aria-hidden="true" className="text-border">/</li>
        <li className="font-medium text-text" aria-current="page">
          {verticalName}
        </li>
      </ol>
    </nav>
  )
}
