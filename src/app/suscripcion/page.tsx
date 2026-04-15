'use client'

import { useEffect } from 'react'
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSuscripcion } from '@/components/suscripcion/HeroSuscripcion'
import { MedioambienteSection } from '@/components/suscripcion/MedioambienteSection'
import { PrecioSection } from '@/components/suscripcion/PrecioSection'
import { KitSection } from '@/components/suscripcion/KitSection'
import { ComunidadSection } from '@/components/suscripcion/ComunidadSection'
import { FaqSection } from '@/components/suscripcion/FaqSection'
import { CtaFinal } from '@/components/suscripcion/CtaFinal'

export default function SuscripcionPage() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar variant="back" backHref="/" backLabel="← Volver al sitio" />
      <main>
        <HeroSuscripcion />
        <PrecioSection />
        <MedioambienteSection />
        <KitSection />
        <ComunidadSection />
        <FaqSection />
        <CtaFinal />
      </main>
      <footer className="bg-[#080808] border-t border-[rgba(245,242,235,0.06)] px-10 py-8 flex items-center justify-between flex-wrap gap-4">
        <div className="font-[family-name:var(--font-unbounded)] text-[1.25rem] text-[#05ed96] tracking-[0.08em]">
          YENDO
        </div>
        <div className="font-[family-name:var(--font-dm-sans)] text-[0.75rem] text-[rgba(245,242,235,0.25)] tracking-[0.04em]">
          Ida y vuelta · Chile · hola@yendo.cl
        </div>
        <div className="font-[family-name:var(--font-dm-sans)] text-[0.75rem] text-[rgba(245,242,235,0.25)] tracking-[0.04em]">
          © 2025 YENDO · Todos los derechos reservados
        </div>
      </footer>
    </>
  )
}
