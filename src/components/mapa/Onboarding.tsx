'use client'

import { useState } from 'react'

interface OnboardingProps {
  onComplete: (askLocation: boolean) => void
}

const TOTAL_STEPS = 3

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0)

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1))
  const goBack = () => setStep((s) => Math.max(s - 1, 0))

  return (
    <div className="fixed inset-0 z-[3000] bg-[#080808] text-[#f4f1e8] overflow-hidden flex flex-col">
      {/* Grid background — heredado del Hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(5,237,150,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(5,237,150,0.045) 1px,transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(ellipse 90% 70% at 50% 50%, black 0%, black 55%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 70% at 50% 50%, black 0%, black 55%, transparent 100%)',
        }}
      />

      {/* Glow inferior */}
      <div
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(circle, rgba(5,237,150,0.18) 0%, transparent 60%)',
        }}
      />

      {/* ── Top bar: progress + skip ────────────────────── */}
      <header className="relative shrink-0 px-6 sm:px-8 pt-[max(1.25rem,env(safe-area-inset-top))] pb-4 flex items-center justify-between">
        <div className="flex gap-1.5" aria-hidden>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span
              key={i}
              className="block h-[2px] rounded-full transition-all duration-500 ease-out"
              style={{
                width: i === step ? '36px' : '20px',
                background:
                  i <= step ? '#05ed96' : 'rgba(245,242,235,0.14)',
                boxShadow:
                  i === step ? '0 0 12px rgba(5,237,150,0.6)' : 'none',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => onComplete(false)}
          className="font-[family-name:var(--font-dm-sans)] text-[0.7rem] tracking-[0.16em] uppercase text-[rgba(245,242,235,0.4)] hover:text-[#05ed96] transition-colors px-2 py-1 -mr-2"
        >
          Saltar
        </button>
      </header>

      {/* ── Step content ──────────────────────────────── */}
      <main
        key={step}
        className="relative flex-1 px-6 sm:px-8 flex flex-col justify-end pb-6"
        style={{ animation: 'onbReveal 0.65s cubic-bezier(0.2, 0.7, 0.2, 1) both' }}
      >
        {step === 0 && <WelcomeStep />}
        {step === 1 && <MapStep />}
        {step === 2 && <LocationStep />}
      </main>

      {/* ── Footer CTAs ───────────────────────────────── */}
      <footer
        key={`f-${step}`}
        className="relative shrink-0 px-6 sm:px-8 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
        style={{ animation: 'onbReveal 0.65s cubic-bezier(0.2, 0.7, 0.2, 1) 0.1s both' }}
      >
        {step < 2 ? (
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={goBack}
              disabled={step === 0}
              className="font-[family-name:var(--font-dm-sans)] text-[0.72rem] tracking-[0.14em] uppercase text-[rgba(245,242,235,0.35)] hover:text-[#f4f1e8] transition-colors disabled:opacity-0 disabled:pointer-events-none px-1 py-2"
            >
              ← Atrás
            </button>

            <button
              onClick={goNext}
              className="group inline-flex items-center gap-3 bg-[#05ed96] text-[#080808] px-7 sm:px-8 py-3.5 rounded-full font-[family-name:var(--font-unbounded)] text-[0.72rem] tracking-[0.08em] uppercase no-underline hover:bg-[#04c97e] active:scale-[0.97] transition-all shadow-[0_8px_28px_rgba(5,237,150,0.22)]"
            >
              Siguiente
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onComplete(true)}
              className="group w-full bg-[#05ed96] text-[#080808] px-7 py-4 rounded-full font-[family-name:var(--font-unbounded)] text-[0.74rem] tracking-[0.08em] uppercase hover:bg-[#04c97e] active:scale-[0.98] transition-all shadow-[0_10px_32px_rgba(5,237,150,0.25)] flex items-center justify-center gap-3"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
                <circle cx="12" cy="12" r="9" strokeOpacity="0.3"/>
              </svg>
              Permitir ubicación
            </button>
            <button
              onClick={() => onComplete(false)}
              className="w-full text-center font-[family-name:var(--font-dm-sans)] text-[0.78rem] tracking-[0.05em] text-[rgba(245,242,235,0.45)] hover:text-[#f4f1e8] transition-colors py-2"
            >
              Mejor después
            </button>
          </div>
        )}
      </footer>

      <style>{`
        @keyframes onbReveal {
          from { opacity: 0; transform: translateY(20px); filter: blur(6px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes onbPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

/* ───────────────────────────────────────────────── */
/* STEP 0 — Bienvenida                              */
/* ───────────────────────────────────────────────── */
function WelcomeStep() {
  return (
    <>
      <div className="flex flex-col gap-3 max-w-[520px]">
        {/* QR confirmación */}
        <div className="inline-flex items-center gap-2.5 self-start mb-6 pl-3 pr-4 py-1.5 rounded-full border border-[rgba(5,237,150,0.18)] bg-[rgba(5,237,150,0.04)]">
          <span className="relative flex items-center justify-center w-2 h-2">
            <span
              className="absolute inset-0 rounded-full bg-[#05ed96]"
              style={{ animation: 'onbPulse 2.4s ease-in-out infinite' }}
            />
            <span className="relative w-2 h-2 rounded-full bg-[#05ed96]" />
          </span>
          <span className="font-[family-name:var(--font-dm-sans)] text-[0.68rem] tracking-[0.16em] uppercase text-[#05ed96]">
            Escaneaste tu lata
          </span>
        </div>

        <div className="font-[family-name:var(--font-unbounded)] text-[0.7rem] tracking-[0.2em] uppercase text-[rgba(244,241,232,0.4)]">
          01 — Bienvenido
        </div>

        <h1
          className="font-[family-name:var(--font-unbounded)] uppercase tracking-[-0.005em] text-[#f4f1e8]"
          style={{ fontSize: 'clamp(2.4rem, 13vw, 5rem)', lineHeight: 0.95 }}
        >
          Una lata
          <br />
          <span className="font-[family-name:var(--font-instrument-serif)] italic normal-case tracking-[-0.01em] text-[rgba(244,241,232,0.55)]">
            no es basura
          </span>
          <br />
          <span style={{ color: '#05ed96' }}>si nos</span>
          <br />
          <span style={{ color: '#05ed96' }}>hacemos</span>
          <br />
          <span style={{ color: '#05ed96' }}>cargo.</span>
        </h1>

        <p className="mt-7 font-[family-name:var(--font-instrument-serif)] text-[1.05rem] sm:text-[1.15rem] leading-[1.55] text-[rgba(244,241,232,0.6)] max-w-[420px]">
          Acabás de cerrar el ciclo. Te llevamos al punto limpio más cercano para que tu envase tenga un buen final.
        </p>
      </div>
    </>
  )
}

/* ───────────────────────────────────────────────── */
/* STEP 1 — El mapa                                  */
/* ───────────────────────────────────────────────── */
function MapStep() {
  return (
    <div className="flex flex-col gap-4 max-w-[520px]">
      <div className="font-[family-name:var(--font-unbounded)] text-[0.7rem] tracking-[0.2em] uppercase text-[rgba(244,241,232,0.4)]">
        02 — El mapa
      </div>

      <h2
        className="font-[family-name:var(--font-instrument-serif)] italic text-[#f4f1e8] mb-2 leading-[1.05]"
        style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}
      >
        Cada punto es un lugar real para reciclar.
      </h2>

      {/* Leyenda tipos */}
      <ul className="flex flex-col gap-4 mt-2">
        <LegendRow
          color="#05ed96"
          glow
          large
          title="Punto limpio"
          subtitle="Recibe todos los materiales reciclables"
        />
        <LegendRow
          color="#5ba8e8"
          large
          title="Punto verde"
          subtitle="Materiales seleccionados, contenedores agrupados"
        />
        <LegendRow
          color="#888"
          title="Campana"
          subtitle="Contenedor único para un material específico"
        />
      </ul>

      {/* Materiales */}
      <div className="mt-7 pt-6 border-t border-[rgba(245,242,235,0.08)]">
        <div className="flex items-center justify-between mb-3">
          <span className="font-[family-name:var(--font-unbounded)] text-[0.62rem] tracking-[0.16em] uppercase text-[rgba(245,242,235,0.4)]">
            Filtrá por material
          </span>
          <span className="font-[family-name:var(--font-dm-sans)] text-[0.65rem] tracking-[0.1em] uppercase text-[rgba(245,242,235,0.25)]">
            4 tipos
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <MaterialChip code="VID" label="Vidrio" bg="rgba(91,168,232,0.12)" color="#5ba8e8" />
          <MaterialChip code="MET" label="Metales" bg="rgba(5,237,150,0.12)" color="#05ed96" />
          <MaterialChip code="PLA" label="Plásticos" bg="rgba(240,168,48,0.12)" color="#f0a830" />
          <MaterialChip code="PAP" label="Papel" bg="rgba(196,160,106,0.15)" color="#c4a06a" />
        </div>
      </div>
    </div>
  )
}

function LegendRow({
  color,
  title,
  subtitle,
  glow = false,
  large = false,
}: {
  color: string
  title: string
  subtitle: string
  glow?: boolean
  large?: boolean
}) {
  return (
    <li className="flex items-start gap-4">
      <span
        className="shrink-0 rounded-full mt-[6px]"
        style={{
          width: large ? 10 : 7,
          height: large ? 10 : 7,
          background: color,
          boxShadow: glow ? `0 0 12px ${color}88` : 'none',
        }}
      />
      <div className="flex flex-col gap-0.5">
        <div className="font-[family-name:var(--font-dm-sans)] text-[0.95rem] text-[#f4f1e8] leading-[1.3]">
          {title}
        </div>
        <div className="font-[family-name:var(--font-dm-sans)] text-[0.78rem] text-[rgba(244,241,232,0.42)] leading-[1.45]">
          {subtitle}
        </div>
      </div>
    </li>
  )
}

function MaterialChip({
  code,
  label,
  bg,
  color,
}: {
  code: string
  label: string
  bg: string
  color: string
}) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border"
      style={{ background: bg, borderColor: `${color}33` }}
    >
      <span
        className="font-[family-name:var(--font-unbounded)] text-[0.62rem] tracking-[0.12em] uppercase"
        style={{ color }}
      >
        {code}
      </span>
      <span className="font-[family-name:var(--font-dm-sans)] text-[0.72rem] text-[rgba(244,241,232,0.55)]">
        {label}
      </span>
    </span>
  )
}

/* ───────────────────────────────────────────────── */
/* STEP 2 — Ubicación                                */
/* ───────────────────────────────────────────────── */
function LocationStep() {
  return (
    <div className="flex flex-col gap-4 max-w-[520px]">
      <div className="font-[family-name:var(--font-unbounded)] text-[0.7rem] tracking-[0.2em] uppercase text-[rgba(244,241,232,0.4)]">
        03 — Tu ubicación
      </div>

      {/* Ilustración circular ondas */}
      <div className="relative w-[120px] h-[120px] my-2">
        <div
          className="absolute inset-0 rounded-full border border-[rgba(5,237,150,0.2)]"
          style={{ animation: 'onbPulse 3s ease-in-out infinite' }}
        />
        <div
          className="absolute inset-[15%] rounded-full border border-[rgba(5,237,150,0.3)]"
          style={{ animation: 'onbPulse 3s ease-in-out 0.4s infinite' }}
        />
        <div className="absolute inset-[36%] rounded-full bg-[#05ed96] shadow-[0_0_28px_rgba(5,237,150,0.6)]" />
      </div>

      <h2
        className="font-[family-name:var(--font-instrument-serif)] italic text-[#f4f1e8] leading-[1.05] -mt-2"
        style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}
      >
        ¿Te mostramos los puntos cerca tuyo?
      </h2>

      <p className="font-[family-name:var(--font-instrument-serif)] text-[1.05rem] leading-[1.55] text-[rgba(244,241,232,0.6)] max-w-[420px] mt-1">
        Ordenamos el mapa por cercanía. Tu ubicación no sale de tu dispositivo y no la guardamos en ningún servidor.
      </p>

      <div className="mt-4 flex items-center gap-3 flex-wrap">
        {['Sin apps', 'Sin registro', 'Sin traba'].map((t, i) => (
          <span
            key={t}
            className="font-[family-name:var(--font-unbounded)] text-[0.6rem] tracking-[0.18em] uppercase text-[rgba(5,237,150,0.7)] flex items-center gap-3"
          >
            {i > 0 && <span className="text-[rgba(245,242,235,0.18)]">·</span>}
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
