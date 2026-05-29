'use client'
import { Suspense, useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Search, Grid3X3, List, ChevronDown, X,
  Brain, ShoppingCart, Filter, ChevronRight,
  Package, AlertCircle
} from 'lucide-react'
import { useCart } from '@/context/CartContext'

interface Product {
  id: string
  name: string
  vendor: string
  productType: string
  tags: string
  sku: string
  price: number
  compareAtPrice: number | null
  imageUrl: string
  productUrl: string
  variantCount: number
  aiPick: boolean
}

interface ApiResponse {
  items: Product[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

const CATEGORIES = [
  'All', 'Home & Garden', 'Health & Beauty', 'Food & Drink',
  'Stationery', 'Toys & Games', 'Party & Seasonal',
  'Pet & Leisure', 'Clothing', 'Pallet Deals', 'Clearance',
  'Big Brands', 'Fast Sellers',
]

const PRICE_RANGES = [
  { label: 'Any Price', value: '' },
  { label: 'Under 50p', value: '0-0.5' },
  { label: 'Under 75p', value: '0-0.75' },
  { label: 'Under £1', value: '0-1' },
  { label: 'Under £2', value: '0-2' },
  { label: 'Under £5', value: '0-5' },
  { label: '£5 – £20', value: '5-20' },
  { label: '£20 – £100', value: '20-100' },
  { label: '£100+', value: '100-999999' },
]

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'A – Z', value: 'name-az' },
  { label: 'Best Discount', value: 'discount' },
]

