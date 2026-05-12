'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
  Brain, Mail, Lock, Eye, EyeOff, ArrowRight,
  ShieldCheck, Truck, Tag, Sparkles, ChevronRight, CheckCircle
} from 'lucide-react'

const perks = [
  { icon: Truck,       text: 'Free next day delivery over £200' },
  { icon: Tag,         text: 'No minimum order — from just £1' },
  { icon: Brain,       text: 'AI-matched product recommendations' },
  { icon: ShieldCheck, text: 'Secure checkout & trade pricing' },
]

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [done, setDone]         = useState(false)
  const [forgot, setForgot]     = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSent, setForgotSent]   = useState(false)
  const [errors, setErrors]     = useState<{email?:string; password?:string}>({})

  const validate = () => {
    const e: typeof errors = {}
    if (!email)    e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    else if (password.length < 6) e.password = 'Password must be at least 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1600)
  }

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault()
    if (!forgotEmail) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setForgotSent(true) }, 1200)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Minimal header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg text-white"
              style={{ background: 'linear-gradient(135deg, #ec4899, #f472b6)', boxShadow: '0 4px 12px rgba(236,72,153,0.3)' }}>D</div>
            <div className="leading-tight">
              <div className="font-black text-teal-900 text-lg tracking-tight">Dream</div>
              <div className="font-bold text-[9px] tracking-widest uppercase gradient-text-warm">Distribution</div>
            </div>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-700 transition-colors font-medium">
            ← Back to shop
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* ── Left: Dark promo panel ── */}
          <div className="relative rounded-3xl overflow-hidden hidden lg:block">
            <div className="absolute inset-0 bg-teal-900" />
            <div className="absolute inset-0 dot-grid pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none animate-pulse-glow"
              style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)' }} />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl pointer-events-none animate-breathe"
              style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)' }} />

            <div className="relative p-10 text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <Brain size={12} className="text-orange-400" />
                AI-Powered Distribution
              </div>

              <h2 className="text-3xl font-black leading-tight mb-3">
                Welcome back to<br/>
                <span className="gradient-text">Dream Distribution</span>
              </h2>
              <p className="text-white/55 text-sm leading-relaxed mb-8">
                Sign in to access 10,000+ wholesale products, your AI-matched recommendations, and trade account pricing.
              </p>

              <ul className="space-y-4 mb-10">
                {perks.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-orange-400" />
                    </div>
                    <span className="text-white/75 text-sm">{text}</span>
                  </li>
                ))}
              </ul>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[['10,000+','Products'],['50,000+','Buyers'],['4.9★','Rating']].map(([v,l]) => (
                  <div key={l} className="glass-card rounded-xl p-3 text-center">
                    <div className="text-lg font-black text-white">{v}</div>
                    <div className="text-white/40 text-[10px]">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Form card ── */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

            {done ? (
              /* Success state */
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-emerald-500" />
                </div>
                <h2 className="text-xl font-extrabold text-gray-900 mb-2">Signed In!</h2>
                <p className="text-gray-500 text-sm mb-6">Welcome back. Redirecting you to your account…</p>
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-white px-6 py-3 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #a78bfa)' }}>
                  Go to Dashboard <ArrowRight size={15} />
                </Link>
              </div>

            ) : forgot ? (
              /* Forgot password */
              <div>
                <button onClick={() => { setForgot(false); setForgotSent(false) }}
                  className="text-sm text-gray-400 hover:text-gray-700 mb-6 flex items-center gap-1 transition-colors">
                  ← Back to sign in
                </button>
                {forgotSent ? (
                  <div className="text-center py-4">
                    <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Mail size={28} className="text-teal-700" />
                    </div>
                    <h2 className="text-xl font-extrabold text-gray-900 mb-2">Check your inbox</h2>
                    <p className="text-gray-500 text-sm">We've sent a password reset link to <strong>{forgotEmail}</strong></p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Reset Password</h2>
                    <p className="text-gray-500 text-sm mb-6">Enter your email and we'll send you a reset link</p>
                    <form onSubmit={handleForgot} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                        <div className="relative">
                          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required
                            placeholder="you@example.com"
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all" />
                        </div>
                      </div>
                      <button type="submit" disabled={loading}
                        className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.01] disabled:opacity-60 flex items-center justify-center gap-2"
                        style={{ background: 'linear-gradient(135deg, #ec4899, #a78bfa)', boxShadow: '0 8px 24px rgba(236,72,153,0.3)' }}>
                        {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Send Reset Link <ArrowRight size={15} /></>}
                      </button>
                    </form>
                  </>
                )}
              </div>

            ) : (
              /* Sign in form */
              <>
                <div className="mb-7">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Sign In</h2>
                  <p className="text-gray-500 text-sm">Don't have an account?{' '}
                    <Link href="/register" className="font-semibold text-orange-500 hover:text-orange-600 transition-colors">Create one free</Link>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(v => ({...v,email:''})) }}
                        placeholder="you@example.com"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:border-orange-400 focus:ring-orange-400/20'
                        }`} />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-gray-700">Password</label>
                      <button type="button" onClick={() => setForgot(true)}
                        className="text-xs text-orange-500 hover:text-orange-600 font-medium transition-colors">
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type={showPw ? 'text' : 'password'} value={password}
                        onChange={e => { setPassword(e.target.value); setErrors(v => ({...v,password:''})) }}
                        placeholder="Enter your password"
                        className={`w-full pl-10 pr-11 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:border-orange-400 focus:ring-orange-400/20'
                        }`} />
                      <button type="button" onClick={() => setShowPw(v => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={loading}
                    className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
                    style={{ background: 'linear-gradient(135deg, #ec4899, #a78bfa)', boxShadow: '0 8px 24px rgba(236,72,153,0.35)' }}>
                    {loading
                      ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in…</>
                      : <>Sign In <ArrowRight size={15} /></>
                    }
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-400 font-medium">or</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                {/* Social login */}
                <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Continue with Google
                </button>

                {/* Register link */}
                <p className="text-center text-xs text-gray-500 mt-6">
                  New to Dream Distribution?{' '}
                  <Link href="/register" className="font-bold text-teal-700 hover:text-teal-900 transition-colors inline-flex items-center gap-0.5">
                    Create a free trade account <ChevronRight size={11} />
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="border-t border-gray-100 py-6 mt-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} Dream Distribution Ltd. All rights reserved.</span>
          <div className="flex gap-4">
            {['Privacy Policy','Terms & Conditions','Cookie Policy'].map(l => (
              <Link key={l} href="#" className="hover:text-gray-600 transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
