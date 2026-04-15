import type { Metadata } from 'next'
import { Unbounded, Instrument_Serif, DM_Sans } from 'next/font/google'
import './globals.css'

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-unbounded',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'YENDO — Tómala fría. Tráela vacía.',
  description:
    'YENDO conecta cada lata con su punto limpio más cercano. Sin apps. Sin vueltas. Solo escaneas.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${unbounded.variable} ${instrumentSerif.variable} ${dmSans.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  )
}
