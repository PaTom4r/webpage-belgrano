// src/emails/team-notification.tsx
// Belgrano team inbox notification email — sent when a new contact form is submitted.
// Stub created in Task 1, fully implemented in Task 2.

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Preview,
} from '@react-email/components'

interface TeamNotificationEmailProps {
  name: string
  email: string
  company: string
  message: string
}

export default function TeamNotificationEmail({
  name,
  email,
  company,
  message,
}: TeamNotificationEmailProps) {
  return (
    <Html lang="es">
      <Head />
      <Preview>Nuevo contacto de {company}</Preview>
      <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Geist, Inter, sans-serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto' }}>
          {/* Header */}
          <Section style={{ backgroundColor: '#09090B', padding: '24px 32px', borderRadius: '8px 8px 0 0' }}>
            <Text style={{ color: '#ffffff', fontWeight: '900', fontSize: '20px', margin: '0', textTransform: 'uppercase' as const, letterSpacing: '-0.05em' }}>
              Belgrano
            </Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: '32px', border: '1px solid #e5e7eb', borderTop: 'none', borderRadius: '0 0 8px 8px' }}>
            <Text style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginTop: '0' }}>
              Nuevo contacto recibido
            </Text>

            <Hr style={{ borderColor: '#e5e7eb', margin: '16px 0' }} />

            <Text style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0' }}>
              <strong style={{ color: '#111827' }}>Nombre:</strong> {name}
            </Text>
            <Text style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0' }}>
              <strong style={{ color: '#111827' }}>Email:</strong> {email}
            </Text>
            <Text style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0' }}>
              <strong style={{ color: '#111827' }}>Empresa:</strong> {company}
            </Text>

            <Hr style={{ borderColor: '#e5e7eb', margin: '16px 0' }} />

            <Text style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0 8px' }}>
              <strong style={{ color: '#111827' }}>Mensaje:</strong>
            </Text>
            <Text
              style={{
                fontSize: '14px',
                color: '#111827',
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '6px',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                margin: '0',
              }}
            >
              {message}
            </Text>

            <Hr style={{ borderColor: '#e5e7eb', margin: '24px 0 16px' }} />

            <Text style={{ fontSize: '12px', color: '#9CA3AF', margin: '0' }}>
              Belgrano — <a href="https://belgrano.cl" style={{ color: '#6B7280' }}>belgrano.cl</a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export { TeamNotificationEmail }
