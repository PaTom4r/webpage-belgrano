// src/components/layout/navbar.tsx
// Sticky navbar that hides while the editorial hero owns the screen.
// Uses IntersectionObserver on #hero — when >50% visible, navbar fades out.
// Once scrolled past, transitions to glass mode (bg-white/80 + backdrop-blur).
// Logo "Belgrano" visible only after hero (heroInView controls visibility of the whole navbar).
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { navLinks } from '@/lib/content/site'
import { MobileMenu } from './mobile-menu'

function MagneticCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / rect.width
    const dy = (e.clientY - cy) / rect.height
    setPos({ x: dx * 12, y: dy * 12 })
  }, [])

  const onMouseLeave = useCallback(() => setPos({ x: 0, y: 0 }), [])

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <Link
          href="/#cta"
          className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
        >
          Hablemos
        </Link>
      </motion.div>
    </div>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [heroInView, setHeroInView] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  // Glass effect after small scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Hide navbar while hero is dominating the viewport
  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) {
      setHeroInView(false)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.intersectionRatio > 0.5),
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const hidden = heroInView

  return (
    <header
      aria-hidden={hidden}
      className={`fixed top-0 z-50 h-16 w-full transition-all duration-500 ${
        scrolled && !hidden
          ? 'border-b border-border bg-white/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      } ${hidden ? '-translate-y-5 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'}`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand logo — only visible after hero (whole navbar is hidden during hero via heroInView) */}
        <Link
          href="/"
          className="text-2xl font-black uppercase tracking-tighter text-accent transition-opacity hover:opacity-80"
        >
          Belgrano
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <MagneticCTA />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-text transition-colors hover:bg-bg-section md:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path
                d="M4 4L16 16M16 4L4 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu overlay */}
      <MobileMenu
        isOpen={menuOpen}
        links={navLinks}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  )
}
