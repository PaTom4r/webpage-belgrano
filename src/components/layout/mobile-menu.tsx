// src/components/layout/mobile-menu.tsx
// Mobile navigation overlay triggered by hamburger button in Navbar.
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import type { NavLink } from '@/lib/content/site'

interface MobileMenuProps {
  isOpen: boolean
  links: NavLink[]
  onClose: () => void
}

export function MobileMenu({ isOpen, links, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 top-16 w-full border-b border-border bg-white px-4 py-6 shadow-lg md:hidden"
        >
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-lg font-medium text-text hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#cta"
              onClick={onClose}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-80"
            >
              Hablemos
            </Link>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
