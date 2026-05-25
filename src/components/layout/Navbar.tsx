'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { useLocaleStore } from '@/store/locale'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { itemCount, toggleCart } = useCartStore()
  const { locale, setLocale, t } = useLocaleStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/collections', en: 'Collections', no: 'Kolleksjoner' },
    { href: '/category/wood-cladding', en: 'Wood', no: 'Tre' },
    { href: '/category/marble-panels', en: 'Marble', no: 'Marmor' },
    { href: '/category/luxury-vinyl', en: 'Vinyl', no: 'Vinyl' },
    { href: '/projects', en: 'Projects', no: 'Prosjekter' },
    { href: '/about', en: 'About', no: 'Om oss' },
  ]

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, width: '100%', zIndex: 1000,
          background: '#2a1e0e',
          borderBottom: '1px solid rgba(201,168,76,0.25)',
          transition: 'all 0.4s',
          padding: scrolled ? '0 48px' : '0 48px',
        }}
      >
        <div style={{ height: scrolled ? 52 : 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'height 0.4s' }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.55rem', letterSpacing: '0.45em', color: '#c9a84c', fontWeight: 400, lineHeight: 1 }}>
              Nordecore
            </div>
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.45rem', letterSpacing: '0.35em', color: '#d4c4a0', textTransform: 'uppercase', marginTop: 2 }}>
              {t('Premium Surface Materials', 'Premium Overflatematerialer')}
            </div>
          </Link>

          {/* Nav Links */}
          <div style={{ display: 'flex', gap: 32 }} className="nav-links-desktop">
            {links.map((l) => (
              <Link key={l.href} href={l.href} style={{
                fontFamily: 'var(--font-jost)', textDecoration: 'none',
                color: '#d4c4a0', fontSize: '0.62rem', letterSpacing: '0.22em',
                textTransform: 'uppercase', fontWeight: 300,
                borderBottom: '1px solid transparent',
                transition: 'all 0.25s', paddingBottom: 2,
              }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = '#c9a84c'; (e.target as HTMLElement).style.borderBottomColor = 'rgba(201,168,76,0.5)' }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = '#d4c4a0'; (e.target as HTMLElement).style.borderBottomColor = 'transparent' }}
              >
                {t(l.en, l.no)}
              </Link>
            ))}
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>

            {/* Language toggle */}
            <div style={{ display: 'flex', border: '1px solid rgba(201,168,76,0.4)', overflow: 'hidden' }}>
              {(['en', 'no'] as const).map((l) => (
                <button key={l} onClick={() => setLocale(l)} style={{
                  padding: '5px 12px', fontSize: '0.6rem', letterSpacing: '0.18em',
                  fontWeight: 500, background: locale === l ? '#c9a84c' : 'none',
                  color: locale === l ? '#1a1208' : '#888',
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-jost)', transition: 'all 0.2s',
                  textTransform: 'uppercase',
                }}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Search */}
            <button style={{ background: 'none', border: 'none', color: '#d4c4a0', cursor: 'pointer', fontSize: '1rem', padding: 4 }}>
              ⌕
            </button>

            {/* Cart */}
            <button onClick={toggleCart} style={{
              background: 'none', border: '1px solid rgba(201,168,76,0.35)',
              color: '#c9a84c', padding: '7px 18px', fontSize: '0.62rem',
              letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
              fontFamily: 'var(--font-jost)', display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#c9a84c'; (e.currentTarget as HTMLElement).style.color = '#1a1208' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = '#c9a84c' }}
            >
              🛒 {t('Cart', 'Kurv')}
              {itemCount > 0 && (
                <span style={{
                  background: '#c9a84c', color: '#1a1208', width: 18, height: 18,
                  borderRadius: '50%', fontSize: '0.58rem', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontWeight: 700,
                }}>
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div style={{ height: 60 }} />
    </>
  )
}
