'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { useLocaleStore } from '@/store/locale'
import type { Product } from '@/types'

const TEXTURES: Record<string, { bg: string; overlay: string }> = {
  wood:        { bg: 'linear-gradient(160deg,#4a3218,#6a4a28,#3a2410)', overlay: 'repeating-linear-gradient(168deg,transparent 0,rgba(210,155,70,0.08) 2px,transparent 4px,transparent 35px)' },
  marble:      { bg: 'linear-gradient(135deg,#3a3835,#4a4540,#2e2c28)', overlay: 'radial-gradient(ellipse at 28% 38%,rgba(201,168,76,0.1),transparent 50%)' },
  herringbone: { bg: 'linear-gradient(160deg,#3e3018,#504028,#2e2210)', overlay: 'repeating-linear-gradient(45deg,rgba(170,120,45,0.09) 0,rgba(170,120,45,0.09) 11px,transparent 11px,transparent 22px),repeating-linear-gradient(-45deg,rgba(130,90,25,0.07) 0,rgba(130,90,25,0.07) 11px,transparent 11px,transparent 22px)' },
  vinyl:       { bg: 'linear-gradient(135deg,#2a2e3a,#323845,#222630)', overlay: 'radial-gradient(circle at 60% 35%,rgba(100,140,200,0.08),transparent 55%)' },
  blackmarble: { bg: 'linear-gradient(135deg,#1e1e1c,#2a2820,#161614)', overlay: 'repeating-linear-gradient(132deg,transparent 0,rgba(201,168,76,0.07) 1px,transparent 2px,transparent 95px)' },
  walnut:      { bg: 'linear-gradient(160deg,#2e2018,#3e2a18,#221408)', overlay: 'repeating-linear-gradient(172deg,transparent 0,rgba(160,100,35,0.1) 2px,transparent 4px,transparent 28px)' },
  stone:       { bg: 'linear-gradient(135deg,#3e3a32,#4e4a40,#2e2c25)', overlay: 'repeating-linear-gradient(55deg,transparent 0,rgba(200,180,140,0.05) 1px,transparent 2px,transparent 60px)' },
  exterior:    { bg: 'linear-gradient(135deg,#2e3828,#3a4832,#222c1e)', overlay: 'repeating-linear-gradient(90deg,transparent 0,rgba(100,140,80,0.06) 1px,transparent 2px,transparent 50px)' },
}

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [added, setAdded] = useState(false)
  const { addItem } = useCartStore()
  const { locale, t } = useLocaleStore()

  const texture = TEXTURES[product.texture] ?? TEXTURES.wood
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
        className="prod-card"
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
        {/* Image / Texture */}
        <div style={{ height: 240, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: texture.bg }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: texture.overlay }} />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 55%,rgba(42,30,14,0.35) 100%)' }} />

          {/* Badge */}
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

          {/* Quick view */}
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

        {/* Info */}
        <div style={{ padding: '20px 22px 22px' }}>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.54rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 5 }}>
            {locale === 'no' ? product.category.nameNo : product.category.name}
          </div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.25rem', fontWeight: 300, color: '#2c1e0a', marginBottom: 7 }}>
            {name}
          </div>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#7a6a50', lineHeight: 1.9, marginBottom: 14, fontWeight: 300 }}>
            {locale === 'no' ? product.descriptionNo.slice(0, 80) + '...' : product.description.slice(0, 80) + '...'}
          </div>

          {/* Colors */}
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

          {/* Footer */}
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
              {added ? (t('✓ Added', '✓ Lagt til')) : (t('Add to Cart', 'Legg til'))}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
