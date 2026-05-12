'use client'
import Link from 'next/link'
import { ArrowRight, Brain, Zap } from 'lucide-react'

const cats = [
  { name: 'Home & Garden',    emoji: '🏠', count: '2,900+',    grad: 'from-teal-500 to-teal-700',    glow: 'rgba(20,184,166,0.4)',  cat: 'Home & Garden',    aiTag: 'Top Seller' },
  { name: 'Health & Beauty',  emoji: '💄', count: '280+',      grad: 'from-pink-500 to-rose-700',    glow: 'rgba(236,72,153,0.4)', cat: 'Health & Beauty',  aiTag: 'AI Pick' },
  { name: 'Stationery',       emoji: '📚', count: '300+',      grad: 'from-blue-500 to-indigo-700',  glow: 'rgba(99,102,241,0.4)', cat: 'Stationery',       aiTag: null },
  { name: 'Toys & Games',     emoji: '🧸', count: '100+',      grad: 'from-green-500 to-emerald-700',glow: 'rgba(16,185,129,0.4)', cat: 'Toys & Games',     aiTag: 'Trending' },
  { name: 'Clothing',         emoji: '👕', count: '37+',       grad: 'from-purple-500 to-violet-700',glow: 'rgba(139,92,246,0.4)', cat: 'Clothing',         aiTag: null },
  { name: 'Food & Drink',     emoji: '🍬', count: '150+',      grad: 'from-orange-500 to-amber-700', glow: 'rgba(245,158,11,0.4)', cat: 'Food & Drink',     aiTag: 'Fast Mover' },
  { name: 'Pet & Leisure',    emoji: '🐾', count: '150+',      grad: 'from-yellow-500 to-orange-600',glow: 'rgba(251,191,36,0.4)', cat: 'Pet & Leisure',    aiTag: null },
  { name: 'Party & Seasonal', emoji: '🎉', count: '240+',      grad: 'from-red-500 to-rose-700',     glow: 'rgba(239,68,68,0.4)',  cat: 'Party & Seasonal', aiTag: 'Seasonal' },
  { name: 'Clearance',        emoji: '🏷️', count: 'Save 70%',  grad: 'from-cyan-500 to-teal-700',   glow: 'rgba(6,182,212,0.4)',  cat: 'Clearance',        aiTag: 'AI Deals' },
  { name: 'Pallet Deals',     emoji: '📦', count: '50+',       grad: 'from-slate-600 to-slate-800',  glow: 'rgba(100,116,139,0.4)',cat: 'Pallet Deals',     aiTag: 'Bulk Value' },
  { name: 'Big Brands',       emoji: '⭐', count: '200+',      grad: 'from-teal-700 to-teal-900',    glow: 'rgba(15,23,42,0.5)',   cat: 'Big Brands',       aiTag: 'Verified' },
  { name: 'Fast Sellers',     emoji: '🔥', count: 'Top picks', grad: 'from-orange-600 to-red-700',   glow: 'rgba(234,88,12,0.5)',  cat: 'Fast Sellers',     aiTag: 'Hot' },
]

export default function Categories() {
  return (
    <section className="py-14 bg-gray-50 relative overflow-hidden">
      {/* Faint neural-network background lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" preserveAspectRatio="xMidYMid slice">
        <line x1="5%"  y1="20%" x2="30%" y2="60%" stroke="rgba(249,115,22,0.06)" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="30%" y1="60%" x2="70%" y2="30%" stroke="rgba(236,72,153,0.06)" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="70%" y1="30%" x2="95%" y2="75%" stroke="rgba(167,139,250,0.06)" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="30%" cy="60%" r="3" fill="rgba(236,72,153,0.15)" />
        <circle cx="70%" cy="30%" r="3" fill="rgba(249,115,22,0.15)" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex items-end justify-between mb-10">
          <div>
            {/* AI Curated badge */}
            <div className="inline-flex items-center gap-1.5 mb-2 px-2.5 py-1 rounded-full text-[10px] font-bold"
              style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(236,72,153,0.1))', border: '1px solid rgba(236,72,153,0.2)', color: '#ec4899' }}>
              <Brain size={10} className="animate-pulse" />
              AI-Curated Selection
            </div>
            <h2 className="sec-title animate-slide-right delay-0">Shop by Category</h2>
            <p className="sec-sub animate-slide-right delay-75">10,000+ products across 12 departments</p>
          </div>
          <Link href="/products"
            className="hidden md:flex items-center gap-1.5 text-teal-700 font-semibold hover:text-teal-900 text-sm group transition-colors">
            All categories
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cats.map((cat, i) => (
            <Link
              key={cat.name}
              href={`/products?category=${encodeURIComponent(cat.cat)}`}
              className="group relative rounded-2xl overflow-hidden cursor-pointer animate-scale-in ai-scan-overlay"
              style={{
                animationDelay: `${i * 50}ms`,
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                transformStyle: 'preserve-3d',
                perspective: '600px',
              }}
              onMouseMove={e => {
                const el = e.currentTarget as HTMLElement
                const rect = el.getBoundingClientRect()
                const x = (e.clientX - rect.left) / rect.width  - 0.5
                const y = (e.clientY - rect.top)  / rect.height - 0.5
                el.style.transform = `perspective(600px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg) translateY(-6px) scale(1.04)`
                el.style.boxShadow = `0 20px 50px ${cat.glow}, 0 0 0 1px ${cat.glow}`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = ''
                el.style.boxShadow = ''
              }}
            >
              <div className={`bg-gradient-to-br ${cat.grad} p-5 text-white text-center relative`}>
                {/* Shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 shimmer-sweep" />
                </div>

                {/* AI tag badge */}
                {cat.aiTag && (
                  <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[8px] font-bold bg-black/25 text-white/90 backdrop-blur-sm">
                    <Zap size={7} className="text-yellow-300" />
                    {cat.aiTag}
                  </div>
                )}

                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300 relative">{cat.emoji}</div>
                <div className="font-bold text-sm leading-tight relative">{cat.name}</div>
                <div className="text-white/60 text-xs mt-1 relative">{cat.count}</div>

                <div className="flex items-center justify-center gap-1 mt-2 text-xs opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 relative">
                  Shop <ArrowRight size={11} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* AI insight strip */}
        <div className="mt-8 rounded-2xl p-4 flex flex-wrap items-center gap-3"
          style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,41,59,0.96))', border: '1px solid rgba(236,72,153,0.2)' }}>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #ec4899, #a78bfa)' }}>
              <Brain size={14} className="text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-white text-xs font-bold mb-0.5">AI Insight</div>
              <div className="text-white/50 text-[11px] leading-relaxed">
                Based on current demand, <span className="text-orange-400 font-semibold">Home & Garden</span> and <span className="text-pink-400 font-semibold">Health & Beauty</span> are trending this week.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-[10px] font-bold">LIVE</span>
          </div>
        </div>
      </div>
    </section>
  )
}
