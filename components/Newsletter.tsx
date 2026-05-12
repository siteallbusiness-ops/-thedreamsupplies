'use client'
import { useState } from 'react'
import { Send, CheckCircle, Brain, Sparkles } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <section className="relative py-16 bg-teal-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      <div className="absolute -top-32 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-32 left-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className="text-white">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-lg"
                style={{ boxShadow: '0 8px 24px rgba(236,72,153,0.4)' }}>
                <Brain size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold">Never Miss a Deal</h2>
                <p className="text-white/50 text-sm">AI-curated alerts matched to your buying needs</p>
              </div>
            </div>

            <ul className="space-y-3">
              {[
                'Weekly clearance sale alerts every Monday',
                'AI-matched new product recommendations for you',
                'Exclusive subscriber-only discount codes',
                'Seasonal sale previews before they go live',
              ].map(t => (
                <li key={t} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-2 text-white/30 text-xs">
              <Sparkles size={12} className="text-orange-400" />
              Powered by Dream Distribution AI
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {done ? (
              <div className="glass-card rounded-2xl px-6 py-8 text-center">
                <CheckCircle size={36} className="text-emerald-400 mx-auto mb-3" />
                <p className="text-white font-bold text-lg">You're subscribed!</p>
                <p className="text-white/50 text-sm mt-1">Welcome to Dream Distribution.</p>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-6">
                <p className="text-white font-semibold mb-4 text-sm">Get AI-powered deal alerts in your inbox</p>
                <form onSubmit={e => { e.preventDefault(); if (email) setDone(true) }} className="space-y-3">
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    placeholder="Your email address…"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-orange-500/60 focus:bg-white/15 transition-all"
                  />
                  <button type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.02] hover:opacity-90"
                    style={{ boxShadow: '0 8px 24px rgba(236,72,153,0.35)' }}>
                    <Send size={15} /> Subscribe to Deals
                  </button>
                  <p className="text-white/30 text-xs text-center">No spam. Unsubscribe anytime. Privacy Policy applies.</p>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
