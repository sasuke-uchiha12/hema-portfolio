import { FormEvent, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { isSupabaseConfigured, supabase } from '../../lib/supabase'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!supabase) {
      setChecking(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setAuthenticated(Boolean(data.session))
      setChecking(false)
    })
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase) return

    setSubmitting(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setSubmitting(false)

    if (error) {
      setError(error.message)
      return
    }

    navigate('/admin')
  }

  if (checking) return null
  if (authenticated) return <Navigate to="/admin" replace />

  return (
    <main className="min-h-screen grid place-items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-6"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-neutral-950">
            <Lock className="h-4 w-4" />
          </span>
          <div>
            <h1 className="text-xl tracking-tight text-white">Admin</h1>
            <p className="text-sm text-white/50">Sign in to edit portfolio content.</p>
          </div>
        </div>

        {!isSupabaseConfigured && (
          <p className="mt-5 rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white/60">
            Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY before using admin.
          </p>
        )}

        <label className="mt-6 block text-sm text-white/60">
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-white outline-none focus:border-white/30"
            required
          />
        </label>

        <label className="mt-4 block text-sm text-white/60">
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-white outline-none focus:border-white/30"
            required
          />
        </label>

        {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

        <button
          type="submit"
          disabled={!isSupabaseConfigured || submitting}
          className="mt-6 w-full rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-950 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}
