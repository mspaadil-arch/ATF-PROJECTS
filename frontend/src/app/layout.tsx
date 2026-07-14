import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'ATF Projects — Premium Construction & Real Estate Pan-India',
    template: '%s | ATF Projects',
  },
  description:
    'ATF Projects is a leading construction and real estate company operating across India. 150+ projects, 25 states, 20+ years of excellence.',
  keywords: ['construction', 'real estate', 'infrastructure', 'India', 'ATF Projects'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://atfprojects.in',
    siteName: 'ATF Projects',
    images: [{ url: '/images/og/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
