import { ArrowRight, Zap, Gift, Brain } from 'lucide-react'

export default function PromoBanners() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Banner 1 — Flash Sale */}
        <div className="relative rounded-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-pink-600 to-rose-700" />
          <div className="absolute inset-0 dot-grid pointer-events-none opacity-60" />
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-2xl bg-white/10 animate-pulse-glow pointer-events-none" />

          <div className="relative p-7 flex items-center justify-between gap-4">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-white/20 border border-white/30 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  <Zap size={10} className="fill-white" /> Flash Sale
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-white leading-tight">
                Clearance Lines<br/>Up to 70% Off
              </h3>
              <p className="text-white/70 text-xs max-w-xs">Limited stock — prices slashed to clear. Updated every Monday!</p>
              <a href="/products?category=Clearance"
                className="inline-flex items-center gap-1.5 bg-white text-pink-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-white/90 transition-all hover:scale-105 mt-1 shadow-lg">
                Shop Now <ArrowRight size={12}/>
              </a>
            </div>
            <div className="text-7xl opacity-20 flex-shrink-0 select-none animate-float">🏷️</div>
          </div>
        </div>

        {/* Banner 2 — New Arrivals */}
        <div className="relative rounded-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900" />
          <div className="absolute inset-0 dot-grid pointer-events-none opacity-60" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full blur-2xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)' }} />

          <div className="relative p-7 flex items-center justify-between gap-4">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/80 text-[10px] font-bold px-2.5 py-1 rounded-full">
                  <Gift size={10} /> New Arrivals
                </span>
                <span className="inline-flex items-center gap-1 bg-orange-500/20 border border-orange-500/30 text-orange-300 text-[10px] font-bold px-2 py-1 rounded-full">
                  <Brain size={10} /> AI Curated
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-white leading-tight">
                Fresh Stock<br/>Landed This Week
              </h3>
              <p className="text-white/55 text-xs max-w-xs">New lines added every week. Our AI flags what fits your buying profile first.</p>
              <a href="/products?category=Fast+Sellers"
                className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all hover:scale-105 mt-1"
                style={{ boxShadow: '0 4px 20px rgba(236,72,153,0.3)' }}>
                See New In <ArrowRight size={12}/>
              </a>
            </div>
            <div className="text-7xl opacity-20 flex-shrink-0 select-none animate-float" style={{ animationDelay: '1s' }}>🎁</div>
          </div>
        </div>

      </div>
    </section>
  )
}
