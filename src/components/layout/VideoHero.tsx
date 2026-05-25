'use client'
import { useLocaleStore } from '@/store/locale'

export default function VideoHero() {
  const { t } = useLocaleStore()

  return (
    <section style={{ position: 'relative', background: '#f0ebe0', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 520, overflow: 'hidden' }}>

      {/* Sol — yazılar, açık krem arka plan */}
      <div style={{ padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>

        {/* Subtle texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(168deg,transparent 0,rgba(180,140,60,0.03) 2px,transparent 4px,transparent 40px)', pointerEvents: 'none' }} />

        <div className="animate-fade-up delay-100" style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 18, position: 'relative' }}>
          <span style={{ display: 'block', width: 40, height: 1, background: 'linear-gradient(90deg,transparent,#c9a84c)' }} />
          {t('Premium Building Materials — Est. Oslo 2012', 'Premium Byggematerialer — Est. Oslo 2012')}
        </div>

        <div className="animate-fade-up delay-200" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(3.5rem,6vw,6rem)', fontWeight: 300, lineHeight: 0.88, color: '#2c1e0a', letterSpacing: '-0.02em', marginBottom: 6, position: 'relative' }}>
          {t('Surface', 'Overflate')}
        </div>
        <div className="animate-fade-up delay-300" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(3.5rem,6vw,6rem)', fontWeight: 300, lineHeight: 0.88, color: '#c9a84c', fontStyle: 'italic', letterSpacing: '-0.02em', marginBottom: 24, position: 'relative' }}>
          {t('Craft', 'Kunst')}
        </div>

        <div className="animate-fade-up delay-400" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', fontWeight: 300, color: '#7a6a4a', letterSpacing: '0.08em', marginBottom: 28, position: 'relative' }}>
          {t('Where Material Meets Mastery', 'Der Materiale Møter Mestring')}
        </div>

        <div className="animate-fade-up delay-500" style={{ fontFamily: 'var(--font-jost)', fontSize: '0.78rem', color: '#7a6a4a', lineHeight: 2.2, maxWidth: 420, marginBottom: 44, fontWeight: 300, position: 'relative' }}>
          {t(
            'Curated wood cladding, marble-look panels, engineered parquet and luxury vinyl — sourced from the finest European mills, delivered across Scandinavia.',
            'Kuratert trekledning, marmorlignende plater, konstruert parkett og luksusvinyl — fra Europas beste møller, levert over hele Skandinavia.'
          )}
        </div>

        <div className="animate-fade-up delay-600" style={{ display: 'flex', gap: 16, position: 'relative' }}>
          <a href="/collections" className="btn-gold">
            {t('Explore Collections', 'Utforsk Kolleksjoner')}
          </a>
          <a href="/samples" className="btn-outline">
            {t('Request Free Samples', 'Bestill Gratis Prøver')}
          </a>
        </div>
      </div>

      {/* Sağ — video */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: 520 }}>
        {/* Fallback texture */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(160deg,#4a3218,#6a4a28,#3a2410)',
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(170deg,transparent 0,rgba(210,155,70,0.07) 2px,transparent 4px,transparent 32px)' }} />
        </div>

        {/* Video */}
        <video
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
        >
          <source src="https://videos.pexels.com/video-files/3196003/3196003-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/2098881/2098881-hd_1280_720_30fps.mp4" type="video/mp4" />
        </video>

        {/* Sol kenar fade — kremle karışım */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg,transparent 55%,rgba(240,235,224,0.9) 100%)', zIndex: 2 }} />

        {/* Badges */}
        <div style={{ position: 'absolute', bottom: 28, right: 28, display: 'flex', gap: 3, zIndex: 3 }}>
          {[
            { n: '240+', l: t('Products', 'Produkter') },
            { n: '18', l: t('Countries', 'Land') },
            { n: '4.9★', l: t('Rating', 'Vurdering') },
          ].map((b) => (
            <div key={b.n} style={{ background: 'rgba(240,235,224,0.92)', border: '1px solid rgba(201,168,76,0.35)', padding: '12px 16px', textAlign: 'center', minWidth: 72 }}>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.6rem', color: '#c9a84c', fontWeight: 300, lineHeight: 1 }}>{b.n}</div>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8a7a60', marginTop: 3 }}>{b.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
