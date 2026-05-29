'use client'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Trash2, ShoppingCart, ArrowRight, Package, Plus, Minus } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center font-black text-lg text-white">D</div>
            <div className="hidden sm:block leading-tight">
              <div className="font-black text-teal-900 text-lg tracking-tight">Dream</div>
              <div className="font-bold text-[9px] tracking-widest uppercase text-orange-500">Distribution</div>
            </div>
          </Link>
          <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart size={20} className="text-orange-500" /> Your Basket
          </h1>
          <Link href="/products" className="text-sm text-teal-700 font-semibold hover:text-teal-900">
            Continue Shopping
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center mb-5">
              <ShoppingCart size={36} className="text-orange-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your basket is empty</h2>
            <p className="text-gray-500 text-sm mb-6">Browse our wholesale products and add items to get started.</p>
            <Link href="/products"
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}>
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items list */}
            <div className="lg:col-span-2 space-y-3">
              <p className="text-sm text-gray-500 mb-4">{totalItems} item{totalItems !== 1 ? 's' : ''} in your basket</p>
              {items.map(item => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-lg bg-gray-50 flex-shrink-0 overflow-hidden">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200">
                        <Package size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-teal-600 uppercase tracking-wide">{item.vendor}</p>
                    <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">{item.name}</p>
                    <p className="text-base font-black text-teal-700 mt-0.5">£{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1.5 text-gray-500 hover:bg-gray-50 transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="px-3 py-1.5 text-sm font-semibold border-x border-gray-200 min-w-[32px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1.5 text-gray-500 hover:bg-gray-50 transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
                <h2 className="font-bold text-gray-900 text-base mb-4">Order Summary</h2>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-semibold">£{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className="font-semibold text-emerald-600">
                      {totalPrice >= 200 ? 'FREE' : '£9.99'}
                    </span>
                  </div>
                  {totalPrice < 200 && (
                    <p className="text-[11px] text-orange-500 font-medium">
                      Add £{(200 - totalPrice).toFixed(2)} more for free delivery
                    </p>
                  )}
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
                    <span>Total (exc. VAT)</span>
                    <span className="text-lg">£{(totalPrice + (totalPrice >= 200 ? 0 : 9.99)).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}>
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
                <p className="text-center text-[11px] text-gray-400 mt-3">Secure checkout · All payments encrypted</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
