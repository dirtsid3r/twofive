import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import ErrorBoundary from '@/components/ui/error-boundary'
import { DisableErrorOverlay } from './disable-error-overlay'
import { HideErrorOverlay } from '@/components/ui/hide-error-overlay'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  title: 'Desktop of V',
  description: 'Digital Product Designer ✨ Scaling ideas into products used by millions',
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body
        className={`${geist.variable} ${inter.variable} ${geistMono.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
        suppressHydrationWarning
      >
        {process.env.NODE_ENV === "development" && <DisableErrorOverlay />}
        {process.env.NODE_ENV === "development" && <HideErrorOverlay />}
        <ThemeProvider
          attribute="class"
          storageKey="theme"
          defaultTheme="light"
          forcedTheme={process.env.NODE_ENV === "development" ? undefined : undefined}
          enableSystem={false}
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)] relative">
              <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20 z-10">
                <Header />
                {children}
                <Footer />
              </div>
            </div>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
