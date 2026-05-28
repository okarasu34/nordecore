'use client'
import { useState, useRef } from 'react'
import Navbar from '@/components/layout/Navbar'
import CartDrawer from '@/components/cart/CartDrawer'
import { useLocaleStore } from '@/store/locale'
import { useCartStore } from '@/store/cart'

const PRODUCTS = [
  { id: '1', name: 'Nordic Oak — Wide Plank', nameNo: 'Nordisk Eik — Bred Planke', slug: 'nordic-oak-wide-plank', price: 89, texture: 'wood', category: { name: 'Wood Cladding', nameNo: 'Trekledning', slug: 'wood-cladding', id: '1', order: 1 }, colors: [{ id: 'c1', name: 'Natural Oak', hex: '#8B6040' }], sizes: [], images: [], badge: 'Bestseller', stock: 100, featured: true, active: true, createdAt: '', description: '', descriptionNo: '' },
  { id: '2', name: 'Calacatta Gold — Slab', nameNo: 'Calacatta Gull — Plate', slug: 'calacatta-gold-slab', price: 124, texture: 'marble', category: { name: 'Marble Panels', nameNo: 'Marmorplater', slug: 'marble-panels', id: '2', order: 2 }, colors: [{ id: 'c2', name: 'White Gold', hex: '#D4C8B0' }], sizes: [], images: [], badge: 'New', stock: 50, featured: true, active: true, createdAt: '', description: '', descriptionNo: '' },
  { id: '3', name: 'Herringbone Oak — Classic', nameNo: 'Fiskebein Eik — Klassisk', slug: 'herringbone-oak-classic', price: 76, texture: 'herringbone', category: { name: 'Parquet', nameNo: 'Parkett', slug: 'parquet', id: '3', order: 3 }, colors: [{ id: 'c3', name: 'Honey', hex: '#6A4820' }], sizes: [], images: [], badge: 'Popular', stock: 75, featured: true, active: true, createdAt: '', description: '', descriptionNo: '' },
  { id: '4', name: 'Arctic Grey — LVT Click', nameNo: 'Arktisk Grå — LVT Klikk', slug: 'arctic-grey-lvt-click', price: 48, texture: 'vinyl', category: { name: 'Luxury Vinyl', nameNo: 'Luksusvinyl', slug: 'luxury-vinyl', id: '4', order: 4 }, colors: [{ id: 'c4', name: 'Arctic Grey', hex: '#8A9AA8' }], sizes: [], images: [], badge: null, stock: 200, featured: true, active: true, createdAt: '', description: '', descriptionNo: '' },
  { id: '5', name: 'Nero Marquina — Matte', nameNo: 'Nero Marquina — Matt', slug: 'nero-marquina-matte', price: 156, texture: 'blackmarble', category: { name: 'Marble Panels', nameNo: 'Marmorplater', slug: 'marble-panels', id: '2', order: 2 }, colors: [{ id: 'c5', name: 'Jet Black', hex: '#1a1a18' }], sizes: [], images: [], badge: 'Exclusive', stock: 30, featured: true, active: true, createdAt: '', description: '', descriptionNo: '' },
  { id: '6', name: 'American Walnut — Smoked', nameNo: 'Amerikansk Valnøtt — Røkt', slug: 'american-walnut-smoked', price: 112, texture: 'walnut', category: { name: 'Wood Cladding', nameNo: 'Trekledning', slug: 'wood-cladding', id: '1', order: 1 }, colors: [{ id: 'c6', name: 'Dark Smoke', hex: '#3A2010' }], sizes: [], images: [], badge: null, stock: 60, featured: false, active: true, createdAt: '', description: '', descriptionNo: '' },
] as any[]

const TEXTURE_BG: Record<string, string> = {
  wood:        'linear-gradient(160deg,#4a3218,#6a4a28,#3a2410)',
  marble:      'linear-gradient(135deg,#3a3835,#4a4540,#2e2c28)',
  herringbone: 'linear-gradient(160deg,#3e3018,#504028,#2e2210)',
  vinyl:       'linear-gradient(135deg,#2a2e3a,#323845,#222630)',
  blackmarble: 'linear-gradient(135deg,#1e1e1c,#2a2820,#161614)',
  walnut:      'linear-gradient(160deg,#2e2018,#3e2a18,#221408)',
}

