'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface NavbarProps {
  variant?: 'default' | 'back'
  backHref?: string
  backLabel?: string
}

export function Navbar({ variant = 'default', backHref = '/', backLabel = '← Volver al sitio' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-10 py-5 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(8,8,8,0.92)] backdrop-blur-[16px] border-b border-[rgba(5,237,150,0.08)]'
          : ''
      }`}
    >
      <Link
        href="/"
        className="font-[family-name:var(--font-unbounded)] text-[1.05rem] text-[#05ed96] tracking-[0.05em] no-underline"
      >
        YENDO
      </Link>

      {variant === 'default' ? (
        <ul className="hidden md:flex items-center gap-8 list-none">
          {[
            { href: '#como', label: 'Cómo funciona' },
            { href: '#proposito', label: 'Propósito' },
            { href: '#marcas', label: 'Para marcas' },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-[family-name:var(--font-dm-sans)] text-[0.78rem] tracking-[0.12em] uppercase text-[rgba(244,241,232,0.45)] no-underline hover:text-[#05ed96] transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/suscripcion"
              className="font-[family-name:var(--font-dm-sans)] text-[0.72rem] tracking-[0.06em] uppercase bg-[#05ed96] text-[#080808] px-5 py-2 rounded-full font-medium hover:bg-[#04c97e] transition-colors no-underline"
            >
              TRAYENDO
            </Link>
          </li>
        </ul>
      ) : (
        <Link
          href={backHref}
          className="font-[family-name:var(--font-dm-sans)] text-[0.75rem] tracking-[0.05em] uppercase text-[rgba(245,242,235,0.4)] no-underline hover:text-[#05ed96] transition-colors"
        >
          {backLabel}
        </Link>
      )}
    </nav>
  )
}
