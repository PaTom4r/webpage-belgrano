// src/lib/schemas/contact.ts
// Zod schema for the contact form.
// Phase 2: used by react-hook-form resolver (client-side validation only).
// Phase 5: reused by Server Action for server-side validation before Resend.

import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'El nombre es demasiado largo'),
  email: z
    .string()
    .email('Ingresa un email válido'),
  company: z
    .string()
    .min(2, 'El nombre de la empresa debe tener al menos 2 caracteres')
    .max(100, 'El nombre de la empresa es demasiado largo'),
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje es demasiado largo (máximo 2000 caracteres)'),
})

export type ContactFormData = z.infer<typeof contactSchema>
