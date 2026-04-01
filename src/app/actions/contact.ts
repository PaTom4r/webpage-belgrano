'use server'

// src/app/actions/contact.ts
// Server Action for contact form submission.
// Validates input, checks rate limit, sends two emails via Resend:
//   1. Team notification to TEAM_EMAIL
//   2. Lead confirmation to the submitter

import { Resend } from 'resend'
import { render } from '@react-email/components'
import { headers } from 'next/headers'
import { contactSchema, type ContactFormData } from '@/lib/schemas/contact'
import { checkRateLimit } from '@/lib/rate-limiter'
import TeamNotificationEmail from '@/emails/team-notification'
import LeadConfirmationEmail from '@/emails/lead-confirmation'

export async function submitContact(
  formData: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  // 1. Honeypot check — silently reject bots
  if (formData.honeypot && formData.honeypot.length > 0) {
    return { success: false, error: 'invalid' }
  }

  // 2. Server-side Zod validation
  const parsed = contactSchema.safeParse(formData)
  if (!parsed.success) {
    return { success: false, error: 'Datos inválidos. Por favor revisa el formulario.' }
  }

  // 3. IP rate limiting — 5 requests per hour per IP
  const headersList = await headers()
  const forwarded = headersList.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
  const { allowed } = checkRateLimit(ip)
  if (!allowed) {
    return { success: false, error: 'Demasiados intentos. Intenta de nuevo más tarde.' }
  }

  // 4. Send emails via Resend
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const [teamHtml, leadHtml] = await Promise.all([
      render(
        TeamNotificationEmail({
          name: parsed.data.name,
          email: parsed.data.email,
          company: parsed.data.company,
          message: parsed.data.message,
        })
      ),
      render(
        LeadConfirmationEmail({
          name: parsed.data.name,
        })
      ),
    ])

    await Promise.all([
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? 'contacto@belgrano.cl',
        to: process.env.TEAM_EMAIL ?? 'contacto@belgrano.cl',
        subject: `Nuevo contacto de ${parsed.data.company} — ${parsed.data.name}`,
        html: teamHtml,
        replyTo: parsed.data.email,
      }),
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? 'contacto@belgrano.cl',
        to: parsed.data.email,
        subject: 'Recibimos tu mensaje — Belgrano',
        html: leadHtml,
      }),
    ])
  } catch {
    return {
      success: false,
      error: 'Error al enviar. Por favor escríbenos a contacto@belgrano.cl',
    }
  }

  return { success: true }
}
