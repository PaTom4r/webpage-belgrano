// src/emails/lead-confirmation.tsx
// Confirmation email sent to the lead after submitting the contact form.
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

interface LeadConfirmationEmailProps {
  name: string
}

export default function LeadConfirmationEmail({ name }: LeadConfirmationEmailProps) {
  return (
    <Html lang="es">
      <Head />
      <Preview>Recibimos tu mensaje, {name}</Preview>
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
              Hola {name},
            </Text>

            <Text style={{ fontSize: '15px', color: '#374151', lineHeight: '1.6' }}>
              Recibimos tu mensaje y nos pondremos en contacto contigo en las próximas 24 horas.
            </Text>

            <Text style={{ fontSize: '15px', color: '#374151', lineHeight: '1.6' }}>
              En Belgrano ayudamos a empresas a crecer con medios tradicionales, inteligencia artificial aplicada y experiencias de marca para impulsar tu negocio.
            </Text>

            <Hr style={{ borderColor: '#e5e7eb', margin: '24px 0' }} />

            <Text style={{ fontSize: '14px', color: '#374151', margin: '0' }}>
              Saludos,
            </Text>
            <Text style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827', margin: '4px 0 0' }}>
              El equipo de Belgrano
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

export { LeadConfirmationEmail }
