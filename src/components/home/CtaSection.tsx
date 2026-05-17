import Link from 'next/link'

export function CtaSection() {
  return (
    <section className="py-20 md:py-32 px-5 sm:px-8 md:px-10 bg-[#080808] border-t border-[rgba(5,237,150,0.06)] text-center relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(5,237,150,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10">
        <h2
          className="font-[family-name:var(--font-unbounded)] uppercase tracking-[0.01em] mb-6 md:mb-8 reveal"
          style={{ fontSize: 'clamp(2rem,8vw,4rem)', lineHeight: 1.1 }}
        >
          TÓMALA <span style={{ color: '#05ed96' }}>FRÍA.</span>
          <br />
          TRÁELA VACÍA.
        </h2>
        <p className="text-[0.95rem] md:text-[1rem] text-[rgba(244,241,232,0.45)] mb-10 md:mb-12 tracking-[0.01em] reveal font-[family-name:var(--font-instrument-serif)]">
          Ida y vuelta. Así de simple.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 sm:flex-wrap reveal">
          <Link
            href="/suscripcion"
            className="inline-flex items-center justify-center gap-2 bg-[#05ed96] text-[#080808] px-7 py-4 sm:py-3.5 rounded-full font-[family-name:var(--font-unbounded)] text-[0.72rem] tracking-[0.06em] uppercase no-underline hover:bg-[#04c97e] hover:-translate-y-px active:scale-[0.98] transition-all"
          >
            Reciclemos →
          </Link>
          <Link
            href="/mapa"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-[rgba(244,241,232,0.6)] px-7 py-4 sm:py-3.5 rounded-full border border-[rgba(244,241,232,0.14)] font-[family-name:var(--font-unbounded)] text-[0.72rem] tracking-[0.06em] uppercase no-underline hover:border-[#05ed96] hover:text-[#05ed96] active:scale-[0.98] transition-all"
          >
            ¿Dónde reciclo?
          </Link>
        </div>
      </div>
    </section>
  )
}
