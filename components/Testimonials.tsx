import { Star, Quote, Brain } from 'lucide-react'

const reviews = [
  { name:'Dave Perkins',   role:'Market Trader, Leicester',     text:'Best wholesale supplier I\'ve used in 20 years. No minimum order means I can test new lines without risk. Delivery is always next day.',    rating:5, init:'DP', gradient:'from-teal-500 to-teal-700' },
  { name:'Priya Sharma',   role:'Pound Shop Owner, Birmingham', text:'The pound lines are incredible value. My customers love them and my margins have never been better. Always new stock coming in too.',        rating:5, init:'PS', gradient:'from-orange-500 to-pink-600' },
  { name:'Mark O\'Brien',  role:'Online Seller, Manchester',    text:'I use Dream Distribution for all my eBay and Amazon stock. The clearance pallets are a goldmine. Fast delivery and great customer service.',  rating:5, init:'MO', gradient:'from-violet-500 to-purple-700' },
  { name:'Tracey Neville', role:'Gift Shop Owner, Bristol',     text:'Brilliant range of products and the big brands section is great for my shop. Really competitive pricing and easy online ordering.',           rating:5, init:'TN', gradient:'from-emerald-500 to-teal-700' },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid-dark pointer-events-none opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-900 border border-white/10 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <Brain size={12} className="text-pink-400" />
            Trusted by 50,000+ Businesses
          </div>
          <h2 className="sec-title">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {[...Array(5)].map((_,i)=><Star key={i} size={16} className="fill-orange-400 text-orange-400"/>)}
            <span className="text-gray-600 font-semibold ml-2 text-sm">4.9 / 5 from 3,800+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map(r => (
            <div key={r.name}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              {/* Gradient top bar */}
              <div className={`h-1.5 bg-gradient-to-r ${r.gradient}`} />

              <div className="p-5">
                {/* Quote icon */}
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center mb-4`}>
                  <Quote size={16} className="text-white" />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(r.rating)].map((_,i)=><Star key={i} size={12} className="fill-orange-400 text-orange-400"/>)}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{r.text}"</p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className={`bg-gradient-to-br ${r.gradient} w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                    {r.init}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{r.name}</div>
                    <div className="text-gray-400 text-xs">{r.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
          {['50,000+ Active Buyers','3,800+ Verified Reviews','Next-Day UK Delivery','AI-Matched Products'].map(t => (
            <div key={t} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
