'use client'

import { useState, FormEvent, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/admin/projects'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        router.push(redirect)
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? 'Invalid password.')
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-login-form">
      <div className="admin-field">
        <label htmlFor="username" className="admin-label">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="admin-input"
          placeholder="Username"
          autoComplete="username"
          required
          autoFocus
        />
      </div>
      <div className="admin-field">
        <label htmlFor="password" className="admin-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="admin-input"
          placeholder="Password"
          autoComplete="current-password"
          required
        />
      </div>
      {error && <p className="admin-login-error">{error}</p>}
      <button type="submit" className="admin-btn-primary" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <span className="nav-wordmark">Cody Eanes</span>
          <span className="admin-login-tag">CMS</span>
        </div>
        <h1 className="admin-login-heading">Sign in</h1>
        <Suspense fallback={<div className="admin-input" style={{ opacity: 0.5 }}>Loading…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
