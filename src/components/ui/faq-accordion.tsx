// src/components/ui/faq-accordion.tsx
// Accessible expand/collapse FAQ list.
// "use client" — uses useState for open/close state.
// One item open at a time (accordion behavior).
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { FaqItem } from '@/lib/content/verticales'

interface FaqAccordionProps {
  items: FaqItem[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <dl className="divide-y divide-border">
      {items.map((item, index) => (
        <div key={index} className="py-5">
          <dt>
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-start justify-between text-left"
              aria-expanded={openIndex === index}
            >
              <span className="text-base font-semibold text-text">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className={`ml-6 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-border transition-transform duration-200 ${
                  openIndex === index ? 'rotate-45' : 'rotate-0'
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 1v10M1 6h10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
          </dt>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.dd
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <p className="pt-4 text-sm leading-relaxed text-text-secondary">
                  {item.answer}
                </p>
              </motion.dd>
            )}
          </AnimatePresence>
        </div>
      ))}
    </dl>
  )
}
