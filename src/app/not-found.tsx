'use client'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import { useLocaleStore } from '@/store/locale'

export default function NotFound() {
  const { t } = useLocaleStore()

  return (
    <>
      <Navbar />
      <div style={{
        background: '#f5f0e8', minHeight: '100vh', paddingTop: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', padding: '60px 40px' }}>

          {/* 404 */}
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(6rem,15vw,12rem)', fontWeight: 300, color: 'rgba(201,168,76,0.15)', lineHeight: 1, marginBottom: 0 }}>
            404
          </div>

          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: '#2c1e0a', marginBottom: 16, marginTop: -20 }}>
            {t('Page Not Found', 'Side Ikke Funnet')}
          </div>

          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.78rem', color: '#7a6a50', lineHeight: 2, maxWidth: 420, margin: '0 auto 40px' }}>
            {t(
              'The page you are looking for does not exist or has been moved.',
              'Siden du leter etter eksisterer ikke eller har blitt flyttet.'
            )}
          </div>

          {/* Dekoratif çizgi */}
          <div style={{ width: 60, height: 1, background: 'rgba(201,168,76,0.4)', margin: '0 auto 40px' }} />

          {/* Linkler */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{
              background: '#c9a84c', color: '#1a1208',
              padding: '14px 40px', fontFamily: 'var(--font-jost)',
              fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase',
              fontWeight: 500, textDecoration: 'none', display: 'inline-block',
            }}>
              {t('Go Home', 'Gå Hjem')}
            </Link>
            <Link href="/collections" style={{
              background: 'none', color: '#6a5020',
              border: '1px solid rgba(201,168,76,0.4)',
              padding: '14px 40px', fontFamily: 'var(--font-jost)',
              fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase',
              textDecoration: 'none', display: 'inline-block',
            }}>
              {t('View Collections', 'Se Kolleksjoner')}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}