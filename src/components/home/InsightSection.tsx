import { SplitWords } from './motion'

export function InsightSection() {
  return (
    <section className="bg-[#05ed96] overflow-hidden relative">
      {/* Concentric green rings decoration */}
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full border border-[rgba(8,8,8,0.06)] pointer-events-none" />
      <div className="absolute -top-16 -right-16 w-[260px] h-[260px] rounded-full border border-[rgba(8,8,8,0.05)] pointer-events-none y-breathe" />

      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 md:px-10 py-14 md:py-20 relative">
        <h2
          className="font-[family-name:var(--font-unbounded)] uppercase text-[#080808] mb-8 md:mb-12 reveal"
          style={{ fontSize: 'clamp(1.7rem,6vw,4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
        >
          <SplitWords text="Saben que deben reciclar," stagger={70} effect="rise" />
          <br />
          <SplitWords text="pero no saben dónde." stagger={70} effect="drop" />
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 reveal">
          <p className="text-[1.05rem] text-[rgba(8,8,8,0.72)] leading-[1.75] font-[family-name:var(--font-instrument-serif)] y-rise">
            En Chile existe infraestructura de reciclaje. Puntos limpios, campanas, sistemas de retorno
            activos en todo el país.{' '}
            <strong className="text-[#080808] font-medium">
              El problema es que nadie sabe dónde están en el momento exacto en que los necesita.
            </strong>
          </p>
          <div className="y-rise" style={{ animationDelay: '120ms' }}>
            <p className="text-[1.05rem] text-[rgba(8,8,8,0.72)] leading-[1.75] font-[family-name:var(--font-instrument-serif)]">
              El usuario tiene la voluntad. Tiene la lata en la mano. Lo único que le falta es la ruta.
              Ese es el momento que YENDO resuelve.
            </p>
            <p className="font-[family-name:var(--font-instrument-serif)] italic text-[0.9rem] text-[rgba(8,8,8,0.5)] mt-6">
              Basado en data ReSimple · Chile 2024
            </p>
            <a
              href="https://economiacircular.mma.gob.cl/ley-rep/"
              target="_blank"
              rel="noopener noreferrer"
              className="y-shimmer-wrap inline-flex items-center gap-1 font-[family-name:var(--font-unbounded)] text-[0.72rem] tracking-[0.06em] uppercase text-[#05ed96] bg-[#080808] px-5 py-2.5 rounded-full mt-5 no-underline hover:opacity-85 hover:-translate-y-px transition-all"
            >
              LEER LEY REP →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
