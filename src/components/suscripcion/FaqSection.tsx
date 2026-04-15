'use client'

import { useState } from 'react'

const FAQ_ITEMS = [
  {
    q: '¿Cómo recibo el kit después de pagar?',
    a: 'Inmediatamente después de confirmar el pago vía Flow, accedes a tu portal privado donde puedes descargar todos los archivos del kit en el momento. También recibirás un email con el enlace de acceso.',
  },
  {
    q: '¿Cuánto equivale 3 UF en pesos?',
    a: '3 UF equivalen aproximadamente a $115.000 CLP al valor de hoy. El cobro se realiza en pesos al valor de la UF del día del pago.',
  },
  {
    q: '¿El QR que recibo ya viene configurado?',
    a: 'Sí. El QR ya viene vinculado al mapa de YENDO y configurado con los parámetros de tu marca para rastrear los escaneos. Solo necesitas enviarlo a tu imprenta con las instrucciones del guidelines.',
  },
  {
    q: '¿En qué productos puedo usar la ecoetiqueta?',
    a: 'Cualquier envase reciclable: latas de aluminio, botellas de vidrio, envases plásticos. El kit incluye versiones adaptadas para distintos soportes.',
  },
  {
    q: '¿Cómo se renueva la comunidad?',
    a: 'La comunidad dura 12 meses desde la fecha de pago. Recibirás un aviso 30 días antes del vencimiento para renovar. La renovación es opcional, no automática.',
  },
  {
    q: '¿Puedo integrar YENDO en múltiples productos?',
    a: 'La comunidad cubre una marca. Si tienes múltiples líneas de productos bajo la misma marca, todos están incluidos. Para múltiples marcas distintas, cada una requiere su propia comunidad.',
  },
]

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="py-20 px-10 bg-[#080808] border-t border-[rgba(245,242,235,0.04)]">
      <div className="max-w-[680px] mx-auto">
        <span className="block font-[family-name:var(--font-instrument-serif)] italic text-[#05ed96] text-[1rem] mb-4 reveal">
          Preguntas frecuentes
        </span>
        <h2
          className="font-[family-name:var(--font-unbounded)] uppercase tracking-[0.01em] mb-10 reveal"
          style={{ fontSize: 'clamp(1.4rem,2.2vw,2.4rem)', lineHeight: 1.15 }}
        >
          Todo claro<br />antes de pagar.
        </h2>

        <div className="space-y-0">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="reveal border-b border-[rgba(245,242,235,0.06)] cursor-pointer"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <div className="flex items-center justify-between py-5 gap-4">
                <span className="font-[family-name:var(--font-dm-sans)] text-[0.95rem] text-[#f5f2eb] text-left">
                  {item.q}
                </span>
                <span
                  className="text-[#05ed96] text-[1.25rem] shrink-0 transition-transform duration-200"
                  style={{ transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  +
                </span>
              </div>
              {openIdx === i && (
                <div className="font-[family-name:var(--font-instrument-serif)] text-[0.88rem] text-[rgba(245,242,235,0.5)] leading-[1.65] pb-5">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
