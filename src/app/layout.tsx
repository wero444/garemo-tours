import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Header } from 'src/components/header/views/header'
import { Scrollbar } from 'src/components/scrollbar/views/scrollbar'
import { BackToTop } from 'src/components/backToTop/views/backToTop'
import { basePath, siteConfig } from 'src/lib/site'
import { jsonLd, serializeJsonLd } from 'src/lib/seo'
import { themeScript } from 'src/lib/theme'
import './globals.css'

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: 'travel',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: siteConfig.title,
    description: siteConfig.description
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false
  },
  manifest: `${basePath}/manifest.webmanifest`,
  icons: {
    icon: { url: `${basePath}/icon.svg`, type: 'image/svg+xml' },
    apple: { url: `${basePath}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' }
  },
  appleWebApp: {
    title: siteConfig.name,
    statusBarStyle: 'default'
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined
  },
  other: {
    'geo.region': 'GE-TB',
    'geo.placename': siteConfig.address.locality
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: siteConfig.colors.secondary },
    { media: '(prefers-color-scheme: dark)', color: siteConfig.colors.dark }
  ],
  colorScheme: 'light'
}

const RootLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      data-scroll-behavior='smooth'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <title>Garemo Tours</title>
      </head>
      <body className='min-h-full flex flex-col'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
        <Header />
        {children}
        <Scrollbar />
        <BackToTop />
      </body>
    </html>
  )
}

export default RootLayout
