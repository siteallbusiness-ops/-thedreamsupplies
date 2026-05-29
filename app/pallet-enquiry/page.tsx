'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Package, Phone, Mail, CheckCircle, ArrowLeft, Truck, Star } from 'lucide-react'

const palletTypes = [
  'Mixed Household Pallet',
  'Health & Beauty Pallet',
  'Toys & Games Pallet',
  'Clearance Mixed Pallet',
  'Food & Drink Pallet',
  'Stationery Pallet',
  'Custom Mixed Pallet',
  'Other / Not Sure',
]

export default function PalletEnquiryPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', company: '',
    email: '', phone: '',
    palletType: '', quantity: '', budget: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const canSubmit = form.firstName && form.lastName && form.email && form.phone && form.palletType

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center font-black text-lg text-white">D</div>
            <div className="hidden sm:block leading-tight">
              <div className="font-black text-teal-900 text-lg tracking-tight">Dream</div>
              <div className="font-bold text-[9px] tracking-widest uppercase text-orange-500">Distribution</div>
            </div>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-sm text-teal-700 font-semibold hover:text-teal-900 transition-colors">
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </header>

      {/* Hero banner */}
      <div className="bg-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute border border-white rounded-xl"
              style={{ width: `${60 + i * 20}px`, height: `${60 + i * 20}px`, top: `${(i * 37) % 100}%`, left: `${(i * 53) % 100}%`, transform: 'rotate(45deg)' }} />
          ))}
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            <Package size={12} /> Bulk & Wholesale
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">Pallet Deal Enquiries</h1>
          <p className="text-teal-300 text-sm max-w-xl mx-auto">
            Interested in bulk pallet deals? Fill in the form below and our team will come back to you with a personalised quote within 2 working hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-teal-300">
            <span className="flex items-center gap-1.5"><Truck size={12} className="text-orange-400" /> Free pallet delivery over £550</span>
            <span className="flex items-center gap-1.5"><Star size={12} className="text-orange-400" /> No minimum pallet count</span>
            <span className="flex items-center gap-1.5"><Phone size={12} className="text-orange-400" /> Mon–Fri 8am–4pm support</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {submitted ? (
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Enquiry Received!</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Thank you, <strong>{form.firstName}</strong>. We'll review your enquiry and get back to you at <strong>{form.email}</strong> within 2 working hours.
            </p>
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 text-left space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Pallet type</span><span className="font-semibold text-gray-800">{form.palletType}</span></div>
              {form.quantity && <div className="flex justify-between"><span className="text-gray-400">Quantity</span><span className="font-semibold text-gray-800">{form.quantity}</span></div>}
              {form.budget && <div className="flex justify-between"><span className="text-gray-400">Budget</span><span className="font-semibold text-gray-800">{form.budget}</span></div>}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:01162544988"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}>
                <Phone size={14} /> Call Us: 0116 2544 988
              </a>
              <Link href="/products"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border-2 border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white transition-colors">
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6 space-y-5">
              <h2 className="font-bold text-gray-900 text-base">Your Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">First Name *</label>
                  <input value={form.firstName} onChange={set('firstName')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                    placeholder="John" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Last Name *</label>
                  <input value={form.lastName} onChange={set('lastName')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                    placeholder="Smith" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Company Name</label>
                <input value={form.company} onChange={set('company')}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                  placeholder="Your Business Ltd" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Email *</label>
                  <input type="email" value={form.email} onChange={set('email')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                    placeholder="john@business.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Phone *</label>
                  <input type="tel" value={form.phone} onChange={set('phone')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                    placeholder="07700 900000" />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <h2 className="font-bold text-gray-900 text-base mb-4">Pallet Requirements</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Type of Pallet Interested In *</label>
                    <select value={form.palletType} onChange={set('palletType')}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 bg-white">
                      <option value="">Select pallet type…</option>
                      {palletTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">No. of Pallets Needed</label>
                      <input value={form.quantity} onChange={set('quantity')}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                        placeholder="e.g. 2" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Approximate Budget</label>
                      <input value={form.budget} onChange={set('budget')}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                        placeholder="e.g. £500–£1000" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Additional Information</label>
                    <textarea value={form.message} onChange={set('message')} rows={4}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 resize-none"
                      placeholder="Tell us about your business, what you resell, any specific product requirements…" />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={!canSubmit || submitting}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}>
                {submitting ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                ) : (
                  <><Package size={15} /> Send Enquiry</>
                )}
              </button>
              <p className="text-center text-[11px] text-gray-400">We typically respond within 2 working hours · Mon–Fri 8am–4pm</p>
            </form>

            {/* Sidebar info */}
            <div className="space-y-4">
              <div className="bg-teal-900 rounded-xl p-5 text-white">
                <h3 className="font-bold text-base mb-4">Why Buy Pallets?</h3>
                <ul className="space-y-3 text-sm text-teal-300">
                  {[
                    { icon: '💰', text: 'Save up to 70% off RRP on bulk stock' },
                    { icon: '📦', text: 'Mixed or single-category pallets available' },
                    { icon: '🚚', text: 'Free delivery on orders over £550' },
                    { icon: '🔄', text: 'Regular fresh stock arriving weekly' },
                    { icon: '🤝', text: 'Dedicated account manager for bulk buyers' },
                  ].map(item => (
                    <li key={item.text} className="flex items-start gap-2.5">
                      <span className="text-base flex-shrink-0">{item.icon}</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-3">Prefer to Talk?</h3>
                <a href="tel:01162544988"
                  className="flex items-center gap-3 p-3 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors mb-3">
                  <Phone size={16} className="text-teal-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-teal-900">0116 2544 988</p>
                    <p className="text-[11px] text-gray-400">Mon–Fri 8:00am–4:00pm</p>
                  </div>
                </a>
                <a href="mailto:hello@dreamdistribution.co.uk"
                  className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
                  <Mail size={16} className="text-orange-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">hello@dreamdistribution.co.uk</p>
                    <p className="text-[11px] text-gray-400">Reply within 2 hours</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
