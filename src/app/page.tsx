'use client'

import { useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { InsightSection } from '@/components/home/InsightSection'
import { DataSection } from '@/components/home/DataSection'
import { ComoFunciona } from '@/components/home/ComoFunciona'
import { Proposito } from '@/components/home/Proposito'
import { ParaMarcas } from '@/components/home/ParaMarcas'
import { CtaSection } from '@/components/home/CtaSection'
import {
  ScrollProgress,
  GrainOverlay,
  MarqueeBand,
} from '@/components/home/motion'

export default function HomePage() {
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <ScrollProgress />
      <GrainOverlay />
      <Navbar />
      <main>
        <Hero />

        {/* Marquee brutal: línea de slogans rodando entre Hero e Insight */}
        <MarqueeBand
          text="YENDO Y TRAYENDO · TÓMALA FRÍA · TRÁELA VACÍA · #YendoYTrayendo · UNA LATA NO ES BASURA"
          variant="green-on-black"
          size="lg"
          separator="✦"
        />

        <InsightSection />
        <DataSection />
        <ComoFunciona />

        {/* Marquee reverso, outline gigante */}
        <MarqueeBand
          text="HACERSE CARGO · CERRAR EL CICLO · BUEN FINAL · RUTA REAL · SIN APPS"
          variant="outline"
          size="xl"
          reverse
          separator="/"
        />

        <Proposito />
        <ParaMarcas />

        {/* Marquee negro sobre verde antes del CTA */}
        <MarqueeBand
          text="TÓMALA FRÍA · TRÁELA VACÍA · ESCANEÁ · RECICLÁ · YENDO"
          variant="black-on-green"
          size="lg"
          separator="●"
        />

        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
