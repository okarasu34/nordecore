'use client'
import { useState, useEffect, useRef } from 'react'

const MOCK_ORDERS = [
  { id: 'ORD001', email: 'erik@example.com', status: 'PAID', total: 1246, items: 2, country: 'NO', date: '2025-05-28' },
  { id: 'ORD002', email: 'ingrid@example.se', status: 'SHIPPED', total: 608, items: 1, country: 'SE', date: '2025-05-27' },
  { id: 'ORD003', email: 'magnus@example.no', status: 'PENDING', total: 2478, items: 3, country: 'NO', date: '2025-05-27' },
  { id: 'ORD004', email: 'sofia@example.de', status: 'DELIVERED', total: 456, items: 1, country: 'DE', date: '2025-05-26' },
  { id: 'ORD005', email: 'lars@example.fi', status: 'PAID', total: 1890, items: 4, country: 'FI', date: '2025-05-26' },
]

const MOCK_PRODUCTS = [
  { id: '1', name: 'Nordic Oak — Wide Plank', category: 'Wood Cladding', price: 89, stock: 100, badge: 'Bestseller', active: true },
  { id: '2', name: 'Calacatta Gold — Slab', category: 'Marble Panels', price: 124, stock: 50, badge: 'New', active: true },
  { id: '3', name: 'Herringbone Oak — Classic', category: 'Parquet', price: 76, stock: 75, badge: 'Popular', active: true },
  { id: '4', name: 'Arctic Grey — LVT Click', category: 'Luxury Vinyl', price: 48, stock: 200, badge: null, active: true },
  { id: '5', name: 'Nero Marquina — Matte', category: 'Marble Panels', price: 156, stock: 30, badge: 'Exclusive', active: true },
  { id: '6', name: 'American Walnut — Smoked', category: 'Wood Cladding', price: 112, stock: 60, badge: null, active: true },
]

const BRANDS = ['Kährs', 'Boen', 'Tarkett', 'Pergo', 'Quick-Step', 'Parador', 'Other']

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  PENDING:   { bg: 'rgba(201,168,76,0.15)', color: '#c9a84c' },
  PAID:      { bg: 'rgba(90,138,90,0.15)', color: '#5a8a5a' },
  SHIPPED:   { bg: 'rgba(90,120,200,0.15)', color: '#5a78c8' },
  DELIVERED: { bg: 'rgba(90,138,90,0.25)', color: '#3a7a3a' },
  CANCELLED: { bg: 'rgba(200,80,80,0.15)', color: '#c85050' },
}

