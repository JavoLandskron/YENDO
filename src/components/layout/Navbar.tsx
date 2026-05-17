'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface NavbarProps {
  variant?: 'default' | 'back'
  backHref?: string
  backLabel?: string
}

const NAV_LINKS = [
  { href: '/#como', label: 'Cómo funciona', tag: '01' },
  { href: '/#proposito', label: 'Propósito', tag: '02' },
  { href: '/#marcas', label: 'Para marcas', tag: '03' },
  { href: '/mapa', label: 'Mapa', tag: '04' },
]

export function Navbar({ variant = 'default', backHref = '/', backLabel = '← Volver al sitio' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-5 sm:px-8 md:px-10 py-3.5 md:py-5 transition-all duration-300 ${
          scrolled || open
            ? 'bg-[rgba(8,8,8,0.92)] backdrop-blur-[16px] border-b border-[rgba(5,237,150,0.08)]'
            : ''
        }`}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-[family-name:var(--font-unbounded)] text-[1rem] md:text-[1.05rem] text-[#05ed96] tracking-[0.05em] no-underline relative"
        >
          YENDO
          <span className="absolute -right-2 top-0 w-1 h-1 rounded-full bg-[#05ed96] animate-pulse" />
        </Link>

        {variant === 'default' ? (
          <>
            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-8 list-none">
              {NAV_LINKS.slice(0, 3).map((item) => (
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

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden relative w-11 h-11 -mr-2 flex items-center justify-center rounded-full border border-[rgba(5,237,150,0.18)] active:scale-95 transition-transform"
            >
              <span className="sr-only">Menú</span>
              <span
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 w-5 h-px bg-[#05ed96] transition-all duration-300 ${
                  open ? 'rotate-45' : '-translate-y-[5px]'
                }`}
              />
              <span
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 w-5 h-px bg-[#05ed96] transition-all duration-300 ${
                  open ? '-rotate-45' : 'translate-y-[5px]'
                }`}
              />
            </button>
          </>
        ) : (
          <Link
            href={backHref}
            className="font-[family-name:var(--font-dm-sans)] text-[0.7rem] md:text-[0.75rem] tracking-[0.05em] uppercase text-[rgba(245,242,235,0.5)] no-underline hover:text-[#05ed96] transition-colors"
          >
            <span className="hidden sm:inline">{backLabel}</span>
            <span className="sm:hidden">← Volver</span>
          </Link>
        )}
      </nav>

      {/* Mobile drawer */}
      {variant === 'default' && (
        <div
          className={`md:hidden fixed inset-0 z-[150] transition-[opacity,visibility] duration-300 ${
            open ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          aria-hidden={!open}
        >
          {/* Backdrop with subtle grid */}
          <div
            className="absolute inset-0 bg-[#080808]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(5,237,150,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(5,237,150,0.04) 1px,transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 80% 110%, rgba(5,237,150,0.18), transparent 55%)',
            }}
          />

          <div className="relative h-full flex flex-col pt-24 pb-10 px-7 overflow-y-auto">
            {/* Eyebrow */}
            <span
              className={`block font-[family-name:var(--font-instrument-serif)] italic text-[#05ed96] text-[0.95rem] mb-7 transition-all duration-500 ${
                open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
              }`}
              style={{ transitionDelay: open ? '120ms' : '0ms' }}
            >
              Menú
            </span>

            <ul className="list-none flex flex-col gap-1">
              {NAV_LINKS.map((item, i) => (
                <li
                  key={item.href}
                  className={`transition-all duration-500 ${
                    open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                  }`}
                  style={{ transitionDelay: open ? `${180 + i * 70}ms` : '0ms' }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-3.5 border-b border-[rgba(244,241,232,0.07)] no-underline"
                  >
                    <span className="font-[family-name:var(--font-dm-sans)] text-[0.65rem] tracking-[0.18em] text-[rgba(244,241,232,0.3)] group-hover:text-[#05ed96] transition-colors">
                      {item.tag}
                    </span>
                    <span
                      className="font-[family-name:var(--font-unbounded)] uppercase text-[#f4f1e8] group-hover:text-[#05ed96] transition-colors flex-1"
                      style={{ fontSize: 'clamp(1.7rem, 8vw, 2.4rem)', lineHeight: 1.1 }}
                    >
                      {item.label}
                    </span>
                    <span className="text-[#05ed96] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-[family-name:var(--font-unbounded)] text-[1.2rem]">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div
              className={`mt-10 transition-all duration-500 ${
                open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
              style={{ transitionDelay: open ? `${180 + NAV_LINKS.length * 70}ms` : '0ms' }}
            >
              <Link
                href="/suscripcion"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-2 bg-[#05ed96] text-[#080808] px-7 py-5 rounded-2xl font-[family-name:var(--font-unbounded)] text-[0.85rem] tracking-[0.06em] uppercase no-underline active:scale-[0.98] transition-transform"
              >
                <span>Quiero ser parte</span>
                <span className="text-[1.4rem] leading-none">→</span>
              </Link>
              <p className="font-[family-name:var(--font-instrument-serif)] italic text-[rgba(244,241,232,0.45)] text-[0.95rem] mt-4 leading-[1.5]">
                Una lata no es basura si nos hacemos cargo.
              </p>
            </div>

            {/* Footer */}
            <div
              className={`mt-auto pt-10 flex items-center justify-between transition-opacity duration-500 ${
                open ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: open ? '520ms' : '0ms' }}
            >
              <span className="font-[family-name:var(--font-dm-sans)] text-[0.65rem] tracking-[0.18em] uppercase text-[rgba(244,241,232,0.25)]">
                #YendoYTrayendo
              </span>
              <span className="font-[family-name:var(--font-unbounded)] text-[0.7rem] tracking-[0.08em] text-[#05ed96]">
                · · ·
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
