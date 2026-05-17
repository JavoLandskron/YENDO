const DATA_ITEMS = [
  {
    num: '<2%',
    label: 'de los residuos se reciclan en Chile.',
    desc: 'No por falta de voluntad. Por falta de ruta en el momento exacto.',
    source: 'Fuente: ReSimple',
    delay: '',
  },
  {
    num: '74%',
    label: 'no recicla frecuentemente.',
    desc: 'La barrera declarada número uno: no saber dónde hacerlo en ese momento.',
    source: 'Fuente: ReSimple',
    delay: 'reveal-delay-1',
  },
  {
    num: '3.401',
    label: 'puntos limpios activos en Chile.',
    desc: 'La infraestructura existe. YENDO la conecta con el momento de consumo.',
    source: 'Fuente: ReSimple · actualizado',
    delay: 'reveal-delay-2',
  },
]

export function DataSection() {
  return (
    <section className="bg-[#161616] border-t border-[rgba(5,237,150,0.06)] border-b border-[rgba(5,237,150,0.06)]">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-3">
        {DATA_ITEMS.map((item, i) => (
          <div
            key={i}
            className={`reveal ${item.delay} px-5 sm:px-8 md:px-12 py-12 md:py-20 flex flex-col ${
              i < DATA_ITEMS.length - 1
                ? 'border-b md:border-b-0 md:border-r border-[rgba(244,241,232,0.04)]'
                : ''
            }`}
          >
            <div
              className="font-[family-name:var(--font-unbounded)] text-[#05ed96] leading-[1.1] tracking-[0.01em] mb-3"
              style={{ fontSize: 'clamp(2.25rem,8vw,4rem)' }}
            >
              {item.num}
            </div>
            <div className="text-[1rem] md:text-[1.08rem] text-[rgba(244,241,232,0.65)] leading-[1.6] font-[family-name:var(--font-instrument-serif)] md:max-w-[220px]">
              <strong className="text-[#f4f1e8] font-normal block mb-1">{item.label}</strong>
              {item.desc}
            </div>
            <div className="mt-6 md:mt-10 font-[family-name:var(--font-dm-sans)] text-[0.65rem] text-[rgba(244,241,232,0.25)] tracking-[0.04em] uppercase">
              {item.source}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
