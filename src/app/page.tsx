'use client'
import Navbar from '@/components/layout/Navbar'
import VideoHero from '@/components/layout/VideoHero'
import StatsBar from '@/components/layout/StatsBar'
import CartDrawer from '@/components/cart/CartDrawer'
import ProductCard from '@/components/product/ProductCard'

const MOCK_PRODUCTS = [
  {
    id: '1', name: 'Nordic Oak — Wide Plank', nameNo: 'Nordisk Eik — Bred Planke',
    slug: 'nordic-oak-wide-plank',
    description: 'Brushed solid oak with natural grain variation. Available in 5 finishes, compatible with underfloor heating.',
    descriptionNo: 'Børstet massiv eik med naturlig kornvariasjon.',
    price: 89,
    category: { id: '1', name: 'Wood Cladding', nameNo: 'Trekledning', slug: 'wood-cladding', order: 1 },
    colors: [{ id: 'c1', name: 'Natural Oak', hex: '#8B6040' }, { id: 'c2', name: 'Dark Walnut', hex: '#4A3020' }, { id: 'c3', name: 'Light Ash', hex: '#C8B090' }, { id: 'c4', name: 'Smoked Oak', hex: '#6A5030' }],
    sizes: [], images: [], badge: 'Bestseller', texture: 'wood', stock: 100, featured: true, active: true, createdAt: '',
  },
  {
    id: '2', name: 'Calacatta Gold — Slab', nameNo: 'Calacatta Gull — Plate',
    slug: 'calacatta-gold-slab',
    description: 'High-pressure laminate marble-look panels. Waterproof and heat resistant up to 180°C.',
    descriptionNo: 'Høytrykklaminatplater. Vanntett og varmebestandig.',
    price: 124,
    category: { id: '2', name: 'Marble Panels', nameNo: 'Marmorplater', slug: 'marble-panels', order: 2 },
    colors: [{ id: 'c5', name: 'White Gold', hex: '#D4C8B0' }, { id: 'c6', name: 'Black', hex: '#2A2820' }, { id: 'c7', name: 'Grey', hex: '#8A8070' }],
    sizes: [], images: [], badge: 'New', texture: 'marble', stock: 50, featured: true, active: true, createdAt: '',
  },
  {
    id: '3', name: 'Herringbone Oak — Classic', nameNo: 'Fiskebein Eik — Klassisk',
    slug: 'herringbone-oak-classic',
    description: 'Engineered 3-layer herringbone parquet. Compatible with all underfloor heating systems.',
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
    description: 'Thermally modified American walnut. Rich dark tone for interior walls.',
    descriptionNo: 'Termisk modifisert amerikansk valnøtt.',
    price: 112,
    category: { id: '1', name: 'Wood Cladding', nameNo: 'Trekledning', slug: 'wood-cladding', order: 1 },
    colors: [{ id: 'c16', name: 'Dark Smoke', hex: '#3A2010' }, { id: 'c17', name: 'Ebony', hex: '#201008' }, { id: 'c18', name: 'Cognac', hex: '#5A3820' }],
    sizes: [], images: [], badge: null, texture: 'walnut', stock: 60, featured: true, active: true, createdAt: '',
  },
] as any[]

const CATEGORIES = [
  { name: 'Wood Cladding', nameNo: 'Trekledning', count: 84, slug: 'wood-cladding', texture: 'wood' },
  { name: 'Marble Panels', nameNo: 'Marmorplater', count: 62, slug: 'marble-panels', texture: 'marble' },
  { name: 'Parquet', nameNo: 'Parkett', count: 58, slug: 'parquet', texture: 'herringbone' },
  { name: 'Luxury Vinyl', nameNo: 'Luksusvinyl', count: 47, slug: 'luxury-vinyl', texture: 'vinyl' },
  { name: 'Stone Tiles', nameNo: 'Steinfliser', count: 38, slug: 'stone-tiles', texture: 'stone' },
  { name: 'Exterior Cladding', nameNo: 'Utvendig kledning', count: 31, slug: 'exterior-cladding', texture: 'exterior' },
]

