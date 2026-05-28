'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import CartDrawer from '@/components/cart/CartDrawer'
import { useCartStore } from '@/store/cart'
import { useLocaleStore } from '@/store/locale'

const COUNTRIES = [
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
]

const SHIPPING_RATES: Record<string, number> = {
  NO: 0, SE: 0, FI: 0, DK: 0,
  DE: 25, GB: 35, NL: 25, FR: 30, TR: 45,
}

const FREE_SHIPPING_THRESHOLD = 500

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const { locale, t } = useLocaleStore()

  const [step, setStep] = useState<'address' | 'shipping' | 'payment' | 'success'>('address')
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', address: '', address2: '',
    city: '', zip: '', country: 'NO',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : (SHIPPING_RATES[form.country] ?? 35)
  const tax = subtotal * 0.25
  const total = subtotal + shippingCost + tax

  const updateForm = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  const validateAddress = () => {
    const newErrors: Record<string, string> = {}
    if (!form.firstName) newErrors.firstName = t('Required', 'Påkrevd')
    if (!form.lastName) newErrors.lastName = t('Required', 'Påkrevd')
    if (!form.email || !form.email.includes('@')) newErrors.email = t('Valid email required', 'Gyldig e-post påkrevd')
    if (!form.address) newErrors.address = t('Required', 'Påkrevd')
    if (!form.city) newErrors.city = t('Required', 'Påkrevd')
    if (!form.zip) newErrors.zip = t('Required', 'Påkrevd')
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (step === 'address' && validateAddress()) setStep('shipping')
    else if (step === 'shipping') setStep('payment')
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    setLoading(false)
    clearCart()
    setStep('success')
  }

  const inputStyle = (field: string) => ({
    width: '100%', padding: '12px 14px',
    fontFamily: 'var(--font-jost)', fontSize: '0.78rem', color: '#2c1e0a',
    background: '#fff',
    border: `1px solid ${errors[field] ? '#c0392b' : 'rgba(201,168,76,0.3)'}`,
    outline: 'none', transition: 'border 0.2s',
  })

  const labelStyle = {
    fontFamily: 'var(--font-jost)', fontSize: '0.6rem',
    letterSpacing: '0.2em', textTransform: 'uppercase' as const,
    color: '#6a5a40', marginBottom: 6, display: 'block',
  }

  if (items.length === 0 && step !== 'success') {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f0e8', paddingTop: 60 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', color: '#2c1e0a', marginBottom: 16 }}>
              {t('Your cart is empty', 'Handlekurven er tom')}
            </div>
            <a href="/" style={{ background: '#c9a84c', color: '#1a1208', padding: '14px 40px', fontFamily: 'var(--font-jost)', fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>
              {t('Continue Shopping', 'Fortsett å handle')}
            </a>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <CartDrawer />

      <div style={{ background: '#f5f0e8', minHeight: '100vh', paddingTop: 60 }}>

        {/* Header */}
        <div style={{ background: '#2a1e0e', padding: '28px 60px', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.4rem', letterSpacing: '0.4em', color: '#c9a84c', marginBottom: 20 }}>
            Deconor
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', gap: 0, alignItems: 'center' }}>
            {[
              { key: 'address', label: t('Address', 'Adresse'), n: '01' },
              { key: 'shipping', label: t('Shipping', 'Frakt'), n: '02' },
              { key: 'payment', label: t('Payment', 'Betaling'), n: '03' },
            ].map((s, i) => {
              const isActive = step === s.key
              const isDone = (step === 'shipping' && i === 0) || (step === 'payment' && i < 2) || step === 'success'
              return (
                <div key={s.key} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isDone ? '#c9a84c' : isActive ? 'rgba(201,168,76,0.2)' : 'transparent',
                      border: `1px solid ${isActive || isDone ? '#c9a84c' : 'rgba(201,168,76,0.3)'}`,
                      fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: isDone ? '#1a1208' : isActive ? '#c9a84c' : '#6a5a40',
                      fontWeight: isDone ? 700 : 400,
                    }}>
                      {isDone ? '✓' : s.n}
                    </div>
                    <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: isActive ? '#c9a84c' : isDone ? '#d4c4a0' : '#6a5a40' }}>
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.2)', margin: '0 16px' }} />}
                </div>
              )
            })}
          </div>
        </div>

        {/* SUCCESS */}
        {step === 'success' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 200px)', padding: '60px' }}>
            <div style={{ textAlign: 'center', maxWidth: 520 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(90,138,90,0.15)', border: '1px solid rgba(90,138,90,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: '2rem' }}>✓</div>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2.5rem', fontWeight: 300, color: '#2c1e0a', marginBottom: 16 }}>
                {t('Order Confirmed!', 'Bestilling bekreftet!')}
              </div>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.76rem', color: '#7a6a50', lineHeight: 2, marginBottom: 36 }}>
                {t(
                  `Thank you, ${form.firstName}! Your order has been confirmed. You will receive a confirmation email at ${form.email} shortly.`,
                  `Takk, ${form.firstName}! Bestillingen din er bekreftet. Du vil motta en bekreftelse på e-post til ${form.email} snart.`
                )}
              </div>
              <a href="/" style={{ background: '#c9a84c', color: '#1a1208', padding: '14px 40px', fontFamily: 'var(--font-jost)', fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>
                {t('Continue Shopping', 'Fortsett å handle')}
              </a>
            </div>
          </div>
        )}

        {/* MAIN LAYOUT */}
        {step !== 'success' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 0, maxWidth: '100%', minHeight: 'calc(100vh - 200px)' }}>

            {/* Sol — Form */}
            <div style={{ padding: '48px 56px', borderRight: '1px solid rgba(201,168,76,0.12)' }}>

              {/* ADDRESS STEP */}
              {step === 'address' && (
                <div>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', fontWeight: 300, color: '#2c1e0a', marginBottom: 32 }}>
                    {t('Shipping Address', 'Leveringsadresse')}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>{t('First Name', 'Fornavn')} *</label>
                      <input value={form.firstName} onChange={e => updateForm('firstName', e.target.value)} style={inputStyle('firstName')} placeholder="Erik" />
                      {errors.firstName && <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#c0392b', marginTop: 4 }}>{errors.firstName}</div>}
                    </div>
                    <div>
                      <label style={labelStyle}>{t('Last Name', 'Etternavn')} *</label>
                      <input value={form.lastName} onChange={e => updateForm('lastName', e.target.value)} style={inputStyle('lastName')} placeholder="Hansen" />
                      {errors.lastName && <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#c0392b', marginTop: 4 }}>{errors.lastName}</div>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>{t('Email', 'E-post')} *</label>
                      <input value={form.email} onChange={e => updateForm('email', e.target.value)} style={inputStyle('email')} placeholder="erik@example.com" type="email" />
                      {errors.email && <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#c0392b', marginTop: 4 }}>{errors.email}</div>}
                    </div>
                    <div>
                      <label style={labelStyle}>{t('Phone', 'Telefon')}</label>
                      <input value={form.phone} onChange={e => updateForm('phone', e.target.value)} style={inputStyle('phone')} placeholder="+47 123 45 678" />
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>{t('Company (optional)', 'Firma (valgfritt)')}</label>
                    <input value={form.company} onChange={e => updateForm('company', e.target.value)} style={inputStyle('company')} placeholder={t('Company name', 'Firmanavn')} />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>{t('Address', 'Adresse')} *</label>
                    <input value={form.address} onChange={e => updateForm('address', e.target.value)} style={inputStyle('address')} placeholder={t('Street address', 'Gateadresse')} />
                    {errors.address && <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#c0392b', marginTop: 4 }}>{errors.address}</div>}
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>{t('Address Line 2 (optional)', 'Adresselinje 2 (valgfritt)')}</label>
                    <input value={form.address2} onChange={e => updateForm('address2', e.target.value)} style={inputStyle('address2')} placeholder={t('Apartment, suite, etc.', 'Leilighet, suite, etc.')} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>{t('City', 'By')} *</label>
                      <input value={form.city} onChange={e => updateForm('city', e.target.value)} style={inputStyle('city')} placeholder="Oslo" />
                      {errors.city && <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#c0392b', marginTop: 4 }}>{errors.city}</div>}
                    </div>
                    <div>
                      <label style={labelStyle}>{t('Postal Code', 'Postnummer')} *</label>
                      <input value={form.zip} onChange={e => updateForm('zip', e.target.value)} style={inputStyle('zip')} placeholder="0150" />
                      {errors.zip && <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#c0392b', marginTop: 4 }}>{errors.zip}</div>}
                    </div>
                  </div>

                  <div style={{ marginBottom: 32 }}>
                    <label style={labelStyle}>{t('Country', 'Land')} *</label>
                    <select value={form.country} onChange={e => updateForm('country', e.target.value)} style={{ ...inputStyle('country'), cursor: 'pointer' }}>
                      {COUNTRIES.map(c => (
                        <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                      ))}
                    </select>
                  </div>

                  <button onClick={handleContinue} style={{ width: '100%', background: '#c9a84c', color: '#1a1208', border: 'none', padding: '16px', fontFamily: 'var(--font-jost)', fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }}>
                    {t('Continue to Shipping →', 'Fortsett til frakt →')}
                  </button>
                </div>
              )}

              {/* SHIPPING STEP */}
              {step === 'shipping' && (
                <div>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', fontWeight: 300, color: '#2c1e0a', marginBottom: 32 }}>
                    {t('Shipping Method', 'Fraktmetode')}
                  </div>

                  {[
                    { id: 'standard', label: t('Standard Delivery', 'Standard levering'), desc: t('5-7 business days', '5-7 virkedager'), price: shippingCost === 0 ? t('Free', 'Gratis') : `€${shippingCost}` },
                    { id: 'express', label: t('Express Delivery', 'Ekspresslevering'), desc: t('2-3 business days', '2-3 virkedager'), price: `€${(shippingCost + 25).toFixed(0)}` },
                    { id: 'premium', label: t('Premium White Glove', 'Premium White Glove'), desc: t('1-2 business days + installation', '1-2 virkedager + montering'), price: `€${(shippingCost + 75).toFixed(0)}` },
                  ].map((opt, i) => (
                    <div key={opt.id} style={{ border: `1px solid ${i === 0 ? '#c9a84c' : 'rgba(201,168,76,0.2)'}`, padding: '20px 24px', marginBottom: 12, background: i === 0 ? 'rgba(201,168,76,0.05)' : '#fff', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${i === 0 ? '#c9a84c' : 'rgba(201,168,76,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {i === 0 && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c9a84c' }} />}
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.75rem', color: '#2c1e0a', fontWeight: i === 0 ? 500 : 300 }}>{opt.label}</div>
                          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', color: '#8a7a60', marginTop: 3 }}>{opt.desc}</div>
                        </div>
                      </div>
                      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', color: i === 0 ? '#c9a84c' : '#6a5a40' }}>{opt.price}</div>
                    </div>
                  ))}

                  <div style={{ height: 1, background: 'rgba(201,168,76,0.15)', margin: '28px 0' }} />

                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => setStep('address')} style={{ padding: '14px 28px', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#6a5a40', fontFamily: 'var(--font-jost)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
                      ← {t('Back', 'Tilbake')}
                    </button>
                    <button onClick={handleContinue} style={{ flex: 1, background: '#c9a84c', color: '#1a1208', border: 'none', padding: '14px', fontFamily: 'var(--font-jost)', fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>
                      {t('Continue to Payment →', 'Fortsett til betaling →')}
                    </button>
                  </div>
                </div>
              )}

              {/* PAYMENT STEP */}
              {step === 'payment' && (
                <div>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', fontWeight: 300, color: '#2c1e0a', marginBottom: 8 }}>
                    {t('Payment', 'Betaling')}
                  </div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#8a7a60', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 8 }}>
                    🔒 {t('Secured by Stripe — 256-bit SSL encryption', 'Sikret av Stripe — 256-bit SSL-kryptering')}
                  </div>

                  {/* Ödeme yöntemleri */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 28 }}>
                    {[
                      { id: 'card', label: t('Card', 'Kort'), icon: '💳' },
                      { id: 'klarna', label: 'Klarna', icon: '⚡' },
                      { id: 'vipps', label: 'Vipps', icon: '📱' },
                    ].map((m, i) => (
                      <div key={m.id} style={{ border: `1px solid ${i === 0 ? '#c9a84c' : 'rgba(201,168,76,0.2)'}`, padding: '14px', textAlign: 'center', cursor: 'pointer', background: i === 0 ? 'rgba(201,168,76,0.05)' : '#fff' }}>
                        <div style={{ fontSize: '1.3rem', marginBottom: 4 }}>{m.icon}</div>
                        <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', color: i === 0 ? '#c9a84c' : '#6a5a40' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Kart formu */}
                  <div style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.2)', padding: '28px', marginBottom: 24 }}>
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>{t('Card Number', 'Kortnummer')}</label>
                      <input style={inputStyle('')} placeholder="4242 4242 4242 4242" maxLength={19} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label style={labelStyle}>{t('Expiry', 'Utløp')}</label>
                        <input style={inputStyle('')} placeholder="MM / YY" maxLength={7} />
                      </div>
                      <div>
                        <label style={labelStyle}>CVV</label>
                        <input style={inputStyle('')} placeholder="123" maxLength={4} type="password" />
                      </div>
                    </div>
                  </div>

                  {/* Güvenlik ikonları */}
                  <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
                    {['🔒 SSL', 'Stripe', 'PCI DSS', 'Visa', 'Mastercard'].map(badge => (
                      <div key={badge} style={{ background: '#f0ebe0', border: '1px solid rgba(201,168,76,0.2)', padding: '4px 12px', fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#6a5a40' }}>
                        {badge}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => setStep('shipping')} style={{ padding: '14px 28px', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#6a5a40', fontFamily: 'var(--font-jost)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
                      ← {t('Back', 'Tilbake')}
                    </button>
                    <button onClick={handlePlaceOrder} disabled={loading} style={{ flex: 1, background: loading ? '#8a7a50' : '#c9a84c', color: '#1a1208', border: 'none', padding: '14px', fontFamily: 'var(--font-jost)', fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s' }}>
                      {loading ? t('Processing...', 'Behandler...') : `${t('Place Order', 'Legg inn bestilling')} — €${total.toFixed(0)}`}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sağ — Sipariş özeti */}
            <div style={{ padding: '48px 40px', background: '#f0ebe0', borderLeft: '1px solid rgba(201,168,76,0.12)' }}>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.4rem', fontWeight: 300, color: '#2c1e0a', marginBottom: 24 }}>
                {t('Order Summary', 'Bestillingssammendrag')}
              </div>

              {/* Ürünler */}
              <div style={{ marginBottom: 24 }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: 14, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                    <div style={{ width: 56, height: 56, flexShrink: 0, background: 'linear-gradient(160deg,#4a3218,#6a4a28)', border: '1px solid rgba(201,168,76,0.2)', position: 'relative', overflow: 'hidden' }}>
                      {item.color && <div style={{ position: 'absolute', inset: 0, background: item.color.hex, opacity: 0.5 }} />}
                      <div style={{ position: 'absolute', top: 4, right: 4, background: '#c9a84c', color: '#1a1208', width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 700 }}>
                        {item.quantity}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem', color: '#2c1e0a', marginBottom: 3 }}>{item.product.name}</div>
                      {item.color && <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#8a7a60' }}>{item.color.name}</div>}
                      <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#8a7a60' }}>{item.quantity} m²</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', color: '#c9a84c' }}>
                      €{(item.product.price * item.quantity).toFixed(0)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Özet */}
              <div style={{ borderTop: '1px solid rgba(201,168,76,0.2)', paddingTop: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.7rem', color: '#8a7a60' }}>{t('Subtotal', 'Delsum')}</span>
                  <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', color: '#2c1e0a' }}>€{subtotal.toFixed(0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.7rem', color: '#8a7a60' }}>{t('Shipping', 'Frakt')}</span>
                  <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', color: shippingCost === 0 ? '#5a8a5a' : '#2c1e0a' }}>
                    {shippingCost === 0 ? t('Free', 'Gratis') : `€${shippingCost}`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.7rem', color: '#8a7a60' }}>VAT (25%)</span>
                  <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', color: '#2c1e0a' }}>€{tax.toFixed(0)}</span>
                </div>
                <div style={{ height: 1, background: 'rgba(201,168,76,0.2)', marginBottom: 16 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.75rem', fontWeight: 500, color: '#2c1e0a' }}>{t('Total', 'Total')}</span>
                  <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: '#c9a84c' }}>€{total.toFixed(0)}</span>
                </div>
              </div>

              {/* Güvenlik notu */}
              <div style={{ marginTop: 28, padding: '14px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)' }}>
                <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', color: '#6a5a40', lineHeight: 1.9 }}>
                  🔒 {t('Your payment information is encrypted and secure. We never store your card details.', 'Betalingsinformasjonen din er kryptert og sikker. Vi lagrer aldri kortopplysningene dine.')}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}