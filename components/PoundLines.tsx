'use client'
import { Tag, ArrowRight } from 'lucide-react'

const tiers = [
  {
    price: '50p', label: 'Lines', emoji: '🪙',
    href: '/products?price=0-0.5',
    desc: 'Great value products at just 50p each',
    count: '200+ items',
    bg: 'from-teal-600 to-teal-800',
    items: ['Kitchen Sponges x3', 'Cable Ties x50', 'Sticky Notes x3 Pack', 'Ballpoint Pens x5'],
  },
  {
    price: '75p', label: 'Lines', emoji: '💰',
    href: '/products?price=0-0.75',
    desc: 'Brilliant buys at 75p each',
    count: '150+ items',
    bg: 'from-teal-700 to-teal-900',
    items: ['Hand Sanitiser 50ml', 'Lip Balm Twin Pack', 'AA Batteries x4', 'Clothespins x20'],
  },
  {
    price: '£1', label: 'Lines', emoji: '🏷️',
    href: '/products?price=0-1',
    desc: 'Best-selling pound lines',
    count: '400+ items',
    bg: 'from-orange-500 to-orange-700',
    items: ['Multi-Surface Cleaner', 'Shower Gel 250ml', 'Ruled Notebook A5', 'Mini Torch LED'],
  },
  {
    price: '£2', label: 'Lines', emoji: '🎯',
    href: '/products?price=0-2',
    desc: 'Premium value at £2 each',
    count: '300+ items',
    bg: 'from-orange-600 to-red-700',
    items: ['Laundry Tablets x10', 'Shampoo 400ml', 'Toothpaste Twin Pack', 'Dish Soap 500ml'],
  },
]

export default function PoundLines() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Tag size={20} className="text-orange-500" />
              <span className="text-orange-500 font-bold text-sm uppercase tracking-wider">Best Value</span>
            </div>
            <h2 className="sec-title">Pound Lines & More</h2>
            <p className="sec-sub">Incredible wholesale prices — perfect for pound shops, market stalls & online sellers</p>
          </div>
          <a href="/products?category=Clearance" className="flex items-center gap-1.5 text-teal-700 font-semibold hover:text-teal-900 text-sm flex-shrink-0 mt-1">
            View all <ArrowRight size={15} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiers.map((tier, i) => (
            <div key={tier.price}
              className="group rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-slide-up"
              style={{ animationDelay: `${i * 80}ms`, transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 20px 50px rgba(236,72,153,0.18)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = ''
                ;(e.currentTarget as HTMLElement).style.boxShadow = ''
              }}>
              {/* Header */}
              <div className={`bg-gradient-to-br ${tier.bg} p-6 text-white`}>
                <div className="text-4xl mb-2">{tier.emoji}</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">{tier.price}</span>
                  <span className="text-lg font-semibold opacity-80">{tier.label}</span>
                </div>
                <p className="text-white/70 text-xs mt-1">{tier.desc}</p>
                <span className="inline-block mt-2 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">{tier.count}</span>
              </div>

              {/* Product list */}
              <div className="bg-white p-4 space-y-2">
                {tier.items.map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600 hover:text-teal-700 cursor-pointer py-1 border-b border-gray-50 last:border-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
                <a href={tier.href}
                  className="flex items-center justify-center gap-2 w-full mt-3 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold py-2.5 rounded-lg transition-colors">
                  Shop {tier.price} Lines <ArrowRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
