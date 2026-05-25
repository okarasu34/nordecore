'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import CartDrawer from '@/components/cart/CartDrawer'
import ProductCard from '@/components/product/ProductCard'
import { useLocaleStore } from '@/store/locale'

const ALL_PRODUCTS = [
  {
    id: '1', name: 'Nordic Oak — Wide Plank', nameNo: 'Nordisk Eik — Bred Planke',
    slug: 'nordic-oak-wide-plank',
    description: 'Brushed solid oak with natural grain variation. Available in 5 finishes.',
    descriptionNo: 'Børstet massiv eik med naturlig kornvariasjon.',
    price: 89,
    category: { id: '1', name: 'Wood Cladding', nameNo: 'Trekledning', slug: 'wood-cladding', order: 1 },
    colors: [{ id: 'c1', name: 'Natural Oak', hex: '#8B6040' }, { id: 'c2', name: 'Dark Walnut', hex: '#4A3020' }, { id: 'c3', name: 'Light Ash', hex: '#C8B090' }, { id: 'c4', name: 'Smoked Oak', hex: '#6A5030' }],
    sizes: [], images: [], badge: 'Bestseller', texture: 'wood', stock: 100, featured: true, active: true, createdAt: '',
  },
  {
    id: '2', name: 'Calacatta Gold — Slab', nameNo: 'Calacatta Gull — Plate',
    slug: 'calacatta-gold-slab',
    description: 'High-pressure laminate marble-look panels. Waterproof and heat resistant.',
    descriptionNo: 'Høytrykklaminatplater. Vanntett og varmebestandig.',
    price: 124,
    category: { id: '2', name: 'Marble Panels', nameNo: 'Marmorplater', slug: 'marble-panels', order: 2 },
    colors: [{ id: 'c5', name: 'White Gold', hex: '#D4C8B0' }, { id: 'c6', name: 'Black', hex: '#2A2820' }, { id: 'c7', name: 'Grey', hex: '#8A8070' }],
    sizes: [], images: [], badge: 'New', texture: 'marble', stock: 50, featured: true, active: true, createdAt: '',
  },
  {
    id: '3', name: 'Herringbone Oak — Classic', nameNo: 'Fiskebein Eik — Klassisk',
    slug: 'herringbone-oak-classic',
    description: 'Engineered 3-layer herringbone parquet. Compatible with underfloor heating.',
    descriptionNo: 'Konstruert 3-lags fiskebeinparkett.',
    price: 76,
    category: { id: '3', name: 'Parquet', nameNo: 'Parkett', slug: 'parquet', order: 3 },
    colors: [{ id: 'c8', name: 'Honey', hex: '#6A4820' }, { id: 'c9', name: 'Sand', hex: '#9A7840' }, { id: 'c10', name: 'Espresso', hex: '#3A2810' }],
    sizes: [], images: [], badge: 'Popular', texture: 'herringbone', stock: 75, featured: true, active: true, createdAt: '',
  },
  {
    id: '4', name: 'Arctic Grey — LVT Click', nameNo: 'Arktisk Grå — LVT Klikk',
    slug: 'arctic-grey-lvt-click',
    description: '4.5mm SPC rigid core luxury vinyl tile. 100% waterproof.',
    descriptionNo: '4,5mm SPC stiv kjerne luksusvinylflise.',
    price: 48,
    category: { id: '4', name: 'Luxury Vinyl', nameNo: 'Luksusvinyl', slug: 'luxury-vinyl', order: 4 },
    colors: [{ id: 'c11', name: 'Arctic Grey', hex: '#8A9AA8' }, { id: 'c12', name: 'Storm', hex: '#4A5A68' }, { id: 'c13', name: 'Frost', hex: '#C8D0D8' }],
    sizes: [], images: [], badge: null, texture: 'vinyl', stock: 200, featured: true, active: true, createdAt: '',
  },
  {
    id: '5', name: 'Nero Marquina — Matte', nameNo: 'Nero Marquina — Matt',
    slug: 'nero-marquina-matte',
    description: 'Deep black marble-look panel with fine gold veining.',
    descriptionNo: 'Dypt svart marmorlignende plate med fin gullåring.',
    price: 156,
    category: { id: '2', name: 'Marble Panels', nameNo: 'Marmorplater', slug: 'marble-panels', order: 2 },
    colors: [{ id: 'c14', name: 'Jet Black', hex: '#1a1a18' }, { id: 'c15', name: 'Warm Black', hex: '#2A2015' }],
    sizes: [], images: [], badge: 'Exclusive', texture: 'blackmarble', stock: 30, featured: true, active: true, createdAt: '',
  },
  {
    id: '6', name: 'American Walnut — Smoked', nameNo: 'Amerikansk Valnøtt — Røkt',
    slug: 'american-walnut-smoked',
    description: 'Thermally modified American walnut. Rich dark tone.',
    descriptionNo: 'Termisk modifisert amerikansk valnøtt.',
    price: 112,
    category: { id: '1', name: 'Wood Cladding', nameNo: 'Trekledning', slug: 'wood-cladding', order: 1 },
    colors: [{ id: 'c16', name: 'Dark Smoke', hex: '#3A2010' }, { id: 'c17', name: 'Ebony', hex: '#201008' }, { id: 'c18', name: 'Cognac', hex: '#5A3820' }],
    sizes: [], images: [], badge: null, texture: 'walnut', stock: 60, featured: false, active: true, createdAt: '',
  },
  {
    id: '7', name: 'White Oak — Chevron', nameNo: 'Hvit Eik — Chevron',
    slug: 'white-oak-chevron',
    description: 'Elegant chevron pattern white oak parquet. UV lacquered finish.',
    descriptionNo: 'Elegant chevronmønster hvit eik parkett.',
    price: 95,
    category: { id: '3', name: 'Parquet', nameNo: 'Parkett', slug: 'parquet', order: 3 },
    colors: [{ id: 'c19', name: 'White Oak', hex: '#D4C0A0' }, { id: 'c20', name: 'Natural', hex: '#B09070' }],
    sizes: [], images: [], badge: 'New', texture: 'herringbone', stock: 45, featured: false, active: true, createdAt: '',
  },
  {
    id: '8', name: 'Statuario White — Gloss', nameNo: 'Statuario Hvit — Gloss',
    slug: 'statuario-white-gloss',
    description: 'Brilliant white marble-look panel with subtle grey veining.',
    descriptionNo: 'Brilliant hvit marmorlignende plate med subtil grå åring.',
    price: 138,
    category: { id: '2', name: 'Marble Panels', nameNo: 'Marmorplater', slug: 'marble-panels', order: 2 },
    colors: [{ id: 'c21', name: 'Brilliant White', hex: '#F0EDE8' }, { id: 'c22', name: 'Warm White', hex: '#E8E0D0' }],
    sizes: [], images: [], badge: null, texture: 'marble', stock: 40, featured: false, active: true, createdAt: '',
  },
] as any[]

