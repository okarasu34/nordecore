'use client'
import { useState, useRef } from 'react'
import { useLocaleStore } from '@/store/locale'
import type { Product } from '@/types'

interface Props {
  products: Product[]
}

export default function RoomVisualizer({ products }: Props) {
  const { t } = useLocaleStore()
  const [step, setStep] = useState<'upload' | 'select' | 'processing' | 'result'>('upload')
  const [roomImage, setRoomImage] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [area, setArea] = useState<'floor' | 'wall' | 'both'>('floor')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
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
    setError(null)

    try {
      const res = await fetch('/api/visualizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomImageBase64: roomImage, productId: selectedProduct.id, area }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data.resultUrl)
      setStep('result')
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong')
      setStep('select')
    }
  }

  const reset = () => {
    setStep('upload'); setRoomImage(null); setSelectedProduct(null); setResult(null); setError(null)
  }

  return (
    <section style={{ background: '#f0ebe0', padding: '80px 60px', borderTop: '1px solid rgba(201,168,76,0.15)' }}>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="section-tag">{t('AI Room Visualizer', 'AI Rom Visualisering')}</div>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, color: '#2c1e0a', marginBottom: 10 }}>
          {t('See it in Your ', 'Se det i Ditt ')}
          <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>{t('Space', 'Rom')}</em>
        </div>
        <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.78rem', color: '#7a6a50', lineHeight: 2, marginBottom: 48 }}>
          {t('Upload a photo of your room, select a product, and our AI will show you how it looks — before you buy.', 'Last opp et bilde av rommet ditt, velg et produkt, og vår AI viser deg hvordan det ser ut — før du kjøper.')}
        </div>

        {/* Steps indicator */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 40 }}>
          {[
            { key: 'upload', n: '01', l: t('Upload Room', 'Last opp rom') },
            { key: 'select', n: '02', l: t('Select Product', 'Velg produkt') },
            { key: 'processing', n: '03', l: t('AI Processing', 'AI behandler') },
            { key: 'result', n: '04', l: t('View Result', 'Se resultat') },
          ].map((s, i) => (
            <div key={s.key} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: step === s.key ? '#2a1e0e' : 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', transition: 'all 0.3s' }}>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem', color: step === s.key ? '#c9a84c' : '#8a7a60' }}>{s.n}</span>
                <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: step === s.key ? '#d4c4a0' : '#8a7a60' }}>{s.l}</span>
              </div>
              {i < 3 && <div style={{ width: 3, height: 1, background: 'rgba(201,168,76,0.2)' }} />}
            </div>
          ))}
        </div>

        {/* STEP 1: Upload */}
        {step === 'upload' && (
          <div
            onClick={() => fileRef.current?.click()}
            style={{
              border: '2px dashed rgba(201,168,76,0.35)', padding: '60px 40px', textAlign: 'center', cursor: 'pointer',
              background: 'rgba(201,168,76,0.04)', transition: 'all 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#c9a84c'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.35)'}
          >
            <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
            <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>📷</div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', color: '#2c1e0a', marginBottom: 8 }}>
              {t('Upload Your Room Photo', 'Last opp romfoto')}
            </div>
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.72rem', color: '#8a7a50' }}>
              {t('JPG, PNG or WEBP — max 10MB', 'JPG, PNG eller WEBP — maks 10MB')}
            </div>
          </div>
        )}

        {/* STEP 2: Select product */}
        {step === 'select' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
              {/* Room preview */}
              <div>
                <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 12 }}>
                  {t('Your Room', 'Ditt rom')}
                </div>
                <img src={roomImage!} alt="Room" style={{ width: '100%', height: 260, objectFit: 'cover', border: '1px solid rgba(201,168,76,0.2)' }} />
              </div>

              {/* Settings */}
              <div>
                <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 12 }}>
                  {t('Apply to', 'Bruk på')}
                </div>
                <div style={{ display: 'flex', gap: 3, marginBottom: 24 }}>
                  {(['floor', 'wall', 'both'] as const).map((a) => (
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
                  <div style={{ border: '1px solid rgba(201,168,76,0.3)', padding: '16px', background: 'rgba(201,168,76,0.05)' }}>
                    <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: 4 }}>
                      {t('Selected', 'Valgt')}
                    </div>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', color: '#2c1e0a' }}>
                      {selectedProduct.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', color: '#c9a84c', marginTop: 4 }}>
                      €{selectedProduct.price}/m²
                    </div>
                  </div>
                ) : (
                  <div style={{ border: '1px dashed rgba(201,168,76,0.25)', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#8a7a60' }}>
                      {t('Select a product below', 'Velg et produkt nedenfor')}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Product grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 3, marginBottom: 28 }}>
              {products.slice(0, 8).map((p) => (
                <div key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  style={{
                    cursor: 'pointer', border: `2px solid ${selectedProduct?.id === p.id ? '#c9a84c' : 'transparent'}`,
                    transition: 'all 0.2s', overflow: 'hidden',
                  }}
                >
                  <div style={{ height: 80, background: 'linear-gradient(160deg,#4a3218,#6a4a28)', position: 'relative' }}>
                    {p.colors[0] && <div style={{ position: 'absolute', bottom: 6, right: 6, width: 14, height: 14, borderRadius: '50%', background: p.colors[0].hex, border: '1px solid rgba(255,255,255,0.4)' }} />}
                  </div>
                  <div style={{ padding: '8px 10px', background: '#fff' }}>
                    <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#2c1e0a', fontWeight: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '0.9rem', color: '#c9a84c' }}>€{p.price}</div>
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <div style={{ padding: '12px 16px', background: 'rgba(200,60,60,0.08)', border: '1px solid rgba(200,60,60,0.2)', marginBottom: 16, fontFamily: 'var(--font-jost)', fontSize: '0.72rem', color: '#8a3030' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={handleVisualize} disabled={!selectedProduct} className="btn-gold" style={{ opacity: selectedProduct ? 1 : 0.5, cursor: selectedProduct ? 'pointer' : 'not-allowed' }}>
                ✨ {t('Visualize Now', 'Visualiser nå')}
              </button>
              <button onClick={reset} className="btn-outline">
                {t('Start Over', 'Start på nytt')}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Processing */}
        {step === 'processing' && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: '#2c1e0a', marginBottom: 16 }}>
              {t('AI is working...', 'AI arbeider...')}
            </div>
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.72rem', color: '#8a7a60', marginBottom: 32 }}>
              {t('Applying your selected material to the room photo. This takes 10-20 seconds.', 'Bruker det valgte materialet på romsbildet. Dette tar 10-20 sekunder.')}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#c9a84c', animation: `bounce 1.2s ease ${i * 0.2}s infinite` }} />
              ))}
            </div>
            <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }`}</style>
          </div>
        )}

        {/* STEP 4: Result */}
        {step === 'result' && result && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, marginBottom: 28 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8a7a60', marginBottom: 10 }}>{t('Before', 'Før')}</div>
                <img src={roomImage!} alt="Before" style={{ width: '100%', height: 300, objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 10 }}>{t('After', 'Etter')} — {selectedProduct?.name}</div>
                <img src={result} alt="After" style={{ width: '100%', height: 300, objectFit: 'cover' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <a href={`/product/${selectedProduct?.slug}`} className="btn-gold">
                🛒 {t('Order This Product', 'Bestill dette produktet')}
              </a>
              <button onClick={reset} className="btn-outline">
                {t('Try Another', 'Prøv en annen')}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
