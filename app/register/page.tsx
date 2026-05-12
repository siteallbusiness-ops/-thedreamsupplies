'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
  Brain, Mail, Lock, Eye, EyeOff, ArrowRight, User, Building2,
  Phone, MapPin, ChevronRight, CheckCircle, Sparkles, Check
} from 'lucide-react'

const businessTypes = [
  'Market Trader / Car Boot',
  'Pound Shop / Discount Store',
  'Online Seller (eBay / Amazon)',
  'Independent Retailer',
  'Gift Shop',
  'Convenience Store',
  'Cash & Carry / Wholesaler',
  'Charity / Non-Profit',
  'Other',
]

const steps = ['Personal', 'Business', 'Account']

const benefits = [
  { emoji: '🤖', title: 'AI Product Matching',    desc: 'Our AI learns your buying patterns and surfaces the best deals for your business type.' },
  { emoji: '💰', title: 'Exclusive Trade Prices',  desc: 'Unlock wholesale pricing unavailable to the public — no minimum order required.' },
  { emoji: '🚚', title: 'Free Next Day Delivery',  desc: 'Orders over £200 delivered next working day, free of charge across mainland UK.' },
  { emoji: '📊', title: 'Account Dashboard',       desc: 'Track orders, reorder favourites, download invoices, and manage your profile.' },
]

