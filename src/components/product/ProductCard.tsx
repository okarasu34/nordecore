'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { useLocaleStore } from '@/store/locale'
import type { Product } from '@/types'

// Her ürün slug'ına özel fotoğraf
const PRODUCT_IMAGES: Record<string, string> = {
  'nordic-oak-wide-plank':    'https://images.pexels.com/photos/3286966/pexels-photo-3286966.jpeg?auto=compress&cs=tinysrgb&w=800',
  'calacatta-gold-slab':      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800',
  'herringbone-oak-classic':  'https://images.pexels.com/photos/6489103/pexels-photo-6489103.jpeg?auto=compress&cs=tinysrgb&w=800',
  'arctic-grey-lvt-click':    'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
  'nero-marquina-matte':      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
  'american-walnut-smoked':   'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?auto=compress&cs=tinysrgb&w=800',
  'white-oak-chevron':        'https://images.pexels.com/photos/6284248/pexels-photo-6284248.jpeg?auto=compress&cs=tinysrgb&w=800',
  'statuario-white-gloss':    'https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=800',
  'pine-rustic-wide':         'https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg?auto=compress&cs=tinysrgb&w=800',
}

// Texture bazında fallback fotoğraflar
const TEXTURE_IMAGES: Record<string, string> = {
  wood:        'https://images.pexels.com/photos/3286966/pexels-photo-3286966.jpeg?auto=compress&cs=tinysrgb&w=800',
  marble:      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800',
  herringbone: 'https://images.pexels.com/photos/6489103/pexels-photo-6489103.jpeg?auto=compress&cs=tinysrgb&w=800',
  vinyl:       'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
  blackmarble: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
  walnut:      'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?auto=compress&cs=tinysrgb&w=800',
  stone:       'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=800',
  exterior:    'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
}

const TEXTURE_BG: Record<string, string> = {
  wood:        'linear-gradient(160deg,#4a3218,#6a4a28,#3a2410)',
  marble:      'linear-gradient(135deg,#3a3835,#4a4540,#2e2c28)',
  herringbone: 'linear-gradient(160deg,#3e3018,#504028,#2e2210)',
  vinyl:       'linear-gradient(135deg,#2a2e3a,#323845,#222630)',
  blackmarble: 'linear-gradient(135deg,#1e1e1c,#2a2820,#161614)',
  walnut:      'linear-gradient(160deg,#2e2018,#3e2a18,#221408)',
  stone:       'linear-gradient(135deg,#3e3a32,#4e4a40,#2e2c25)',
  exterior:    'linear-gradient(135deg,#2e3828,#3a4832,#222c1e)',
}

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [added, setAdded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const { addItem } = useCartStore()
  const { locale, t } = useLocaleStore()

  const texture = product.texture ?? 'wood'
  const imgUrl = PRODUCT_IMAGES[product.slug] ?? TEXTURE_IMAGES[texture]
  const fallbackBg = TEXTURE_BG[texture] ?? TEXTURE_BG.wood
  const name = locale === 'no' ? product.nameNo : product.name

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    const color = product.colors[selectedColorIdx]
    addItem(product, { color, m2: 1 })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#fff',
          overflow: 'hidden',
          border: '1px solid rgba(201,168,76,0.1)',
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s',
          transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
          boxShadow: hovered ? '0 20px 60px rgba(42,30,14,0.15)' : 'none',
          cursor: 'pointer',
        }}
      >
        {/* Ürün görseli */}
        <div style={{ height: 240, position: 'relative', overflow: 'hidden', background: fallbackBg }}>
          {!imgError ? (
            <img
              src={imgUrl}
              alt={name}
              onError={() => setImgError(true)}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: fallbackBg }} />
          )}

          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(42,30,14,0.4) 100%)' }} />

          {product.badge && (
            <div style={{
              position: 'absolute', top: 12, left: 12, zIndex: 1,
              background: product.badge === 'New' || product.badge === 'Exclusive' ? 'rgba(240,235,224,0.92)' : '#c9a84c',
              color: product.badge === 'New' || product.badge === 'Exclusive' ? '#8a6f30' : '#1a1208',
              border: product.badge === 'New' || product.badge === 'Exclusive' ? '1px solid rgba(201,168,76,0.45)' : 'none',
              padding: '3px 10px', fontSize: '0.52rem', letterSpacing: '0.22em',
              fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-jost)',
            }}>
              {product.badge}
            </div>
          )}

          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'rgba(42,30,14,0.88)', color: '#c9a84c',
            textAlign: 'center', padding: '11px',
            fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase',
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
            zIndex: 2,
          }}>
            {t('Quick View →', 'Rask Visning →')}
          </div>
        </div>

        {/* Bilgiler */}
        <div style={{ padding: '20px 22px 22px' }}>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.54rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 5 }}>
            {locale === 'no' ? product.category.nameNo : product.category.name}
          </div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.25rem', fontWeight: 300, color: '#2c1e0a', marginBottom: 7 }}>
            {name}
          </div>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#7a6a50', lineHeight: 1.9, marginBottom: 14, fontWeight: 300 }}>
            {(locale === 'no' ? product.descriptionNo : product.description)?.slice(0, 70)}...
          </div>

          {product.colors.length > 0 && (
            <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
              {product.colors.slice(0, 6).map((c, i) => (
                <div
                  key={c.id}
                  onClick={(e) => { e.preventDefault(); setSelectedColorIdx(i) }}
                  title={c.name}
                  style={{
                    width: 16, height: 16, borderRadius: '50%', background: c.hex, cursor: 'pointer',
                    border: `2px solid ${selectedColorIdx === i ? '#c9a84c' : 'transparent'}`,
                    transition: 'all 0.2s',
                    transform: selectedColorIdx === i ? 'scale(1.15)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.4rem', color: '#c9a84c', fontWeight: 300 }}>
              €{product.price} <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.55rem', color: '#aaa' }}>/ m²</span>
            </div>
            <button
              onClick={handleAddToCart}
              style={{
                background: added ? '#c9a84c' : 'none',
                color: added ? '#1a1208' : '#6a5020',
                border: `1px solid ${added ? '#c9a84c' : 'rgba(201,168,76,0.4)'}`,
                padding: '7px 16px', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                cursor: 'pointer', fontFamily: 'var(--font-jost)', transition: 'all 0.25s', fontWeight: 300,
              }}
            >
              {added ? t('✓ Added', '✓ Lagt til') : t('Add to Cart', 'Legg til')}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}