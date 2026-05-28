'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import CartDrawer from '@/components/cart/CartDrawer'
import { useLocaleStore } from '@/store/locale'

export default function ContactPage() {
  const { t } = useLocaleStore()
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSent(true)
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    fontFamily: 'var(--font-jost)', fontSize: '0.82rem', color: '#2c1e0a',
    background: '#fff', border: '1px solid rgba(201,168,76,0.3)',
    outline: 'none', transition: 'border 0.2s', borderRadius: '2px',
  }

  const labelStyle = {
    fontFamily: 'var(--font-jost)', fontSize: '0.6rem',
    letterSpacing: '0.2em', textTransform: 'uppercase' as const,
    color: '#6a5a40', marginBottom: 6, display: 'block',
  }

  return (
    <>
      <Navbar />
      <CartDrawer />

      <div style={{ background: '#f5f0e8', minHeight: '100vh', paddingTop: 60 }}>

        {/* Hero */}
        <div style={{ background: '#2a1e0e', padding: '80px 60px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(168deg,transparent 0,rgba(210,160,70,0.03) 2px,transparent 4px,transparent 40px)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 26, height: 1, background: '#c9a84c', display: 'block' }} />
              {t('Get In Touch', 'Ta Kontakt')}
            </div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, color: '#faf8f4', marginBottom: 16 }}>
              {t('Contact ', 'Kontakt ')}
              <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>Us</em>
            </div>
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.78rem', color: '#b0a080', lineHeight: 2, maxWidth: 500 }}>
              {t('Have a question about our products? Need help choosing the right material? Our team is here to help.', 'Har du spørsmål om produktene våre? Trenger du hjelp med å velge riktig materiale? Teamet vårt er her for å hjelpe.')}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 0 }}>

          {/* Sol — İletişim bilgileri */}
          <div style={{ padding: '60px', background: '#f0ebe0', borderRight: '1px solid rgba(201,168,76,0.12)' }}>

            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', fontWeight: 300, color: '#2c1e0a', marginBottom: 32 }}>
              {t('Our Offices', 'Kontorene Våre')}
            </div>

            {[
              {
                city: 'Oslo', country: t('Norway', 'Norge'), flag: '🇳🇴',
                address: 'Aker Brygge 1, 0150 Oslo',
                phone: '+47 22 12 34 56',
                email: 'oslo@deconor.com',
                hours: t('Mon–Fri 9:00–18:00', 'Man–Fre 9:00–18:00'),
              },
              {
                city: 'Stockholm', country: t('Sweden', 'Sverige'), flag: '🇸🇪',
                address: 'Strandvägen 7, 114 56 Stockholm',
                phone: '+46 8 12 34 56 78',
                email: 'stockholm@deconor.com',
                hours: t('Mon–Fri 9:00–18:00', 'Man–Fre 9:00–18:00'),
              },
            ].map((office, i) => (
              <div key={i} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: i === 0 ? '1px solid rgba(201,168,76,0.15)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: '1.5rem' }}>{office.flag}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.4rem', color: '#2c1e0a' }}>{office.city}</div>
                    <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase' }}>{office.country}</div>
                  </div>
                </div>
                {[
                  { icon: '📍', text: office.address },
                  { icon: '📞', text: office.phone },
                  { icon: '✉️', text: office.email },
                  { icon: '🕐', text: office.hours },
                ].map((item, j) => (
                  <div key={j} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                    <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.72rem', color: '#6a5a40', lineHeight: 1.8 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* Sosyal medya */}
            <div>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a5a40', marginBottom: 14 }}>
                {t('Follow Us', 'Følg Oss')}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Instagram', 'Facebook', 'LinkedIn', 'Pinterest'].map(s => (
                  <div key={s} style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.2)', padding: '6px 14px', fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#6a5a40', cursor: 'pointer' }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ — Form */}
          <div style={{ padding: '60px' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(90,138,90,0.12)', border: '1px solid rgba(90,138,90,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '1.8rem' }}>✓</div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', color: '#2c1e0a', marginBottom: 12 }}>
                  {t('Message Sent!', 'Melding Sendt!')}
                </div>
                <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.76rem', color: '#7a6a50', lineHeight: 2, marginBottom: 32 }}>
                  {t('Thank you for reaching out. We will get back to you within 24 hours.', 'Takk for at du tok kontakt. Vi vil svare deg innen 24 timer.')}
                </div>
                <button onClick={() => setSent(false)} style={{ background: '#c9a84c', color: '#1a1208', border: 'none', padding: '14px 40px', fontFamily: 'var(--font-jost)', fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer' }}>
                  {t('Send Another', 'Send En Til')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', fontWeight: 300, color: '#2c1e0a', marginBottom: 32 }}>
                  {t('Send Us a Message', 'Send Oss en Melding')}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>{t('Full Name', 'Fullt Navn')} *</label>
                    <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} placeholder="Erik Hansen" />
                  </div>
                  <div>
                    <label style={labelStyle}>{t('Email', 'E-post')} *</label>
                    <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} placeholder="erik@example.com" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>{t('Phone', 'Telefon')}</label>
                    <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle} placeholder="+47 123 45 678" />
                  </div>
                  <div>
                    <label style={labelStyle}>{t('Subject', 'Emne')} *</label>
                    <select required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="">{t('Select subject', 'Velg emne')}</option>
                      <option value="product">{t('Product Inquiry', 'Produktforespørsel')}</option>
                      <option value="sample">{t('Sample Request', 'Prøveforespørsel')}</option>
                      <option value="order">{t('Order Question', 'Bestillingsspørsmål')}</option>
                      <option value="other">{t('Other', 'Annet')}</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={labelStyle}>{t('Message', 'Melding')} *</label>
                  <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ ...inputStyle, height: 160, resize: 'vertical' as const }}
                    placeholder={t('Tell us about your project...', 'Fortell oss om prosjektet ditt...')}
                  />
                </div>

                <button type="submit" disabled={loading} style={{
                  width: '100%', background: loading ? '#8a7a50' : '#c9a84c', color: '#1a1208',
                  border: 'none', padding: '16px', fontFamily: 'var(--font-jost)',
                  fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase',
                  fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s',
                }}>
                  {loading ? t('Sending...', 'Sender...') : t('Send Message →', 'Send Melding →')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}