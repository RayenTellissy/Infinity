import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'

// providers
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider'

// ui
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Infinity',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
          storageKey='theme'
        >
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