const TEXTURE_STYLES: Record<string, { bg: string; overlay: string }> = {
  wood:        { bg: 'linear-gradient(160deg,#4a3218,#6a4a28,#3a2410)', overlay: 'repeating-linear-gradient(170deg,transparent 0,rgba(210,155,70,0.07) 2px,transparent 4px,transparent 32px)' },
  marble:      { bg: 'linear-gradient(135deg,#3a3835,#4a4540,#2e2c28)', overlay: 'radial-gradient(ellipse at 30% 40%,rgba(201,168,76,0.1),transparent 50%)' },
  herringbone: { bg: 'linear-gradient(160deg,#3e3018,#504028,#2e2210)', overlay: 'repeating-linear-gradient(45deg,rgba(170,120,45,0.08) 0,rgba(170,120,45,0.08) 10px,transparent 10px,transparent 20px)' },
  vinyl:       { bg: 'linear-gradient(135deg,#2a2e3a,#323845,#222630)', overlay: 'radial-gradient(circle at 60% 35%,rgba(100,140,200,0.08),transparent 55%)' },
  stone:       { bg: 'linear-gradient(135deg,#3e3a32,#4e4a40,#2e2c25)', overlay: 'repeating-linear-gradient(55deg,transparent 0,rgba(200,180,140,0.05) 1px,transparent 2px,transparent 60px)' },
  exterior:    { bg: 'linear-gradient(135deg,#2e3828,#3a4832,#222c1e)', overlay: 'repeating-linear-gradient(90deg,transparent 0,rgba(100,140,80,0.06) 1px,transparent 2px,transparent 50px)' },
  blackmarble: { bg: 'linear-gradient(135deg,#1e1e1c,#2a2820,#161614)', overlay: 'repeating-linear-gradient(132deg,transparent 0,rgba(201,168,76,0.07) 1px,transparent 2px,transparent 95px)' },
  walnut:      { bg: 'linear-gradient(160deg,#2e2018,#3e2a18,#221408)', overlay: 'repeating-linear-gradient(172deg,transparent 0,rgba(160,100,35,0.1) 2px,transparent 4px,transparent 28px)' },
}

