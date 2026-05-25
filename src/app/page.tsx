import { prisma } from '@/lib/prisma'
import Navbar from '@/components/layout/Navbar'
import VideoHero from '@/components/layout/VideoHero'
import StatsBar from '@/components/layout/StatsBar'
import CartDrawer from '@/components/cart/CartDrawer'
import ProductCard from '@/components/product/ProductCard'

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

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { active: true, featured: true },
      include: {
        category: true,
        brand: true,
        colors: true,
        sizes: true,
        images: { orderBy: { order: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
      take: 6,
    })
    return products
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    })
    return categories
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

const CATEGORY_TEXTURES: Record<string, string> = {
  'wood-cladding': 'wood',
  'marble-panels': 'marble',
  'parquet': 'herringbone',
  'luxury-vinyl': 'vinyl',
  'stone-tiles': 'stone',
  'exterior-cladding': 'exterior',
}

export default async function HomePage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  return (
    <>
      <Navbar />
      <CartDrawer />

      {/* Hero */}
      <VideoHero />

      {/* Stats */}
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

        {categories.length > 0 && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 3, height: 280, marginBottom: 3 }}>
              {categories.slice(0, 3).map((cat) => {
                const textureKey = CATEGORY_TEXTURES[cat.slug] ?? 'wood'
                const t = TEXTURE_STYLES[textureKey]
                return (
                  <a key={cat.slug} href={`/category/${cat.slug}`} style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', display: 'block', textDecoration: 'none' }}>
                    <div style={{ position: 'absolute', inset: 0, background: t.bg }}>
                      <div style={{ position: 'absolute', inset: 0, backgroundImage: t.overlay }} />
                    </div>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 30%,rgba(16,10,4,0.85) 100%)' }} />
                    <div style={{ position: 'absolute', top: 12, right: 12, width: 26, height: 26, border: '1px solid rgba(201,168,76,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c', fontSize: '11px' }}>↗</div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 22px' }}>
                      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', fontWeight: 300, color: '#faf8f4' }}>{cat.name}</div>
                      <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.56rem', letterSpacing: '0.25em', color: '#c9a84c', textTransform: 'uppercase', marginTop: 4 }}>View Collection</div>
                    </div>
                  </a>
                )
              })}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3, height: 120 }}>
              {categories.slice(3, 6).map((cat) => {
                const textureKey = CATEGORY_TEXTURES[cat.slug] ?? 'wood'
                const t = TEXTURE_STYLES[textureKey]
                return (
                  <a key={cat.slug} href={`/category/${cat.slug}`} style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', display: 'block', textDecoration: 'none' }}>
                    <div style={{ position: 'absolute', inset: 0, background: t.bg }}>
                      <div style={{ position: 'absolute', inset: 0, backgroundImage: t.overlay }} />
                    </div>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 20%,rgba(16,10,4,0.85) 100%)' }} />
                    <div style={{ position: 'absolute', top: 10, right: 10, width: 22, height: 22, border: '1px solid rgba(201,168,76,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c', fontSize: '10px' }}>↗</div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px' }}>
                      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', fontWeight: 300, color: '#faf8f4' }}>{cat.name}</div>
                      <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.52rem', letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase', marginTop: 2 }}>View</div>
                    </div>
                  </a>
                )
              })}
            </div>
          </>
        )}
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

        {products.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3 }}>
            {products.map((p) => <ProductCard key={p.id} product={p as any} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', color: '#8a7a60' }}>
            No products found
          </div>
        )}
      </section>

      {/* Featured Banner */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
        <div style={{ padding: '80px 60px', background: '#f0ebe0' }}>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 26, height: 1, background: '#c9a84c', display: 'block' }} />
            The Nordecore Standard
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
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.5rem', letterSpacing: '0.4em', color: '#c9a84c' }}>NORDECORE</div>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#5a4a30', lineHeight: 2, marginTop: 14, maxWidth: 220 }}>
            Premium surface materials for discerning interiors. Delivered across Europe and Scandinavia.
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
      <div style={{ background: '#1e1408', padding: '16px 60px', borderTop: '1px solid rgba(201,168,76,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.56rem', color: '#4a3a28', letterSpacing: '0.15em' }}>© 2025 NORDECORE — All rights reserved</div>
        <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.56rem', color: '#4a3a28', display: 'flex', alignItems: 'center', gap: 8 }}>
          Payments secured by <span style={{ background: '#635bff', color: '#fff', padding: '2px 8px', fontSize: '0.5rem', fontWeight: 700 }}>stripe</span>
        </div>
      </div>
    </>
  )
}