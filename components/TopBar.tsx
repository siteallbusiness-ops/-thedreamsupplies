import { Truck, ShoppingBag, ShieldCheck } from 'lucide-react'

const usps = [
  { icon: Truck,        bold: 'FREE NEXT DAY DELIVERY*', rest: ' On all Mainland UK orders over £200 (Pallets over £550)' },
  { icon: ShoppingBag,  bold: 'NO MINIMUM ORDER',        rest: ' You can buy as little as £1 if you want!' },
  { icon: ShieldCheck,  bold: 'AI-POWERED DISTRIBUTION', rest: ' We understand your needs & deliver the right products' },
]

export default function TopBar() {
  return (
    <div className="relative bg-teal-900 overflow-hidden">
      <div className="absolute inset-0 dot-grid-dark pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {usps.map(({ icon: Icon, bold, rest }, i) => (
            <div key={bold} className="flex items-center justify-center gap-2.5 py-3 text-xs text-center group">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                <Icon size={13} className="text-orange-400" />
              </div>
              <p>
                <span className="font-bold text-white">{bold}</span>
                <span className="text-white/50">{rest}</span>
              </p>
              {i === 2 && (
                <span className="hidden lg:inline-flex items-center gap-1 bg-orange-500/20 border border-orange-500/30 text-orange-300 text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">
                  <span className="w-1 h-1 rounded-full bg-orange-400 animate-pulse" />AI
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
