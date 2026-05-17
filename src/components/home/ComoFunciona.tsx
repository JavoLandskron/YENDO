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
    <section className="py-16 md:py-24 px-5 sm:px-8 md:px-10 bg-[#080808]" id="como">
      <div className="max-w-[1100px] mx-auto">
        <span className="block font-[family-name:var(--font-instrument-serif)] italic text-[#05ed96] text-[0.95rem] md:text-[1rem] mb-4 reveal">
          Cómo funciona
        </span>
        <h2
          className="font-[family-name:var(--font-unbounded)] uppercase tracking-[0.01em] mb-10 md:mb-12 reveal"
          style={{ fontSize: 'clamp(1.55rem,5vw,2.5rem)', lineHeight: 1.1 }}
        >
          Yendo y trayendo.<br />Así de simple.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-5 gap-y-10 md:gap-6 relative">
          {/* Connecting line on desktop */}
          <div
            className="hidden md:block absolute top-6 h-px"
            style={{
              left: 'calc(10% + 1.5rem)',
              right: 'calc(10% + 1.5rem)',
              background: 'linear-gradient(90deg, #05ed96, rgba(5,237,150,0.1))',
            }}
          />
          {PASOS.map((paso) => (
            <div key={paso.num} className={`reveal ${paso.delay} relative`}>
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-[rgba(5,237,150,0.5)] flex items-center justify-center font-[family-name:var(--font-unbounded)] text-[0.95rem] md:text-[1.1rem] text-[#05ed96] bg-[#080808] relative z-10 mb-4 md:mb-6">
                {paso.num}
              </div>
              <div className="font-[family-name:var(--font-unbounded)] text-[0.92rem] md:text-[1rem] tracking-[0.03em] text-[#f4f1e8] mb-2.5 md:mb-3 uppercase">
                {paso.title}
              </div>
              <p className="text-[0.95rem] md:text-[1.05rem] text-[rgba(244,241,232,0.62)] leading-[1.6] md:leading-[1.65] font-[family-name:var(--font-instrument-serif)]">
                {paso.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