export default function VisualizerPage() {
  const { t, locale } = useLocaleStore()
  const { addItem } = useCartStore()
  const fileRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState<'upload' | 'select' | 'processing' | 'result'>('upload')
  const [roomImage, setRoomImage] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [area, setArea] = useState<'floor' | 'wall' | 'both'>('floor')
  const [result, setResult] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      setRoomImage(reader.result as string)
      setStep('select')
    }
    reader.readAsDataURL(file)
  }

  const handleVisualize = async () => {
    if (!roomImage || !selectedProduct) return
    setStep('processing')
    await new Promise(r => setTimeout(r, 2500))
    setResult(roomImage)
    setStep('result')
  }

  const reset = () => {
    setStep('upload')
    setRoomImage(null)
    setSelectedProduct(null)
    setResult(null)
  }

  const STEPS = [
    { key: 'upload', n: '01', label: t('Upload Room', 'Last opp rom') },
    { key: 'select', n: '02', label: t('Select Product', 'Velg produkt') },
    { key: 'processing', n: '03', label: t('Processing', 'Behandler') },
    { key: 'result', n: '04', label: t('View Result', 'Se resultat') },
  ]

  const stepIndex = STEPS.findIndex(s => s.key === step)

  return (
    <>
      <Navbar />
      <CartDrawer />

      <div style={{ background: '#f5f0e8', minHeight: '100vh', paddingTop: 60 }}>

        {/* Hero */}
        <div style={{ background: '#2a1e0e', padding: '60px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(168deg,transparent 0,rgba(210,160,70,0.03) 2px,transparent 4px,transparent 40px)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 26, height: 1, background: '#c9a84c', display: 'block' }} />
              {t('AI Powered', 'AI Drevet')}
            </div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, color: '#faf8f4', marginBottom: 12 }}>
              {t('See it in Your ', 'Se det i Ditt ')}
              <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>{t('Space', 'Rom')}</em>
            </div>
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.76rem', color: '#b0a080', lineHeight: 2, maxWidth: 520 }}>
              {t('Upload a photo of your room, select a material, and see how it looks before you buy.', 'Last opp et bilde av rommet ditt, velg et materiale, og se hvordan det ser ut før du kjøper.')}
            </div>
          </div>
        </div>

        {/* Steps */}
        <div style={{ background: '#f0ebe0', borderBottom: '1px solid rgba(201,168,76,0.15)', padding: '20px 60px', display: 'flex', gap: 0, alignItems: 'center' }}>
          {STEPS.map((s, i) => {
            const isActive = step === s.key
            const isDone = i < stepIndex
            return (
              <div key={s.key} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: isDone ? '#c9a84c' : isActive ? 'rgba(201,168,76,0.15)' : 'transparent',
                    border: `1px solid ${isActive || isDone ? '#c9a84c' : 'rgba(201,168,76,0.25)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-jost)', fontSize: '0.6rem',
                    color: isDone ? '#1a1208' : isActive ? '#c9a84c' : '#8a7a60',
                    fontWeight: isDone ? 700 : 400,
                  }}>
                    {isDone ? '✓' : s.n}
                  </div>
                  <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: isActive ? '#c9a84c' : isDone ? '#2c1e0a' : '#8a7a60' }}>
                    {s.label}
                  </span>
                </div>
                {i < 3 && <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.2)', margin: '0 16px' }} />}
              </div>
            )
          })}
        </div>

        <div style={{ padding: '60px', maxWidth: 1000, margin: '0 auto' }}>

          {/* STEP 1 — Upload */}
          {step === 'upload' && (
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); const file = e.dataTransfer.files[0]; if (file) handleUpload(file) }}
              onClick={() => fileRef.current?.click()}
              style={{
                border: `2px dashed ${dragOver ? '#c9a84c' : 'rgba(201,168,76,0.3)'}`,
                borderRadius: 4, padding: '80px 40px', textAlign: 'center', cursor: 'pointer',
                background: dragOver ? 'rgba(201,168,76,0.04)' : 'transparent',
                transition: 'all 0.3s',
              }}
            >
              <input ref={fileRef} type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f) }} style={{ display: 'none' }} />
              <div style={{ fontSize: '3rem', marginBottom: 20 }}>📷</div>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', color: '#2c1e0a', marginBottom: 12 }}>
                {t('Upload Your Room Photo', 'Last opp romfoto')}
              </div>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.72rem', color: '#8a7a60', marginBottom: 8 }}>
                {t('Drag & drop or click to upload', 'Dra & slipp eller klikk for å laste opp')}
              </div>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', color: '#aaa' }}>
                JPG, PNG, WEBP — max 10MB
              </div>
            </div>
          )}

          {/* STEP 2 — Select */}
          {step === 'select' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 40 }}>
                {/* Oda önizleme */}
                <div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 10 }}>
                    {t('Your Room', 'Ditt Rom')}
                  </div>
                  <img src={roomImage!} alt="Room" style={{ width: '100%', height: 280, objectFit: 'cover', border: '1px solid rgba(201,168,76,0.2)' }} />
                  <button onClick={reset} style={{ marginTop: 10, background: 'none', border: 'none', fontFamily: 'var(--font-jost)', fontSize: '0.62rem', color: '#8a7a60', cursor: 'pointer', textDecoration: 'underline' }}>
                    {t('Change photo', 'Bytt bilde')}
                  </button>
                </div>

                {/* Ayarlar */}
                <div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 10 }}>
                    {t('Apply to', 'Bruk på')}
                  </div>
                  <div style={{ display: 'flex', gap: 3, marginBottom: 24 }}>
                    {(['floor', 'wall', 'both'] as const).map(a => (
                      <button key={a} onClick={() => setArea(a)} style={{
                        flex: 1, padding: '10px', fontFamily: 'var(--font-jost)', fontSize: '0.62rem',
                        letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer',
                        background: area === a ? '#c9a84c' : 'none',
                        color: area === a ? '#1a1208' : '#6a5020',
                        border: `1px solid ${area === a ? '#c9a84c' : 'rgba(201,168,76,0.3)'}`,
                        transition: 'all 0.2s',
                      }}>
                        {a === 'floor' ? t('Floor', 'Gulv') : a === 'wall' ? t('Wall', 'Vegg') : t('Both', 'Begge')}
                      </button>
                    ))}
                  </div>

                  {selectedProduct ? (
                    <div style={{ border: '1px solid rgba(201,168,76,0.3)', padding: '20px', background: 'rgba(201,168,76,0.05)' }}>
                      <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: 6 }}>
                        {t('Selected', 'Valgt')}
                      </div>
                      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', color: '#2c1e0a', marginBottom: 4 }}>
                        {locale === 'no' ? selectedProduct.nameNo : selectedProduct.name}
                      </div>
                      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', color: '#c9a84c' }}>
                        €{selectedProduct.price}/m²
                      </div>
                    </div>
                  ) : (
                    <div style={{ border: '1px dashed rgba(201,168,76,0.25)', padding: '20px', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#8a7a60' }}>
                        {t('Select a product below', 'Velg et produkt nedenfor')}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Ürün seçimi */}
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#6a5a40', marginBottom: 16 }}>
                {t('Choose a Product', 'Velg et Produkt')}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3, marginBottom: 32 }}>
                {PRODUCTS.map(p => (
                  <div key={p.id} onClick={() => setSelectedProduct(p)} style={{
                    cursor: 'pointer', overflow: 'hidden',
                    border: `2px solid ${selectedProduct?.id === p.id ? '#c9a84c' : 'transparent'}`,
                    transition: 'all 0.2s',
                  }}>
                    <div style={{ height: 100, background: TEXTURE_BG[p.texture] ?? TEXTURE_BG.wood, position: 'relative' }}>
                      {selectedProduct?.id === p.id && (
                        <div style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', background: '#c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: '#1a1208' }}>✓</div>
                      )}
                    </div>
                    <div style={{ padding: '10px 12px', background: '#fff' }}>
                      <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', color: '#2c1e0a', fontWeight: 400, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {locale === 'no' ? p.nameNo : p.name}
                      </div>
                      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem', color: '#c9a84c' }}>€{p.price}/m²</div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={handleVisualize} disabled={!selectedProduct} style={{
                width: '100%', padding: '16px',
                background: selectedProduct ? '#c9a84c' : 'rgba(201,168,76,0.3)',
                color: selectedProduct ? '#1a1208' : '#8a7a60',
                border: 'none', fontFamily: 'var(--font-jost)', fontSize: '0.7rem',
                letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600,
                cursor: selectedProduct ? 'pointer' : 'not-allowed', transition: 'all 0.3s',
              }}>
                ✨ {t('Visualize Now', 'Visualiser Nå')}
              </button>
            </div>
          )}

          {/* STEP 3 — Processing */}
          {step === 'processing' && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', color: '#2c1e0a', marginBottom: 16 }}>
                {t('AI is working...', 'AI arbeider...')}
              </div>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.72rem', color: '#8a7a60', marginBottom: 40 }}>
                {t('Applying material to your room photo. This takes a few seconds.', 'Bruker materiale på romsbildet ditt. Dette tar noen sekunder.')}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 10, height: 10, borderRadius: '50%', background: '#c9a84c',
                    animation: `bounce 1.2s ease ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
              <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0);opacity:0.3} 40%{transform:scale(1);opacity:1} }`}</style>
            </div>
          )}

          {/* STEP 4 — Result */}
          {step === 'result' && result && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, marginBottom: 32 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8a7a60', marginBottom: 10 }}>
                    {t('Before', 'Før')}
                  </div>
                  <img src={roomImage!} alt="Before" style={{ width: '100%', height: 320, objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 10 }}>
                    {t('After', 'Etter')} — {selectedProduct ? (locale === 'no' ? selectedProduct.nameNo : selectedProduct.name) : ''}
                  </div>
                  <div style={{ width: '100%', height: 320, position: 'relative', overflow: 'hidden' }}>
                    <img src={result} alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {/* Texture overlay */}
                    {selectedProduct && (
                      <div style={{ position: 'absolute', inset: 0, background: TEXTURE_BG[selectedProduct.texture], opacity: 0.5, mixBlendMode: 'multiply' }} />
                    )}
                  </div>
                </div>
              </div>

              {/* Ürün bilgisi */}
              {selectedProduct && (
                <div style={{ background: '#f0ebe0', border: '1px solid rgba(201,168,76,0.2)', padding: '24px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: 4 }}>
                      {t('Selected Material', 'Valgt Materiale')}
                    </div>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.4rem', color: '#2c1e0a' }}>
                      {locale === 'no' ? selectedProduct.nameNo : selectedProduct.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', color: '#c9a84c', marginTop: 4 }}>
                      €{selectedProduct.price}/m²
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <a href={`/product/${selectedProduct.slug}`} style={{
                      background: '#c9a84c', color: '#1a1208', padding: '12px 28px',
                      fontFamily: 'var(--font-jost)', fontSize: '0.65rem', letterSpacing: '0.22em',
                      textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none',
                    }}>
                      {t('View Product', 'Se Produkt')}
                    </a>
                    <button onClick={() => { addItem(selectedProduct, { m2: 10 }) }} style={{
                      background: 'none', color: '#6a5020', border: '1px solid rgba(201,168,76,0.4)',
                      padding: '12px 28px', fontFamily: 'var(--font-jost)', fontSize: '0.65rem',
                      letterSpacing: '0.22em', textTransform: 'uppercase', cursor: 'pointer',
                    }}>
                      🛒 {t('Add to Cart', 'Legg i Kurv')}
                    </button>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={reset} style={{
                  flex: 1, padding: '14px', background: 'none',
                  border: '1px solid rgba(201,168,76,0.3)', color: '#6a5020',
                  fontFamily: 'var(--font-jost)', fontSize: '0.68rem', letterSpacing: '0.22em',
                  textTransform: 'uppercase', cursor: 'pointer',
                }}>
                  {t('Try Another', 'Prøv en Annen')}
                </button>
                <button onClick={() => setStep('select')} style={{
                  flex: 1, padding: '14px', background: '#2a1e0e',
                  border: 'none', color: '#c9a84c',
                  fontFamily: 'var(--font-jost)', fontSize: '0.68rem', letterSpacing: '0.22em',
                  textTransform: 'uppercase', cursor: 'pointer',
                }}>
                  {t('Change Product', 'Bytt Produkt')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}