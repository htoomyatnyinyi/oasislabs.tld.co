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
  title: 'OasisLabs | Enterprise Software Development & Cloud Solutions',
  description: 'OasisLabs crafts exceptional digital experiences through cutting-edge technology, innovative design, and strategic thinking. Custom software development, cloud solutions, mobile apps, and AI/ML services.',
  keywords: ['software development', 'cloud solutions', 'mobile apps', 'AI', 'machine learning', 'custom software', 'OasisLabs', 'tech consultancy'],
  authors: [{ name: 'OasisLabs Team' }],
  openGraph: {
    title: 'OasisLabs | Enterprise Software & Technology Solutions',
    description: 'Transforming businesses with scalable software, cloud infrastructure, and modern AI engineering.',
    url: 'https://oasislabs.co',
    siteName: 'OasisLabs',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'OasisLabs Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OasisLabs | Enterprise Software Development',
    description: 'Transforming businesses with scalable software, cloud infrastructure, and modern AI engineering.',
    images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop'],
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