const CATEGORY_INFO: Record<string, { name: string; nameNo: string; desc: string; descNo: string; texture: string }> = {
  'wood-cladding':    { name: 'Wood Cladding',    nameNo: 'Trekledning',       desc: 'Premium solid and engineered wood panels for interior walls and feature surfaces.',    descNo: 'Premium massiv og konstruert treplanker for innvendige vegger.', texture: 'wood' },
  'marble-panels':   { name: 'Marble Panels',    nameNo: 'Marmorplater',      desc: 'Luxury marble-look panels combining timeless beauty with modern durability.',          descNo: 'Luksuriøse marmorlignende plater som kombinerer tidløs skjønnhet.', texture: 'marble' },
  'parquet':         { name: 'Parquet',           nameNo: 'Parkett',           desc: 'Engineered and solid parquet flooring in classic and contemporary patterns.',          descNo: 'Konstruert og massiv parkett i klassiske og moderne mønstre.', texture: 'herringbone' },
  'luxury-vinyl':    { name: 'Luxury Vinyl',      nameNo: 'Luksusvinyl',       desc: '100% waterproof luxury vinyl tiles and planks for every room in your home.',          descNo: '100% vanntette luksusvinylfliser og -planker for ethvert rom.', texture: 'vinyl' },
  'stone-tiles':     { name: 'Stone Tiles',       nameNo: 'Steinfliser',       desc: 'Natural and engineered stone tiles for floors, walls and outdoor spaces.',             descNo: 'Naturlige og konstruerte steinfliser for gulv, vegger og utendørs.', texture: 'stone' },
  'exterior-cladding': { name: 'Exterior Cladding', nameNo: 'Utvendig kledning', desc: 'Durable exterior cladding solutions designed for the Nordic climate.',               descNo: 'Holdbare utvendige kledningsløsninger designet for nordisk klima.', texture: 'exterior' },
}

const TEXTURE_BG: Record<string, string> = {
  wood:        'linear-gradient(160deg,#4a3218,#6a4a28,#3a2410)',
  marble:      'linear-gradient(135deg,#3a3835,#4a4540,#2e2c28)',
  herringbone: 'linear-gradient(160deg,#3e3018,#504028,#2e2210)',
  vinyl:       'linear-gradient(135deg,#2a2e3a,#323845,#222630)',
  stone:       'linear-gradient(135deg,#3e3a32,#4e4a40,#2e2c25)',
  exterior:    'linear-gradient(135deg,#2e3828,#3a4832,#222c1e)',
}

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
]

