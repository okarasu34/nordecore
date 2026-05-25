'use client'
import { useState } from 'react'
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
  {
    id: '9', name: 'Pine — Rustic Wide', nameNo: 'Furu — Rustikk Bred',
    slug: 'pine-rustic-wide',
    description: 'Rustic wide plank pine with authentic knots and natural character.',
    descriptionNo: 'Rustikk bred planke furu med autentiske kvistet.',
    price: 62,
    category: { id: '1', name: 'Wood Cladding', nameNo: 'Trekledning', slug: 'wood-cladding', order: 1 },
    colors: [{ id: 'c23', name: 'Natural Pine', hex: '#C8A870' }, { id: 'c24', name: 'Honey', hex: '#A88050' }],
    sizes: [], images: [], badge: null, texture: 'wood', stock: 80, featured: false, active: true, createdAt: '',
  },
] as any[]

const CATEGORIES = [
  { id: 'all', name: 'All', nameNo: 'Alle' },
  { id: '1', name: 'Wood Cladding', nameNo: 'Trekledning' },
  { id: '2', name: 'Marble Panels', nameNo: 'Marmorplater' },
  { id: '3', name: 'Parquet', nameNo: 'Parkett' },
  { id: '4', name: 'Luxury Vinyl', nameNo: 'Luksusvinyl' },
]

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured', labelNo: 'Fremhevet' },
  { value: 'price_asc', label: 'Price: Low to High', labelNo: 'Pris: Lav til Høy' },
  { value: 'price_desc', label: 'Price: High to Low', labelNo: 'Pris: Høy til Lav' },
  { value: 'newest', label: 'Newest', labelNo: 'Nyeste' },
]

export default function CollectionsPage() {
  const { locale, t } = useLocaleStore()
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(300)
  const [search, setSearch] = useState('')

  const filtered = ALL_PRODUCTS
    .filter(p => activeCategory === 'all' || p.category.id === activeCategory)
    .filter(p => p.price <= maxPrice)
    .filter(p => search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price
      if (sortBy === 'price_desc') return b.price - a.price
      if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      return 0
    })

  return (
    <>
      <Navbar />
      <CartDrawer />

      <div style={{ background: '#f5f0e8', minHeight: '100vh', paddingTop: 60 }}>

        {/* Header */}
        <div style={{ background: '#2a1e0e', padding: '60px', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 26, height: 1, background: '#c9a84c', display: 'block' }} />
            {t('All Collections', 'Alle Kolleksjoner')}
          </div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, color: '#faf8f4', marginBottom: 16 }}>
            {t('Our ', 'Våre ')}<em style={{ fontStyle: 'italic', color: '#c9a84c' }}>{t('Materials', 'Materialer')}</em>
          </div>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.76rem', color: '#b0a080', lineHeight: 2, maxWidth: 500 }}>
            {t('Browse our complete collection of premium surface materials — wood, marble, parquet and vinyl.', 'Bla gjennom vår komplette samling av premium overflatematerialer.')}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 0 }}>

          {/* Sol — Filtreler */}
          <div style={{ padding: '40px 32px', borderRight: '1px solid rgba(201,168,76,0.12)', background: '#f0ebe0', position: 'sticky', top: 60, height: 'fit-content' }}>

            {/* Arama */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a5a40', marginBottom: 10 }}>
                {t('Search', 'Søk')}
              </div>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t('Search products...', 'Søk produkter...')}
                style={{ width: '100%', padding: '10px 14px', fontFamily: 'var(--font-jost)', fontSize: '0.75rem', color: '#2c1e0a', background: '#fff', border: '1px solid rgba(201,168,76,0.3)', outline: 'none' }}
              />
            </div>

            {/* Kategoriler */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a5a40', marginBottom: 12 }}>
                {t('Category', 'Kategori')}
              </div>
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '9px 12px', marginBottom: 4,
                  fontFamily: 'var(--font-jost)', fontSize: '0.72rem',
                  color: activeCategory === cat.id ? '#c9a84c' : '#6a5a40',
                  background: activeCategory === cat.id ? 'rgba(201,168,76,0.08)' : 'none',
                  border: `1px solid ${activeCategory === cat.id ? 'rgba(201,168,76,0.3)' : 'transparent'}`,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  {activeCategory === cat.id ? '→ ' : ''}{locale === 'no' ? cat.nameNo : cat.name}
                </button>
              ))}
            </div>

            {/* Sıralama */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a5a40', marginBottom: 12 }}>
                {t('Sort By', 'Sorter etter')}
              </div>
              {SORT_OPTIONS.map(opt => (
                <button key={opt.value} onClick={() => setSortBy(opt.value)} style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '9px 12px', marginBottom: 4,
                  fontFamily: 'var(--font-jost)', fontSize: '0.72rem',
                  color: sortBy === opt.value ? '#c9a84c' : '#6a5a40',
                  background: sortBy === opt.value ? 'rgba(201,168,76,0.08)' : 'none',
                  border: `1px solid ${sortBy === opt.value ? 'rgba(201,168,76,0.3)' : 'transparent'}`,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  {sortBy === opt.value ? '→ ' : ''}{locale === 'no' ? opt.labelNo : opt.label}
                </button>
              ))}
            </div>

            {/* Fiyat */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a5a40', marginBottom: 12 }}>
                {t('Max Price', 'Maks Pris')} — €{maxPrice}/m²
              </div>
              <input type="range" min={0} max={300} step={10} value={maxPrice} onChange={e => setMaxPrice(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#c9a84c' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#8a7a60' }}>€0</span>
                <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#8a7a60' }}>€300</span>
              </div>
            </div>

            {/* Reset */}
            <button onClick={() => { setActiveCategory('all'); setSortBy('featured'); setMaxPrice(300); setSearch('') }} style={{ width: '100%', padding: '10px', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#8a7a60', fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
              {t('Reset Filters', 'Nullstill')}
            </button>
          </div>

          {/* Sağ — Ürünler */}
          <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#8a7a60' }}>
                {filtered.length} {t('products', 'produkter')}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: '#8a7a60', marginBottom: 16 }}>
                  {t('No products found', 'Ingen produkter funnet')}
                </div>
                <button onClick={() => { setActiveCategory('all'); setMaxPrice(300); setSearch('') }} style={{ fontFamily: 'var(--font-jost)', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#c9a84c', background: 'none', border: '1px solid rgba(201,168,76,0.3)', padding: '10px 24px', cursor: 'pointer', textTransform: 'uppercase' }}>
                  {t('Reset Filters', 'Nullstill filtre')}
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3 }}>
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}