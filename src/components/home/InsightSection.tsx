export function InsightSection() {
  return (
    <section className="bg-[#05ed96] overflow-hidden relative">
      <div className="max-w-[1100px] mx-auto px-10 py-20">
        <h2
          className="font-[family-name:var(--font-unbounded)] uppercase text-[#080808] mb-12 reveal"
          style={{ fontSize: 'clamp(2rem,4vw,4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
        >
          Saben que deben reciclar,<br />pero no saben dónde.
        </h2>

        <div className="grid md:grid-cols-2 gap-16 reveal">
          <p className="text-[1.05rem] text-[rgba(8,8,8,0.72)] leading-[1.75] font-[family-name:var(--font-instrument-serif)]">
            En Chile existe infraestructura de reciclaje. Puntos limpios, campanas, sistemas de retorno
            activos en todo el país.{' '}
            <strong className="text-[#080808] font-medium">
              El problema es que nadie sabe dónde están en el momento exacto en que los necesita.
            </strong>
          </p>
          <div>
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
              className="inline-flex items-center gap-1 font-[family-name:var(--font-unbounded)] text-[0.72rem] tracking-[0.06em] uppercase text-[#05ed96] bg-[#080808] px-5 py-2.5 rounded-full mt-5 no-underline hover:opacity-85 hover:-translate-y-px transition-all"
            >
              LEER LEY REP →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