export default function CategoryPage() {
  const params = useParams()
  const slug = params?.slug as string
  const { locale, t } = useLocaleStore()
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300])

  const catInfo = CATEGORY_INFO[slug]
  const products = ALL_PRODUCTS.filter(p => p.category.slug === slug)

  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price
    if (sortBy === 'price_desc') return b.price - a.price
    if (sortBy === 'featured') return b.featured ? 1 : -1
    return 0
  }).filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

  if (!catInfo) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f0e8' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', color: '#2c1e0a', marginBottom: 16 }}>Category not found</div>
          <a href="/" style={{ fontFamily: 'var(--font-jost)', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase' }}>← Back to Home</a>
        </div>
      </div>
    )
  }

  const name = locale === 'no' ? catInfo.nameNo : catInfo.name
  const desc = locale === 'no' ? catInfo.descNo : catInfo.desc

  return (
    <>
      <Navbar />
      <CartDrawer />

      <div style={{ background: '#f5f0e8', minHeight: '100vh', paddingTop: 60 }}>

        {/* Hero banner */}
        <div style={{ height: 280, position: 'relative', overflow: 'hidden', background: TEXTURE_BG[catInfo.texture] }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(20,14,6,0.75) 0%,rgba(20,14,6,0.35) 60%,rgba(20,14,6,0.65) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 60px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ width: 26, height: 1, background: '#c9a84c', display: 'block' }} />
                {t('Collections', 'Kolleksjoner')}
              </div>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, color: '#faf8f4', marginBottom: 14 }}>
                {name}
              </div>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.76rem', color: '#b0a080', lineHeight: 2, maxWidth: 480 }}>
                {desc}
              </div>
            </div>
          </div>
          {/* Breadcrumb */}
          <div style={{ position: 'absolute', bottom: 20, left: 60, fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.15em', color: '#8a7a60' }}>
            <a href="/" style={{ color: '#8a7a60', textDecoration: 'none' }}>Home</a>
            <span style={{ margin: '0 10px', color: '#c9a84c' }}>→</span>
            <span style={{ color: '#d4c4a0' }}>{name}</span>
          </div>
        </div>

        {/* İçerik */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 0 }}>

          {/* Sol — Filtreler */}
          <div style={{ padding: '40px 32px', borderRight: '1px solid rgba(201,168,76,0.12)', background: '#f0ebe0', minHeight: 'calc(100vh - 340px)' }}>

            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 24 }}>
              {t('Filter & Sort', 'Filtrer & Sorter')}
            </div>

            {/* Sıralama */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a5a40', marginBottom: 12 }}>
                {t('Sort By', 'Sorter etter')}
              </div>
              {SORT_OPTIONS.map(opt => (
                <button key={opt.value} onClick={() => setSortBy(opt.value)} style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '8px 12px', marginBottom: 4,
                  fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: sortBy === opt.value ? '#c9a84c' : '#6a5a40',
                  background: sortBy === opt.value ? 'rgba(201,168,76,0.08)' : 'none',
                  border: `1px solid ${sortBy === opt.value ? 'rgba(201,168,76,0.3)' : 'transparent'}`,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  {sortBy === opt.value ? '→ ' : ''}{opt.label}
                </button>
              ))}
            </div>

            {/* Fiyat aralığı */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a5a40', marginBottom: 12 }}>
                {t('Max Price', 'Maks Pris')} — €{priceRange[1]}/m²
              </div>
              <input
                type="range" min={0} max={300} step={10}
                value={priceRange[1]}
                onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                style={{ width: '100%', accentColor: '#c9a84c' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#8a7a60' }}>€0</span>
                <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#8a7a60' }}>€300</span>
              </div>
            </div>

            {/* Tüm kategoriler */}
            <div>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a5a40', marginBottom: 12 }}>
                {t('All Categories', 'Alle Kategorier')}
              </div>
              {Object.entries(CATEGORY_INFO).map(([catSlug, cat]) => (
                <a key={catSlug} href={`/category/${catSlug}`} style={{
                  display: 'block', padding: '8px 12px', marginBottom: 4,
                  fontFamily: 'var(--font-jost)', fontSize: '0.68rem',
                  color: catSlug === slug ? '#c9a84c' : '#6a5a40',
                  background: catSlug === slug ? 'rgba(201,168,76,0.08)' : 'none',
                  border: `1px solid ${catSlug === slug ? 'rgba(201,168,76,0.3)' : 'transparent'}`,
                  textDecoration: 'none', transition: 'all 0.2s',
                }}>
                  {locale === 'no' ? cat.nameNo : cat.name}
                </a>
              ))}
            </div>
          </div>

          {/* Sağ — Ürünler */}
          <div style={{ padding: '40px' }}>

            {/* Üst bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#8a7a60' }}>
                {sorted.length} {t('products', 'produkter')}
              </div>
            </div>

            {/* Ürün grid */}
            {sorted.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: '#8a7a60', marginBottom: 12 }}>
                  {t('No products found', 'Ingen produkter funnet')}
                </div>
                <button onClick={() => setPriceRange([0, 300])} style={{ fontFamily: 'var(--font-jost)', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#c9a84c', background: 'none', border: '1px solid rgba(201,168,76,0.3)', padding: '10px 24px', cursor: 'pointer', textTransform: 'uppercase' }}>
                  {t('Reset Filters', 'Nullstill filtre')}
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3 }}>
                {sorted.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}