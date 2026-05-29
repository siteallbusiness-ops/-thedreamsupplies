'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Lock, CreditCard, MapPin, ChevronLeft } from 'lucide-react'

function formatCardNumber(value: string) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
  return digits
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice } = useCart()
  const deliveryTotal = totalPrice >= 200 ? totalPrice : totalPrice + 9.99

  const [delivery, setDelivery] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address1: '', address2: '', city: '', county: '', postcode: '',
  })

  const [card, setCard] = useState({
    number: '', name: '', expiry: '', cvc: '',
  })

  const [step, setStep] = useState<'delivery' | 'payment'>('delivery')
  const [paying, setPaying] = useState(false)

  const deliveryFilled =
    delivery.firstName && delivery.lastName && delivery.email &&
    delivery.address1 && delivery.city && delivery.postcode

  const cardFilled = card.number.replace(/\s/g, '').length === 16 && card.name && card.expiry.length === 5 && card.cvc.length >= 3

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault()
    setPaying(true)
    setTimeout(() => {
      router.push('/order-failed')
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center font-black text-lg text-white">D</div>
            <div className="hidden sm:block leading-tight">
              <div className="font-black text-teal-900 text-lg tracking-tight">Dream</div>
              <div className="font-bold text-[9px] tracking-widest uppercase text-orange-500">Distribution</div>
            </div>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Lock size={12} className="text-emerald-500" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Step indicator */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3 text-sm">
          <button
            onClick={() => setStep('delivery')}
            className={`flex items-center gap-1.5 font-semibold transition-colors ${step === 'delivery' ? 'text-orange-500' : 'text-gray-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white ${step === 'delivery' ? 'bg-orange-500' : step === 'payment' ? 'bg-emerald-500' : 'bg-gray-300'}`}>
              {step === 'payment' ? '✓' : '1'}
            </span>
            Delivery
          </button>
          <div className="h-px flex-1 bg-gray-200" />
          <span className={`flex items-center gap-1.5 font-semibold ${step === 'payment' ? 'text-orange-500' : 'text-gray-300'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white ${step === 'payment' ? 'bg-orange-500' : 'bg-gray-300'}`}>2</span>
            Payment
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            {step === 'delivery' && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="font-bold text-gray-900 text-base mb-5 flex items-center gap-2">
                  <MapPin size={16} className="text-orange-500" /> Delivery Address
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">First Name *</label>
                      <input
                        value={delivery.firstName}
                        onChange={e => setDelivery(d => ({ ...d, firstName: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Last Name *</label>
                      <input
                        value={delivery.lastName}
                        onChange={e => setDelivery(d => ({ ...d, lastName: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                        placeholder="Smith"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={delivery.email}
                      onChange={e => setDelivery(d => ({ ...d, email: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={delivery.phone}
                      onChange={e => setDelivery(d => ({ ...d, phone: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                      placeholder="07700 900000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Address Line 1 *</label>
                    <input
                      value={delivery.address1}
                      onChange={e => setDelivery(d => ({ ...d, address1: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                      placeholder="123 High Street"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Address Line 2</label>
                    <input
                      value={delivery.address2}
                      onChange={e => setDelivery(d => ({ ...d, address2: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                      placeholder="Apartment, suite, etc. (optional)"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">City *</label>
                      <input
                        value={delivery.city}
                        onChange={e => setDelivery(d => ({ ...d, city: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                        placeholder="Leicester"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">County</label>
                      <input
                        value={delivery.county}
                        onChange={e => setDelivery(d => ({ ...d, county: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                        placeholder="Leicestershire"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Postcode *</label>
                    <input
                      value={delivery.postcode}
                      onChange={e => setDelivery(d => ({ ...d, postcode: e.target.value.toUpperCase() }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 uppercase"
                      placeholder="LE1 1AA"
                    />
                  </div>
                  <button
                    disabled={!deliveryFilled}
                    onClick={() => setStep('payment')}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}>
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 'payment' && (
              <form onSubmit={handlePay} className="bg-white rounded-xl border border-gray-100 p-6">
                <button type="button" onClick={() => setStep('delivery')}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 mb-4 transition-colors">
                  <ChevronLeft size={13} /> Back to delivery
                </button>
                <h2 className="font-bold text-gray-900 text-base mb-5 flex items-center gap-2">
                  <CreditCard size={16} className="text-orange-500" /> Payment Details
                </h2>

                {/* Card visual */}
                <div className="rounded-xl p-5 mb-6 relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', minHeight: 120 }}>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, #ec4899, transparent)', transform: 'translate(30%, -30%)' }} />
                  <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Dream Distribution</div>
                  <div className="text-white font-mono text-lg tracking-widest mb-3">
                    {card.number || '•••• •••• •••• ••••'}
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-white/40 text-[9px] uppercase tracking-widest">Card Holder</div>
                      <div className="text-white text-xs font-semibold">{card.name || 'YOUR NAME'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/40 text-[9px] uppercase tracking-widest">Expires</div>
                      <div className="text-white text-xs font-semibold">{card.expiry || 'MM/YY'}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Card Number *</label>
                    <input
                      value={card.number}
                      onChange={e => setCard(c => ({ ...c, number: formatCardNumber(e.target.value) }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Name on Card *</label>
                    <input
                      value={card.name}
                      onChange={e => setCard(c => ({ ...c, name: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Expiry Date *</label>
                      <input
                        value={card.expiry}
                        onChange={e => setCard(c => ({ ...c, expiry: formatExpiry(e.target.value) }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">CVC *</label>
                      <input
                        value={card.cvc}
                        onChange={e => setCard(c => ({ ...c, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!cardFilled || paying}
                    className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}>
                    {paying ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>
                        <Lock size={14} /> Pay £{deliveryTotal.toFixed(2)}
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-1">
                    <Lock size={10} /> Your payment details are encrypted and secure
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 text-sm mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex-shrink-0 overflow-hidden">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                      <p className="text-[11px] text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-900 flex-shrink-0">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                {items.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-4">No items in basket</p>
                )}
              </div>
              <div className="border-t border-gray-100 pt-3 space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>£{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={totalPrice >= 200 ? 'text-emerald-600 font-semibold' : ''}>
                    {totalPrice >= 200 ? 'FREE' : '£9.99'}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-base pt-1 border-t border-gray-100">
                  <span>Total</span>
                  <span>£{deliveryTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
