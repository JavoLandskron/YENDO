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
      <Navbar />
      <main>
        <Hero />
        <InsightSection />
        <DataSection />
        <ComoFunciona />
        <Proposito />
        <ParaMarcas />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
