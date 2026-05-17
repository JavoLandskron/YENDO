import { MaskReveal } from './motion'

export function Proposito() {
  const manifesto = [
    { text: 'Una lata', color: '#f4f1e8' },
    { text: 'no es basura', color: '#f4f1e8' },
    { text: 'si nos', color: '#05ed96' },
    { text: 'hacemos', color: '#05ed96' },
    { text: 'cargo.', color: '#05ed96' },
  ]

  return (
    <section
      className="py-16 md:py-24 px-5 sm:px-8 md:px-10 bg-[#161616] border-t border-[rgba(244,241,232,0.04)] relative overflow-hidden"
      id="proposito"
    >
      {/* Glow */}
      <div
        className="absolute pointer-events-none y-glow-pulse"
        style={{
          bottom: '-30%',
          left: '-10%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(5,237,150,0.06) 0%, transparent 65%)',
        }}
      />

      {/* Subtle vertical lines decoration */}
      <div
        className="absolute inset-y-0 left-0 right-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(5,237,150,0.04) 1px, transparent 1px)',
          backgroundSize: '120px 100%',
        }}
      />

      <div className="max-w-[1100px] mx-auto relative">
        <span className="block font-[family-name:var(--font-instrument-serif)] italic text-[#05ed96] text-[1rem] mb-8 reveal">
          <span className="y-rise inline-block">Propósito</span>
        </span>
        <div className="grid md:grid-cols-2 gap-10 md:gap-24 items-start">
          {/* Manifesto — green wipe sweep per line */}
          <div
            className="font-[family-name:var(--font-unbounded)] uppercase tracking-[0.01em] reveal"
            style={{ fontSize: 'clamp(1.7rem,6vw,2.5rem)', lineHeight: 1.1 }}
          >
            {manifesto.map((line, i) => (
              <p key={i} style={{ color: 'rgba(244,241,232,0.12)' }}>
                <MaskReveal delay={i * 180}>
                  <span style={{ color: line.color }}>{line.text}</span>
                </MaskReveal>
              </p>
            ))}
          </div>

          {/* Text — staggered rise */}
          <div className="pt-2 reveal">
            <p className="text-[1rem] md:text-[1.12rem] text-[rgba(244,241,232,0.65)] leading-[1.65] mb-5 md:mb-6 font-[family-name:var(--font-instrument-serif)] y-rise">
              Nuestro propósito es que la cerveza no deje un gusto amargo en el medioambiente.{' '}
              <strong className="text-[#f4f1e8] font-normal">
                Que brinde por algo más que el momento.
              </strong>
            </p>
            <p className="text-[1rem] md:text-[1.12rem] text-[rgba(244,241,232,0.65)] leading-[1.65] mb-5 md:mb-6 font-[family-name:var(--font-instrument-serif)] y-rise" style={{ animationDelay: '120ms' }}>
              Sería una pena que una lata tan linda termine contaminando tan feo, ¿no? La cerveza no es
              basura si no la tratamos como tal.
            </p>
            <p className="text-[1rem] md:text-[1.12rem] text-[rgba(244,241,232,0.65)] leading-[1.65] mb-5 md:mb-6 font-[family-name:var(--font-instrument-serif)] y-rise" style={{ animationDelay: '240ms' }}>
              No te pedimos que cambies tu forma de vivir. Solo que la lata vuelva a donde corresponde.{' '}
              <strong className="text-[#f4f1e8] font-normal">No más sabor amargo en el medioambiente.</strong>
            </p>
            <p
              className="font-[family-name:var(--font-instrument-serif)] font-medium text-[1.2rem] tracking-[0.01em] y-wipe"
              style={{ color: '#05ed96', animationDelay: '380ms' }}
            >
              Así que vamos. #YendoYTrayendo
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
