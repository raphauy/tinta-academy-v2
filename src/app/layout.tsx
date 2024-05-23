import SessionProvider from '@/components/SessionProvider'
import { ConfettiProvider } from '@/components/confetti-provider'
import { TailwindIndicator } from '@/components/shadcn/tailwind-indicator'
import { ThemeProvider } from '@/components/shadcn/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import getSession from '@/lib/auth'
import { cn } from '@/lib/utils'
import { GeistSans } from "geist/font"
import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'Tinta Academy',
  description: 'Tinta Academy es la plataforma de eLearning de Tinta Wine',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session= await getSession()
  return (    
    <html lang="es">
      <body className={cn("min-h-screen antialiased text-muted-foreground", GeistSans.className)}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Analytics />
            <ConfettiProvider />
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
