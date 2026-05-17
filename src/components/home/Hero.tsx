'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { SplitChars, SplitWords } from './motion'

export function Hero() {
  const gridRef = useRef<HTMLDivElement>(null)

  // Parallax sutil en el grid de fondo mientras scrolleas
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const el = gridRef.current
        if (!el) return
        const y = window.scrollY
        el.style.transform = `translate3d(0, ${y * 0.18}px, 0)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="min-h-[100svh] flex flex-col justify-end px-5 sm:px-8 md:px-10 pt-24 md:pt-28 pb-12 md:pb-[4.5rem] relative overflow-hidden">
      {/* Grid background — parallax + drift */}
      <div
        ref={gridRef}
        className="absolute inset-0 y-grid-drift"
        style={{
          backgroundImage:
            'linear-gradient(rgba(5,237,150,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(5,237,150,0.03) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'linear-gradient(to bottom,transparent 0%,black 25%,black 65%,transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom,transparent 0%,black 25%,black 65%,transparent 100%)',
        }}
      />

      {/* Radial glow pulsing */}
      <div
        className="absolute pointer-events-none y-glow-pulse"
        style={{
          top: '40%',
          left: '50%',
          width: '90vw',
          height: '90vw',
          maxWidth: '1400px',
          maxHeight: '1400px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(5,237,150,0.06) 0%, transparent 55%)',
        }}
      />

      {/* Ticker lateral derecho — vertical, flicker */}
      <div
        className="hidden md:flex absolute right-4 top-1/2 items-center gap-3 font-[family-name:var(--font-unbounded)] uppercase text-[0.6rem] tracking-[0.42em] text-[rgba(5,237,150,0.45)] y-flicker pointer-events-none select-none"
        style={{ transform: 'rotate(90deg) translateY(0) translateX(50%)', transformOrigin: 'right center' }}
        aria-hidden
      >
        <span>EC-001</span>
        <span className="w-1 h-1 rounded-full bg-[#05ed96]" />
        <span>YENDO / SCAN / MAP / DROP</span>
      </div>

      <div className="relative z-10 flex flex-col gap-0 flex-1 justify-end">
        {/* Large logo mark — breathing + slow rotation */}
        <div className="reveal mt-auto -translate-y-3 md:translate-y-0 mb-[-1rem] md:mb-[-1.5rem]">
          <div className="y-breathe inline-block">
            <div className="y-rotate-slow inline-block" style={{ filter: 'drop-shadow(0 0 40px rgba(5,237,150,0.18))' }}>
              <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" className="w-[170px] h-[170px] md:w-[320px] md:h-[320px]" style={{ display: 'block' }}>
                <defs>
                  <style>{`.st0{fill:#05ed96}`}</style>
                </defs>
                <g>
                  <path className="st0" d="M1030.47,428.41c-.82-3.61-2.64-6.91-5.26-9.52L662.16,55.84c-2.62-2.62-5.92-4.44-9.52-5.26-36.4-8.27-73.94-12.46-111.59-12.46-134.06,0-260.09,52.2-354.88,147-94.79,94.79-146.99,220.82-146.99,354.88s52.2,260.09,146.99,354.88c94.79,94.79,220.82,147,354.88,147s260.09-52.2,354.88-147c94.79-94.79,146.99-220.82,146.99-354.88,0-37.65-4.19-75.19-12.46-111.59ZM906.15,540c0,201.32-163.78,365.1-365.1,365.1s-365.1-163.78-365.1-365.1,163.78-365.1,365.1-365.1c11.55,0,23.13.54,34.61,1.62-5.74,21.53-8.71,43.94-8.75,66.81-8.59-.74-17.24-1.12-25.86-1.12-164.2,0-297.79,133.59-297.79,297.79s133.59,297.79,297.79,297.79,297.79-133.59,297.79-297.79c0-12.29-.76-24.59-2.26-36.76,22.77-.88,45.08-4.71,66.44-11.28,2.08,15.88,3.14,31.97,3.14,48.05h0ZM796.81,501.75c1.87,12.61,2.82,25.43,2.82,38.25,0,142.58-116,258.58-258.58,258.58s-258.58-116-258.58-258.58,116-258.58,258.58-258.58c9.62,0,19.28.54,28.82,1.6,17.53,115.45,111.12,205.5,226.94,218.74ZM541.05,1002.67c-255.11,0-462.67-207.55-462.67-462.67S285.93,77.33,541.05,77.33c27.1,0,54.13,2.35,80.63,7-13.16,16.81-24.07,34.99-32.6,54.18-15.88-1.88-31.98-2.83-48.03-2.83-222.94,0-404.31,181.37-404.31,404.31s181.37,404.31,404.31,404.31,404.31-181.37,404.31-404.31c0-21.06-1.64-42.17-4.87-62.88,18.87-9.23,36.66-20.79,52.95-34.51,6.81,31.83,10.27,64.56,10.27,97.38,0,255.11-207.55,462.67-462.67,462.67h0Z"/>
                  <path className="st0" d="M541.05,1049.39c-136.06,0-263.98-52.99-360.2-149.2-96.21-96.21-149.2-224.13-149.2-360.19s52.99-263.98,149.2-360.19C277.06,83.59,404.98,30.61,541.05,30.61c38.21,0,76.31,4.25,113.25,12.64,4.99,1.14,9.55,3.65,13.17,7.27l363.05,363.05c3.62,3.62,6.14,8.18,7.27,13.17h0c8.39,36.95,12.64,75.05,12.64,113.25,0,136.06-52.99,263.98-149.2,360.19-96.21,96.21-224.13,149.2-360.2,149.2ZM541.05,45.64c-132.05,0-256.19,51.42-349.56,144.79-93.37,93.37-144.79,217.52-144.79,349.56s51.42,256.19,144.79,349.56c93.37,93.37,217.52,144.79,349.56,144.79s256.19-51.42,349.56-144.79c93.37-93.37,144.79-217.52,144.79-349.56,0-37.08-4.13-74.06-12.27-109.92h0c-.51-2.23-1.63-4.26-3.24-5.87L656.84,61.15c-1.61-1.61-3.64-2.73-5.87-3.24-35.85-8.14-72.84-12.27-109.92-12.27ZM541.05,1010.18c-259.26,0-470.18-210.92-470.18-470.18S281.79,69.82,541.05,69.82c27.46,0,55.03,2.39,81.93,7.12l12.35,2.17-7.72,9.87c-12.71,16.24-23.36,33.93-31.66,52.6l-2.25,5.06-5.5-.65c-15.57-1.84-31.43-2.77-47.15-2.77-218.79,0-396.79,178-396.79,396.79s178,396.79,396.79,396.79,396.79-178,396.79-396.79c0-20.64-1.61-41.41-4.78-61.72l-.85-5.48,4.98-2.44c18.4-9,35.69-20.27,51.42-33.51l9.57-8.06,2.62,12.24c6.92,32.34,10.43,65.63,10.43,98.96,0,259.26-210.92,470.18-470.18,470.18ZM541.05,84.85c-250.97,0-455.15,204.18-455.15,455.15s204.18,455.15,455.15,455.15,455.15-204.18,455.15-455.15c0-28.15-2.59-56.27-7.69-83.78-12.5,9.55-25.82,17.99-39.77,25.18,2.75,19.33,4.14,39.02,4.14,58.6,0,227.08-184.75,411.83-411.83,411.83s-411.83-184.75-411.83-411.83,184.74-411.83,411.83-411.83c14.47,0,29.06.76,43.46,2.27,6.67-14.18,14.62-27.8,23.74-40.66-22.17-3.27-44.72-4.93-67.2-4.93ZM541.05,912.62c-205.46,0-372.62-167.16-372.62-372.62s167.16-372.62,372.62-372.62c11.75,0,23.63.56,35.31,1.65l8.85.83-2.29,8.59c-5.6,21.01-8.46,42.84-8.49,64.88v8.18s-8.17-.7-8.17-.7c-8.36-.72-16.85-1.09-25.22-1.09-160.06,0-290.27,130.22-290.27,290.27s130.22,290.27,290.28,290.27,290.27-130.22,290.27-290.27c0-11.93-.74-23.98-2.21-35.84l-1-8.12,8.17-.32c21.95-.85,43.66-4.54,64.52-10.96l8.51-2.62,1.16,8.83c2.12,16.18,3.2,32.67,3.2,49.02,0,205.46-167.16,372.62-372.62,372.62ZM541.05,182.42c-197.17,0-357.58,160.41-357.58,357.58s160.41,357.58,357.58,357.58,357.58-160.41,357.58-357.58c0-12.78-.68-25.64-2.04-38.36-16.85,4.57-34.17,7.48-51.67,8.68.96,9.87,1.44,19.82,1.44,29.68,0,168.35-136.96,305.31-305.31,305.31s-305.31-136.96-305.31-305.31,136.96-305.31,305.31-305.31c6.13,0,12.32.19,18.48.56.55-17.57,2.79-34.98,6.7-51.95-8.38-.58-16.81-.88-25.18-.88ZM541.05,806.1c-146.73,0-266.1-119.37-266.1-266.1s119.37-266.1,266.1-266.1c9.86,0,19.83.55,29.65,1.64l5.74.64.87,5.71c17.03,112.17,107.64,199.51,220.36,212.4l5.73.66.85,5.71c1.93,12.97,2.91,26.21,2.91,39.35,0,146.73-119.37,266.1-266.1,266.1ZM541.05,288.94c-138.44,0-251.06,112.63-251.06,251.06s112.63,251.06,251.06,251.06,251.06-112.63,251.06-251.06c0-10.5-.66-21.08-1.97-31.5-114.8-15.69-206.87-104.42-226.77-218.57-7.42-.66-14.91-.99-22.33-.99Z"/>
                </g>
                <path className="st0" d="M1030.47,428.41c-.82-3.61-2.64-6.91-5.26-9.52L662.16,55.84c-2.62-2.62-5.92-4.44-9.52-5.26-36.4-8.27-73.94-12.46-111.59-12.46-134.06,0-260.09,52.2-354.88,147-94.79,94.79-146.99,220.82-146.99,354.88s52.2,260.09,146.99,354.88c94.79,94.79,220.82,147,354.88,147s260.09-52.2,354.88-147c94.79-94.79,146.99-220.82,146.99-354.88,0-37.65-4.19-75.19-12.46-111.59Z"/>
                <g>
                  <path d="M517.2,522.54c-.47-50.29-17.68-90.9-38.44-90.7-20.35.19-36.51,39.58-36.69,88.53l34.98,16.11-33.14,13.25c5.04,37.32,19.61,64.38,36.56,64.22,20.75-.19,37.19-41.12,36.72-91.41Z"/>
                  <path d="M640.01,521.11c-.47-50.29-17.68-90.9-38.44-90.7-20.35.19-36.51,39.58-36.69,88.53l34.98,16.11-33.14,13.25c5.04,37.32,19.61,64.38,36.56,64.22,20.75-.19,37.19-41.12,36.72-91.41Z"/>
                </g>
                <path d="M541.05,727.37c100.87,0,183.07-80.7,185.88-180.9h-24.51c-2.8,86.69-74.01,156.4-161.37,156.4s-158.57-69.71-161.37-156.4h-24.51c2.81,100.2,85.01,180.9,185.88,180.9Z"/>
                <path d="M1030.47,428.41c-.82-3.61-2.64-6.91-5.26-9.52L662.16,55.84c-2.62-2.62-5.92-4.44-9.52-5.26-36.4-8.27-73.94-12.46-111.59-12.46-134.06,0-260.09,52.2-354.88,147-94.79,94.79-146.99,220.82-146.99,354.88s52.2,260.09,146.99,354.88c94.79,94.79,220.82,147,354.88,147s260.09-52.2,354.88-147c94.79-94.79,146.99-220.82,146.99-354.88,0-37.65-4.19-75.19-12.46-111.59ZM906.15,540c0,201.32-163.78,365.1-365.1,365.1s-365.1-163.78-365.1-365.1,163.78-365.1,365.1-365.1c11.55,0,23.13.54,34.61,1.62-5.74,21.53-8.71,43.94-8.75,66.81-8.59-.74-17.24-1.12-25.86-1.12-164.2,0-297.79,133.59-297.79,297.79s133.59,297.79,297.79,297.79,297.79-133.59,297.79-297.79c0-12.29-.76-24.59-2.26-36.76,22.77-.88,45.08-4.71,66.44-11.28,2.08,15.88,3.14,31.97,3.14,48.05h0ZM796.81,501.75c1.87,12.61,2.82,25.43,2.82,38.25,0,142.58-116,258.58-258.58,258.58s-258.58-116-258.58-258.58,116-258.58,258.58-258.58c9.62,0,19.28.54,28.82,1.6,17.53,115.45,111.12,205.5,226.94,218.74ZM541.05,1002.67c-255.11,0-462.67-207.55-462.67-462.67S285.93,77.33,541.05,77.33c27.1,0,54.13,2.35,80.63,7-13.16,16.81-24.07,34.99-32.6,54.18-15.88-1.88-31.98-2.83-48.03-2.83-222.94,0-404.31,181.37-404.31,404.31s181.37,404.31,404.31,404.31,404.31-181.37,404.31-404.31c0-21.06-1.64-42.17-4.87-62.88,18.87-9.23,36.66-20.79,52.95-34.51,6.81,31.83,10.27,64.56,10.27,97.38,0,255.11-207.55,462.67-462.67,462.67h0Z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom two-column layout */}
        <div
          className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-20 items-end opacity-0"
          style={{ animation: 'fadeUp 1s ease forwards 0.4s' }}
        >
          {/* Left: headline — split per char + per word */}
          <div className="reveal">
            <h1 className="font-[family-name:var(--font-unbounded)] uppercase tracking-[0.015em] text-[#f4f1e8]" style={{ fontSize: 'clamp(2.2rem,9vw,7rem)', lineHeight: 1.1 }}>
              <span
                className="block font-[family-name:var(--font-instrument-serif)] not-italic"
                style={{ fontSize: '0.52em', lineHeight: 1.1, color: 'rgba(244,241,232,0.85)', textTransform: 'none', letterSpacing: 0 }}
              >
                <SplitWords text="Una buena cerveza merece un" stagger={55} effect="rise" />
              </span>
              <span style={{ color: '#05ed96' }} className="inline-block">
                <SplitChars text="BUEN" stagger={60} effect="drop" />
                <br />
                <SplitChars text="FINAL." stagger={60} effect="drop" />
              </span>
            </h1>
          </div>

          {/* Right: eyebrow + copy + CTAs */}
          <div className="pb-2 reveal">
            <span className="inline-flex items-center gap-2 font-[family-name:var(--font-unbounded)] text-[0.85rem] tracking-[0.1em] uppercase text-[#05ed96] mb-3 y-rise">
              <span className="relative inline-flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-[#05ed96] y-pulse-ring" />
                <span className="relative inline-block w-1.5 h-1.5 rounded-full bg-[#05ed96]" />
              </span>
              YENDO
            </span>
            <p className="font-[family-name:var(--font-instrument-serif)] italic text-[1.1rem] md:text-[1.2rem] text-[#f4f1e8] leading-[1.5] mb-4 md:mb-5 max-w-[400px] y-wipe">
              Una lata no es basura si nos hacemos cargo.
            </p>
            <p className="text-[1rem] md:text-[1.1rem] text-[rgba(244,241,232,0.65)] leading-[1.65] mb-7 md:mb-8 max-w-[400px] font-[family-name:var(--font-instrument-serif)] y-rise" style={{ animationDelay: '180ms' }}>
              Una ecoetiqueta QR que conecta cada envase con su punto limpio más cercano.{' '}
              <strong className="text-[#f4f1e8] font-normal">Sin apps. Sin registro. Sin traba.</strong>{' '}
              Solo escaneas y tienes la ruta.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <Link
                href="/suscripcion"
                className="y-shimmer-wrap inline-flex items-center justify-center sm:justify-start gap-2 bg-[#05ed96] text-[#080808] px-6 sm:px-7 py-4 sm:py-3.5 rounded-full font-[family-name:var(--font-unbounded)] text-[0.72rem] tracking-[0.06em] uppercase no-underline hover:bg-[#04c97e] hover:-translate-y-px active:scale-[0.98] transition-all"
              >
                Reciclemos →
              </Link>
              <Link
                href="/mapa"
                className="y-shimmer-wrap inline-flex items-center justify-center sm:justify-start gap-2 bg-transparent text-[rgba(244,241,232,0.6)] px-6 sm:px-7 py-4 sm:py-3.5 rounded-full border border-[rgba(244,241,232,0.14)] font-[family-name:var(--font-unbounded)] text-[0.72rem] tracking-[0.06em] uppercase no-underline hover:border-[#05ed96] hover:text-[#05ed96] active:scale-[0.98] transition-all"
              >
                ¿Dónde reciclo?
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-0"
        style={{ animation: 'fadeIn 1s ease forwards 1.5s' }}
      >
        <div
          className="w-px h-10"
          style={{
            background: 'linear-gradient(to bottom, #05ed96, transparent)',
            animation: 'pulse 2s ease infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes pulse { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
      `}</style>
    </section>
  )
}
