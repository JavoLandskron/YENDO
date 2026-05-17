const BENEFICIOS = [
  'Tu marca aparece como parte de la comunidad YENDO en el sitio.',
  'Acceso a datos reales de escaneos y reciclaje de tu producto.',
  'Actualizaciones del kit y nuevas piezas durante el año.',
  'Soporte directo para integración en tu etiqueta.',
  'Reportes de impacto para tus declaraciones de sustentabilidad.',
]

export function ComunidadSection() {
  return (
    <section className="py-16 md:py-24 px-5 sm:px-8 md:px-10 bg-[#1c1c1c] border-t border-[rgba(5,237,150,0.08)]">
      <div className="max-w-[960px] mx-auto grid md:grid-cols-2 gap-10 md:gap-24 items-start md:items-center">
        <div className="reveal">
          <span className="block font-[family-name:var(--font-instrument-serif)] italic text-[#05ed96] text-[0.95rem] md:text-[1rem] mb-4">
            Comunidad
          </span>
          <h2
            className="font-[family-name:var(--font-unbounded)] uppercase tracking-[0.01em]"
            style={{ fontSize: 'clamp(1.6rem,6vw,2.4rem)', lineHeight: 1.15 }}
          >
            Marcas que<br />cierran el<br />ciclo.
          </h2>
        </div>

        <div className="reveal">
          <p className="font-[family-name:var(--font-instrument-serif)] text-[1rem] text-[rgba(245,242,235,0.55)] leading-[1.65] mb-4">
            Al unirte a YENDO no solo integras una ecoetiqueta. Pasas a ser parte de la red de marcas que
            están convirtiendo el cumplimiento de la Ley REP en acción real y visible.
          </p>
          <div className="flex flex-col gap-3 mt-6">
            {BENEFICIOS.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 font-[family-name:var(--font-dm-sans)] text-[0.88rem] text-[rgba(245,242,235,0.6)] leading-[1.5]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#05ed96] shrink-0 mt-[0.45rem]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
