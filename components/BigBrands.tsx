import { ArrowRight } from 'lucide-react'

const brands = [
  { name:'Colgate',         emoji:'🦷', color:'bg-red-50    text-red-700' },
  { name:'Persil',          emoji:'🌊', color:'bg-blue-50   text-blue-700' },
  { name:'Fairy',           emoji:'🍋', color:'bg-yellow-50 text-yellow-700' },
  { name:'Lynx',            emoji:'💨', color:'bg-gray-100  text-gray-700' },
  { name:'Head & Shoulders',emoji:'💆', color:'bg-sky-50    text-sky-700' },
  { name:'Dettol',          emoji:'🟢', color:'bg-green-50  text-green-700' },
  { name:'Cadbury',         emoji:'🍫', color:'bg-purple-50 text-purple-700' },
  { name:'Pringles',        emoji:'🥔', color:'bg-orange-50 text-orange-700' },
  { name:'Coca-Cola',       emoji:'🥤', color:'bg-red-50    text-red-700' },
  { name:'Gillette',        emoji:'🪒', color:'bg-blue-50   text-blue-700' },
  { name:'Pantene',         emoji:'✨', color:'bg-teal-50   text-teal-700' },
  { name:'L\'Oréal',        emoji:'💋', color:'bg-rose-50   text-rose-700' },
]

export default function BigBrands() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="sec-title">Big Brands</h2>
            <p className="sec-sub">Genuine branded products at real wholesale prices</p>
          </div>
          <a href="/products?category=Big+Brands" className="hidden md:flex items-center gap-1.5 text-teal-700 font-semibold hover:text-teal-900 text-sm">
            All brands <ArrowRight size={15}/>
          </a>
        </div>

        {/* Scrolling marquee strip */}
        <div className="overflow-hidden mb-8 rounded-xl bg-gray-50 border border-gray-100 py-4">
          <div className="flex gap-6 animate-marquee whitespace-nowrap">
            {[...brands, ...brands].map((b, i) => (
              <div key={i} className={`flex items-center gap-2 ${b.color} px-4 py-2 rounded-lg text-sm font-semibold flex-shrink-0 border border-current/10`}>
                <span className="text-lg">{b.emoji}</span>
                <span>{b.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {brands.map(b => (
            <a key={b.name} href="/products?category=Big+Brands"
              className={`${b.color} flex flex-col items-center gap-2 p-4 rounded-xl border border-current/10 hover:scale-105 transition-transform cursor-pointer`}>
              <span className="text-3xl">{b.emoji}</span>
              <span className="text-xs font-bold text-center leading-tight">{b.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
