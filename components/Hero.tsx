'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ChevronLeft, ChevronRight, Package, Tag, Zap, Brain } from 'lucide-react'

const SLIDE_DURATION = 5000

const slides = [
  {
    tag: '🔥 Limited Time Offer',
    heading: 'Up to 70% Off',
    headingSub: 'Clearance Lines',
    sub: 'Thousands of heavily discounted wholesale products. No minimum order — buy as little as £1! Our AI finds the best deals matched to your needs.',
    cta: 'Shop Clearance',
    ctaHref: '/products?category=Clearance',
    accentFrom: '#ec4899', accentTo: '#f472b6', accentBg: 'from-orange-500 to-pink-500',
  },
  {
    tag: '📦 Pallet Deals',
    heading: 'Mixed Pallets',
    headingSub: 'from £299',
    sub: 'Huge savings on mixed stock pallets. Our AI matches pallets to your business type — perfect for market traders, car booters & online sellers.',
    cta: 'View Pallet Deals',
    ctaHref: '/products?category=Pallet+Deals',
    accentFrom: '#a78bfa', accentTo: '#7c3aed', accentBg: 'from-violet-500 to-purple-700',
  },
  {
    tag: '⭐ Big Brands',
    heading: 'Top Brand Names',
    headingSub: 'at Wholesale Prices',
    sub: 'Colgate, Persil, Fairy, Lynx, Dettol & 200+ more brands — AI-recommended at genuine trade prices.',
    cta: 'Shop Big Brands',
    ctaHref: '/products?category=Big+Brands',
    accentFrom: '#34d399', accentTo: '#059669', accentBg: 'from-emerald-400 to-teal-600',
  },
]

// Network nodes — customers/channels Dream AI serves
const nodes = [
  { label: 'Online Sellers',  emoji: '🛒', x: 240, y: 38,  color: '#ec4899', count: '2,400+', category: 'Fast Sellers',   badge: '🔥 Trending',   insight: 'AI-curated fast-mover lines for high-volume online channels.', dur: 2.2  },
  { label: 'Market Traders',  emoji: '🏪', x: 373, y: 112, color: '#f97316', count: '800+',   category: 'Fast Sellers',   badge: '💰 High Margin',insight: 'Mixed bundles & market-ready stock with 35%+ average margin.',  dur: 2.55 },
  { label: 'Retailers',       emoji: '🏬', x: 373, y: 264, color: '#a78bfa', count: '1,200+', category: 'Big Brands',     badge: '⭐ Big Brands', insight: 'Genuine brand-name products for established retail channels.',   dur: 2.9  },
  { label: 'Pound Shops',     emoji: '🏷️', x: 240, y: 340, color: '#34d399', count: '600+',   category: 'Clearance',      badge: '🏷️ Best Value', insight: 'Budget 50p–£2 lines with fast sell-through for value stores.',   dur: 3.25 },
  { label: 'Corner Shops',    emoji: '🏠', x: 107, y: 264, color: '#fb923c', count: '500+',   category: 'Home & Garden',  badge: '🏠 FMCG',       insight: 'Daily essentials & FMCG for local footfall-driven stores.',      dur: 3.6  },
  { label: 'Wholesalers',     emoji: '📦', x: 107, y: 112, color: '#60a5fa', count: '300+',   category: 'Pallet Deals',   badge: '📦 Bulk',       insight: 'Case & pallet pricing with exclusive trade buyer discounts.',    dur: 3.95 },
]

const CX = 240, CY = 189   // SVG centre (viewBox 0 0 480 378)

const activity = [
  { ni: 0, msg: 'AI matched 42 fast-seller lines for Online Sellers' },
  { ni: 1, msg: '18 new market bundles curated for Market Traders' },
  { ni: 2, msg: 'Brand restock: 200+ Colgate & Persil lines live' },
  { ni: 3, msg: 'Clearance update: 67 new £1 lines added today' },
  { ni: 4, msg: 'FMCG refresh: corner shop essentials restocked' },
  { ni: 5, msg: 'New pallet arrivals matched for wholesale buyers' },
]

