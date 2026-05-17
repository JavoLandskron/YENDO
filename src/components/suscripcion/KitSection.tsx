import Link from 'next/link'

const KIT_ITEMS = [
  {
    num: '01',
    title: 'QR YENDO listo para imprimir',
    desc: 'El código QR configurado con tu marca y vinculado al mapa de puntos limpios. Listo para enviar a imprenta.',
    files: ['SVG', 'PNG 300dpi', 'EPS', 'PDF'],
    delay: '',
  },
  {
    num: '02',
    title: 'Guidelines de uso',
    desc: 'Manual completo: tamaño mínimo, zonas de exclusión, fondos permitidos, versiones positiva y negativa, y casos de uso incorrectos.',
    files: ['PDF', '6 páginas'],
    delay: 'reveal-delay-1',
  },
  {
    num: '03',
    title: 'Kit redes sociales',
    desc: 'Piezas gráficas editables para anunciar que tu marca es parte de YENDO. Post cuadrado, Story vertical y banner LinkedIn.',
    files: ['Instagram Post', 'Story', 'LinkedIn', 'Canva'],
    delay: 'reveal-delay-2',
  },
]

export function KitSection() {
  return (
    <section className="py-16 md:py-24 px-5 sm:px-8 md:px-10 bg-[#080808] border-t border-[rgba(245,242,235,0.04)]" id="kit">
      <div className="max-w-[960px] mx-auto">
        <span className="block font-[family-name:var(--font-instrument-serif)] italic text-[#05ed96] text-[0.95rem] md:text-[1rem] mb-4 reveal">
          Kit descargable
        </span>
        <h2
          className="font-[family-name:var(--font-unbounded)] uppercase tracking-[0.01em] reveal"
          style={{ fontSize: 'clamp(1.6rem,6vw,2.4rem)', lineHeight: 1.15 }}
        >
          Todo lo que necesitas<br />para activar el ciclo.
        </h2>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mt-10 md:mt-12">
          {KIT_ITEMS.map((item) => (
            <div
              key={item.num}
              className={`reveal ${item.delay} bg-[#1c1c1c] border border-[rgba(245,242,235,0.06)] rounded-[20px] p-6 sm:p-8 hover:border-[rgba(5,237,150,0.15)] transition-colors`}
            >
              <div className="font-[family-name:var(--font-unbounded)] text-[2.75rem] sm:text-[3.5rem] text-[rgba(5,237,150,0.15)] leading-[1.15] mb-4 sm:mb-5 tracking-[0.02em]">
                {item.num}
              </div>
              <div className="font-[family-name:var(--font-instrument-serif)] italic text-[1.15rem] text-[#f5f2eb] mb-2">
                {item.title}
              </div>
              <p className="font-[family-name:var(--font-dm-sans)] text-[0.85rem] text-[rgba(245,242,235,0.45)] leading-[1.6]">
                {item.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {item.files.map((file) => (
                  <span
                    key={file}
                    className="font-[family-name:var(--font-dm-sans)] text-[0.65rem] px-2 py-0.5 border border-[rgba(245,242,235,0.1)] text-[rgba(245,242,235,0.35)] tracking-[0.06em]"
                  >
                    {file}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center reveal">
          <Link
            href="#pago"
            className="inline-flex items-center gap-2 bg-[#05ed96] text-[#080808] px-7 py-3.5 rounded-full font-[family-name:var(--font-unbounded)] text-[0.72rem] tracking-[0.06em] uppercase no-underline hover:bg-[#04c97e] hover:-translate-y-px transition-all"
          >
            Acceder al kit — 3 UF anuales
          </Link>
        </div>
      </div>
    </section>
  )
}
