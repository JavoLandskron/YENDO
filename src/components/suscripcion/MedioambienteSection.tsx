export function MedioambienteSection() {
  return (
    <section className="bg-[#05ed96] px-5 sm:px-8 md:px-10 py-14 md:py-20 border-t border-[rgba(5,237,150,0.15)]">
      <div className="max-w-[960px] mx-auto">
        <h3
          className="font-[family-name:var(--font-unbounded)] uppercase text-[#0a0a0a] mb-8 md:mb-10"
          style={{ fontSize: 'clamp(1.5rem,6vw,2.5rem)', letterSpacing: '0.04em', lineHeight: 1.05 }}
        >
          ¿Qué gana el medioambiente?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 sm:gap-16 sm:items-center">
          <div>
            <div
              className="font-[family-name:var(--font-unbounded)] text-[#0a0a0a] leading-[1.15] tracking-[0.02em]"
              style={{ fontSize: 'clamp(2.5rem,4vw,4.5rem)' }}
            >
              10
            </div>
            <div className="font-[family-name:var(--font-dm-sans)] text-[0.82rem] text-[rgba(8,8,8,0.55)] max-w-[110px] leading-[1.5] mt-1">
              años tarda una lata en degradarse
            </div>
          </div>
          <div>
            <p className="font-[family-name:var(--font-instrument-serif)] text-[1rem] md:text-[1.1rem] text-[rgba(8,8,8,0.75)] leading-[1.65] mb-4">
              Sería una pena que una lata tan linda termine contaminando tan feo, ¿no? El aluminio puede
              reciclarse{' '}
              <strong className="text-[#0a0a0a] font-medium">infinitas veces sin perder calidad.</strong>
            </p>
            <p className="font-[family-name:var(--font-instrument-serif)] text-[1rem] md:text-[1.1rem] text-[rgba(8,8,8,0.75)] leading-[1.8]">
              No es basura. Es recurso.{' '}
              <strong className="text-[#0a0a0a] font-medium">
                Y YENDO se asegura de que lo tratemos como tal.
              </strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
