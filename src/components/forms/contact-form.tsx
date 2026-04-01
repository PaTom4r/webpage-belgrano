// src/components/forms/contact-form.tsx
// Contact form UI: react-hook-form v7 + zod validation.
// Phase 5: wired to submitContact Server Action with success/error states and honeypot.
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/schemas/contact'
import { submitContact } from '@/app/actions/contact'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setErrorMessage(null)
    const result = await submitContact(data)
    if (result.success) {
      setSubmitted(true)
    } else {
      setErrorMessage(result.error ?? 'Error inesperado. Intenta de nuevo.')
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <div className="mb-3 text-3xl" aria-hidden="true">&#10003;</div>
        <h3 className="text-lg font-bold text-bg">¡Mensaje recibido!</h3>
        <p className="mt-2 text-sm text-bg/70">
          Nos pondremos en contacto contigo en las próximas 24 horas.
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-bg/80">
            Nombre completo <span aria-hidden="true" className="text-bg/40">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            {...register('name')}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-bg placeholder:text-bg/30 focus:border-white/30 focus:outline-none focus:ring-0"
            placeholder="Nombre Apellido"
          />
          {errors.name && (
            <p role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-bg/80">
            Email <span aria-hidden="true" className="text-bg/40">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email')}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-bg placeholder:text-bg/30 focus:border-white/30 focus:outline-none focus:ring-0"
            placeholder="tu@empresa.cl"
          />
          {errors.email && (
            <p role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-bg/80">
            Empresa <span aria-hidden="true" className="text-bg/40">*</span>
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            {...register('company')}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-bg placeholder:text-bg/30 focus:border-white/30 focus:outline-none focus:ring-0"
            placeholder="Nombre de tu empresa"
          />
          {errors.company && (
            <p role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.company.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-bg/80">
            Mensaje <span aria-hidden="true" className="text-bg/40">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            {...register('message')}
            className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-bg placeholder:text-bg/30 focus:border-white/30 focus:outline-none focus:ring-0"
            placeholder="¿En qué podemos ayudarte?"
          />
          {errors.message && (
            <p role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Honeypot — hidden from users, traps bots */}
        <input
          type="text"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
          {...register('honeypot')}
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-white px-6 py-4 text-sm font-bold text-dark transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar mensaje \u2192'}
        </button>

        {errorMessage && (
          <p role="alert" className="mt-3 text-center text-sm text-red-400">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  )
}
