'use client'
import Navbar from '@/components/layout/Navbar'
import CartDrawer from '@/components/cart/CartDrawer'
import { useLocaleStore } from '@/store/locale'

const TEAM = [
  { name: 'Erik Larsen', role: 'Founder & CEO', roleNo: 'Grunnlegger & CEO', location: 'Oslo, Norway' },
  { name: 'Ingrid Dahl', role: 'Head of Design', roleNo: 'Designsjef', location: 'Stockholm, Sweden' },
  { name: 'Magnus Berg', role: 'Operations Director', roleNo: 'Driftssjef', location: 'Bergen, Norway' },
  { name: 'Sofia Lindqvist', role: 'Sales Manager', roleNo: 'Salgssjef', location: 'Gothenburg, Sweden' },
]

const VALUES = [
  { icon: '🌲', title: 'Sustainability', titleNo: 'Bærekraft', desc: 'All our wood products are FSC certified from responsibly managed Scandinavian forests.', descNo: 'Alle våre trematerialer er FSC-sertifisert fra ansvarlig forvaltede skoger.' },
  { icon: '✦', title: 'Quality', titleNo: 'Kvalitet', desc: 'We work directly with the finest European mills to ensure every product meets our exacting standards.', descNo: 'Vi samarbeider direkte med Europas beste møller for å sikre at hvert produkt møter våre strenge standarder.' },
  { icon: '🚚', title: 'Delivery', titleNo: 'Levering', desc: 'Free delivery across Scandinavia on orders over €500. Carbon-neutral shipping on all orders.', descNo: 'Gratis levering i Skandinavia på bestillinger over €500. Karbonnøytral frakt på alle bestillinger.' },
  { icon: '💬', title: 'Support', titleNo: 'Support', desc: 'Our certified interior specialists are available to help you choose the perfect material for your project.', descNo: 'Våre sertifiserte interiørspesialister er tilgjengelige for å hjelpe deg med å velge det perfekte materialet.' },
]

const STATS = [
  { n: '2012', l: 'Founded in Oslo', lNo: 'Grunnlagt i Oslo' },
  { n: '240+', l: 'Products', lNo: 'Produkter' },
  { n: '18', l: 'Countries', lNo: 'Land' },
  { n: '12yr', l: 'Warranty', lNo: 'Garanti' },
]