interface Color { name: string; hex: string }
interface Size { width: string; length: string; thickness: string }

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'add'>('dashboard')
  const [saved, setSaved] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [newProduct, setNewProduct] = useState({
    name: '', nameNo: '',
    description: '', descriptionNo: '',
    category: '', brand: '',
    price: '', stock: '',
    texture: 'wood', badge: '',
    featured: false,
  })

  const [colors, setColors] = useState<Color[]>([{ name: '', hex: '#8B6040' }])
  const [sizes, setSizes] = useState<Size[]>([{ width: '', length: '', thickness: '' }])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAdmin = localStorage.getItem('deconor-admin')
      if (!isAdmin) window.location.href = '/admin/login'
    }
  }, [])

  const totalRevenue = MOCK_ORDERS.reduce((s, o) => s + o.total, 0)
  const paidOrders = MOCK_ORDERS.filter(o => ['PAID','SHIPPED','DELIVERED'].includes(o.status)).length

  const addColor = () => setColors(c => [...c, { name: '', hex: '#8B6040' }])
  const removeColor = (i: number) => setColors(c => c.filter((_, idx) => idx !== i))
  const updateColor = (i: number, field: keyof Color, val: string) =>
    setColors(c => c.map((col, idx) => idx === i ? { ...col, [field]: val } : col))

  const addSize = () => setSizes(s => [...s, { width: '', length: '', thickness: '' }])
  const removeSize = (i: number) => setSizes(s => s.filter((_, idx) => idx !== i))
  const updateSize = (i: number, field: keyof Size, val: string) =>
    setSizes(s => s.map((sz, idx) => idx === i ? { ...sz, [field]: val } : sz))

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPreviewUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => { setSaved(false); setActiveTab('products') }, 2000)
  }

  const tabStyle = (tab: string) => ({
    padding: '12px 24px',
    fontFamily: 'var(--font-jost)', fontSize: '0.65rem',
    letterSpacing: '0.15em', textTransform: 'uppercase' as const,
    background: activeTab === tab ? '#c9a84c' : 'none',
    color: activeTab === tab ? '#1a1208' : '#6a5a40',
    border: 'none', cursor: 'pointer', transition: 'all 0.2s',
    borderBottom: activeTab === tab ? '2px solid #c9a84c' : '2px solid transparent',
  })

  const inputStyle = {
    width: '100%', padding: '12px 14px',
    fontFamily: 'var(--font-jost)', fontSize: '0.78rem', color: '#2c1e0a',
    background: '#fff', border: '1px solid rgba(201,168,76,0.3)',
    outline: 'none', borderRadius: '2px',
  }

  const labelStyle = {
    fontFamily: 'var(--font-jost)', fontSize: '0.6rem',
    letterSpacing: '0.2em', textTransform: 'uppercase' as const,
    color: '#6a5a40', marginBottom: 6, display: 'block',
  }

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh' }}>

      {/* Nav */}
      <div style={{ background: '#2a1e0e', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.2rem', letterSpacing: '0.4em', color: '#c9a84c' }}>DECONOR</div>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.2em', color: '#6a5a40', textTransform: 'uppercase' }}>Admin Panel</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button onClick={() => { localStorage.removeItem('deconor-admin'); window.location.href = '/admin/login' }} style={{ background: 'none', border: 'none', fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.15em', color: '#6a5a40', cursor: 'pointer', textTransform: 'uppercase' }}>
            Sign Out
          </button>
          <a href="/" style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.15em', color: '#c9a84c', textDecoration: 'none', textTransform: 'uppercase' }}>
            ← Back to Site
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: '#f0ebe0', borderBottom: '1px solid rgba(201,168,76,0.15)', padding: '0 40px', display: 'flex' }}>
        {[
          { key: 'dashboard', label: '📊 Dashboard' },
          { key: 'orders', label: '📦 Orders' },
          { key: 'products', label: '🪵 Products' },
          { key: 'add', label: '+ Add Product' },
          { key: 'import', label: '📥 Import CSV' },
        ].map(tab => (
          <button key={tab.key} onClick={() => tab.key === 'import' ? window.location.href = '/admin/import' : setActiveTab(tab.key as any)} style={tabStyle(tab.key)}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '40px' }}>

        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', fontWeight: 300, color: '#2c1e0a', marginBottom: 32 }}>Dashboard</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 3, marginBottom: 40 }}>
              {[
                { label: 'Total Revenue', value: `€${totalRevenue.toLocaleString()}`, icon: '💰', color: '#c9a84c' },
                { label: 'Total Orders', value: MOCK_ORDERS.length, icon: '📦', color: '#5a78c8' },
                { label: 'Paid Orders', value: paidOrders, icon: '✅', color: '#5a8a5a' },
                { label: 'Products', value: MOCK_PRODUCTS.length, icon: '🪵', color: '#8a6f30' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.12)', padding: '24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ fontSize: '2rem' }}>{s.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', color: s.color, fontWeight: 300, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#8a7a60', textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', color: '#2c1e0a', marginBottom: 16 }}>Recent Orders</div>
            <div style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.12)', overflow: 'hidden' }}>
              {MOCK_ORDERS.slice(0, 3).map((order, i) => (
                <div key={order.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px 100px 80px', gap: 16, padding: '16px 20px', borderBottom: i < 2 ? '1px solid rgba(201,168,76,0.08)' : 'none', alignItems: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.65rem', color: '#c9a84c', fontWeight: 500 }}>#{order.id}</div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#2c1e0a' }}>{order.email}</div>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', color: '#c9a84c' }}>€{order.total}</div>
                  <div style={{ background: STATUS_COLORS[order.status]?.bg, color: STATUS_COLORS[order.status]?.color, padding: '3px 10px', fontFamily: 'var(--font-jost)', fontSize: '0.56rem', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center' }}>{order.status}</div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#8a7a60' }}>{order.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS */}
        {activeTab === 'orders' && (
          <div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', fontWeight: 300, color: '#2c1e0a', marginBottom: 32 }}>All Orders</div>
            <div style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.12)', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px 80px 100px 80px', gap: 16, padding: '12px 20px', background: '#f0ebe0', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
                {['Order ID', 'Customer', 'Total', 'Items', 'Status', 'Date'].map(h => (
                  <div key={h} style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a7a60' }}>{h}</div>
                ))}
              </div>
              {MOCK_ORDERS.map((order, i) => (
                <div key={order.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px 80px 100px 80px', gap: 16, padding: '16px 20px', borderBottom: i < MOCK_ORDERS.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none', alignItems: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.65rem', color: '#c9a84c', fontWeight: 500 }}>#{order.id}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#2c1e0a' }}>{order.email}</div>
                    <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', color: '#8a7a60' }}>{order.country}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', color: '#c9a84c' }}>€{order.total}</div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#2c1e0a', textAlign: 'center' }}>{order.items}</div>
                  <div style={{ background: STATUS_COLORS[order.status]?.bg, color: STATUS_COLORS[order.status]?.color, padding: '3px 10px', fontFamily: 'var(--font-jost)', fontSize: '0.56rem', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center' }}>{order.status}</div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#8a7a60' }}>{order.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', fontWeight: 300, color: '#2c1e0a' }}>Products</div>
              <button onClick={() => setActiveTab('add')} style={{ background: '#c9a84c', color: '#1a1208', border: 'none', padding: '10px 24px', fontFamily: 'var(--font-jost)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>
                + Add Product
              </button>
            </div>
            <div style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.12)', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 80px 80px 100px 80px', gap: 16, padding: '12px 20px', background: '#f0ebe0', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
                {['Product', 'Category', 'Price', 'Stock', 'Badge', 'Status'].map(h => (
                  <div key={h} style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a7a60' }}>{h}</div>
                ))}
              </div>
              {MOCK_PRODUCTS.map((p, i) => (
                <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '1fr 160px 80px 80px 100px 80px', gap: 16, padding: '16px 20px', borderBottom: i < MOCK_PRODUCTS.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none', alignItems: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', color: '#2c1e0a' }}>{p.name}</div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.65rem', color: '#6a5a40' }}>{p.category}</div>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', color: '#c9a84c' }}>€{p.price}</div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: p.stock < 50 ? '#c85050' : '#2c1e0a', textAlign: 'center' }}>{p.stock}</div>
                  <div>{p.badge && <span style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c', padding: '2px 8px', fontFamily: 'var(--font-jost)', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{p.badge}</span>}</div>
                  <div style={{ background: 'rgba(90,138,90,0.15)', color: '#5a8a5a', padding: '3px 10px', fontFamily: 'var(--font-jost)', fontSize: '0.56rem', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center' }}>Active</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD PRODUCT */}
        {activeTab === 'add' && (
          <div style={{ maxWidth: 800 }}>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', fontWeight: 300, color: '#2c1e0a', marginBottom: 32 }}>
              Add New Product
            </div>

            {saved ? (
              <div style={{ background: 'rgba(90,138,90,0.1)', border: '1px solid rgba(90,138,90,0.3)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: '1.5rem' }}>✅</span>
                <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.76rem', color: '#3a7a3a' }}>Product saved! Redirecting...</div>
              </div>
            ) : (
              <form onSubmit={handleSave}>

                {/* Temel Bilgiler */}
                <div style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.12)', padding: '28px', marginBottom: 16 }}>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem', color: '#2c1e0a', marginBottom: 20 }}>Basic Information</div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>Product Name (EN) *</label>
                      <input required value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} style={inputStyle} placeholder="Nordic Oak — Wide Plank" />
                    </div>
                    <div>
                      <label style={labelStyle}>Product Name (NO) *</label>
                      <input required value={newProduct.nameNo} onChange={e => setNewProduct(p => ({ ...p, nameNo: e.target.value }))} style={inputStyle} placeholder="Nordisk Eik — Bred Planke" />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>Category *</label>
                      <select required value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                        <option value="">Select category</option>
                        <option value="wood-cladding">Wood Cladding</option>
                        <option value="marble-panels">Marble Panels</option>
                        <option value="parquet">Parquet</option>
                        <option value="luxury-vinyl">Luxury Vinyl</option>
                        <option value="stone-tiles">Stone Tiles</option>
                        <option value="exterior-cladding">Exterior Cladding</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Brand</label>
                      <select value={newProduct.brand} onChange={e => setNewProduct(p => ({ ...p, brand: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                        <option value="">Select brand</option>
                        {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>Price (€/m²) *</label>
                      <input required type="number" value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))} style={inputStyle} placeholder="89" />
                    </div>
                    <div>
                      <label style={labelStyle}>Stock</label>
                      <input type="number" value={newProduct.stock} onChange={e => setNewProduct(p => ({ ...p, stock: e.target.value }))} style={inputStyle} placeholder="100" />
                    </div>
                    <div>
                      <label style={labelStyle}>Texture</label>
                      <select value={newProduct.texture} onChange={e => setNewProduct(p => ({ ...p, texture: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                        <option value="wood">Wood</option>
                        <option value="marble">Marble</option>
                        <option value="herringbone">Herringbone</option>
                        <option value="vinyl">Vinyl</option>
                        <option value="blackmarble">Black Marble</option>
                        <option value="walnut">Walnut</option>
                        <option value="stone">Stone</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Badge</label>
                      <select value={newProduct.badge} onChange={e => setNewProduct(p => ({ ...p, badge: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                        <option value="">No badge</option>
                        <option value="Bestseller">Bestseller</option>
                        <option value="New">New</option>
                        <option value="Popular">Popular</option>
                        <option value="Exclusive">Exclusive</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input type="checkbox" id="featured" checked={newProduct.featured} onChange={e => setNewProduct(p => ({ ...p, featured: e.target.checked }))} style={{ accentColor: '#c9a84c', width: 16, height: 16 }} />
                    <label htmlFor="featured" style={{ fontFamily: 'var(--font-jost)', fontSize: '0.72rem', color: '#6a5a40', cursor: 'pointer' }}>
                      Show on homepage (Featured)
                    </label>
                  </div>
                </div>

                {/* Açıklamalar */}
                <div style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.12)', padding: '28px', marginBottom: 16 }}>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem', color: '#2c1e0a', marginBottom: 20 }}>Description</div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Description (EN) *</label>
                    <textarea required value={newProduct.description} onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} style={{ ...inputStyle, height: 100, resize: 'vertical' as const }} placeholder="Brushed solid oak with natural grain variation..." />
                  </div>
                  <div>
                    <label style={labelStyle}>Description (NO) *</label>
                    <textarea required value={newProduct.descriptionNo} onChange={e => setNewProduct(p => ({ ...p, descriptionNo: e.target.value }))} style={{ ...inputStyle, height: 100, resize: 'vertical' as const }} placeholder="Børstet massiv eik med naturlig kornvariasjon..." />
                  </div>
                </div>

                {/* Renkler */}
                <div style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.12)', padding: '28px', marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem', color: '#2c1e0a' }}>Colors</div>
                    <button type="button" onClick={addColor} style={{ background: 'none', border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c', padding: '6px 16px', fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>
                      + Add Color
                    </button>
                  </div>
                  {colors.map((color, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 40px', gap: 12, marginBottom: 10, alignItems: 'center' }}>
                      <div style={{ position: 'relative' }}>
                        <input type="color" value={color.hex} onChange={e => updateColor(i, 'hex', e.target.value)} style={{ width: 52, height: 44, border: '1px solid rgba(201,168,76,0.3)', cursor: 'pointer', padding: 2, background: '#fff' }} />
                      </div>
                      <input value={color.name} onChange={e => updateColor(i, 'name', e.target.value)} style={inputStyle} placeholder="Color name (e.g. Natural Oak)" />
                      {colors.length > 1 && (
                        <button type="button" onClick={() => removeColor(i)} style={{ background: 'none', border: '1px solid rgba(200,80,80,0.3)', color: '#c85050', width: 36, height: 44, cursor: 'pointer', fontSize: '1rem' }}>×</button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Ölçüler */}
                <div style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.12)', padding: '28px', marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem', color: '#2c1e0a' }}>Sizes</div>
                    <button type="button" onClick={addSize} style={{ background: 'none', border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c', padding: '6px 16px', fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>
                      + Add Size
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 40px', gap: 12, marginBottom: 8 }}>
                    {['Width (mm)', 'Length (mm)', 'Thickness (mm)', ''].map(h => (
                      <div key={h} style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8a7a60' }}>{h}</div>
                    ))}
                  </div>
                  {sizes.map((size, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 40px', gap: 12, marginBottom: 10, alignItems: 'center' }}>
                      <input value={size.width} onChange={e => updateSize(i, 'width', e.target.value)} style={inputStyle} placeholder="190" />
                      <input value={size.length} onChange={e => updateSize(i, 'length', e.target.value)} style={inputStyle} placeholder="1800" />
                      <input value={size.thickness} onChange={e => updateSize(i, 'thickness', e.target.value)} style={inputStyle} placeholder="18" />
                      {sizes.length > 1 && (
                        <button type="button" onClick={() => removeSize(i)} style={{ background: 'none', border: '1px solid rgba(200,80,80,0.3)', color: '#c85050', width: 36, height: 44, cursor: 'pointer', fontSize: '1rem' }}>×</button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Resim */}
                <div style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.12)', padding: '28px', marginBottom: 24 }}>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem', color: '#2c1e0a', marginBottom: 20 }}>Product Image</div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  {previewUrl ? (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img src={previewUrl} alt="Preview" style={{ width: 200, height: 150, objectFit: 'cover', border: '1px solid rgba(201,168,76,0.2)' }} />
                      <button type="button" onClick={() => { setPreviewUrl(null); if(fileRef.current) fileRef.current.value = '' }} style={{ position: 'absolute', top: 6, right: 6, background: '#c85050', border: 'none', color: '#fff', width: 24, height: 24, cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                    </div>
                  ) : (
                    <div onClick={() => fileRef.current?.click()} style={{ border: '2px dashed rgba(201,168,76,0.3)', padding: '40px', textAlign: 'center', cursor: 'pointer', background: 'rgba(201,168,76,0.02)', transition: 'all 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#c9a84c'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)'}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: 8 }}>📷</div>
                      <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.7rem', color: '#8a7a60' }}>Click to upload product image</div>
                      <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#aaa', marginTop: 4 }}>JPG, PNG, WEBP — max 10MB</div>
                    </div>
                  )}
                </div>

                {/* Butonlar */}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="submit" style={{ flex: 1, background: '#c9a84c', color: '#1a1208', border: 'none', padding: '14px', fontFamily: 'var(--font-jost)', fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>
                    Save Product
                  </button>
                  <button type="button" onClick={() => setActiveTab('products')} style={{ padding: '14px 28px', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#6a5020', fontFamily: 'var(--font-jost)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}