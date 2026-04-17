'use client'
// StickyCtaMobile — botón flotante en mobile, aparece al hacer scroll > 600px.
import { useEffect, useState } from 'react'
import Link from 'next/link'

export function StickyCtaMobile() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 z-40 flex justify-center transition-all duration-300 lg:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <Link
        href="/#cta"
        className="inline-flex w-full max-w-md items-center justify-center rounded-full bg-text px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-opacity hover:opacity-90"
      >
        Hablemos
      </Link>
    </div>
  )
}
