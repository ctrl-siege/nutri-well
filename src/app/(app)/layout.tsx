import React from 'react'
import './globals.css'
import { AuthProvider } from '../_providers/Auth'
import { TooltipProvider } from '@/components/ui/tooltip'
import { GeistSans } from 'geist/font/sans'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <AuthProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  )
}