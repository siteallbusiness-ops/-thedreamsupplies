import type { Metadata } from 'next'
import './globals.css'
import AICursor from '@/components/AICursor'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Dream Distribution – AI-Powered Wholesale | No Minimum Order',
  description: 'AI-powered wholesale distribution platform. No minimum order. Free next day delivery over £200. 10,000+ products matched to your needs.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Providers>
          <AICursor />
          {children}
        </Providers>
      </body>
    </html>
  )
}
