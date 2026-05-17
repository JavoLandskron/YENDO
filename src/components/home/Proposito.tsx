export function Proposito() {
  return (
    <section
      className="py-16 md:py-24 px-5 sm:px-8 md:px-10 bg-[#161616] border-t border-[rgba(244,241,232,0.04)] relative overflow-hidden"
      id="proposito"
    >
      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-30%',
          left: '-10%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(5,237,150,0.04) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-[1100px] mx-auto relative">
        <span className="block font-[family-name:var(--font-instrument-serif)] italic text-[#05ed96] text-[1rem] mb-8 reveal">
          Propósito
        </span>
        <div className="grid md:grid-cols-2 gap-10 md:gap-24 items-start">
          {/* Manifesto */}
          <div
            className="font-[family-name:var(--font-unbounded)] uppercase tracking-[0.01em] reveal"
            style={{ fontSize: 'clamp(1.7rem,6vw,2.5rem)', lineHeight: 1.1 }}
          >
            <p style={{ color: 'rgba(244,241,232,0.12)' }}>
              <span className="text-[#f4f1e8]">Una lata</span>
            </p>
            <p style={{ color: 'rgba(244,241,232,0.12)' }}>
              <span className="text-[#f4f1e8]">no es basura</span>
            </p>
            <p>
              <span className="text-[#05ed96]">si nos</span>
            </p>
            <p>
              <span className="text-[#05ed96]">hacemos</span>
            </p>
            <p>
              <span className="text-[#05ed96]">cargo.</span>
            </p>
          </div>

          {/* Text */}
          <div className="pt-2 reveal">
            <p className="text-[1rem] md:text-[1.12rem] text-[rgba(244,241,232,0.65)] leading-[1.65] mb-5 md:mb-6 font-[family-name:var(--font-instrument-serif)]">
              Nuestro propósito es que la cerveza no deje un gusto amargo en el medioambiente.{' '}
              <strong className="text-[#f4f1e8] font-normal">
                Que brinde por algo más que el momento.
              </strong>
            </p>
            <p className="text-[1rem] md:text-[1.12rem] text-[rgba(244,241,232,0.65)] leading-[1.65] mb-5 md:mb-6 font-[family-name:var(--font-instrument-serif)]">
              Sería una pena que una lata tan linda termine contaminando tan feo, ¿no? La cerveza no es
              basura si no la tratamos como tal.
            </p>
            <p className="text-[1rem] md:text-[1.12rem] text-[rgba(244,241,232,0.65)] leading-[1.65] mb-5 md:mb-6 font-[family-name:var(--font-instrument-serif)]">
              No te pedimos que cambies tu forma de vivir. Solo que la lata vuelva a donde corresponde.{' '}
              <strong className="text-[#f4f1e8] font-normal">No más sabor amargo en el medioambiente.</strong>
            </p>
            <p
              className="font-[family-name:var(--font-instrument-serif)] font-medium text-[1.2rem] tracking-[0.01em]"
              style={{ color: '#05ed96' }}
            >
              Así que vamos. #YendoYTrayendo
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
