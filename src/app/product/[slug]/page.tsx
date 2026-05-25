'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import CartDrawer from '@/components/cart/CartDrawer'
import { useCartStore } from '@/store/cart'
import { useLocaleStore } from '@/store/locale'

const PRODUCTS = [
  {
    id: '1', name: 'Nordic Oak — Wide Plank', nameNo: 'Nordisk Eik — Bred Planke',
    slug: 'nordic-oak-wide-plank',
    description: 'Brushed solid oak with natural grain variation. Available in 5 finishes, compatible with underfloor heating. Our bestselling floor for a reason — the wide planks create a sense of space and luxury that narrow boards simply cannot match.',
    descriptionNo: 'Børstet massiv eik med naturlig kornvariasjon. Tilgjengelig i 5 overflater, kompatibel med gulvvarme.',
    price: 89, priceNok: 1050,
    category: { id: '1', name: 'Wood Cladding', nameNo: 'Trekledning', slug: 'wood-cladding', order: 1 },
    colors: [
      { id: 'c1', name: 'Natural Oak', nameNo: 'Naturlig Eik', hex: '#8B6040' },
      { id: 'c2', name: 'Dark Walnut', nameNo: 'Mørk Valnøtt', hex: '#4A3020' },
      { id: 'c3', name: 'Light Ash', nameNo: 'Lys Ask', hex: '#C8B090' },
      { id: 'c4', name: 'Smoked Oak', nameNo: 'Røkt Eik', hex: '#6A5030' },
      { id: 'c5', name: 'Ebony', nameNo: 'Ibenholt', hex: '#2A1A0A' },
    ],
    sizes: [
      { id: 's1', label: '122×18×1800mm', width: 122, length: 1800, thickness: 18 },
      { id: 's2', label: '190×18×1800mm', width: 190, length: 1800, thickness: 18 },
      { id: 's3', label: '240×20×2200mm', width: 240, length: 2200, thickness: 20 },
    ],
    images: [], badge: 'Bestseller', texture: 'wood', stock: 100, featured: true, active: true, createdAt: '',
    specs: [
      { label: 'Material', value: 'Solid Oak' },
      { label: 'Surface', value: 'Brushed & UV Lacquered' },
      { label: 'Warranty', value: '12 Years' },
      { label: 'Underfloor Heating', value: 'Compatible' },
      { label: 'Origin', value: 'Scandinavia' },
      { label: 'Certification', value: 'FSC Certified' },
    ],
  },
  {
    id: '2', name: 'Calacatta Gold — Slab', nameNo: 'Calacatta Gull — Plate',
    slug: 'calacatta-gold-slab',
    description: 'High-pressure laminate marble-look panels. Waterproof and heat resistant up to 180°C. Scratch resistant surface with authentic marble veining.',
    descriptionNo: 'Høytrykklaminatplater. Vanntett og varmebestandig opp til 180°C.',
    price: 124, priceNok: 1460,
    category: { id: '2', name: 'Marble Panels', nameNo: 'Marmorplater', slug: 'marble-panels', order: 2 },
    colors: [
      { id: 'c5', name: 'White Gold', nameNo: 'Hvit Gull', hex: '#D4C8B0' },
      { id: 'c6', name: 'Black Marble', nameNo: 'Sort Marmor', hex: '#2A2820' },
      { id: 'c7', name: 'Silver Grey', nameNo: 'Sølvgrå', hex: '#8A8070' },
    ],
    sizes: [
      { id: 's1', label: '1200×600mm', width: 1200, length: 600, thickness: 12 },
      { id: 's2', label: '2400×1200mm', width: 2400, length: 1200, thickness: 12 },
      { id: 's3', label: '3000×1200mm', width: 3000, length: 1200, thickness: 12 },
    ],
    images: [], badge: 'New', texture: 'marble', stock: 50, featured: true, active: true, createdAt: '',
    specs: [
      { label: 'Material', value: 'High-Pressure Laminate' },
      { label: 'Surface', value: 'Matte / Polished' },
      { label: 'Warranty', value: '10 Years' },
      { label: 'Waterproof', value: 'Yes — 100%' },
      { label: 'Heat Resistant', value: 'Up to 180°C' },
      { label: 'Certification', value: 'CE Certified' },
    ],
  },
  {
    id: '3', name: 'Herringbone Oak — Classic', nameNo: 'Fiskebein Eik — Klassisk',
    slug: 'herringbone-oak-classic',
    description: 'Engineered 3-layer herringbone parquet. Compatible with all underfloor heating systems. FSC certified timber from sustainable Scandinavian forests.',
    descriptionNo: 'Konstruert 3-lags fiskebeinparkett. Kompatibel med alle gulvvarmesystemer.',
    price: 76, priceNok: 895,
    category: { id: '3', name: 'Parquet', nameNo: 'Parkett', slug: 'parquet', order: 3 },
    colors: [
      { id: 'c8', name: 'Honey', nameNo: 'Honning', hex: '#6A4820' },
      { id: 'c9', name: 'Sand', nameNo: 'Sand', hex: '#9A7840' },
      { id: 'c10', name: 'Espresso', nameNo: 'Espresso', hex: '#3A2810' },
    ],
    sizes: [
      { id: 's1', label: '70×350mm', width: 70, length: 350, thickness: 14 },
      { id: 's2', label: '90×450mm', width: 90, length: 450, thickness: 14 },
    ],
    images: [], badge: 'Popular', texture: 'herringbone', stock: 75, featured: true, active: true, createdAt: '',
    specs: [
      { label: 'Material', value: 'Engineered Oak' },
      { label: 'Construction', value: '3-Layer' },
      { label: 'Warranty', value: '10 Years' },
      { label: 'Underfloor Heating', value: 'Compatible' },
      { label: 'Pattern', value: 'Herringbone' },
      { label: 'Certification', value: 'FSC Certified' },
    ],
  },
  {
    id: '4', name: 'Arctic Grey — LVT Click', nameNo: 'Arktisk Grå — LVT Klikk',
    slug: 'arctic-grey-lvt-click',
    description: '4.5mm SPC rigid core luxury vinyl tile. 100% waterproof. Perfect for kitchens, bathrooms and high-traffic areas. Easy click installation.',
    descriptionNo: '4,5mm SPC stiv kjerne luksusvinylflise. 100% vanntett. Perfekt for kjøkken, bad og høytrafikkerte områder.',
    price: 48, priceNok: 565,
    category: { id: '4', name: 'Luxury Vinyl', nameNo: 'Luksusvinyl', slug: 'luxury-vinyl', order: 4 },
    colors: [
      { id: 'c11', name: 'Arctic Grey', nameNo: 'Arktisk Grå', hex: '#8A9AA8' },
      { id: 'c12', name: 'Storm', nameNo: 'Storm', hex: '#4A5A68' },
      { id: 'c13', name: 'Frost White', nameNo: 'Frosthvit', hex: '#C8D0D8' },
      { id: 'c14', name: 'Midnight', nameNo: 'Midnatt', hex: '#2A3038' },
    ],
    sizes: [
      { id: 's1', label: '181×1210mm', width: 181, length: 1210, thickness: 4.5 },
      { id: 's2', label: '228×1524mm', width: 228, length: 1524, thickness: 4.5 },
    ],
    images: [], badge: null, texture: 'vinyl', stock: 200, featured: true, active: true, createdAt: '',
    specs: [
      { label: 'Material', value: 'SPC Rigid Core' },
      { label: 'Thickness', value: '4.5mm' },
      { label: 'Warranty', value: '15 Years' },
      { label: 'Waterproof', value: 'Yes — 100%' },
      { label: 'Installation', value: 'Click System' },
      { label: 'Underfloor Heating', value: 'Compatible' },
    ],
  },
  {
    id: '5', name: 'Nero Marquina — Matte', nameNo: 'Nero Marquina — Matt',
    slug: 'nero-marquina-matte',
    description: 'Deep black marble-look panel with fine gold veining. Statement walls and feature floors for luxury interiors. Available in matte and polished finish.',
    descriptionNo: 'Dypt svart marmorlignende plate med fin gullåring. Fremtredende vegger og gulv for luksusinteriør.',
    price: 156, priceNok: 1840,
    category: { id: '2', name: 'Marble Panels', nameNo: 'Marmorplater', slug: 'marble-panels', order: 2 },
    colors: [
      { id: 'c14', name: 'Jet Black', nameNo: 'Jetsort', hex: '#1a1a18' },
      { id: 'c15', name: 'Warm Black', nameNo: 'Varm Sort', hex: '#2A2015' },
    ],
    sizes: [
      { id: 's1', label: '1200×600mm', width: 1200, length: 600, thickness: 12 },
      { id: 's2', label: '2400×1200mm', width: 2400, length: 1200, thickness: 12 },
    ],
    images: [], badge: 'Exclusive', texture: 'blackmarble', stock: 30, featured: true, active: true, createdAt: '',
    specs: [
      { label: 'Material', value: 'Porcelain' },
      { label: 'Surface', value: 'Matte / Polished' },
      { label: 'Warranty', value: '10 Years' },
      { label: 'Waterproof', value: 'Yes' },
      { label: 'Origin', value: 'Italy' },
      { label: 'Certification', value: 'CE Certified' },
    ],
  },
  {
    id: '6', name: 'American Walnut — Smoked', nameNo: 'Amerikansk Valnøtt — Røkt',
    slug: 'american-walnut-smoked',
    description: 'Thermally modified American walnut. Rich dark tone for interior walls, ceilings and feature panels. Naturally durable without chemical treatment.',
    descriptionNo: 'Termisk modifisert amerikansk valnøtt. Rik mørk tone for innvendige vegger.',
    price: 112, priceNok: 1320,
    category: { id: '1', name: 'Wood Cladding', nameNo: 'Trekledning', slug: 'wood-cladding', order: 1 },
    colors: [
      { id: 'c16', name: 'Dark Smoke', nameNo: 'Mørk Røyk', hex: '#3A2010' },
      { id: 'c17', name: 'Ebony', nameNo: 'Ibenholt', hex: '#201008' },
      { id: 'c18', name: 'Cognac', nameNo: 'Konjakk', hex: '#5A3820' },
    ],
    sizes: [
      { id: 's1', label: '120×12×2400mm', width: 120, length: 2400, thickness: 12 },
      { id: 's2', label: '180×15×2400mm', width: 180, length: 2400, thickness: 15 },
    ],
    images: [], badge: null, texture: 'walnut', stock: 60, featured: false, active: true, createdAt: '',
    specs: [
      { label: 'Material', value: 'American Walnut' },
      { label: 'Treatment', value: 'Thermally Modified' },
      { label: 'Warranty', value: '10 Years' },
      { label: 'Application', value: 'Interior Walls & Ceiling' },
      { label: 'Origin', value: 'North America' },
      { label: 'Certification', value: 'FSC Certified' },
    ],
  },
] as any[]

