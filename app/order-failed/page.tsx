'use client'
import Link from 'next/link'
import { AlertTriangle, Phone, Mail, RefreshCw } from 'lucide-react'

export default function OrderFailedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center font-black text-lg text-white">D</div>
            <div className="hidden sm:block leading-tight">
              <div className="font-black text-teal-900 text-lg tracking-tight">Dream</div>
              <div className="font-bold text-[9px] tracking-widest uppercase text-orange-500">Distribution</div>
            </div>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={36} className="text-red-400" />
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
            Sorry, your order could not be completed
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            We were unable to process your payment at this time. No charge has been made to your account. Please contact us and we will be happy to help you complete your order.
          </p>

          <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6 space-y-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Get in touch</p>
            <a href="tel:01162544988"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors text-left">
              <Phone size={16} className="text-teal-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-teal-900">0151 388 0857</p>
                <p className="text-[11px] text-gray-400">Mon–Fri 8:00am–4:00pm</p>
              </div>
            </a>
            <a href="mailto:info@dreamdistribution.co.uk"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors text-left">
              <Mail size={16} className="text-orange-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-900">info@dreamdistribution.co.uk</p>
                <p className="text-[11px] text-gray-400">We aim to respond within 2 hours</p>
              </div>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/checkout"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}>
              <RefreshCw size={14} /> Try Again
            </Link>
            <Link href="/products"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border-2 border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
