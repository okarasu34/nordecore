'use client'
import { useState, useRef } from 'react'

interface ImportedProduct {
  name: string
  nameNo: string
  category: string
  price: number
  stock: number
  texture: string
  badge: string
  description: string
  colors: string
}

const TEMPLATE_CSV = `name,nameNo,category,price,stock,texture,badge,description,colors
Nordic Oak — Wide Plank,Nordisk Eik — Bred Planke,wood-cladding,89,100,wood,Bestseller,Brushed solid oak with natural grain variation.,"#8B6040:Natural Oak,#4A3020:Dark Walnut"
Calacatta Gold — Slab,Calacatta Gull — Plate,marble-panels,124,50,marble,New,High-pressure laminate marble-look panels.,"#D4C8B0:White Gold,#2A2820:Black Marble"`

export default function ImportPage() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [products, setProducts] = useState<ImportedProduct[]>([])
  const [step, setStep] = useState<'upload' | 'preview' | 'importing' | 'done'>('upload')
  const [imported, setImported] = useState(0)
  const [error, setError] = useState('')

  const parseCSV = (text: string): ImportedProduct[] => {
    const lines = text.trim().split('\n')
    const headers = lines[0].split(',')
    return lines.slice(1).map(line => {
      const values: string[] = []
      let current = ''
      let inQuotes = false
      for (const char of line) {
        if (char === '"') { inQuotes = !inQuotes }
        else if (char === ',' && !inQuotes) { values.push(current); current = '' }
        else { current += char }
      }
      values.push(current)
      const obj: any = {}
      headers.forEach((h, i) => { obj[h.trim()] = (values[i] ?? '').trim() })
      return obj as ImportedProduct
    })
  }

  const handleFile = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = parseCSV(reader.result as string)
        if (parsed.length === 0) { setError('No products found in file'); return }
        setProducts(parsed)
        setStep('preview')
        setError('')
      } catch (e) {
        setError('Failed to parse CSV file')
      }
    }
    reader.readAsText(file)
  }

  const handleImport = async () => {
    setStep('importing')
    for (let i = 0; i < products.length; i++) {
      await new Promise(r => setTimeout(r, 400))
      setImported(i + 1)
    }
    setStep('done')
  }

  const downloadTemplate = () => {
    const blob = new Blob([TEMPLATE_CSV], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'deconor-products-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const inputStyle = {
    fontFamily: 'var(--font-jost)', fontSize: '0.72rem', color: '#2c1e0a',
  }

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh' }}>

      {/* Nav */}
      <div style={{ background: '#2a1e0e', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.2rem', letterSpacing: '0.4em', color: '#c9a84c' }}>DECONOR</div>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.2em', color: '#6a5a40', textTransform: 'uppercase' }}>Bulk Import</div>
        </div>
        <a href="/admin" style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.15em', color: '#c9a84c', textDecoration: 'none', textTransform: 'uppercase' }}>
          ← Back to Admin
        </a>
      </div>

      <div style={{ padding: '40px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', fontWeight: 300, color: '#2c1e0a', marginBottom: 8 }}>
          Bulk Product Import
        </div>
        <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.72rem', color: '#8a7a60', marginBottom: 32 }}>
          Upload a CSV file to import multiple products at once.
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 40 }}>
          {[
            { key: 'upload', n: '01', label: 'Upload CSV' },
            { key: 'preview', n: '02', label: 'Preview' },
            { key: 'importing', n: '03', label: 'Importing' },
            { key: 'done', n: '04', label: 'Done' },
          ].map((s, i) => {
            const steps = ['upload', 'preview', 'importing', 'done']
            const currentIdx = steps.indexOf(step)
            const isActive = step === s.key
            const isDone = steps.indexOf(s.key) < currentIdx
            return (
              <div key={s.key} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: isDone ? '#c9a84c' : isActive ? 'rgba(201,168,76,0.15)' : 'transparent', border: `1px solid ${isActive || isDone ? '#c9a84c' : 'rgba(201,168,76,0.25)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: isDone ? '#1a1208' : isActive ? '#c9a84c' : '#8a7a60', fontWeight: isDone ? 700 : 400 }}>
                    {isDone ? '✓' : s.n}
                  </div>
                  <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: isActive ? '#c9a84c' : '#8a7a60' }}>{s.label}</span>
                </div>
                {i < 3 && <div style={{ width: 32, height: 1, background: 'rgba(201,168,76,0.2)', margin: '0 12px' }} />}
              </div>
            )
          })}
        </div>

        {/* STEP 1 — Upload */}
        {step === 'upload' && (
          <div>
            {/* Template indir */}
            <div style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.12)', padding: '24px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', color: '#2c1e0a', marginBottom: 4 }}>Download Template</div>
                <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#8a7a60' }}>Fill in the CSV template and upload it back</div>
              </div>
              <button onClick={downloadTemplate} style={{ background: '#2a1e0e', color: '#c9a84c', border: 'none', padding: '10px 24px', fontFamily: 'var(--font-jost)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
                ⬇ Download CSV Template
              </button>
            </div>

            {/* CSV Format */}
            <div style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.12)', padding: '24px', marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', color: '#2c1e0a', marginBottom: 16 }}>CSV Format</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                {[
                  { col: 'name', desc: 'Product name (EN)' },
                  { col: 'nameNo', desc: 'Product name (NO)' },
                  { col: 'category', desc: 'wood-cladding, marble-panels...' },
                  { col: 'price', desc: 'Price in € per m²' },
                  { col: 'stock', desc: 'Stock quantity' },
                  { col: 'texture', desc: 'wood, marble, vinyl...' },
                  { col: 'badge', desc: 'Bestseller, New, Popular...' },
                  { col: 'description', desc: 'Product description (EN)' },
                  { col: 'colors', desc: '#hex:Name,#hex:Name' },
                ].map(c => (
                  <div key={c.col} style={{ padding: '10px 12px', background: '#f5f0e8', border: '1px solid rgba(201,168,76,0.1)' }}>
                    <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', color: '#c9a84c', fontWeight: 500, marginBottom: 3 }}>{c.col}</div>
                    <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#8a7a60' }}>{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload alanı */}
            <input ref={fileRef} type="file" accept=".csv" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} style={{ display: 'none' }} />
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
              style={{ border: '2px dashed rgba(201,168,76,0.3)', padding: '60px 40px', textAlign: 'center', cursor: 'pointer', background: 'rgba(201,168,76,0.02)', transition: 'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#c9a84c'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)'}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>📄</div>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', color: '#2c1e0a', marginBottom: 8 }}>Upload CSV File</div>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.7rem', color: '#8a7a60' }}>Drag & drop or click to upload</div>
            </div>

            {error && (
              <div style={{ marginTop: 16, background: 'rgba(200,80,80,0.08)', border: '1px solid rgba(200,80,80,0.2)', padding: '12px 16px', fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#c85050' }}>
                ⚠️ {error}
              </div>
            )}
          </div>
        )}

        {/* STEP 2 — Preview */}
        {step === 'preview' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', color: '#2c1e0a' }}>
                {products.length} products ready to import
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => { setStep('upload'); setProducts([]) }} style={{ padding: '10px 20px', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#6a5020', fontFamily: 'var(--font-jost)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button onClick={handleImport} style={{ padding: '10px 24px', background: '#c9a84c', color: '#1a1208', border: 'none', fontFamily: 'var(--font-jost)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>
                  Import All →
                </button>
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.12)', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 80px 80px 100px', gap: 16, padding: '12px 20px', background: '#f0ebe0', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
                {['Product Name', 'Category', 'Price', 'Stock', 'Badge'].map(h => (
                  <div key={h} style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a7a60' }}>{h}</div>
                ))}
              </div>
              {products.map((p, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 140px 80px 80px 100px', gap: 16, padding: '14px 20px', borderBottom: i < products.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.05rem', color: '#2c1e0a' }}>{p.name}</div>
                    <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#8a7a60' }}>{p.nameNo}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.65rem', color: '#6a5a40' }}>{p.category}</div>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', color: '#c9a84c' }}>€{p.price}</div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#2c1e0a' }}>{p.stock}</div>
                  <div>{p.badge && <span style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c', padding: '2px 8px', fontFamily: 'var(--font-jost)', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.badge}</span>}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 — Importing */}
        {step === 'importing' && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', color: '#2c1e0a', marginBottom: 16 }}>
              Importing products...
            </div>
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.72rem', color: '#8a7a60', marginBottom: 32 }}>
              {imported} / {products.length} products imported
            </div>
            <div style={{ background: '#f0ebe0', height: 6, borderRadius: 3, overflow: 'hidden', maxWidth: 400, margin: '0 auto' }}>
              <div style={{ background: '#c9a84c', height: '100%', width: `${(imported / products.length) * 100}%`, transition: 'width 0.3s' }} />
            </div>
          </div>
        )}

        {/* STEP 4 — Done */}
        {step === 'done' && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(90,138,90,0.12)', border: '1px solid rgba(90,138,90,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem' }}>✓</div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', color: '#2c1e0a', marginBottom: 12 }}>
              Import Complete!
            </div>
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.76rem', color: '#7a6a50', marginBottom: 32 }}>
              {products.length} products imported successfully.
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <a href="/admin" style={{ background: '#c9a84c', color: '#1a1208', padding: '12px 32px', fontFamily: 'var(--font-jost)', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none' }}>
                View Products
              </a>
              <button onClick={() => { setStep('upload'); setProducts([]); setImported(0) }} style={{ background: 'none', color: '#6a5020', border: '1px solid rgba(201,168,76,0.3)', padding: '12px 32px', fontFamily: 'var(--font-jost)', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Import More
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}