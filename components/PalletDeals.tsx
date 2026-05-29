import { Package, ArrowRight, Truck, Star } from 'lucide-react'

const pallets = [
  { name:'Mixed Household Pallet', items:'~500 units', price:299, save:850, badge:'Best Value', emoji:'🏠', tags:['Cleaning','Kitchen','Bathroom'] },
  { name:'Health & Beauty Pallet', items:'~600 units', price:349, save:1100, badge:'Popular',    emoji:'💄', tags:['Skincare','Hair','Oral Care'] },
  { name:'Toys & Games Pallet',    items:'~200 units', price:399, save:900,  badge:'Great for Xmas', emoji:'🧸', tags:['Educational','Puzzles','Outdoor'] },
  { name:'Clearance Mixed Pallet', items:'~700 units', price:199, save:600,  badge:'Clearance',  emoji:'🏷️', tags:['Mixed Stock','Various Depts'] },
]

export default function PalletDeals() {
  return (
    <section className="py-14 bg-teal-900 relative overflow-hidden">
      {/* background texture */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_,i)=>(
          <div key={i} className="absolute border border-white rounded-xl" style={{
            width:`${60+i*20}px`,height:`${60+i*20}px`,
            top:`${(i*37)%100}%`,left:`${(i*53)%100}%`,transform:'rotate(45deg)'
          }}/>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Package size={20} className="text-orange-400"/>
              <span className="text-orange-400 font-bold text-sm uppercase tracking-wider">Bulk Savings</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Pallet Deals</h2>
            <p className="text-teal-300 text-sm mt-1">Massive savings on bulk pallets — ideal for retailers &amp; resellers</p>
          </div>
          <a href="/pallet-enquiry" className="hidden md:flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-semibold text-sm">
            Get a quote <ArrowRight size={15}/>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pallets.map((pal, i) => (
            <div key={pal.name}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white group animate-slide-up neon-card"
              style={{ animationDelay: `${i * 80}ms` }}>
              <div className="text-4xl mb-3">{pal.emoji}</div>
              <span className="text-[10px] bg-orange-500 text-white font-bold px-2 py-0.5 rounded-full">{pal.badge}</span>
              <h3 className="font-bold text-base mt-2 mb-1">{pal.name}</h3>
              <p className="text-teal-300 text-xs mb-3">{pal.items} approx.</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {pal.tags.map(t=>(
                  <span key={t} className="text-[10px] bg-teal-700/60 text-teal-200 px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-black text-orange-400">£{pal.price}</span>
                <span className="text-teal-400 text-xs line-through">RRP £{pal.save}</span>
              </div>
              <p className="text-teal-400 text-xs mb-4">exc. VAT + delivery</p>

              <div className="flex items-center gap-1.5 text-teal-300 text-xs mb-4">
                <Truck size={12}/> Free delivery (mainland UK)
              </div>

              <a href="/pallet-enquiry"
                className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2.5 rounded-lg transition-colors">
                Enquire Now <ArrowRight size={13}/>
              </a>
            </div>
          ))}
        </div>

        {/* Delivery note */}
        <div className="mt-8 flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4 text-teal-300 text-sm">
          <Star size={16} className="text-orange-400 flex-shrink-0 mt-0.5"/>
          <p>All pallets shipped on a <strong className="text-white">48–72hr pallet network</strong>. Free pallet delivery on orders over <strong className="text-white">£550</strong>. Contact us for export pallet quotes.</p>
        </div>
      </div>
    </section>
  )
}