export default function AboutPage() {
  const { t } = useLocaleStore()

  return (
    <>
      <Navbar />
      <CartDrawer />

      <div style={{ background: '#f5f0e8', minHeight: '100vh', paddingTop: 60 }}>

        {/* Hero */}
        <div style={{ background: '#2a1e0e', padding: '100px 60px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(168deg,transparent 0,rgba(210,160,70,0.03) 2px,transparent 4px,transparent 40px)' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 26, height: 1, background: '#c9a84c', display: 'block' }} />
              {t('Our Story', 'Vår Historie')}
            </div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 300, color: '#faf8f4', lineHeight: 1.05, marginBottom: 28 }}>
              {t('Building the Future of ', 'Bygger Fremtidens ')}
              <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>{t('Nordic Interiors', 'Nordiske Interiører')}</em>
            </div>
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.82rem', color: '#b0a080', lineHeight: 2.1, maxWidth: 580 }}>
              {t(
                'Founded in Oslo in 2012, Deconor was born from a simple belief: that premium surface materials should be accessible to everyone who appreciates quality. We source directly from the finest European mills and deliver across Scandinavia and beyond.',
                'Grunnlagt i Oslo i 2012, ble Deconor født fra en enkel tro: at premium overflatematerialer bør være tilgjengelig for alle som setter pris på kvalitet. Vi henter direkte fra Europas beste møller og leverer over hele Skandinavia og videre.'
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: '40px 20px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(201,168,76,0.12)' : 'none', background: '#f0ebe0' }}>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '3rem', color: '#c9a84c', fontWeight: 300, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8a7a60', marginTop: 8 }}>{t(s.l, s.lNo)}</div>
            </div>
          ))}
        </div>

        {/* Story */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          <div style={{ padding: '80px 60px', background: '#f5f0e8' }}>
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 26, height: 1, background: '#c9a84c', display: 'block' }} />
              {t('Our Mission', 'Vårt Oppdrag')}
            </div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: '#2c1e0a', marginBottom: 24, lineHeight: 1.1 }}>
              {t('Materials that', 'Materialer som')} <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>{t('inspire', 'inspirerer')}</em>
            </div>
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.78rem', color: '#6a5a40', lineHeight: 2.1, marginBottom: 20 }}>
              {t(
                'We believe that the materials you choose for your home or project tell a story. Whether it\'s the warmth of solid oak underfoot, the drama of black marble on a feature wall, or the practical elegance of luxury vinyl in a family kitchen — every surface matters.',
                'Vi tror at materialene du velger for ditt hjem eller prosjekt forteller en historie. Enten det er varmen av solid eik under føttene, dramatikken av sort marmor på en fremhevet vegg, eller den praktiske elegansen av luksusvinyl på et familieskjøkken — hver flate betyr noe.'
              )}
            </div>
            <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.78rem', color: '#6a5a40', lineHeight: 2.1 }}>
              {t(
                'That\'s why we work tirelessly to source the finest materials from across Europe, curate them into coherent collections, and make them available with the service and support that premium products deserve.',
                'Det er derfor vi jobber utrettelig for å hente de fineste materialene fra hele Europa, kuratere dem til sammenhengende kolleksjoner, og gjøre dem tilgjengelige med den servicen og støtten som premium produkter fortjener.'
              )}
            </div>
          </div>
          <div style={{ background: '#3e2e18', position: 'relative', overflow: 'hidden', minHeight: 400 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(180,130,50,0.08) 0,rgba(180,130,50,0.08) 1px,transparent 1px,transparent 28px),repeating-linear-gradient(-45deg,rgba(140,100,30,0.06) 0,rgba(140,100,30,0.06) 1px,transparent 1px,transparent 28px)' }} />
            <div style={{ position: 'absolute', bottom: 28, left: 32, fontFamily: 'var(--font-cormorant)', fontSize: '1rem', color: '#c9a84c', fontStyle: 'italic' }}>
              Oslo Showroom — Est. 2012
            </div>
          </div>
        </div>

        {/* Values */}
        <div style={{ padding: '80px 60px', background: '#ede8dc', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 26, height: 1, background: '#c9a84c', display: 'block' }} />
            {t('Our Values', 'Våre Verdier')}
          </div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, color: '#2c1e0a', marginBottom: 52 }}>
            {t('What We ', 'Hva Vi ')}
            <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>{t('Stand For', 'Står For')}</em>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 3 }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{ background: '#f0ebe0', padding: '36px 28px', border: '1px solid rgba(201,168,76,0.1)', transition: 'all 0.3s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#fff'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#f0ebe0'}
              >
                <div style={{ fontSize: '2rem', marginBottom: 20 }}>{v.icon}</div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.4rem', color: '#2c1e0a', marginBottom: 14 }}>{t(v.title, v.titleNo)}</div>
                <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.72rem', color: '#7a6a50', lineHeight: 2 }}>{t(v.desc, v.descNo)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ padding: '80px 60px', background: '#f5f0e8', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 26, height: 1, background: '#c9a84c', display: 'block' }} />
            {t('Our Team', 'Vårt Team')}
          </div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, color: '#2c1e0a', marginBottom: 52 }}>
            {t('The People Behind ', 'Menneskene Bak ')}
            <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>Deconor</em>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 3 }}>
            {TEAM.map((member, i) => (
              <div key={i} style={{ background: '#f0ebe0', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.1)' }}>
                <div style={{ height: 200, background: `linear-gradient(160deg, #${['4a3218','3a3835','3e3018','2a2e3a'][i]}, #${['6a4a28','4a4540','504028','323845'][i]})`, position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: 16, left: 16, width: 48, height: 48, borderRadius: '50%', background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-cormorant)', fontSize: '1.4rem', color: '#c9a84c' }}>
                    {member.name.charAt(0)}
                  </div>
                </div>
                <div style={{ padding: '20px 24px' }}>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', color: '#2c1e0a', marginBottom: 4 }}>{member.name}</div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.1em', color: '#c9a84c', marginBottom: 4 }}>{t(member.role, member.roleNo)}</div>
                  <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', color: '#8a7a60' }}>{member.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: '80px 60px', background: '#2a1e0e', borderTop: '1px solid rgba(201,168,76,0.2)', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, color: '#faf8f4', marginBottom: 20 }}>
            {t('Ready to Transform Your ', 'Klar til å Transformere Ditt ')}
            <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>{t('Space?', 'Rom?')}</em>
          </div>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.78rem', color: '#b0a080', lineHeight: 2, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
            {t('Browse our collections and request free samples delivered to your door.', 'Bla gjennom våre kolleksjoner og bestill gratis prøver levert til døren din.')}
          </div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <a href="/collections" style={{ background: '#c9a84c', color: '#1a1208', padding: '14px 40px', fontFamily: 'var(--font-jost)', fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none', display: 'inline-block' }}>
              {t('View Collections', 'Se Kolleksjoner')}
            </a>
            <a href="/contact" style={{ background: 'none', color: '#d4c4a0', border: '1px solid rgba(201,168,76,0.35)', padding: '14px 40px', fontFamily: 'var(--font-jost)', fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>
              {t('Contact Us', 'Kontakt Oss')}
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ background: '#1e1408', padding: '16px 60px', borderTop: '1px solid rgba(201,168,76,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.56rem', color: '#4a3a28', letterSpacing: '0.15em' }}>© 2025 Deconor — All rights reserved</div>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.56rem', color: '#4a3a28', display: 'flex', alignItems: 'center', gap: 8 }}>
            Payments secured by <span style={{ background: '#635bff', color: '#fff', padding: '2px 8px', fontSize: '0.5rem', fontWeight: 700 }}>stripe</span>
          </div>
        </footer>
      </div>
    </>
  )
}