const TEXTURES: Record<string, { bg: string; overlay: string }> = {
  wood:        { bg: 'linear-gradient(160deg,#4a3218,#6a4a28,#3a2410)', overlay: 'repeating-linear-gradient(168deg,transparent 0,rgba(210,155,70,0.08) 2px,transparent 4px,transparent 35px)' },
  marble:      { bg: 'linear-gradient(135deg,#3a3835,#4a4540,#2e2c28)', overlay: 'radial-gradient(ellipse at 28% 38%,rgba(201,168,76,0.1),transparent 50%)' },
  herringbone: { bg: 'linear-gradient(160deg,#3e3018,#504028,#2e2210)', overlay: 'repeating-linear-gradient(45deg,rgba(170,120,45,0.09) 0,rgba(170,120,45,0.09) 11px,transparent 11px,transparent 22px),repeating-linear-gradient(-45deg,rgba(130,90,25,0.07) 0,rgba(130,90,25,0.07) 11px,transparent 11px,transparent 22px)' },
  vinyl:       { bg: 'linear-gradient(135deg,#2a2e3a,#323845,#222630)', overlay: 'radial-gradient(circle at 60% 35%,rgba(100,140,200,0.08),transparent 55%)' },
  blackmarble: { bg: 'linear-gradient(135deg,#1e1e1c,#2a2820,#161614)', overlay: 'repeating-linear-gradient(132deg,transparent 0,rgba(201,168,76,0.07) 1px,transparent 2px,transparent 95px)' },
  walnut:      { bg: 'linear-gradient(160deg,#2e2018,#3e2a18,#221408)', overlay: 'repeating-linear-gradient(172deg,transparent 0,rgba(160,100,35,0.1) 2px,transparent 4px,transparent 28px)' },
}