export default function RegisterPage() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  /* Step 0 — Personal */
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [phone, setPhone]         = useState('')

  /* Step 1 — Business */
  const [company, setCompany]         = useState('')
  const [bizType, setBizType]         = useState('')
  const [addressLine, setAddressLine] = useState('')
  const [city, setCity]               = useState('')
  const [postcode, setPostcode]       = useState('')

  /* Step 2 — Account */
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [showCf, setShowCf]     = useState(false)
  const [terms, setTerms]       = useState(false)
  const [marketing, setMarketing] = useState(true)

  const [errors, setErrors] = useState<Record<string,string>>({})

  const pwStrength = () => {
    let s = 0
    if (password.length >= 8)            s++
    if (/[A-Z]/.test(password))          s++
    if (/[0-9]/.test(password))          s++
    if (/[^A-Za-z0-9]/.test(password))   s++
    return s
  }

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-blue-400', 'bg-emerald-500']

  const validateStep = () => {
    const e: Record<string,string> = {}
    if (step === 0) {
      if (!firstName.trim()) e.firstName = 'Required'
      if (!lastName.trim())  e.lastName  = 'Required'
      if (!phone.trim())     e.phone     = 'Required'
    }
    if (step === 1) {
      if (!company.trim())  e.company  = 'Required'
      if (!bizType)         e.bizType  = 'Please select a business type'
      if (!postcode.trim()) e.postcode = 'Required'
    }
    if (step === 2) {
      if (!email.trim())   e.email = 'Required'
      else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
      if (!password)       e.password = 'Required'
      else if (password.length < 8) e.password = 'At least 8 characters'
      if (password !== confirm)     e.confirm  = 'Passwords do not match'
      if (!terms)                   e.terms    = 'You must accept the terms'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const nextStep = () => {
    if (!validateStep()) return
    if (step < 2) { setStep(s => s + 1); setErrors({}) }
    else {
      setLoading(true)
      setTimeout(() => { setLoading(false); setDone(true) }, 1800)
    }
  }

  const strength = pwStrength()

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
          <Link href="/login" className="text-sm text-gray-500 hover:text-teal-700 font-medium transition-colors">
            Already have an account? <span className="text-teal-700 font-bold">Sign in</span>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── Left: Benefits panel ── */}
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden hidden lg:block">
            <div className="absolute inset-0 bg-teal-900" />
            <div className="absolute inset-0 dot-grid pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none animate-pulse-glow"
              style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 70%)' }} />

            <div className="relative p-8 text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <Sparkles size={11} className="text-orange-400" />Free Trade Account
              </div>

              <h2 className="text-2xl font-black leading-tight mb-2">
                Join <span className="gradient-text">Dream Distribution</span>
              </h2>
              <p className="text-white/55 text-sm leading-relaxed mb-7">
                Open your free wholesale account in minutes and unlock AI-powered product matching, trade pricing, and more.
              </p>

              <div className="space-y-5">
                {benefits.map(b => (
                  <div key={b.title} className="flex items-start gap-3">
                    <div className="text-xl flex-shrink-0 mt-0.5">{b.emoji}</div>
                    <div>
                      <div className="text-sm font-bold text-white mb-0.5">{b.title}</div>
                      <div className="text-white/50 text-xs leading-relaxed">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/40 text-xs">Trusted by 50,000+ businesses across the UK</p>
                <div className="flex -space-x-1.5 mt-2">
                  {['bg-orange-500','bg-violet-500','bg-emerald-500','bg-pink-500','bg-blue-500'].map((c,i) => (
                    <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-teal-900 flex items-center justify-center text-white text-[9px] font-bold`}>
                      {['JD','SK','MO','TN','DP'][i]}
                    </div>
                  ))}
                  <div className="w-7 h-7 rounded-full bg-white/10 border-2 border-teal-900 flex items-center justify-center text-white text-[8px] font-bold">+49k</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

            {done ? (
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={40} className="text-emerald-500" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Account Created!</h2>
                <p className="text-gray-500 text-sm mb-1">Welcome to Dream Distribution, <strong>{firstName}</strong>.</p>
                <p className="text-gray-400 text-sm mb-8">We've sent a confirmation email to <strong>{email}</strong>.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/products"
                    className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all"
                    style={{ background: 'linear-gradient(135deg, #ec4899, #a78bfa)', boxShadow: '0 8px 24px rgba(236,72,153,0.3)' }}>
                    <Sparkles size={15} /> Browse Products
                  </Link>
                  <Link href="/"
                    className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all">
                    Go to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Step header */}
                <div className="px-8 pt-8 pb-6 border-b border-gray-100">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Create Your Free Account</h2>

                  {/* Progress steps */}
                  <div className="flex items-center gap-0">
                    {steps.map((s, i) => (
                      <div key={s} className="flex items-center flex-1 last:flex-none">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            i < step  ? 'bg-emerald-500 text-white' :
                            i === step ? 'text-white' : 'bg-gray-100 text-gray-400'
                          }`}
                            style={i === step ? { background: 'linear-gradient(135deg, #ec4899, #a78bfa)' } : {}}>
                            {i < step ? <Check size={14} /> : i + 1}
                          </div>
                          <span className={`text-xs font-semibold ${i === step ? 'text-gray-900' : i < step ? 'text-emerald-600' : 'text-gray-400'}`}>{s}</span>
                        </div>
                        {i < steps.length - 1 && (
                          <div className={`flex-1 h-0.5 mx-3 rounded transition-all ${i < step ? 'bg-emerald-400' : 'bg-gray-100'}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form body */}
                <div className="p-8">

                  {/* ── Step 0: Personal details ── */}
                  {step === 0 && (
                    <div className="space-y-4 animate-slide-up">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">First Name *</label>
                          <div className="relative">
                            <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="John"
                              className={`w-full pl-9 pr-3 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.firstName ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:border-orange-400 focus:ring-orange-400/20'}`} />
                          </div>
                          {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Last Name *</label>
                          <div className="relative">
                            <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Smith"
                              className={`w-full pl-9 pr-3 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.lastName ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:border-orange-400 focus:ring-orange-400/20'}`} />
                          </div>
                          {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                        <div className="relative">
                          <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="07700 000000" type="tel"
                            className={`w-full pl-9 pr-3 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.phone ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:border-orange-400 focus:ring-orange-400/20'}`} />
                        </div>
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>

                      <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 flex items-start gap-2.5">
                        <Brain size={14} className="text-orange-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-orange-700 leading-relaxed">
                          Our AI uses your profile to personalise product recommendations and pricing.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ── Step 1: Business details ── */}
                  {step === 1 && (
                    <div className="space-y-4 animate-slide-up">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Company / Trading Name *</label>
                        <div className="relative">
                          <Building2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Your Business Name"
                            className={`w-full pl-9 pr-3 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.company ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:border-orange-400 focus:ring-orange-400/20'}`} />
                        </div>
                        {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Business Type *</label>
                        <div className="relative">
                          <ChevronRight size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" />
                          <select value={bizType} onChange={e => setBizType(e.target.value)}
                            className={`w-full px-3 py-3 border rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 transition-all bg-white ${errors.bizType ? 'border-red-400 focus:ring-red-400/20 text-gray-700' : 'border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 text-gray-700'}`}>
                            <option value="">Select your business type…</option>
                            {businessTypes.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        {errors.bizType && <p className="text-xs text-red-500 mt-1">{errors.bizType}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Address Line 1</label>
                        <div className="relative">
                          <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input value={addressLine} onChange={e => setAddressLine(e.target.value)} placeholder="Street address"
                            className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">City / Town</label>
                          <input value={city} onChange={e => setCity(e.target.value)} placeholder="Leicester"
                            className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Postcode *</label>
                          <input value={postcode} onChange={e => setPostcode(e.target.value)} placeholder="LE1 1AA"
                            className={`w-full px-3 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all uppercase ${errors.postcode ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:border-orange-400 focus:ring-orange-400/20'}`} />
                          {errors.postcode && <p className="text-xs text-red-500 mt-1">{errors.postcode}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Step 2: Account credentials ── */}
                  {step === 2 && (
                    <div className="space-y-4 animate-slide-up">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
                        <div className="relative">
                          <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                            className={`w-full pl-9 pr-3 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:border-orange-400 focus:ring-orange-400/20'}`} />
                        </div>
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password *</label>
                        <div className="relative">
                          <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters"
                            className={`w-full pl-9 pr-10 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.password ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:border-orange-400 focus:ring-orange-400/20'}`} />
                          <button type="button" onClick={() => setShowPw(v => !v)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}

                        {/* Password strength meter */}
                        {password && (
                          <div className="mt-2">
                            <div className="flex gap-1 mb-1">
                              {[1,2,3,4].map(i => (
                                <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i <= strength ? strengthColor[strength] : 'bg-gray-100'}`} />
                              ))}
                            </div>
                            <p className={`text-[10px] font-semibold ${['','text-red-500','text-amber-500','text-blue-500','text-emerald-500'][strength]}`}>
                              {strengthLabel[strength]}
                            </p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Confirm Password *</label>
                        <div className="relative">
                          <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input type={showCf ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat your password"
                            className={`w-full pl-9 pr-10 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.confirm ? 'border-red-400 focus:ring-red-400/20' : confirm && confirm === password ? 'border-emerald-400 focus:ring-emerald-400/20' : 'border-gray-200 focus:border-orange-400 focus:ring-orange-400/20'}`} />
                          <button type="button" onClick={() => setShowCf(v => !v)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showCf ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                          {confirm && confirm === password && (
                            <Check size={14} className="absolute right-8 top-1/2 -translate-y-1/2 text-emerald-500" style={{ right: 36 }} />
                          )}
                        </div>
                        {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
                      </div>

                      {/* Checkboxes */}
                      <div className="space-y-3 pt-1">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <button type="button" onClick={() => setTerms(v => !v)}
                            className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${terms ? 'bg-teal-900 border-teal-900' : 'border-gray-300 group-hover:border-gray-400'}`}>
                            {terms && <Check size={10} className="text-white" />}
                          </button>
                          <span className="text-xs text-gray-600 leading-relaxed">
                            I agree to the{' '}
                            <Link href="#" className="text-teal-700 font-semibold hover:underline">Terms & Conditions</Link>
                            {' '}and{' '}
                            <Link href="#" className="text-teal-700 font-semibold hover:underline">Privacy Policy</Link>
                            {' '}*
                          </span>
                        </label>
                        {errors.terms && <p className="text-xs text-red-500 -mt-1 ml-7">{errors.terms}</p>}

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <button type="button" onClick={() => setMarketing(v => !v)}
                            className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${marketing ? 'bg-teal-900 border-teal-900' : 'border-gray-300 group-hover:border-gray-400'}`}>
                            {marketing && <Check size={10} className="text-white" />}
                          </button>
                          <span className="text-xs text-gray-600 leading-relaxed">
                            Send me weekly deals, AI-matched product alerts, and exclusive discount codes
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Navigation buttons */}
                  <div className={`flex gap-3 mt-8 ${step > 0 ? 'justify-between' : 'justify-end'}`}>
                    {step > 0 && (
                      <button onClick={() => { setStep(s => s - 1); setErrors({}) }}
                        className="px-5 py-3 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all">
                        ← Back
                      </button>
                    )}
                    <button onClick={nextStep} disabled={loading}
                      className="flex-1 sm:flex-none sm:min-w-[180px] py-3 px-6 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
                      style={{ background: 'linear-gradient(135deg, #ec4899, #a78bfa)', boxShadow: '0 8px 24px rgba(236,72,153,0.35)' }}>
                      {loading
                        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating Account…</>
                        : step < 2
                          ? <>Continue <ArrowRight size={15} /></>
                          : <><Sparkles size={14} /> Create Account</>
                      }
                    </button>
                  </div>

                  {step === 0 && (
                    <p className="text-center text-xs text-gray-400 mt-4">
                      Already have an account?{' '}
                      <Link href="/login" className="font-bold text-teal-700 hover:text-teal-900 transition-colors">Sign in here</Link>
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="border-t border-gray-100 py-6 mt-4">
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
