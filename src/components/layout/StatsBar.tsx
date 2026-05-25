'use client'
import { useLocaleStore } from '@/store/locale'

export default function StatsBar() {
  const { t } = useLocaleStore()

  const stats = [
    { n: '240+', l: t('Product Variants', 'Produktvarianter') },
    { n: '18',   l: t('Countries Delivered', 'Land Leverer') },
    { n: '12yr', l: t('Warranty', 'Garanti') },
    { n: '4.9★', l: t('Customer Rating', 'Kundevurdering') },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', background: '#2a1e0e', borderTop: '1px solid rgba(201,168,76,0.2)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
      {stats.map((s, i) => (
        <div key={i} style={{ padding: '22px 20px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(201,168,76,0.12)' : 'none', cursor: 'default', transition: 'background 0.3s' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#3a2c16'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
        >
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2.2rem', color: '#c9a84c', fontWeight: 300, lineHeight: 1 }}>{s.n}</div>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#666', marginTop: 6 }}>{s.l}</div>
        </div>
      ))}
    </div>
  )
}