export default function ProductPage() {
  const params = useParams()
  const slug = params?.slug as string
  const product = PRODUCTS.find(p => p.slug === slug)

  const [selectedColorIdx, setSelectedColorIdx] = useState(0)
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0)
  const [m2, setM2] = useState(10)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'delivery'>('desc')

  const { addItem } = useCartStore()
  const { locale, t } = useLocaleStore()

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f0e8' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', color: '#2c1e0a', marginBottom: 16 }}>Product not found</div>
          <a href="/" style={{ fontFamily: 'var(--font-jost)', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase' }}>← Back to Home</a>
        </div>
      </div>
    )
  }

  const texture = TEXTURES[product.texture] ?? TEXTURES.wood
  const selectedColor = product.colors[selectedColorIdx]
  const selectedSize = product.sizes[selectedSizeIdx]
  const totalPrice = (product.price * m2).toFixed(0)
  const name = locale === 'no' ? product.nameNo : product.name
  const description = locale === 'no' ? product.descriptionNo : product.description

  const handleAddToCart = () => {
    addItem(product, { color: selectedColor, size: selectedSize, m2 })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  // m² hesaplama
  const [roomW, setRoomW] = useState(4)
  const [roomL, setRoomL] = useState(5)
  const calculatedM2 = Math.ceil(roomW * roomL * 1.1)

  return (
    <>
      <Navbar />
      <CartDrawer />

      <div style={{ background: '#f5f0e8', minHeight: '100vh', paddingTop: 60 }}>

        {/* Breadcrumb */}
        <div style={{ padding: '20px 60px', borderBottom: '1px solid rgba(201,168,76,0.12)', background: '#f0ebe0' }}>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.15em', color: '#8a7a60' }}>
            <a href="/" style={{ color: '#8a7a60', textDecoration: 'none' }}>Home</a>
            <span style={{ margin: '0 10px', color: '#c9a84c' }}>→</span>
            <a href={`/category/${product.category.slug}`} style={{ color: '#8a7a60', textDecoration: 'none' }}>{product.category.name}</a>
            <span style={{ margin: '0 10px', color: '#c9a84c' }}>→</span>
            <span style={{ color: '#2c1e0a' }}>{name}</span>
          </div>
        </div>

        {/* Ana içerik */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, maxWidth: '100%' }}>

          {/* Sol — Ürün görseli */}
          <div style={{ position: 'sticky', top: 60, height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: texture.bg, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: texture.overlay }} />

              {/* Renk overlay */}
              <div style={{ position: 'absolute', inset: 0, background: selectedColor.hex, opacity: 0.15, transition: 'all 0.5s' }} />

              {/* Badge */}
              {product.badge && (
                <div style={{ position: 'absolute', top: 28, left: 28, background: '#c9a84c', color: '#1a1208', padding: '5px 14px', fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.22em', fontWeight: 700, textTransform: 'uppercase' }}>
                  {product.badge}
                </div>
              )}

              {/* Seçili renk bilgisi */}
              <div style={{ position: 'absolute', bottom: 28, left: 28, right: 28 }}>
                <div style={{ background: 'rgba(240,235,224,0.92)', border: '1px solid rgba(201,168,76,0.3)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: selectedColor.hex, border: '2px solid rgba(201,168,76,0.5)', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a7a60' }}>{t('Selected Color', 'Valgt Farge')}</div>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', color: '#2c1e0a' }}>{locale === 'no' ? selectedColor.nameNo ?? selectedColor.name : selectedColor.name}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ — Ürün bilgileri */}
          <div style={{ padding: '48px 56px', background: '#f5f0e8', overflowY: 'auto' }}>

            {/* Kategori */}
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 12 }}>
              {locale === 'no' ? product.category.nameNo : product.category.name}
            </div>

            {/* İsim */}
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: '#2c1e0a', lineHeight: 1.1, marginBottom: 20 }}>
              {name}
            </div>

            {/* Fiyat */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 32 }}>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2.2rem', color: '#c9a84c', fontWeight: 300 }}>
                €{product.price}
              </div>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.65rem', color: '#8a7a60' }}>/ m²</div>
              {product.priceNok && (
                <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#8a7a60' }}>≈ {product.priceNok} NOK</div>
              )}
            </div>

            <div style={{ height: 1, background: 'rgba(201,168,76,0.2)', marginBottom: 32 }} />

            {/* Renk seçimi */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a5a40', marginBottom: 14 }}>
                {t('Color', 'Farge')} — <span style={{ color: '#2c1e0a', textTransform: 'none', letterSpacing: 0 }}>{locale === 'no' ? selectedColor.nameNo ?? selectedColor.name : selectedColor.name}</span>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {product.colors.map((c: any, i: number) => (
                  <button key={c.id} onClick={() => setSelectedColorIdx(i)} title={c.name} style={{
                    width: 36, height: 36, borderRadius: '50%', background: c.hex, cursor: 'pointer',
                    border: `3px solid ${selectedColorIdx === i ? '#c9a84c' : 'transparent'}`,
                    boxShadow: selectedColorIdx === i ? '0 0 0 1px #c9a84c' : '0 0 0 1px rgba(201,168,76,0.2)',
                    transition: 'all 0.2s',
                    transform: selectedColorIdx === i ? 'scale(1.1)' : 'scale(1)',
                  }} />
                ))}
              </div>
            </div>

            {/* Ölçü seçimi */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a5a40', marginBottom: 14 }}>
                {t('Size', 'Størrelse')}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.sizes.map((s: any, i: number) => (
                  <button key={s.id} onClick={() => setSelectedSizeIdx(i)} style={{
                    padding: '8px 16px',
                    fontFamily: 'var(--font-jost)', fontSize: '0.65rem', letterSpacing: '0.1em',
                    background: selectedSizeIdx === i ? '#2a1e0e' : 'none',
                    color: selectedSizeIdx === i ? '#c9a84c' : '#6a5a40',
                    border: `1px solid ${selectedSizeIdx === i ? '#2a1e0e' : 'rgba(201,168,76,0.3)'}`,
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: 'rgba(201,168,76,0.15)', marginBottom: 28 }} />

            {/* m² Hesaplama */}
            <div style={{ background: '#f0ebe0', border: '1px solid rgba(201,168,76,0.2)', padding: '24px', marginBottom: 28 }}>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 16 }}>
                📐 {t('Room Calculator', 'Rom Kalkulator')}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#8a7a60', marginBottom: 6 }}>{t('Width (m)', 'Bredde (m)')}</div>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(201,168,76,0.3)', background: '#fff' }}>
                    <button onClick={() => setRoomW(w => Math.max(1, w - 0.5))} style={{ padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: '#c9a84c', fontSize: '1rem' }}>−</button>
                    <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', color: '#2c1e0a' }}>{roomW}</span>
                    <button onClick={() => setRoomW(w => w + 0.5)} style={{ padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: '#c9a84c', fontSize: '1rem' }}>+</button>
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#8a7a60', marginBottom: 6 }}>{t('Length (m)', 'Lengde (m)')}</div>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(201,168,76,0.3)', background: '#fff' }}>
                    <button onClick={() => setRoomL(l => Math.max(1, l - 0.5))} style={{ padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: '#c9a84c', fontSize: '1rem' }}>−</button>
                    <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', color: '#2c1e0a' }}>{roomL}</span>
                    <button onClick={() => setRoomL(l => l + 0.5)} style={{ padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: '#c9a84c', fontSize: '1rem' }}>+</button>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#8a7a60' }}>{t('Recommended (incl. 10% waste)', 'Anbefalt (inkl. 10% svinn)')}</div>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.6rem', color: '#2c1e0a' }}>{calculatedM2} m²</div>
                </div>
                <button onClick={() => setM2(calculatedM2)} style={{ padding: '10px 20px', background: '#c9a84c', border: 'none', color: '#1a1208', fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 600 }}>
                  {t('Use This', 'Bruk Dette')}
                </button>
              </div>
            </div>

            {/* Miktar */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a5a40', marginBottom: 12 }}>
                {t('Quantity (m²)', 'Antall (m²)')}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(201,168,76,0.3)', background: '#fff' }}>
                  <button onClick={() => setM2(m => Math.max(1, m - 1))} style={{ padding: '10px 18px', background: 'none', border: 'none', cursor: 'pointer', color: '#c9a84c', fontSize: '1.1rem' }}>−</button>
                  <span style={{ padding: '10px 24px', fontFamily: 'var(--font-cormorant)', fontSize: '1.4rem', color: '#2c1e0a', minWidth: 60, textAlign: 'center' }}>{m2}</span>
                  <button onClick={() => setM2(m => m + 1)} style={{ padding: '10px 18px', background: 'none', border: 'none', cursor: 'pointer', color: '#c9a84c', fontSize: '1.1rem' }}>+</button>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#8a7a60' }}>{t('Total', 'Total')}</div>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.6rem', color: '#c9a84c' }}>€{totalPrice}</div>
                </div>
              </div>
            </div>

            {/* Sepete ekle */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
              <button onClick={handleAddToCart} style={{
                flex: 1, padding: '16px', background: added ? '#5a8a5a' : '#c9a84c', border: 'none',
                color: '#1a1208', fontFamily: 'var(--font-jost)', fontSize: '0.7rem',
                letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.3s',
              }}>
                {added ? `✓ ${t('Added to Cart!', 'Lagt i Kurv!')}` : t('Add to Cart', 'Legg i Handlekurv')}
              </button>
              <button style={{ padding: '16px 20px', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', cursor: 'pointer', fontSize: '1.1rem' }}>
                ♡
              </button>
            </div>

            {/* Ücretsiz kargo */}
            <div style={{ display: 'flex', gap: 20, marginBottom: 32, flexWrap: 'wrap' }}>
              {[
                { icon: '🚚', text: t('Free shipping over €500', 'Gratis frakt over €500') },
                { icon: '📦', text: t('Free samples available', 'Gratis prøver tilgjengelig') },
                { icon: '↩️', text: t('30-day returns', '30-dagers retur') },
              ].map((item) => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                  <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.65rem', color: '#7a6a50' }}>{item.text}</span>
                </div>
              ))}
            </div>

            <div style={{ height: 1, background: 'rgba(201,168,76,0.15)', marginBottom: 28 }} />

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
              {[
                { key: 'desc', label: t('Description', 'Beskrivelse') },
                { key: 'specs', label: t('Specifications', 'Spesifikasjoner') },
                { key: 'delivery', label: t('Delivery', 'Levering') },
              ].map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key as any)} style={{
                  padding: '12px 20px', background: 'none', border: 'none',
                  borderBottom: activeTab === tab.key ? '2px solid #c9a84c' : '2px solid transparent',
                  color: activeTab === tab.key ? '#c9a84c' : '#8a7a60',
                  fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.15em',
                  textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'desc' && (
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.76rem', color: '#6a5a40', lineHeight: 2.1 }}>
                {description}
              </div>
            )}

            {activeTab === 'specs' && (
              <div>
                {product.specs.map((spec: any) => (
                  <div key={spec.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                    <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#8a7a60' }}>{spec.label}</span>
                    <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#2c1e0a', fontWeight: 400 }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'delivery' && (
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.76rem', color: '#6a5a40', lineHeight: 2.1 }}>
                <p>🇳🇴 <strong>Norway:</strong> 3-5 business days — Free over €500</p>
                <p>🇸🇪 <strong>Sweden:</strong> 4-6 business days — Free over €500</p>
                <p>🇫🇮 <strong>Finland:</strong> 5-7 business days — Free over €600</p>
                <p>🇩🇪 <strong>Germany:</strong> 5-8 business days — Free over €700</p>
                <p>🇬🇧 <strong>UK:</strong> 6-10 business days — Free over €800</p>
                <br />
                <p style={{ color: '#8a7a60', fontSize: '0.68rem' }}>
                  {t('All orders are tracked. You will receive a confirmation email with tracking number once your order ships.', 'Alle bestillinger spores. Du vil motta en bekreftelse med sporingsnummer når bestillingen din sendes.')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}