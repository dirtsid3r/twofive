import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import ErrorBoundary from '@/components/ui/error-boundary'
import { DisableErrorOverlay } from './disable-error-overlay'
import { HideErrorOverlay } from '@/components/ui/hide-error-overlay'

// Define fallback values in case the import fails
const AUTHOR_NAME = 'Vishnu V';
const AUTHOR_TITLE = 'Digital Product Designer';

// Try to import from data.ts, but use fallbacks if it fails
let authorName = AUTHOR_NAME;
let authorTitle = AUTHOR_TITLE;

try {
  // Dynamic import to avoid issues with SSR
  const { AUTHOR } = require('./data');
  if (AUTHOR && AUTHOR.name) authorName = AUTHOR.name;
  if (AUTHOR && AUTHOR.title) authorTitle = AUTHOR.title;
} catch (e) {
  console.error('Error importing AUTHOR from data.ts:', e);
  // Use fallback values defined above
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  title: 'Vishnu',
  description: 'Digital Product Designer - Personal Website',
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
