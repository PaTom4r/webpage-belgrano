// src/components/client-providers.tsx
// Thin client boundary for providers that need "use client".
// layout.tsx imports this to keep the root layout as a Server Component.
'use client'

import { MotionConfig } from 'framer-motion'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
