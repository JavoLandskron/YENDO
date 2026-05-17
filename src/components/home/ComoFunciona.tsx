import { SplitWords } from './motion'

const PASOS = [
  {
    num: '01',
    title: 'Último sorbo',
    desc: 'Disfruta hasta el final. Blonde, ámbar, stout o IPA — para YENDO todas son valiosas.',
    delay: '',
  },
  {
    num: '02',
    title: 'Escanea',
    desc: 'El QR está en la lata. Un segundo. Sin app, sin registro, sin pasos intermedios.',
    delay: 'reveal-delay-1',
  },
  {
    num: '03',
    title: 'Mapa',
    desc: 'Tu punto limpio más cercano. Dirección real, horario y ruta directa en Google Maps.',
    delay: 'reveal-delay-2',
  },
  {
    num: '04',
    title: 'Punto limpio',
    desc: 'Llevas la lata. No es basura — es recurso. Y acá la tratamos como corresponde.',
    delay: 'reveal-delay-3',
  },
  {
    num: '05',
    title: 'Impacto positivo',
    desc: 'El ciclo cierra. Una lata tarda hasta 10 años en degradarse. La tuya no llegará a eso.',
    delay: 'reveal-delay-4',
  },
]

export function ComoFunciona() {
  return (
    <section className="py-16 md:py-24 px-5 sm:px-8 md:px-10 bg-[#080808] relative overflow-hidden" id="como">
      <div className="max-w-[1100px] mx-auto relative">
        <span className="block font-[family-name:var(--font-instrument-serif)] italic text-[#05ed96] text-[0.95rem] md:text-[1rem] mb-4 reveal">
          Cómo funciona
        </span>
        <h2
          className="font-[family-name:var(--font-unbounded)] uppercase tracking-[0.01em] mb-10 md:mb-12 reveal"
          style={{ fontSize: 'clamp(1.55rem,5vw,2.5rem)', lineHeight: 1.1 }}
        >
          <SplitWords text="Yendo y trayendo." stagger={70} effect="drop" />
          <br />
          <SplitWords text="Así de simple." stagger={70} effect="rise" />
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-5 gap-y-10 md:gap-6 relative reveal">
          {/* Connecting line on desktop — SVG that draws itself */}
          <svg
            className="hidden md:block absolute top-6 left-0 right-0 h-px w-full pointer-events-none"
            viewBox="0 0 1000 1"
            preserveAspectRatio="none"
            aria-hidden
            style={{ left: 'calc(10% + 1.5rem)', right: 'calc(10% + 1.5rem)', width: 'calc(80% - 3rem)' }}
          >
            <defs>
              <linearGradient id="comoLineGrad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#05ed96" />
                <stop offset="100%" stopColor="rgba(5,237,150,0.1)" />
              </linearGradient>
            </defs>
            <line
              className="y-line-draw"
              x1="0" y1="0.5" x2="1000" y2="0.5"
              stroke="url(#comoLineGrad)"
              strokeWidth="1"
              strokeDasharray="1000"
            />
          </svg>

          {PASOS.map((paso, i) => (
            <div key={paso.num} className={`reveal ${paso.delay} relative`}>
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-[rgba(5,237,150,0.5)] flex items-center justify-center font-[family-name:var(--font-unbounded)] text-[0.95rem] md:text-[1.1rem] text-[#05ed96] bg-[#080808] relative z-10 mb-4 md:mb-6 group hover:y-pulse-ring transition-all duration-300 hover:border-[#05ed96] hover:shadow-[0_0_24px_rgba(5,237,150,0.35)]">
                <span className="y-drop inline-block" style={{ animationDelay: `${i * 90}ms` }}>
                  {paso.num}
                </span>
              </div>
              <div className="font-[family-name:var(--font-unbounded)] text-[0.92rem] md:text-[1rem] tracking-[0.03em] text-[#f4f1e8] mb-2.5 md:mb-3 uppercase y-rise" style={{ animationDelay: `${i * 90 + 80}ms` }}>
                {paso.title}
              </div>
              <p className="text-[0.95rem] md:text-[1.05rem] text-[rgba(244,241,232,0.62)] leading-[1.6] md:leading-[1.65] font-[family-name:var(--font-instrument-serif)] y-rise" style={{ animationDelay: `${i * 90 + 160}ms` }}>
                {paso.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
