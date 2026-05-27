import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist-sans'
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
});

export const metadata: Metadata = {
  title: 'NexaTech | Software Development & Technology Solutions',
  description: 'We craft exceptional digital experiences through cutting-edge technology, innovative design, and strategic thinking. Custom software development, cloud solutions, mobile apps, and AI/ML services.',
  keywords: ['software development', 'cloud solutions', 'mobile apps', 'AI', 'machine learning', 'custom software', 'technology consulting'],
  authors: [{ name: 'NexaTech' }],
  openGraph: {
    title: 'NexaTech | Software Development & Technology Solutions',
    description: 'Transform your vision into reality with our cutting-edge software solutions.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexaTech | Software Development & Technology Solutions',
    description: 'Transform your vision into reality with our cutting-edge software solutions.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d1117',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
