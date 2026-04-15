import Link from 'next/link'

export function HeroSuscripcion() {
  return (
    <section className="min-h-screen flex relative overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(5,237,150,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(5,237,150,0.035) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage:
            'linear-gradient(to bottom,transparent 0%,black 20%,black 80%,transparent 100%)',
        }}
      />
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 40%, rgba(5,237,150,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1100px] mx-auto w-full px-10 pt-32 pb-20 relative z-10 flex flex-col justify-center">
        {/* Headline */}
        <div className="reveal mb-16">
          <h1
            className="font-[family-name:var(--font-unbounded)] uppercase tracking-[0.01em] leading-[1.1]"
            style={{ fontSize: 'clamp(1.8rem,3vw,3.5rem)' }}
          >
            Una lata<br />no es basura<br />si nos<br />
            <span style={{ color: '#05ed96' }}>hacemos<br />cargo.</span>
          </h1>
        </div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-16 items-start reveal">
          {/* Left: argument */}
          <div>
            <span className="inline-block font-[family-name:var(--font-dm-sans)] text-[0.68rem] tracking-[0.16em] uppercase text-[#05ed96] border border-[rgba(5,237,150,0.2)] rounded-full px-3.5 py-1.5 mb-5">
              Canal único · Sin pasos intermedios
            </span>
            <p className="text-[1.05rem] text-[rgba(245,242,235,0.65)] leading-[1.65] mb-8 font-[family-name:var(--font-instrument-serif)]">
              Convertimos el envase en el único canal necesario. El usuario escanea y recibe la ruta exacta
              al punto de recolección más cercano.{' '}
              <strong className="text-[#f5f2eb] font-normal">Cero trabas. Cero apps. Cero pasos intermedios.</strong>
            </p>

            <div className="w-8 h-px bg-[rgba(5,237,150,0.3)] mb-8" />

            <div>
              <div className="font-[family-name:var(--font-instrument-serif)] italic text-[#05ed96] text-[1rem] mb-3">
                Branding con propósito
              </div>
              <p className="text-[1.05rem] text-[rgba(245,242,235,0.65)] leading-[1.65] font-[family-name:var(--font-instrument-serif)]">
                No solo reciclas. Le das a tu consumidor una herramienta que funciona en el momento exacto.{' '}
                <strong className="text-[#f5f2eb] font-normal">Tu marca se convierte en el facilitador del ciclo.</strong>
              </p>
            </div>

            <div className="w-8 h-px bg-[rgba(5,237,150,0.3)] my-8" />

            <div>
              <div className="font-[family-name:var(--font-instrument-serif)] italic text-[#05ed96] text-[1rem] mb-3">
                La cerveza no deja gusto amargo
              </div>
              <p className="text-[1.05rem] text-[rgba(245,242,235,0.65)] leading-[1.65] font-[family-name:var(--font-instrument-serif)]">
                Nuestro propósito es que la cerveza no deje un gusto amargo en el medioambiente.{' '}
                <strong className="text-[#f5f2eb] font-normal">Que tu marca brinde por algo más que el momento.</strong>
              </p>
            </div>
          </div>

          {/* Right: price card */}
          <div
            className="bg-[#080808] border border-[rgba(5,237,150,0.18)] rounded-[20px] p-9 relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: 'linear-gradient(90deg, transparent, #05ed96, transparent)' }}
            />
            <span className="block font-[family-name:var(--font-dm-sans)] text-[0.65rem] tracking-[0.15em] uppercase text-[#05ed96] mb-5">
              Comunidad anual
            </span>
            <div className="font-[family-name:var(--font-unbounded)] text-[1.75rem] text-[#05ed96] leading-[1.15] tracking-[0.01em] mb-1">
              3 UF
            </div>
            <div className="font-[family-name:var(--font-dm-sans)] text-[0.8rem] text-[rgba(245,242,235,0.35)] mb-7">
              ≈ $115.000 CLP · acceso inmediato
            </div>
            <div
              className="flex flex-col gap-2.5 p-5 rounded-full mb-6"
              style={{
                background: 'rgba(5,237,150,0.04)',
                border: '1px solid rgba(5,237,150,0.08)',
                borderRadius: '16px',
              }}
            >
              {['◎ QR listo para imprenta', '◎ Guidelines de uso', '◎ Kit redes sociales', '◎ Dashboard de impacto', '◎ Comunidad de marcas'].map((item) => (
                <div key={item} className="font-[family-name:var(--font-dm-sans)] text-[0.82rem] text-[rgba(245,242,235,0.6)]">
                  {item}
                </div>
              ))}
            </div>
            <Link
              href="#pago"
              className="block w-full text-center bg-[#05ed96] text-[#080808] px-7 py-3.5 rounded-full font-[family-name:var(--font-unbounded)] text-[0.72rem] tracking-[0.06em] uppercase no-underline hover:bg-[#04c97e] transition-colors mb-3"
            >
              Haz que tu marca sea parte de la ruta →
            </Link>
            <Link
              href="#kit"
              className="block w-full text-center bg-transparent text-[rgba(245,242,235,0.55)] px-7 py-3.5 rounded-full border border-[rgba(245,242,235,0.2)] font-[family-name:var(--font-unbounded)] text-[0.72rem] tracking-[0.06em] uppercase no-underline hover:border-[#05ed96] hover:text-[#05ed96] transition-all"
            >
              Ver qué incluye el kit
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
