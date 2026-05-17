import Link from 'next/link'

export function CtaFinal() {
  return (
    <section className="py-20 md:py-32 px-5 sm:px-8 md:px-10 text-center bg-[#1c1c1c] border-t border-[rgba(5,237,150,0.08)] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(5,237,150,0.05) 0%, transparent 70%)',
        }}
      />
      <div className="relative z-10">
        <h2
          className="font-[family-name:var(--font-unbounded)] uppercase tracking-[0.01em] mb-5 md:mb-6 reveal"
          style={{ fontSize: 'clamp(2.2rem,11vw,7rem)', lineHeight: 1.1 }}
        >
          TÓMALA <span style={{ color: '#05ed96' }}>FRÍA.</span>
          <br />
          TRÁELA VACÍA.
        </h2>
        <p className="font-[family-name:var(--font-instrument-serif)] text-[1rem] text-[rgba(245,242,235,0.45)] mb-10 reveal">
          Tu marca puede cerrar el ciclo desde hoy.
        </p>
        <div className="reveal">
          <Link
            href="#pago"
            className="inline-flex items-center gap-2 bg-[#05ed96] text-[#080808] px-6 sm:px-7 py-4 sm:py-3.5 rounded-full font-[family-name:var(--font-unbounded)] text-[0.7rem] sm:text-[0.72rem] tracking-[0.06em] uppercase no-underline hover:bg-[#04c97e] hover:-translate-y-px active:scale-[0.98] transition-all"
          >
            Integra YENDO — 3 UF anuales
          </Link>
        </div>
      </div>
    </section>
  )
}
