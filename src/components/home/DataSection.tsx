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
            className={`reveal ${item.delay} px-12 py-20 relative ${
              i < DATA_ITEMS.length - 1 ? 'border-r border-[rgba(244,241,232,0.04)]' : ''
            }`}
          >
            <div
              className="font-[family-name:var(--font-unbounded)] text-[#05ed96] leading-[1.1] tracking-[0.01em] mb-3"
              style={{ fontSize: 'clamp(2.25rem,3.5vw,4rem)' }}
            >
              {item.num}
            </div>
            <div className="text-[1.08rem] text-[rgba(244,241,232,0.65)] leading-[1.6] font-[family-name:var(--font-instrument-serif)] max-w-[220px]">
              <strong className="text-[#f4f1e8] font-normal block mb-1">{item.label}</strong>
              {item.desc}
            </div>
            <div className="absolute bottom-8 left-12 font-[family-name:var(--font-dm-sans)] text-[0.65rem] text-[rgba(244,241,232,0.2)] tracking-[0.04em] uppercase">
              {item.source}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
