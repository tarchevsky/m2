import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Metrika from '@/components/metrika/Metrika'
import ScrollToTop from '@/components/scrollToTop/ScrollToTop'
import { SITE_NAME } from '@/constants/site.constants'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'
// Supports weights 100-900
import '@fontsource-variable/raleway'

const yId = process.env.NEXT_PUBLIC_YID // id яндекс метрики

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body>
        <Header />
        {children}
        <ScrollToTop />
        <Footer />
        {yId ? <Metrika yId={yId} /> : null}
      </body>
    </html>
  )
}
