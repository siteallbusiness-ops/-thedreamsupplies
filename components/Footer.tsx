import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin, Brain } from 'lucide-react'

const products = [
  { label: 'Pound Lines & More', href: '/products?category=Clearance' },
  { label: 'Home & Garden',      href: '/products?category=Home+%26+Garden' },
  { label: 'Health & Beauty',    href: '/products?category=Health+%26+Beauty' },
  { label: 'Stationery',         href: '/products?category=Stationery' },
  { label: 'Toys & Games',       href: '/products?category=Toys+%26+Games' },
  { label: 'Clothing',           href: '/products?category=Clothing' },
  { label: 'Food & Drink',       href: '/products?category=Food+%26+Drink' },
  { label: 'Pet & Leisure',      href: '/products?category=Pet+%26+Leisure' },
  { label: 'Party & Seasonal',   href: '/products?category=Party+%26+Seasonal' },
  { label: 'Pallet Deals',       href: '/products?category=Pallet+Deals' },
  { label: 'Big Brands',         href: '/products?category=Big+Brands' },
  { label: 'SALE',               href: '/products?category=Clearance', sale: true },
]

const quickLinks = [
  { label: 'Home',           href: '/' },
  { label: 'All Products',   href: '/products' },
  { label: 'Create Account', href: '/register' },
  { label: 'Sign In',        href: '/login' },
]

export default function Footer() {
  return (
    <footer className="relative bg-teal-900 text-gray-400 overflow-hidden">
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-60" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center font-black text-xl text-white shadow-lg"
                style={{ boxShadow: '0 4px 16px rgba(236,72,153,0.35)' }}>D</div>
              <div>
                <div className="text-white font-black text-xl tracking-tight">Dream</div>
                <div className="gradient-text-warm font-bold text-[10px] tracking-widest uppercase">Distribution</div>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/70 text-[10px] font-semibold px-3 py-1 rounded-full mb-4">
              <Brain size={10} className="text-orange-400" />AI-Powered Distribution Platform
            </div>
            <p className="text-sm leading-relaxed mb-5 text-white/50">The UK's leading AI-powered wholesale platform. No minimum order. Free next-day delivery over £200.</p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-teal-500 mt-0.5 flex-shrink-0" />
                Dream Distribution Ltd, Meridian Business Park, Leicester, LE19 1WZ
              </div>
              <a href="tel:01162544988" className="flex items-center gap-3 hover:text-teal-400 transition-colors">
                <Phone size={14} className="text-teal-500" />0116 2544 988
              </a>
              <a href="mailto:hello@dreamdistribution.co.uk" className="flex items-center gap-3 hover:text-teal-400 transition-colors">
                <Mail size={14} className="text-teal-500" />hello@dreamdistribution.co.uk
              </a>
            </div>
            <div className="flex items-center gap-2.5 mt-6">
              {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <span key={i} className="w-9 h-9 glass-card rounded-full flex items-center justify-center">
                  <Icon size={14} className="text-white/40" />
                </span>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="col-span-2 lg:col-span-2">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">Shop by Category</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {products.map(p => (
                <li key={p.label}>
                  <Link href={p.href}
                    className={`text-sm transition-colors ${p.sale ? 'text-orange-400 font-bold hover:text-orange-300' : 'text-white/40 hover:text-white/80'}`}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/40 hover:text-white/80 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Payment strip */}
      <div className="relative border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-white/40 text-xs">We accept:</span>
            {['VISA', 'MC', 'AMEX', 'PayPal', 'BACS', 'Klarna'].map(p => (
              <span key={p} className="glass-card text-white/60 text-xs px-2.5 py-1 rounded font-mono">{p}</span>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap justify-center text-xs">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-lg">🔒 SSL Secure</span>
            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-lg">✓ VAT Registered</span>
            <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-lg">🤖 AI-Powered</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-white/25">
          © {new Date().getFullYear()} Dream Distribution Ltd. Registered in England &amp; Wales. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
