'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User, Phone, Clock, Heart, Menu, X, Brain } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      {/* Phone strip */}
      <div className="bg-teal-900 text-xs py-1.5 hidden lg:block border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white/50">
            <Brain size={11} className="text-orange-400" />
            <span className="text-white/60 font-medium">AI-Powered Distribution Platform</span>
          </div>
          <div className="flex items-center gap-6 text-white/50">
            <span className="flex items-center gap-1.5"><Phone size={10} className="text-orange-400" /> 0151 388 0857</span>
            <span className="flex items-center gap-1.5"><Clock size={10} className="text-orange-400" /> Open Mon–Fri 8:00am–4:00pm</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center font-black text-xl text-white"
            style={{ boxShadow: '0 4px 12px rgba(236,72,153,0.3)' }}>D</div>
          <div className="hidden sm:block leading-tight">
            <div className="font-black text-teal-900 text-xl tracking-tight">Dream</div>
            <div className="font-bold text-[10px] tracking-widest uppercase gradient-text-warm">Distribution</div>
          </div>
        </Link>

        {/* Search */}
        <form action="/products" method="GET" role="search" className="flex-1 flex shadow-sm">
          <input
            name="search"
            type="search"
            autoComplete="off"
            placeholder="Search 10,000+ wholesale products…"
            className="flex-1 border border-gray-200 rounded-l-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
          />
          <button
            type="submit"
            aria-label="Search products"
            className="bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90 text-white px-5 rounded-r-xl flex items-center gap-2 transition-opacity"
          >
            <Search size={16} />
            <span className="hidden sm:block text-sm font-semibold">Search</span>
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link href="/login" className="hidden md:flex flex-col items-center text-gray-400 hover:text-teal-900 transition-colors">
            <User size={20} /><span className="text-[10px] mt-0.5">Account</span>
          </Link>
          <Link href="/register" className="hidden md:flex flex-col items-center text-gray-400 hover:text-teal-900 transition-colors">
            <Heart size={20} /><span className="text-[10px] mt-0.5">Register</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center text-gray-400 hover:text-teal-900 transition-colors relative">
            <div className="relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px] text-white"
                style={{ background: 'linear-gradient(135deg, #ec4899, #f472b6)' }}>
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            </div>
            <span className="text-[10px] mt-0.5">Basket</span>
          </Link>
          <button className="md:hidden text-gray-600" onClick={() => setMobileOpen(o => !o)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 text-sm">
          {[
            { label: 'Home & Garden',   href: '/products?category=Home+%26+Garden' },
            { label: 'Health & Beauty', href: '/products?category=Health+%26+Beauty' },
            { label: 'Stationery',      href: '/products?category=Stationery' },
            { label: 'Toys & Games',    href: '/products?category=Toys+%26+Games' },
            { label: 'Food & Drink',    href: '/products?category=Food+%26+Drink' },
            { label: 'Pallet Deals',    href: '/products?category=Pallet+Deals' },
            { label: 'Big Brands',      href: '/products?category=Big+Brands' },
            { label: 'SALE',            href: '/products?category=Clearance' },
          ].map(c => (
            <Link key={c.label} href={c.href}
              className={`block py-2.5 px-3 rounded-lg border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors ${c.label === 'SALE' ? 'text-orange-500 font-bold' : 'text-gray-700'}`}>
              {c.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
