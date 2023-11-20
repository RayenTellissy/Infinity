import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'

// providers
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider'
import { ContextProvider } from '@/components/context/Context'
import { AuthProvider } from '@/components/providers/AuthProvider'

// ui
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Infinity',
  description: "Discover and share captivating videos on Infinity. Join our vibrant community, explore diverse content, and unleash your creativity. Your go-to platform for entertainment and inspiration.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem={true}
            storageKey='theme'
          >
            <ReactQueryProvider>
              <ContextProvider>
                {children}
                <Toaster />
              </ContextProvider>
            </ReactQueryProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