function ProductCard({ p, view }: { p: Product; view: 'grid' | 'list' }) {
  const [added, setAdded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const { addItem, items: cartItems } = useCart()
  const inCart = cartItems.some(i => i.id === p.id)
  const discount = p.compareAtPrice && p.compareAtPrice > p.price
    ? Math.round((1 - p.price / p.compareAtPrice) * 100)
    : null

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({ id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl, vendor: p.vendor })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (view === 'list') {
    return (
      <div className="bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all flex gap-4 p-3 group">
        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
          {!imgError ? (
            <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain" onError={() => setImgError(true)} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-200"><Package size={28} /></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              {p.aiPick && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-500 mb-1">
                  <Brain size={10} /> AI Pick
                </span>
              )}
              <div className="font-semibold text-gray-900 text-sm line-clamp-2">{p.name}</div>
              <div className="text-xs text-gray-400 mt-0.5">{p.vendor}</div>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="font-black text-teal-900 text-lg">£{p?.price?.toFixed(2)}</div>
              {p.compareAtPrice && (
                <div className="text-xs text-gray-400 line-through">£{p.compareAtPrice.toFixed(2)}</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            {discount && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #ec4899, #f472b6)' }}>
                -{discount}%
              </span>
            )}
            <button onClick={handleAdd}
              className={`ml-auto px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all ${added ? 'bg-emerald-500' : 'bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90'}`}>
              {added ? 'Added ✓' : 'Add to Basket'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all overflow-hidden group flex flex-col">
      {p.aiPick && (
        <div className="h-1" style={{ background: 'linear-gradient(90deg, #f97316, #ec4899)' }} />
      )}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {!imgError ? (
          <img src={p.imageUrl} alt={p.name}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-200"><Package size={40} /></div>
        )}
        {discount && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[11px] font-black text-white"
            style={{ background: 'linear-gradient(135deg, #ec4899, #f472b6)' }}>
            -{discount}%
          </span>
        )}
        {p.aiPick && (
          <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold text-white animate-neural-pulse"
            style={{ background: 'linear-gradient(135deg,#ec4899,#a78bfa)', boxShadow: '0 2px 10px rgba(236,72,153,0.5)' }}>
            <Brain size={9} /> AI Pick
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <div className="text-[11px] text-gray-400 mb-1">{p.vendor}</div>
        <div className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1 leading-snug">{p.name}</div>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <div className="font-black text-teal-900 text-lg">£{p?.price}</div>
            {p?.compareAtPrice && (
              <div className="text-xs text-gray-400 line-through">£{p?.compareAtPrice}</div>
            )}
          </div>
          <button onClick={handleAdd}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all ${added ? 'bg-emerald-500' : 'bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90'}`}>
            {added ? '✓' : <ShoppingCart size={14} />}
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductsPageContent() {
  const searchParams = useSearchParams()
  const initCategory = searchParams.get('category') || 'All'
  const initPrice = searchParams.get('price') || ''
  const [category, setCategory] = useState(initCategory)
  const { totalItems } = useCart()
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState(initPrice)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [aiOnly, setAiOnly] = useState(false)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const abortRef = useRef<AbortController | null>(null)

  const fetchProducts = useCallback(async (params: {
    category: string; sort: string; price: string; search: string;
    inStock: boolean; aiOnly: boolean; page: number
  }) => {
    if (abortRef.current) abortRef.current.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl

    setLoading(true)
    setError('')
    try {
      const qs = new URLSearchParams({
        category: params.category,
        sort: params.sort,
        price: params.price,
        search: params.search,
        inStock: String(params.inStock),
        aiOnly: String(params.aiOnly),
        page: String(params.page),
      })
      const res = await fetch(`/api/products?${qs}`, { signal: ctrl.signal })
      if (!res.ok) throw new Error('Failed to load products')
      const json: ApiResponse = await res.json()
      setData(json)
    } catch (e: unknown) {
      if (e instanceof Error && e.name !== 'AbortError') setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts({ category, sort: sortBy, price: priceRange, search, inStock: inStockOnly, aiOnly, page })
  }, [category, sortBy, priceRange, search, inStockOnly, aiOnly, page, fetchProducts])

  const handleCategoryChange = (cat: string) => {
    setCategory(cat)
    setPage(1)
    setSidebarOpen(false)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  const clearSearch = () => { setSearch(''); setSearchInput(''); setPage(1) }

  const activeFilters: { label: string; clear: () => void }[] = []
  if (category !== 'All') activeFilters.push({ label: category, clear: () => { setCategory('All'); setPage(1) } })
  if (priceRange) {
    const pr = PRICE_RANGES.find(r => r.value === priceRange)
    if (pr) activeFilters.push({ label: pr.label, clear: () => { setPriceRange(''); setPage(1) } })
  }
  if (search) activeFilters.push({ label: `"${search}"`, clear: clearSearch })
  if (inStockOnly) activeFilters.push({ label: 'In Stock', clear: () => { setInStockOnly(false); setPage(1) } })
  if (aiOnly) activeFilters.push({ label: 'AI Picks', clear: () => { setAiOnly(false); setPage(1) } })

  const Sidebar = () => (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">AI Recommended</div>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <div className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${aiOnly ? 'bg-gradient-to-r from-orange-500 to-pink-600' : 'bg-gray-200'}`}
            onClick={() => { setAiOnly(o => !o); setPage(1) }}>
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${aiOnly ? 'left-5' : 'left-0.5'}`} />
          </div>
          <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            <Brain size={13} className="text-orange-500" /> AI Picks Only
          </span>
        </label>
      </div>

      <div>
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Category</div>
        <div className="space-y-0.5">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => handleCategoryChange(cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                category === cat
                  ? 'bg-gradient-to-r from-orange-50 to-pink-50 text-orange-600 font-semibold border border-orange-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Price Range</div>
        <div className="space-y-0.5">
          {PRICE_RANGES.map(r => (
            <button key={r.value} onClick={() => { setPriceRange(r.value); setPage(1) }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                priceRange === r.value
                  ? 'bg-gradient-to-r from-orange-50 to-pink-50 text-orange-600 font-semibold border border-orange-100'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <div className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${inStockOnly ? 'bg-gradient-to-r from-orange-500 to-pink-600' : 'bg-gray-200'}`}
            onClick={() => { setInStockOnly(o => !o); setPage(1) }}>
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${inStockOnly ? 'left-5' : 'left-0.5'}`} />
          </div>
          <span className="text-sm font-medium text-gray-700">In Stock Only</span>
        </label>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center font-black text-lg text-white">D</div>
            <div className="hidden sm:block leading-tight">
              <div className="font-black text-teal-900 text-lg tracking-tight">Dream</div>
              <div className="font-bold text-[9px] tracking-widest uppercase gradient-text-warm">Distribution</div>
            </div>
          </Link>
          <form onSubmit={handleSearchSubmit} className="flex-1 flex shadow-sm">
            <input
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search 4,000+ products…"
              className="flex-1 border border-gray-200 rounded-l-xl px-4 py-2 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
            />
            <button type="submit" className="bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90 text-white px-4 rounded-r-xl flex items-center gap-1.5 transition-opacity">
              <Search size={15} />
              <span className="hidden sm:block text-sm font-semibold">Search</span>
            </button>
          </form>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/login" className="hidden md:flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-900 transition-colors">Account</Link>
            <Link href="/cart" className="relative">
              <ShoppingCart size={22} className="text-gray-400 hover:text-teal-900 transition-colors" />
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px] text-white"
                style={{ background: 'linear-gradient(135deg,#ec4899,#f472b6)' }}>
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 font-medium">{category === 'All' ? 'All Products' : category}</span>
        </nav>

        <div className="flex gap-6">
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 p-4 sticky top-24">
              <Sidebar />
            </div>
          </aside>

          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
              <div className="absolute left-0 top-0 h-full w-72 bg-white p-5 overflow-y-auto shadow-xl">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-bold text-gray-900">Filters</span>
                  <button onClick={() => setSidebarOpen(false)}><X size={20} className="text-gray-500" /></button>
                </div>
                <Sidebar />
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <button onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-orange-300 transition-colors flex-shrink-0">
                <Filter size={14} /> Filters
                {activeFilters.length > 0 && (
                  <span className="w-5 h-5 rounded-full text-[11px] font-bold text-white flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,#f97316,#ec4899)' }}>
                    {activeFilters.length}
                  </span>
                )}
              </button>

              <div className="flex-1 min-w-0">
                {data && !loading && (
                  <p className="text-xs sm:text-sm text-gray-500">
                    <span className="font-semibold text-gray-900">{data.total.toLocaleString()}</span> products
                    {category !== 'All' && <> in <span className="font-semibold text-orange-600">{category}</span></>}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 ml-auto flex-shrink-0">
                <div className="relative">
                  <select value={sortBy} onChange={e => { setSortBy(e.target.value); setPage(1) }}
                    className="appearance-none bg-white border border-gray-200 rounded-lg pl-2.5 pr-7 py-2 text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-orange-400 cursor-pointer max-w-[130px] sm:max-w-none">
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => setView('grid')}
                    className={`p-2 transition-colors ${view === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-gray-700'}`}>
                    <Grid3X3 size={15} />
                  </button>
                  <button onClick={() => setView('list')}
                    className={`p-2 transition-colors ${view === 'list' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-gray-700'}`}>
                    <List size={15} />
                  </button>
                </div>
              </div>
            </div>

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeFilters.map((f, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-orange-700">
                    {f.label}
                    <button onClick={f.clear}><X size={12} /></button>
                  </span>
                ))}
                {activeFilters.length > 1 && (
                  <button onClick={() => {
                    setCategory('All'); setPriceRange(''); setSearch(''); setSearchInput('')
                    setInStockOnly(false); setAiOnly(false); setPage(1)
                  }} className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-500 hover:bg-gray-200 transition-colors">
                    Clear all
                  </button>
                )}
              </div>
            )}

            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            {loading && (
              <>
                {/* AI scanning indicator */}
                <div className="mb-4 rounded-xl px-4 py-3 flex items-center gap-3"
                  style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95))', border: '1px solid rgba(236,72,153,0.2)' }}>
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full border-2 border-pink-500/30 animate-spin"
                      style={{ borderTopColor: '#ec4899' }} />
                    <div className="absolute inset-1.5 rounded-full flex items-center justify-center bg-slate-900">
                      <Brain size={12} className="text-orange-400 animate-pulse" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-[11px] font-bold">AI is scanning products…</div>
                    <div className="mt-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full shimmer-sweep"
                        style={{ background: 'linear-gradient(90deg, #ec4899, #a78bfa, #ec4899)', backgroundSize: '200%' }} />
                    </div>
                  </div>
                </div>
                <div className={`grid gap-4 ${view === 'grid' ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
                      <div className="aspect-square bg-gray-100 relative overflow-hidden">
                        <div className="absolute inset-0 shimmer-sweep opacity-60" />
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="h-3 bg-gray-100 rounded w-1/3" />
                        <div className="h-4 bg-gray-100 rounded w-full" />
                        <div className="h-4 bg-gray-100 rounded w-2/3" />
                        <div className="h-8 bg-gray-100 rounded mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {!loading && data && data.items.length > 0 && (
              <>
                {/* AI insight strip */}
                {data.items.some(p => p.aiPick) && (
                  <div className="mb-4 rounded-xl px-4 py-2.5 flex items-center gap-3"
                    style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.94), rgba(30,41,59,0.94))', border: '1px solid rgba(236,72,153,0.18)' }}>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-0.5 rounded-full bg-gradient-to-t from-pink-500 to-orange-400 animate-ai-wave"
                          style={{ height: `${6 + (i % 3) * 5}px`, animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                    <p className="text-white/60 text-[11px]">
                      <span className="text-orange-400 font-semibold">AI Picks</span> are highlighted — ranked by demand, margin & match score.
                    </p>
                    <span className="ml-auto flex items-center gap-1 flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-emerald-400 text-[9px] font-bold">LIVE</span>
                    </span>
                  </div>
                )}
                <div className={`grid gap-4 ${view === 'grid' ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                  {data.items.map(p => (
                    <ProductCard key={p.id} p={p} view={view} />
                  ))}
                </div>

                {data.totalPages > 1 && (
                  <div className="flex items-center justify-between mt-8">
                    <p className="text-sm text-gray-500">
                      Page {data.page} of {data.totalPages} · {data.total.toLocaleString()} products
                    </p>
                    <div className="flex gap-2">
                      <button
                        disabled={page <= 1}
                        onClick={() => setPage(p => p - 1)}
                        className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                        Previous
                      </button>
                      {Array.from({ length: Math.min(5, data.totalPages) }).map((_, i) => {
                        const pg = Math.max(1, Math.min(page - 2, data.totalPages - 4)) + i
                        return (
                          <button key={pg} onClick={() => setPage(pg)}
                            className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                              pg === page
                                ? 'text-white'
                                : 'border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600'
                            }`}
                            style={pg === page ? { background: 'linear-gradient(135deg,#f97316,#ec4899)' } : {}}>
                            {pg}
                          </button>
                        )
                      })}
                      <button
                        disabled={page >= data.totalPages}
                        onClick={() => setPage(p => p + 1)}
                        className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {!loading && data && data.items.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-4">
                  <Package size={28} className="text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-xs">
                  Try adjusting your filters or search term to find what you need.
                </p>
                <button onClick={() => {
                  setCategory('All'); setPriceRange(''); setSearch(''); setSearchInput('')
                  setInStockOnly(false); setAiOnly(false); setPage(1)
                }} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg,#f97316,#ec4899)' }}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-pink-500/30 animate-spin"
              style={{ borderTopColor: '#ec4899' }} />
          </div>
          <p className="text-gray-400 text-sm">Loading products…</p>
        </div>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  )
}
