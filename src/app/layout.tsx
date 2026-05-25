import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nordecore — Premium Surface Materials',
  description: 'Curated wood cladding, marble panels, engineered parquet and luxury vinyl. Delivered across Scandinavia and Europe.',
  keywords: ['wood cladding', 'marble panels', 'parquet', 'luxury vinyl', 'Scandinavia', 'Norway', 'premium flooring'],
  openGraph: {
    title: 'Nordecore — Premium Surface Materials',
    description: 'Premium building materials delivered across Scandinavia.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