const stats = [
  { icon: Package, val: '10K+',    label: 'Products',   color: 'text-orange-400' },
  { icon: Tag,     val: '£1 Min',  label: 'Order',      color: 'text-violet-400' },
  { icon: Zap,     val: 'Next Day',label: 'UK Delivery',color: 'text-emerald-400' },
  { icon: Brain,   val: 'AI',      label: 'Matched',    color: 'text-pink-400' },
]

/* Tooltip offset based on node angle from centre */
function tooltipTransform(nx: number, ny: number): string {
  const ang = Math.atan2(ny - CY, nx - CX) * (180 / Math.PI)
  if (ang >= -120 && ang <= -60) return 'translate(-50%, calc(-100% - 54px))'   // top
  if (ang > -60   && ang < 0)   return 'translate(12px, calc(-100% - 4px))'     // top-right
  if (ang >= 0    && ang < 60)  return 'translate(12px, 4px)'                   // bottom-right
  if (ang >= 60   && ang <= 120) return 'translate(-50%, 54px)'                 // bottom
  if (ang > 120)                 return 'translate(calc(-100% - 12px), 4px)'    // bottom-left
  return 'translate(calc(-100% - 12px), calc(-100% - 4px))'                     // top-left
}

export default function Hero() {
  const router = useRouter()
  const [idx,       setIdx]       = useState(0)
  const [progress,  setProgress]  = useState(0)
  const [paused,    setPaused]    = useState(false)
  const [animKey,   setAnimKey]   = useState(0)
  const [hovered,   setHovered]   = useState<number | null>(null)
  const [hubHov,    setHubHov]    = useState(false)
  const [spotlight, setSpotlight] = useState(0)
  const [actIdx,    setActIdx]    = useState(0)
  const [actVisible,setActVisible]= useState(true)
  const heroRef = useRef<HTMLElement>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>()

  const userActive = hovered !== null || hubHov
  const effectiveNode = hovered !== null ? hovered : spotlight

  /* Auto-spotlight cycles when user isn't hovering */
  useEffect(() => {
    if (userActive) return
    const iv = setInterval(() => setSpotlight(s => (s + 1) % nodes.length), 2200)
    return () => clearInterval(iv)
  }, [userActive])

  /* Activity ticker with fade */
  useEffect(() => {
    const iv = setInterval(() => {
      setActVisible(false)
      setTimeout(() => { setActIdx(a => (a + 1) % activity.length); setActVisible(true) }, 400)
    }, 3200)
    return () => clearInterval(iv)
  }, [])

  /* Slide auto-advance */
  const goTo = useCallback((i: number) => { setIdx(i); setProgress(0); setAnimKey(k => k + 1) }, [])
  const prev = () => goTo((idx - 1 + slides.length) % slides.length)
  const next = useCallback(() => goTo((idx + 1) % slides.length), [idx, goTo])
  useEffect(() => {
    if (paused) return
    const start = Date.now()
    const iv = setInterval(() => {
      const pct = Math.min(((Date.now() - start) / SLIDE_DURATION) * 100, 100)
      setProgress(pct)
      if (pct >= 100) next()
    }, 30)
    return () => clearInterval(iv)
  }, [paused, next])

  /* Mouse parallax on hero section */
  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = heroRef.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  - 0.5
    const y = (e.clientY - r.top)  / r.height - 0.5
    el.style.transform = `perspective(1400px) rotateX(${-y * 2.5}deg) rotateY(${x * 3.5}deg)`
  }, [])
  const onLeave = useCallback(() => { if (heroRef.current) heroRef.current.style.transform = '' }, [])

  /* Node hover with leave-delay to avoid tooltip flicker */
  const onNodeEnter = (i: number) => { clearTimeout(leaveTimer.current); setHovered(i) }
  const onNodeLeave = () => { leaveTimer.current = setTimeout(() => setHovered(null), 120) }

  const s = slides[idx]
  const act = activity[actIdx]

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-teal-900 select-none"
      style={{ transition: 'transform 0.18s ease' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={e => { setPaused(false); onLeave() }}
      onMouseMove={onMove}
    >
      {/* Dot-grid */}
      <div className="absolute inset-0 animate-grid-pan pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.065) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Holo scan */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(236,72,153,0.35),rgba(167,139,250,0.35),transparent)', animation: 'holo-scan 6s ease-in-out infinite' }} />
      </div>

      {/* Glow orbs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none animate-pulse-glow"
        style={{ background: `radial-gradient(circle,${s.accentFrom}20 0%,transparent 65%)`, transition: 'background 0.8s ease' }} />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none animate-breathe"
        style={{ background: `radial-gradient(circle,${s.accentTo}15 0%,transparent 65%)`, transition: 'background 0.8s ease' }} />

      {/* ── Main grid ── */}
      <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-20 grid md:grid-cols-2 gap-6 lg:gap-12 items-center">

        {/* ══ LEFT: text ══ */}
        <div key={animKey} className="text-white space-y-5">
          <div className="flex items-center gap-3 flex-wrap animate-slide-right delay-0">
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> AI-Powered Distribution
            </span>
            <span className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${s.accentBg} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>{s.tag}</span>
          </div>

          <div className="space-y-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-none tracking-tight animate-slide-up delay-75">{s.heading}</h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-none tracking-tight animate-slide-up delay-150"
              style={{ backgroundImage: `linear-gradient(135deg,${s.accentFrom},${s.accentTo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', transition: 'background-image 0.6s ease' }}>
              {s.headingSub}
            </h1>
          </div>

          <p className="text-white/60 text-base leading-relaxed max-w-md animate-slide-up delay-225">{s.sub}</p>

          <div className="flex gap-3 flex-wrap animate-slide-up delay-300">
            <a href={s.ctaHref}
              className="inline-flex items-center gap-2 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 hover:opacity-90 active:scale-95"
              style={{ background: `linear-gradient(135deg,${s.accentFrom},${s.accentTo})`, boxShadow: `0 8px 28px ${s.accentFrom}50` }}>
              {s.cta} <ArrowRight size={16} />
            </a>
            <a href="/products" className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 backdrop-blur-sm">
              All Products
            </a>
          </div>

          <div className="flex items-center gap-3 pt-1 animate-slide-up delay-375">
            <button onClick={prev} className="w-8 h-8 glass-card rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-90">
              <ChevronLeft size={15} />
            </button>
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className="relative flex items-center">
                {i === idx ? (
                  <div className="relative w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 rounded-full"
                      style={{ width: `${progress}%`, background: `linear-gradient(90deg,${s.accentFrom},${s.accentTo})`, transition: 'width 30ms linear' }} />
                  </div>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-white/25 hover:bg-white/50 transition-colors" />
                )}
              </button>
            ))}
            <button onClick={next} className="w-8 h-8 glass-card rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-90">
              <ChevronRight size={15} />
            </button>
            <span className="text-white/30 text-xs ml-1 tabular-nums">{idx + 1} / {slides.length}</span>
          </div>
        </div>

        {/* ══ RIGHT: AI Network Diagram ══ */}
        <div className="hidden md:flex flex-col gap-3 animate-scale-in" style={{ animationDelay: '200ms' }}>

          {/* SVG + tooltip wrapper */}
          <div className="relative w-full" style={{ paddingBottom: '78.75%' }}>
            <div className="absolute inset-0" style={{ overflow: 'visible' }}>

              {/* ── SVG diagram ── */}
              <svg
                viewBox="0 0 480 378"
                className="absolute inset-0 w-full h-full"
                style={{ overflow: 'visible', filter: 'drop-shadow(0 0 30px rgba(236,72,153,0.12))' }}
              >
                <defs>
                  <radialGradient id="hG" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#f97316" stopOpacity="1" />
                    <stop offset="55%"  stopColor="#ec4899" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.8" />
                  </radialGradient>
                  {nodes.map((n, i) => (
                    <radialGradient key={i} id={`nG${i}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%"   stopColor={n.color} stopOpacity={effectiveNode === i ? 0.35 : 0.18} />
                      <stop offset="100%" stopColor={n.color} stopOpacity="0.02" />
                    </radialGradient>
                  ))}
                  <filter id="hGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="7" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* ── Connection lines ── */}
                {nodes.map((n, i) => {
                  const active = effectiveNode === i || hubHov
                  return (
                    <g key={`l${i}`}>
                      {/* dim base */}
                      <line x1={CX} y1={CY} x2={n.x} y2={n.y}
                        stroke={n.color} strokeWidth={active ? 2 : 1} strokeOpacity={active ? 0.4 : 0.15} />
                      {/* animated dash */}
                      <line x1={CX} y1={CY} x2={n.x} y2={n.y}
                        stroke={n.color} strokeWidth={active ? 2 : 1.5}
                        strokeOpacity={active ? 0.85 : 0.4} strokeDasharray="5 8"
                        style={{ animation: `dash-flow ${active ? n.dur * 0.55 : n.dur * 1.1}s linear infinite` }} />
                    </g>
                  )
                })}

                {/* ── Outbound packets (hub → node) ── */}
                {nodes.map((n, i) => {
                  const active = effectiveNode === i || hubHov
                  const path = `M ${CX} ${CY} L ${n.x} ${n.y}`
                  return (
                    <g key={`out${i}`}>
                      <circle r={active ? 4.5 : 3.5} fill={n.color}
                        style={{ filter: active ? `drop-shadow(0 0 7px ${n.color})` : `drop-shadow(0 0 4px ${n.color})` }}>
                        {/* @ts-expect-error SVG animateMotion */}
                        <animateMotion dur={`${active ? n.dur * 0.6 : n.dur}s`} repeatCount="indefinite" path={path} />
                      </circle>
                      {/* Extra staggered packets when active */}
                      {active && (
                        <>
                          <circle r={3.5} fill={n.color} opacity="0.75"
                            style={{ filter: `drop-shadow(0 0 5px ${n.color})` }}>
                            {/* @ts-expect-error SVG animateMotion */}
                            <animateMotion dur={`${n.dur * 0.6}s`} repeatCount="indefinite" path={path} begin={`${n.dur * 0.2}s`} />
                          </circle>
                          <circle r={3} fill={n.color} opacity="0.5">
                            {/* @ts-expect-error SVG animateMotion */}
                            <animateMotion dur={`${n.dur * 0.6}s`} repeatCount="indefinite" path={path} begin={`${n.dur * 0.4}s`} />
                          </circle>
                        </>
                      )}
                    </g>
                  )
                })}

                {/* ── Inbound packets (node → hub) ── */}
                {nodes.map((n, i) => {
                  const active = effectiveNode === i || hubHov
                  const path = `M ${CX} ${CY} L ${n.x} ${n.y}`
                  return (
                    <circle key={`in${i}`} r={active ? 3 : 2.5} fill="rgba(255,255,255,0.75)">
                      {/* @ts-expect-error SVG animateMotion */}
                      <animateMotion dur={`${active ? (n.dur + 0.6) * 0.65 : n.dur + 0.6}s`}
                        repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" path={path} />
                    </circle>
                  )
                })}

                {/* ── Center sonar rings ── */}
                {[0, 0.7, 1.4].map((d, i) => (
                  <circle key={`s${i}`} cx={CX} cy={CY} r={hubHov ? 60 : 55}
                    fill="none" stroke={hubHov ? 'rgba(249,115,22,0.55)' : 'rgba(249,115,22,0.35)'} strokeWidth="1"
                    style={{ animation: `sonar ${hubHov ? 1.6 : 2.1}s ease-out infinite`, animationDelay: `${d}s`, transition: 'r 0.3s, stroke 0.3s' }} />
                ))}

                {/* ── Center hub ── */}
                <g
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHubHov(true)}
                  onMouseLeave={() => setHubHov(false)}
                  onClick={() => router.push('/products')}
                >
                  {/* Outer glow */}
                  <circle cx={CX} cy={CY} r={hubHov ? 64 : 58} fill="none"
                    stroke="rgba(236,72,153,0.3)" strokeWidth={hubHov ? 10 : 6}
                    style={{ filter: 'blur(6px)', transition: 'r 0.3s, stroke-width 0.3s' }} />
                  {/* Fill */}
                  <circle cx={CX} cy={CY} r={hubHov ? 56 : 52} fill="url(#hG)" filter="url(#hGlow)"
                    style={{ transition: 'r 0.3s' }} />
                  {/* Border */}
                  <circle cx={CX} cy={CY} r={hubHov ? 56 : 52} fill="none"
                    stroke="rgba(249,115,22,0.9)" strokeWidth={hubHov ? 2.5 : 2}
                    style={{ transition: 'r 0.3s' }} />
                  {/* Spinning inner dash ring */}
                  <circle cx={CX} cy={CY} r={44} fill="none"
                    stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="8 5"
                    style={{ animation: `spin-slow ${hubHov ? 4 : 8}s linear infinite`, transition: 'animation-duration 0.3s' }} />

                  {/* Centre text */}
                  <text x={CX} y={CY - 14} textAnchor="middle" fontSize="22" dominantBaseline="middle">🧠</text>
                  <text x={CX} y={CY + 7}  textAnchor="middle" fill="white" fontSize={hubHov ? 11 : 10.5} fontWeight="900" letterSpacing="0.06em">
                    {hubHov ? 'CLICK TO BROWSE' : 'DREAM AI'}
                  </text>
                  <text x={CX} y={CY + 21} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7.5">
                    {hubHov ? '10,000+ products →' : '10,000+ Products'}
                  </text>

                  {/* Live dot */}
                  <circle cx={CX + 38} cy={CY - 36} r={4.5} fill="#34d399">
                    <animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={CX + 38} cy={CY - 36} r={4.5} fill="none" stroke="#34d399" strokeWidth="1.5">
                    <animate attributeName="r"       values="5;11;5"   dur="1.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="1.4s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* ── Outer nodes ── */}
                {nodes.map((n, i) => {
                  const active = effectiveNode === i
                  const r = active ? 41 : 37
                  return (
                    <g key={`n${i}`}
                      style={{ cursor: 'pointer', transition: 'transform 0.3s ease', transform: active ? `scale(1.12)` : 'scale(1)', transformOrigin: `${n.x}px ${n.y}px` }}
                      onMouseEnter={() => onNodeEnter(i)}
                      onMouseLeave={onNodeLeave}
                      onClick={() => router.push(`/products?category=${encodeURIComponent(n.category)}`)}
                    >
                      {/* Pulse ring (spotlight/hover) */}
                      {active && (
                        <circle cx={n.x} cy={n.y} r={r + 10} fill="none"
                          stroke={n.color} strokeWidth="1.5" strokeOpacity="0.5"
                          style={{ animation: 'sonar 1.6s ease-out infinite' }} />
                      )}
                      {/* Aura fill */}
                      <circle cx={n.x} cy={n.y} r={r} fill={`url(#nG${i})`} />
                      {/* Border */}
                      <circle cx={n.x} cy={n.y} r={r} fill="none"
                        stroke={n.color} strokeWidth={active ? 2.5 : 1.5}
                        strokeOpacity={active ? 1 : 0.55}
                        style={{ filter: active ? `drop-shadow(0 0 8px ${n.color})` : 'none', transition: 'all 0.3s' }} />
                      {/* Emoji */}
                      <text x={n.x} y={n.y - 8} textAnchor="middle" fontSize={active ? 17 : 15} dominantBaseline="middle">{n.emoji}</text>
                      {/* Label */}
                      <text x={n.x} y={n.y + 10} textAnchor="middle" fill="white" fontSize={active ? 9 : 8.5} fontWeight="700">{n.label}</text>
                      {/* Count */}
                      <text x={n.x} y={n.y + 22} textAnchor="middle" fill={n.color} fontSize="7.5" fontWeight="700" opacity="0.95">{n.count}</text>
                    </g>
                  )
                })}

                {/* Legend */}
                <text x={CX} y={373} textAnchor="middle" fill="rgba(255,255,255,0.16)" fontSize="7.5" letterSpacing="0.1em">
                  AI DISTRIBUTION NETWORK · LIVE
                </text>
              </svg>

              {/* ── Tooltip (HTML overlay, outside SVG) ── */}
              {hovered !== null && (() => {
                const n = nodes[hovered]
                return (
                  <div
                    className="absolute pointer-events-none z-30"
                    style={{
                      left:      `${(n.x / 480) * 100}%`,
                      top:       `${(n.y / 378) * 100}%`,
                      transform: tooltipTransform(n.x, n.y),
                    }}
                  >
                    <div
                      className="rounded-2xl p-3.5 w-48 backdrop-blur-xl"
                      style={{
                        background: 'rgba(5,20,35,0.92)',
                        border: `1px solid ${n.color}55`,
                        boxShadow: `0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px ${n.color}30`,
                        animation: 'scaleIn 0.18s ease forwards',
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                          style={{ background: `${n.color}22`, border: `1px solid ${n.color}44` }}>
                          {n.emoji}
                        </div>
                        <div>
                          <div className="text-white text-xs font-bold leading-tight">{n.label}</div>
                          <div className="text-[10px] font-semibold mt-0.5" style={{ color: n.color }}>{n.count} active</div>
                        </div>
                      </div>
                      {/* Badge */}
                      <div className="text-[9px] font-black px-2 py-0.5 rounded-md mb-2 inline-block"
                        style={{ background: `${n.color}25`, color: n.color }}>
                        {n.badge}
                      </div>
                      {/* Insight */}
                      <p className="text-[10px] text-white/55 leading-relaxed mb-3">{n.insight}</p>
                      {/* CTA */}
                      <button
                        className="pointer-events-auto flex items-center gap-1.5 text-[10px] font-bold w-full py-1.5 px-2.5 rounded-lg transition-opacity hover:opacity-80"
                        style={{ background: `${n.color}22`, color: n.color, border: `1px solid ${n.color}40` }}
                        onClick={() => router.push(`/products?category=${encodeURIComponent(n.category)}`)}
                      >
                        Browse Products <ArrowRight size={9} />
                      </button>
                    </div>
                  </div>
                )
              })()}

            </div>
          </div>

          {/* ── Live activity ticker ── */}
          <div className="glass-card rounded-xl px-3.5 py-2.5 flex items-center gap-3 ai-border"
            style={{ transition: 'opacity 0.35s ease', opacity: actVisible ? 1 : 0 }}>
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-[9px] font-black">LIVE</span>
            </div>
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <span className="text-[10px] font-bold flex-shrink-0"
                style={{ color: nodes[act.ni].color }}>{nodes[act.ni].emoji}</span>
              <span className="text-white/55 text-[10px] truncate">{act.msg}</span>
            </div>
            <div className="flex items-center gap-0.5 flex-shrink-0">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-0.5 rounded-full bg-orange-400 animate-ai-wave"
                  style={{ height: `${5 + (i % 2) * 4}px`, animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </div>

          {/* ── 4 stat mini-boxes ── */}
          <div className="grid grid-cols-4 gap-2">
            {stats.map(({ icon: Icon, val, label, color }) => (
              <div key={label} className="glass-card rounded-xl p-2.5 text-center ai-border">
                <Icon size={13} className={`mx-auto mb-1 ${color}`} />
                <div className="text-white font-black text-sm leading-none">{val}</div>
                <div className="text-white/35 text-[9px] mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile: AI network cards (shown below text on small screens) ── */}
      <div className="md:hidden px-4 pb-8">
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/70 text-[10px] font-bold px-3 py-1 rounded-full">
            <Brain size={10} className="text-pink-400 animate-pulse" /> AI Distribution Network
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {nodes.map((n, i) => (
            <button
              key={i}
              onClick={() => router.push(`/products?category=${encodeURIComponent(n.category)}`)}
              className="glass-card rounded-xl p-3 text-left ai-border active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: `${n.color}22`, border: `1px solid ${n.color}44` }}>
                  {n.emoji}
                </div>
                <div className="min-w-0">
                  <div className="text-white text-[11px] font-bold leading-tight truncate">{n.label}</div>
                  <div className="text-[10px] font-bold" style={{ color: n.color }}>{n.count}</div>
                </div>
              </div>
              <p className="text-[9px] text-white/45 leading-relaxed line-clamp-2">{n.insight}</p>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 mt-2.5">
          {stats.map(({ icon: Icon, val, label, color }) => (
            <div key={label} className="glass-card rounded-xl p-2 text-center ai-border">
              <Icon size={11} className={`mx-auto mb-0.5 ${color}`} />
              <div className="text-white font-black text-xs leading-none">{val}</div>
              <div className="text-white/35 text-[8px] mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}
