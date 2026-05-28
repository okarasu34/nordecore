'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ADMIN_EMAIL = 'admin@deconor.com'
const ADMIN_PASSWORD = 'Deconor2026!'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    await new Promise(r => setTimeout(r, 800))

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('deconor-admin', 'true')
      router.push('/admin')
    } else {
      setError('Invalid email or password')
      setLoading(false)
    }
  }

  return (
    <div style={{
      background: '#2a1e0e', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(168deg,transparent 0,rgba(210,160,70,0.03) 2px,transparent 4px,transparent 40px)' }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 420, padding: '0 24px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '2rem', letterSpacing: '0.5em', color: '#c9a84c', marginBottom: 8 }}>
            DECONOR
          </div>
          <div style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.3em', color: '#6a5a40', textTransform: 'uppercase' }}>
            Admin Panel
          </div>
          <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.3)', margin: '16px auto 0' }} />
        </div>

        {/* Form */}
        <div style={{ background: '#f5f0e8', border: '1px solid rgba(201,168,76,0.2)', padding: '40px' }}>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.6rem', fontWeight: 300, color: '#2c1e0a', marginBottom: 28, textAlign: 'center' }}>
            Sign In
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a5a40', marginBottom: 6, display: 'block' }}>
                Email
              </label>
              <input
                type="email" required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@deconor.com"
                style={{ width: '100%', padding: '13px 16px', fontFamily: 'var(--font-jost)', fontSize: '0.82rem', color: '#2c1e0a', background: '#fff', border: '1px solid rgba(201,168,76,0.3)', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a5a40', marginBottom: 6, display: 'block' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'} required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '13px 48px 13px 16px', fontFamily: 'var(--font-jost)', fontSize: '0.82rem', color: '#2c1e0a', background: '#fff', border: '1px solid rgba(201,168,76,0.3)', outline: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#8a7a60', fontSize: '1rem' }}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ background: 'rgba(200,80,80,0.08)', border: '1px solid rgba(200,80,80,0.2)', padding: '10px 14px', marginBottom: 16, fontFamily: 'var(--font-jost)', fontSize: '0.68rem', color: '#c85050', display: 'flex', alignItems: 'center', gap: 8 }}>
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px',
                background: loading ? '#8a7a50' : '#c9a84c',
                color: '#1a1208', border: 'none',
                fontFamily: 'var(--font-jost)', fontSize: '0.7rem',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>

        {/* Back to site */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a href="/" style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', letterSpacing: '0.15em', color: '#6a5a40', textDecoration: 'none', textTransform: 'uppercase' }}>
            ← Back to Site
          </a>
        </div>
      </div>
    </div>
  )
}