const SOCIAL_LINKS = [
  {
    label: 'Instagram', url: 'https://instagram.com/deconor', color: '#E1306C',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="#E1306C" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Facebook', url: 'https://facebook.com/deconor', color: '#1877F2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube', url: 'https://youtube.com/@deconor', color: '#FF0000',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" fill="#FF0000"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff"/>
      </svg>
    ),
  },
  {
    label: 'Pinterest', url: 'https://pinterest.com/deconor', color: '#E60023',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#E60023">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.64 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.137-1.867 3.137-4.562 0-2.387-1.715-4.055-4.163-4.055-2.838 0-4.502 2.129-4.502 4.332 0 .857.33 1.776.741 2.279a.3.3 0 0 1 .069.284c-.076.31-.243.995-.276 1.134-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
      </svg>
    ),
  },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <VideoHero />
      <StatsBar />

      {/* Kategoriler */}
      <section style={{ padding: '80px 60px', background: '#f5f0e8' }}>
        <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 26, height: 1, background: '#c9a84c', display: 'block' }} />
          Our Collections
        </div>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.2rem,4vw,3.5rem)', fontWeight: 300, color: '#2c1e0a', marginBottom: 8 }}>
          Explore by <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>Material</em>
        </div>
        <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.76rem', color: '#7a6a50', lineHeight: 2, maxWidth: 440, marginBottom: 44 }}>
          Six distinct material families — from the warmth of solid oak to the drama of black marble.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 3, height: 280, marginBottom: 3 }}>
          {CATEGORIES.slice(0, 3).map((cat) => {
            const t = TEXTURE_STYLES[cat.texture]
            return (
              <a key={cat.slug} href={`/category/${cat.slug}`} style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', display: 'block', textDecoration: 'none' }}>
                <div style={{ position: 'absolute', inset: 0, background: t.bg }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: t.overlay }} />
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 30%,rgba(16,10,4,0.85) 100%)' }} />
                <div style={{ position: 'absolute', top: 12, right: 12, width: 26, height: 26, border: '1px solid rgba(201,168,76,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c', fontSize: '11px' }}>↗</div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 22px' }}>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', fontWeight: 300, color: '#faf8f4' }}>{cat.name}</div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.56rem', letterSpacing: '0.25em', color: '#c9a84c', textTransform: 'uppercase', marginTop: 4 }}>{cat.count} products</div>
                </div>
              </a>
            )
          })}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3, height: 120 }}>
          {CATEGORIES.slice(3).map((cat) => {
            const t = TEXTURE_STYLES[cat.texture]
            return (
              <a key={cat.slug} href={`/category/${cat.slug}`} style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', display: 'block', textDecoration: 'none' }}>
                <div style={{ position: 'absolute', inset: 0, background: t.bg }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: t.overlay }} />
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 20%,rgba(16,10,4,0.85) 100%)' }} />
                <div style={{ position: 'absolute', top: 10, right: 10, width: 22, height: 22, border: '1px solid rgba(201,168,76,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c', fontSize: '10px' }}>↗</div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px' }}>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', fontWeight: 300, color: '#faf8f4' }}>{cat.name}</div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.52rem', letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase', marginTop: 2 }}>{cat.count} products</div>
                </div>
              </a>
            )
          })}
        </div>
      </section>

      {/* Ürünler */}
      <section style={{ padding: '20px 60px 80px', background: '#ede8dc' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 26, height: 1, background: '#c9a84c', display: 'block' }} />
              Featured Products
            </div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 300, color: '#2c1e0a' }}>
              Best <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>Sellers</em>
            </div>
          </div>
          <a href="/collections" style={{ fontFamily: 'var(--font-jost)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a84c', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)', paddingBottom: 2 }}>
            View All →
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3 }}>
          {MOCK_PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Featured Banner */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
        <div style={{ padding: '80px 60px', background: '#f0ebe0' }}>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 26, height: 1, background: '#c9a84c', display: 'block' }} />
            The Deconor Standard
          </div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 300, lineHeight: 1.1, color: '#2c1e0a', marginBottom: 16 }}>
            Crafted for<br /><em style={{ fontStyle: 'italic', color: '#c9a84c' }}>Scandinavian</em><br />Interiors
          </div>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.75rem', color: '#7a6a50', lineHeight: 2.1, marginBottom: 28 }}>
            Every panel, plank and tile is selected for its ability to endure the Nordic climate while elevating the spaces it touches.
          </div>
          <ul style={{ listStyle: 'none', marginBottom: 36 }}>
            {['Free sample delivery — 3 business days', 'Certified interior design specialists', 'Custom sizing on all wood products', 'Carbon-neutral shipping across Europe'].map((item) => (
              <li key={item} style={{ fontFamily: 'var(--font-jost)', fontSize: '0.72rem', color: '#5a4a30', padding: '10px 0', borderBottom: '1px solid rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ color: '#c9a84c' }}>—</span>{item}
              </li>
            ))}
          </ul>
          <a href="/samples" style={{ background: '#c9a84c', color: '#1a1208', border: 'none', padding: '14px 40px', fontFamily: 'var(--font-jost)', fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
            Request Samples
          </a>
        </div>
        <div style={{ background: '#3e2e18', position: 'relative', overflow: 'hidden', minHeight: 420 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(180,130,50,0.08) 0,rgba(180,130,50,0.08) 1px,transparent 1px,transparent 28px)' }} />
          <div style={{ position: 'absolute', bottom: 24, left: 28, fontFamily: 'var(--font-cormorant)', fontSize: '1rem', color: '#c9a84c', fontStyle: 'italic' }}>
            Herringbone Oak — Oslo Residence 2024
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#2a1e0e', padding: '60px', borderTop: '1px solid rgba(201,168,76,0.2)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.5rem', letterSpacing: '0.4em', color: '#c9a84c' }}>DECONOR</div>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#5a4a30', lineHeight: 2, marginTop: 14, maxWidth: 220 }}>
            Premium surface materials for discerning interiors. Delivered across Europe and Scandinavia.
          </div>
          {/* Sosyal Medya */}
          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            {SOCIAL_LINKS.map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label} style={{
                width: 36, height: 36,
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', textDecoration: 'none', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.2)'; (e.currentTarget as HTMLElement).style.borderColor = '#c9a84c' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)' }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        {[
          { title: 'Collections', links: ['Wood Cladding', 'Marble Panels', 'Parquet', 'Luxury Vinyl', 'Stone Tiles'] },
          { title: 'Company', links: ['About Us', 'Projects', 'Sustainability', 'Press', 'Careers'] },
          { title: 'Support', links: ['Order Tracking', 'Returns', 'Installation Guide', 'Contact', 'FAQ'] },
        ].map((col) => (
          <div key={col.title}>
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 18 }}>{col.title}</div>
            {col.links.map((l) => (
              <a key={l} href="#" style={{ display: 'block', fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#5a4a30', textDecoration: 'none', marginBottom: 10 }}>{l}</a>
            ))}
          </div>
        ))}
      </footer>

      {/* Footer Bottom */}
      <div style={{ background: '#1e1408', padding: '16px 60px', borderTop: '1px solid rgba(201,168,76,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.56rem', color: '#4a3a28', letterSpacing: '0.15em' }}>© 2025 DECONOR — All rights reserved</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            {SOCIAL_LINKS.map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-jost)', fontSize: '0.56rem', color: '#4a3a28', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#c9a84c'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#4a3a28'}
              >
                {s.label}
              </a>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.56rem', color: '#4a3a28', display: 'flex', alignItems: 'center', gap: 8 }}>
            Payments secured by <span style={{ background: '#635bff', color: '#fff', padding: '2px 8px', fontSize: '0.5rem', fontWeight: 700 }}>stripe</span>
          </div>
        </div>
      </div>
    </>
  )
}