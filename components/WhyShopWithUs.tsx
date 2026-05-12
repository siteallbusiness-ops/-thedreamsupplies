import { ShoppingBag, Truck, RefreshCw, Users, Globe, Headphones, Brain } from 'lucide-react'

const reasons = [
  { icon: ShoppingBag, title: 'No Minimum Order',            desc: 'Order as little or as much as you like. Buy a single item for £1 or a full pallet — completely up to you.',                  color: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-500/20', icon_c: 'text-orange-400' },
  { icon: Truck,       title: 'Free Next Day Delivery',       desc: 'All mainland UK orders over £200 (exc. VAT) qualify for free next working day delivery when ordered before 4pm.',            color: 'from-violet-500/20 to-violet-600/10', border: 'border-violet-500/20', icon_c: 'text-violet-400' },
  { icon: Globe,       title: 'AI-Powered Product Matching',  desc: 'Tell us what you need and our AI understands your requirements — surfacing the right products from 10,000+ lines instantly.', color: 'from-pink-500/20 to-pink-600/10',   border: 'border-pink-500/20',   icon_c: 'text-pink-400',   ai: true },
  { icon: RefreshCw,   title: 'Easy 30-Day Returns',          desc: 'Not happy with an order? No problem. Our simple returns process means hassle-free refunds or replacements.',                  color: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/20', icon_c: 'text-emerald-400' },
  { icon: Users,       title: 'Smart Trade Accounts',         desc: 'Open a free trade account — our AI learns your buying patterns to offer personalised pricing, deals, and reorder reminders.', color: 'from-blue-500/20 to-blue-600/10',   border: 'border-blue-500/20',   icon_c: 'text-blue-400',   ai: true },
  { icon: Headphones,  title: 'Expert UK Support',            desc: 'Our Leicester-based team is available Mon–Fri 8am–4pm. Friendly, knowledgeable and quick to respond.',                        color: 'from-rose-500/20 to-rose-600/10',   border: 'border-rose-500/20',   icon_c: 'text-rose-400' },
]

export default function WhyShopWithUs() {
  return (
    <section className="relative py-20 bg-teal-900 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute -top-40 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-40 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            <Brain size={12} className="text-pink-400" />
            AI-Driven Platform
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
            Why Choose{' '}
            <span className="gradient-text">Dream Distribution?</span>
          </h2>
          <p className="text-white/50 text-sm max-w-2xl mx-auto">
            The UK's leading AI-powered distribution platform — trusted by wholesalers, retailers, and fulfilment partners nationwide
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map(r => {
            const Icon = r.icon
            return (
              <div key={r.title}
                className={`relative group rounded-2xl p-6 border ${r.border} bg-gradient-to-br ${r.color} backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 hover-glow-pink`}>
                {r.ai && (
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1 bg-orange-500/20 border border-orange-500/30 text-orange-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <span className="w-1 h-1 rounded-full bg-orange-400 animate-pulse" />AI
                  </span>
                )}
                <div className={`w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${r.icon_c}`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-white mb-2">{r.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{r.desc}</p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-violet-500/20" />
          <div className="absolute inset-0 dot-grid-dark pointer-events-none" />
          <div className="absolute inset-0 border border-white/10 rounded-2xl" />
          <div className="relative p-5 sm:p-8 md:p-12 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Ready to Start Saving?</h3>
            <p className="text-white/60 mb-8 max-w-xl mx-auto text-sm">
              Open your free account in minutes. Our AI understands your requirements and delivers the right products — no minimum order, no monthly fees, no fuss.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/register"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-lg"
                style={{ boxShadow: '0 8px 30px rgba(236,72,153,0.3)' }}>
                Create Free Account
              </a>
              <a href="/products"
                className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl transition-all backdrop-blur-sm">
                Browse Products
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
