'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ShoppingCart, Heart, Brain, Sparkles, Package, ArrowRight } from 'lucide-react'

interface Product {
  id: string
  name: string
  vendor: string
  productType: string
  price: number
  compareAtPrice: number | null
  imageUrl: string
  aiPick: boolean
}

const TABS = ['All', 'Home & Garden', 'Health & Beauty', 'Toys & Games', 'Food & Drink', 'Clearance']

function MiniCard({ p, index, wishlisted, carted, onWishlist, onCart }: {
  p: Product; index: number
  wishlisted: boolean; carted: boolean
  onWishlist: () => void; onCart: () => void
}) {
  const [imgErr, setImgErr] = useState(false)
  const discount = p.compareAtPrice && p.compareAtPrice > p.price
    ? Math.round((1 - p.price / p.compareAtPrice) * 100)
    : null

  return (
    <div
      className={`group bg-white rounded-xl overflow-hidden animate-scale-in ${p.aiPick ? 'border-2 border-orange-400/60 shadow-sm hover:shadow-orange-200/50' : 'border border-gray-200 hover:shadow-md'}`}
      style={{ animationDelay: `${index * 45}ms`, transition: 'box-shadow 0.25s ease, transform 0.25s ease' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = '' }}>

      {p.aiPick && <div className="h-0.5 bg-gradient-to-r from-orange-400 via-pink-500 to-violet-500" />}

      <div className="relative bg-gray-50 h-36 flex items-center justify-center overflow-hidden">
        {!imgErr ? (
          <img src={p.imageUrl} alt={p.name}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgErr(true)} />
        ) : (
          <Package size={32} className="text-gray-200" />
        )}

        {p.aiPick && (
          <span className="absolute top-2 left-2 inline-flex items-center gap-0.5 bg-teal-900 text-orange-300 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-orange-500/30">
            <Brain size={8} /> AI Pick
          </span>
        )}
        {discount && (
          <span className="absolute top-2 right-8 bg-red-500 text-white text-[10px] font-bold px-1 py-0.5 rounded">
            -{discount}%
          </span>
        )}
        <button onClick={onWishlist} className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors">
          <Heart size={14} className={wishlisted ? 'fill-red-500 text-red-500' : ''} />
        </button>

        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onCart}
            className={`text-[11px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 ${carted ? 'bg-emerald-600 text-white' : 'bg-teal-700 text-white'}`}>
            <ShoppingCart size={10} />{carted ? 'Added' : 'Add'}
          </button>
        </div>
      </div>

      <div className="p-2.5">
        <p className="text-[10px] font-medium text-teal-600 uppercase tracking-wide mb-0.5 truncate">{p.vendor}</p>
        <h3 className="text-xs font-semibold text-gray-900 leading-tight mb-1.5 line-clamp-2">{p.name}</h3>
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-black text-teal-700">£{p?.price}</span>
          {p?.compareAtPrice && (
            <span className="text-[10px] text-gray-400 line-through">£{p?.compareAtPrice}</span>
          )}
        </div>
        <p className="text-[9px] text-gray-400">exc. VAT / each</p>
      </div>
    </div>
  )
}

export default function FeaturedProducts() {
  const [tab, setTab] = useState('All')
  const [scanning, setScanning] = useState(false)
  const [gridKey, setGridKey] = useState(0)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [carted, setCarted] = useState<string[]>([])

  const fetchForTab = useCallback(async (t: string) => {
    setLoading(true)
    try {
      const qs = new URLSearchParams({
        category: t,
        sort: 'featured',
        pageSize: '12',
        page: '1',
      })
      const res = await fetch(`/api/products?${qs}`)
      if (!res.ok) return
      const data = await res.json()
      setProducts(data.items)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchForTab(tab) }, [tab, fetchForTab])

  const switchTab = useCallback((t: string) => {
    if (t === tab) return
    setScanning(true)
    setTimeout(() => {
      setTab(t)
      setScanning(false)
      setGridKey(k => k + 1)
    }, 550)
  }, [tab])

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Brain size={16} className="text-orange-500" />
              <span className="text-orange-500 font-bold text-xs uppercase tracking-wider">AI Recommended</span>
            </div>
            <h2 className="sec-title">Featured Products</h2>
            <p className="sec-sub">Handpicked wholesale deals — AI picks marked for you</p>
          </div>
          <a href="/products" className="flex items-center gap-1 text-teal-700 font-semibold hover:text-teal-900 text-sm flex-shrink-0 mt-1">
            View all <ArrowRight size={14} />
          </a>
        </div>

        <div className="flex gap-2 overflow-x-auto flex-nowrap mb-6 border-b border-gray-100 pb-3 -mx-4 px-4 scrollbar-none">
          {TABS.map(t => (
            <button key={t} onClick={() => switchTab(t)}
              className={`relative flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                tab === t ? 'text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={tab === t ? {
                background: 'linear-gradient(135deg, #ec4899, #a78bfa)',
                boxShadow: '0 4px 16px rgba(236,72,153,0.3)',
              } : {}}>
              {t}
            </button>
          ))}
        </div>

        {scanning && (
          <>
            <div className="relative h-2 mb-6 bg-gray-100 rounded-full overflow-hidden">
              <div className="absolute inset-0 rounded-full shimmer-sweep"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.5), rgba(167,139,250,0.5), transparent)' }} />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
              <Brain size={12} className="text-orange-400 animate-pulse" />
              <span>AI analysing best matches…</span>
              <Sparkles size={11} className="text-violet-400 animate-pulse" />
            </div>
          </>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-36 bg-gray-100" />
                <div className="p-2.5 space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div key={gridKey} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {products.map((p, i) => (
              <MiniCard key={p.id} p={p} index={i}
                wishlisted={wishlist.includes(p.id)}
                carted={carted.includes(p.id)}
                onWishlist={() => setWishlist(w => w.includes(p.id) ? w.filter(x => x !== p.id) : [...w, p.id])}
                onCart={() => setCarted(c => c.includes(p.id) ? c.filter(x => x !== p.id) : [...c, p.id])}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/products" className="btn-outline">View All Products</Link>
        </div>
      </div>
    </section>
  )
}
