'use client'
import { useCartStore } from '@/store/cart'
import { useLocaleStore } from '@/store/locale'
import Link from 'next/link'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, itemCount } = useCartStore()
  const { t } = useLocaleStore()

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={closeCart}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1100, backdropFilter: 'blur(2px)' }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 420,
        background: '#f5f0e8', zIndex: 1101,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', flexDirection: 'column',
        borderLeft: '1px solid rgba(201,168,76,0.2)',
      }}>

        {/* Header */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(201,168,76,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#2a1e0e' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.1rem', letterSpacing: '0.3em', color: '#c9a84c' }}>Nordecore</div>
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.2em', color: '#888', textTransform: 'uppercase', marginTop: 2 }}>
              {t(`${itemCount} item${itemCount !== 1 ? 's' : ''}`, `${itemCount} vare${itemCount !== 1 ? 'r' : ''}`)}
            </div>
          </div>
          <button onClick={closeCart} style={{ background: 'none', border: 'none', color: '#c9a84c', fontSize: '1.4rem', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.4rem', color: '#7a6a50', marginBottom: 12 }}>
                {t('Your cart is empty', 'Handlekurven er tom')}
              </div>
              <a href="/collections" onClick={closeCart} className="btn-gold" style={{ fontSize: '0.62rem' }}>
                {t('Browse Collections', 'Utforsk Kolleksjoner')}
              </a>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: 16, padding: '18px 0', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                {/* Texture preview */}
                <div style={{ width: 72, height: 72, flexShrink: 0, background: 'linear-gradient(160deg,#4a3218,#6a4a28)', borderRadius: 2, overflow: 'hidden' }}>
                  {item.color && (
                    <div style={{ width: '100%', height: '100%', background: item.color.hex, opacity: 0.8 }} />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: 3 }}>
                    {item.product.category.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', color: '#2c1e0a', marginBottom: 4 }}>
                    {item.product.name}
                  </div>
                  {item.color && (
                    <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', color: '#7a6a50', marginBottom: 8 }}>
                      {item.color.name}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Quantity */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid rgba(201,168,76,0.25)' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'none', border: 'none', padding: '4px 10px', cursor: 'pointer', color: '#6a5020', fontSize: '0.9rem' }}>−</button>
                      <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.72rem', minWidth: 30, textAlign: 'center', color: '#2c1e0a' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'none', border: 'none', padding: '4px 10px', cursor: 'pointer', color: '#6a5020', fontSize: '0.9rem' }}>+</button>
                    </div>

                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.15rem', color: '#c9a84c' }}>
                      €{(item.product.price * item.quantity).toFixed(0)}
                    </div>

                    <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '0.9rem' }}>✕</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(201,168,76,0.15)', background: '#f0ebe0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#7a6a50' }}>{t('Shipping', 'Frakt')}</span>
              <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#5a8a5a' }}>{t('Free', 'Gratis')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.75rem', fontWeight: 500, color: '#2c1e0a' }}>{t('Total', 'Total')}</span>
              <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', color: '#c9a84c' }}>€{subtotal.toFixed(0)}</span>
            </div>
            <Link href="/checkout" onClick={closeCart} className="btn-gold" style={{ display: 'block', textAlign: 'center', fontSize: '0.68rem' }}>
              {t('Proceed to Checkout', 'Gå til kassen')}
            </Link>
            <button onClick={closeCart} style={{ width: '100%', background: 'none', border: 'none', color: '#7a6a50', fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.15em', marginTop: 12, cursor: 'pointer', textDecoration: 'underline' }}>
              {t('Continue Shopping', 'Fortsett å handle')}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
