import { Truck, ShoppingBag, RefreshCw, CreditCard, Clock, Award } from 'lucide-react'

const items = [
  { icon: Truck,       text: 'Free Next Day Delivery over £200' },
  { icon: ShoppingBag, text: 'No Minimum Order — buy from £1' },
  { icon: RefreshCw,   text: 'Easy 30-Day Returns' },
  { icon: CreditCard,  text: 'Secure Payments — all major cards' },
  { icon: Clock,       text: 'Order by 4pm for same-day dispatch' },
  { icon: Award,       text: 'AI-Powered Distribution Platform' },
]

export default function UspStrip() {
  return (
    <div className="relative bg-white border-y border-gray-100 py-4 overflow-hidden">
      {/* Moving scan line */}
      <div className="absolute inset-y-0 w-24 pointer-events-none animate-scan-line"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.08), transparent)' }} />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map(({ icon: Icon, text }, i) => (
            <div key={text}
              className="flex items-center gap-2 text-gray-700 group cursor-default animate-slide-right"
              style={{ animationDelay: `${i * 60}ms` }}>
              <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-50 group-hover:border-orange-200 transition-all duration-200">
                <Icon size={14} className="text-orange-500 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-xs font-medium leading-tight">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
