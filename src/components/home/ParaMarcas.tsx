import Link from 'next/link'

const GANA_ITEMS = [
  {
    n: '01',
    title: 'Cumplimiento real de la Ley REP',
    desc: 'No un reporte anual. Una acción trazable en cada envase que demuestra compromiso con el ciclo de vida del producto.',
    delay: '',
  },
  {
    n: '02',
    title: 'Activación en el momento de consumo',
    desc: 'YENDO opera en el único momento en que el usuario tiene el envase en la mano y puede tomar una decisión. Ninguna campaña llega ahí.',
    delay: 'reveal-delay-1',
  },
  {
    n: '03',
    title: 'Datos reales de impacto',
    desc: 'Cada escaneo es un dato. Cuántos usuarios activaron la ruta, desde dónde, con qué frecuencia. Impacto medible y reportable.',
    delay: 'reveal-delay-2',
  },
  {
    n: '04',
    title: 'Integración sin traba',
    desc: 'El QR se adapta al diseño de tu envase. Kit completo listo para imprenta y redes sociales. Acceso inmediato tras el pago.',
    delay: 'reveal-delay-3',
  },
]

export function ParaMarcas() {
  return (
    <section className="py-24 px-10 bg-[#080808] border-t border-[rgba(244,241,232,0.04)]" id="marcas">
      <div className="max-w-[1100px] mx-auto">
        <span className="block font-[family-name:var(--font-instrument-serif)] italic text-[#05ed96] text-[1rem] mb-6 reveal">
          Para marcas
        </span>

        <div className="grid md:grid-cols-2 gap-16 mb-12">
          <div className="reveal">
            <h2
              className="font-[family-name:var(--font-unbounded)] uppercase tracking-[0.01em]"
              style={{ fontSize: 'clamp(1.5rem,2.5vw,2.5rem)', lineHeight: 1.1 }}
            >
              Tu envase<br />ya puede<br />tener vuelta.
            </h2>
          </div>
          <div className="reveal">
            <p className="text-[1.1rem] text-[rgba(244,241,232,0.65)] leading-[1.65] mb-4 font-[family-name:var(--font-instrument-serif)]">
              La Ley REP ya obliga a las marcas a hacerse cargo de sus residuos. YENDO convierte esa
              obligación en una acción real, visible en cada unidad que sale al mercado.
            </p>
            <p className="text-[1.1rem] text-[rgba(244,241,232,0.65)] leading-[1.65] mb-4 font-[family-name:var(--font-instrument-serif)]">
              <strong className="text-[#f4f1e8] font-normal">
                No es un sello. No es un reporte. Es una ruta impresa en tu producto.
              </strong>
            </p>
            <Link
              href="/suscripcion"
              className="inline-flex items-center gap-2 bg-[#05ed96] text-[#080808] px-7 py-3.5 rounded-full font-[family-name:var(--font-unbounded)] text-[0.72rem] tracking-[0.06em] uppercase no-underline hover:bg-[#04c97e] hover:-translate-y-px transition-all mt-2"
            >
              Quiero ser parte →
            </Link>
          </div>
        </div>

        {/* Gana grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 rounded-[20px] overflow-hidden"
          style={{ background: 'rgba(244,241,232,0.05)' }}
        >
          {GANA_ITEMS.map((item) => (
            <div
              key={item.n}
              className={`reveal ${item.delay} bg-[#080808] p-12 relative hover:bg-[rgba(5,237,150,0.03)] transition-colors group`}
            >
              <div className="absolute top-0 left-0 w-0.5 h-0 bg-[#05ed96] transition-all duration-300 group-hover:h-full" />
              <div className="font-[family-name:var(--font-unbounded)] text-[2.5rem] text-[#05ed96] opacity-50 leading-none mb-4 tracking-[0.01em]">
                {item.n}
              </div>
              <div className="font-[family-name:var(--font-instrument-serif)] italic text-[1.15rem] text-[#f4f1e8] mb-2.5">
                {item.title}
              </div>
              <p className="text-[1rem] text-[rgba(244,241,232,0.58)] leading-[1.7] font-[family-name:var(--font-instrument-serif)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Medioambiente block */}
        <div className="reveal mt-px bg-[#05ed96] p-12">
          <h3
            className="font-[family-name:var(--font-unbounded)] uppercase text-[#080808] mb-10"
            style={{ fontSize: 'clamp(1.6rem,3vw,3rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            ¿Qué gana el medioambiente?
          </h3>
          <div className="grid grid-cols-[auto_1fr] gap-12 items-center">
            <div>
              <div
                className="font-[family-name:var(--font-unbounded)] text-[#080808] leading-[1.1] tracking-[0.01em]"
                style={{ fontSize: 'clamp(2.25rem,3.5vw,4rem)' }}
              >
                10
              </div>
              <div className="text-[0.85rem] text-[rgba(8,8,8,0.6)] font-[family-name:var(--font-dm-sans)] max-w-[120px] leading-[1.4] mt-2">
                años tarda una lata en degradarse si no se recicla.
              </div>
            </div>
            <div>
              <p className="text-[1.05rem] text-[rgba(8,8,8,0.75)] leading-[1.65] font-[family-name:var(--font-instrument-serif)] mb-4">
                Una lata de cerveza es aluminio puro.{' '}
                <strong className="text-[#080808] font-medium">
                  El aluminio puede reciclarse infinitas veces
                </strong>{' '}
                sin perder calidad. Cada lata que vuelve al sistema evita extraer más materia prima del planeta.
              </p>
              <p className="text-[1.05rem] text-[rgba(8,8,8,0.75)] leading-[1.65] font-[family-name:var(--font-instrument-serif)]">
                No es basura. Es recurso.{' '}
                <strong className="text-[#080808] font-medium">
                  Y YENDO se asegura de que lo tratemos como tal.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
