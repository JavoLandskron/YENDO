'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const PRICE_ITEMS = [
  {
    title: 'QR YENDO listo para imprimir',
    desc: 'Archivos SVG y PNG en alta resolución para integrar en tu etiqueta o packaging.',
  },
  {
    title: 'Guidelines de uso de la ecoetiqueta',
    desc: 'Manual completo de cómo y dónde aplicar el QR. Versiones correctas e incorrectas.',
  },
  {
    title: 'Kit de publicaciones para redes sociales',
    desc: 'Piezas gráficas listas para publicar en Instagram, Stories y LinkedIn.',
  },
  {
    title: 'Acceso a la comunidad de marcas YENDO',
    desc: 'Red de marcas comprometidas con el ciclo de reciclaje en Chile.',
  },
  {
    title: 'Dashboard de impacto',
    desc: 'Datos reales de escaneos y reciclaje generados por tu producto.',
  },
]

const PORTAL_ITEMS = [
  {
    name: 'QR YENDO — Listo para imprimir',
    desc: 'Código QR configurado con tu marca. Envíalo directamente a imprenta.',
    tags: ['SVG', 'PNG 300dpi', 'EPS', 'PDF'],
    file: 'QR_YENDO_Kit.zip',
  },
  {
    name: 'Guidelines de uso — Ecoetiqueta YENDO',
    desc: 'Manual completo de aplicación: tamaños, zonas de exclusión, versiones y casos de uso.',
    tags: ['PDF', '6 páginas'],
    file: 'YENDO_Guidelines.pdf',
  },
  {
    name: 'Kit redes sociales — Piezas editables',
    desc: 'Post Instagram, Story y banner LinkedIn. Versiones para Canva y Adobe.',
    tags: ['Instagram', 'Story', 'LinkedIn', 'Canva'],
    file: 'YENDO_Kit_RRSS.zip',
  },
]

export function PrecioSection() {
  const [form, setForm] = useState({ nombre: '', marca: '', email: '', envase: '', rut: '' })
  const [loading, setLoading] = useState(false)
  const [portalOpen, setPortalOpen] = useState(false)
  const [portalMarca, setPortalMarca] = useState('')
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({})

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handlePago() {
    if (!form.nombre || !form.marca || !form.email) {
      alert('Por favor completa los campos obligatorios: nombre, marca y email.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setPortalMarca(form.marca)
      setPortalOpen(true)
    }, 2000)
  }

  function handleDownload(file: string) {
    setDownloaded((d) => ({ ...d, [file]: true }))
    setTimeout(() => setDownloaded((d) => ({ ...d, [file]: false })), 2500)
  }

  const expiryDate = new Date()
  expiryDate.setFullYear(expiryDate.getFullYear() + 1)
  const expiry = expiryDate.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <section className="py-16 md:py-24 px-5 sm:px-8 md:px-10 bg-[#1c1c1c] border-t border-[rgba(5,237,150,0.08)]" id="pago">
      <div className="max-w-[960px] mx-auto">
        <span className="block font-[family-name:var(--font-instrument-serif)] italic text-[#05ed96] text-[0.95rem] md:text-[1rem] mb-4 reveal">
          Comunidad
        </span>
        <h2
          className="font-[family-name:var(--font-unbounded)] uppercase tracking-[0.01em] mb-8 md:mb-10 reveal"
          style={{ fontSize: 'clamp(1.6rem,6vw,2.4rem)', lineHeight: 1.15 }}
        >
          Un precio.<br />Todo incluido.
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Price card */}
          <div
            className="bg-[#080808] border border-[rgba(5,237,150,0.2)] rounded-[20px] p-6 sm:p-10 relative overflow-hidden reveal"
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: 'linear-gradient(90deg, transparent, #05ed96, transparent)' }}
            />
            <div className="font-[family-name:var(--font-instrument-serif)] italic text-[#05ed96] text-[0.95rem] mb-5">
              Comunidad anual
            </div>
            <div className="font-[family-name:var(--font-unbounded)] text-[1.75rem] text-[#05ed96] leading-[1.15] tracking-[0.01em] mb-1">
              3 UF
            </div>
            <div className="font-[family-name:var(--font-dm-sans)] text-[0.85rem] text-[rgba(245,242,235,0.4)] mb-2">
              por año · renovación automática opcional
            </div>
            <div className="font-[family-name:var(--font-instrument-serif)] text-[1rem] text-[rgba(245,242,235,0.5)] mb-8">
              Equivale aprox. a <strong className="text-[#f5f2eb] font-normal">$115.000 CLP</strong>
            </div>

            <div className="mb-8">
              <div className="font-[family-name:var(--font-dm-sans)] text-[0.7rem] tracking-[0.12em] uppercase text-[rgba(245,242,235,0.35)] mb-4">
                Incluye
              </div>
              {PRICE_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 py-2.5 border-b border-[rgba(245,242,235,0.04)] last:border-0 font-[family-name:var(--font-instrument-serif)] text-[0.88rem] text-[rgba(245,242,235,0.7)]"
                >
                  <span className="text-[#05ed96] shrink-0 mt-0.5">◎</span>
                  <div>
                    <strong className="italic font-normal text-[#f5f2eb] text-[1.05rem] block mb-0.5">
                      {item.title}
                    </strong>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#2a2a2a] border border-[rgba(245,242,235,0.06)] rounded-[24px] p-6 sm:p-8 reveal">
            <div className="font-[family-name:var(--font-dm-sans)] text-[0.8rem] tracking-[0.05em] uppercase text-[rgba(245,242,235,0.4)] mb-6">
              Datos de tu marca
            </div>

            <div className="space-y-4">
              {[
                { label: 'Nombre de contacto', name: 'nombre', type: 'text', placeholder: 'Tu nombre completo' },
                { label: 'Nombre de la marca', name: 'marca', type: 'text', placeholder: "Ej: Mad Charlie's" },
                { label: 'Email corporativo', name: 'email', type: 'email', placeholder: 'tu@marca.cl' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block font-[family-name:var(--font-dm-sans)] text-[0.72rem] tracking-[0.05em] uppercase text-[rgba(245,242,235,0.4)] mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full bg-[#080808] border border-[rgba(245,242,235,0.1)] rounded-full px-4 py-3 text-[#f5f2eb] font-[family-name:var(--font-instrument-serif)] text-[0.88rem] outline-none placeholder:text-[rgba(245,242,235,0.2)] focus:border-[#05ed96] transition-colors"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Tipo de envase', name: 'envase', placeholder: 'Ej: latas 330ml' },
                  { label: 'RUT empresa', name: 'rut', placeholder: '12.345.678-9' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block font-[family-name:var(--font-dm-sans)] text-[0.72rem] tracking-[0.05em] uppercase text-[rgba(245,242,235,0.4)] mb-2">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full bg-[#080808] border border-[rgba(245,242,235,0.1)] rounded-full px-4 py-3 text-[#f5f2eb] font-[family-name:var(--font-instrument-serif)] text-[0.88rem] outline-none placeholder:text-[rgba(245,242,235,0.2)] focus:border-[#05ed96] transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6 font-[family-name:var(--font-dm-sans)] text-[0.72rem] tracking-[0.04em] text-[rgba(245,242,235,0.2)]">
              <div className="flex-1 h-px bg-[rgba(245,242,235,0.06)]" />
              Resumen del pago
              <div className="flex-1 h-px bg-[rgba(245,242,235,0.06)]" />
            </div>

            {/* Total */}
            <div
              className="flex items-center justify-between px-4 py-3.5 rounded-full mb-5"
              style={{ background: 'rgba(5,237,150,0.05)', border: '1px solid rgba(5,237,150,0.1)' }}
            >
              <div>
                <div className="font-[family-name:var(--font-dm-sans)] text-[0.78rem] text-[rgba(245,242,235,0.5)]">
                  Comunidad anual YENDO
                </div>
                <div className="font-[family-name:var(--font-dm-sans)] text-[0.72rem] text-[rgba(245,242,235,0.25)] mt-0.5">
                  Incluye acceso completo al kit + comunidad
                </div>
              </div>
              <div className="font-[family-name:var(--font-unbounded)] text-[1.05rem] text-[#05ed96] tracking-[0.04em]">
                3 UF
              </div>
            </div>

            <button
              onClick={handlePago}
              disabled={loading}
              className="w-full bg-[#05ed96] text-[#080808] border-none rounded-full px-8 py-4 font-[family-name:var(--font-instrument-serif)] text-[0.9rem] font-medium tracking-[0.05em] uppercase cursor-pointer hover:bg-[#04c97e] transition-colors flex items-center justify-center gap-2 disabled:bg-[rgba(5,237,150,0.3)] disabled:cursor-not-allowed"
            >
              {loading ? 'Conectando con Flow...' : <>Pagar con Flow <span>→</span></>}
            </button>

            <div className="flex items-center justify-center gap-2 mt-3 font-[family-name:var(--font-dm-sans)] text-[0.72rem] text-[rgba(245,242,235,0.25)]">
              <span>🔒</span>
              <span>Pago seguro procesado por</span>
              <span className="font-medium">■ FLOW</span>
              <span>· Webpay Plus</span>
            </div>
            <p className="font-[family-name:var(--font-dm-sans)] text-[0.7rem] text-[rgba(245,242,235,0.2)] text-center mt-2">
              Al pagar aceptas los términos de uso de YENDO. Acceso inmediato tras confirmación.
            </p>
          </div>
        </div>
      </div>

      {/* Portal modal */}
      <Dialog open={portalOpen} onOpenChange={setPortalOpen}>
        <DialogContent className="bg-[#1c1c1c] border border-[rgba(5,237,150,0.2)] rounded-[24px] max-w-[640px] text-[#f5f2eb] p-0 overflow-hidden">
          <DialogHeader className="px-8 pt-7 pb-5 border-b border-[rgba(245,242,235,0.06)]">
            <DialogTitle className="font-[family-name:var(--font-unbounded)] text-[1.75rem] text-[#05ed96] tracking-[0.04em]">
              PORTAL YENDO
            </DialogTitle>
          </DialogHeader>
          <div className="px-8 py-7">
            <p className="font-[family-name:var(--font-instrument-serif)] text-[1rem] text-[rgba(245,242,235,0.6)] mb-8 leading-[1.6]">
              Bienvenido a la comunidad YENDO,{' '}
              <strong className="text-[#f5f2eb] font-medium">{portalMarca || 'tu marca'}</strong>.<br />
              Tu comunidad está activa hasta{' '}
              <strong className="text-[#f5f2eb] font-medium">{expiry}</strong>. Descarga tu kit completo a continuación.
            </p>

            <div className="space-y-3">
              {PORTAL_ITEMS.map((item) => (
                <div
                  key={item.file}
                  className="flex items-center justify-between gap-4 bg-[#080808] border border-[rgba(245,242,235,0.06)] rounded-[20px] px-6 py-5 hover:border-[rgba(5,237,150,0.15)] transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-[family-name:var(--font-instrument-serif)] italic text-[1.05rem] text-[#f5f2eb] mb-1">
                      {item.name}
                    </div>
                    <div className="font-[family-name:var(--font-dm-sans)] text-[0.78rem] text-[rgba(245,242,235,0.4)] mb-2">
                      {item.desc}
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-[family-name:var(--font-dm-sans)] text-[0.62rem] px-2.5 py-0.5 border border-[rgba(245,242,235,0.1)] rounded-full text-[rgba(245,242,235,0.3)] tracking-[0.06em]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(item.file)}
                    className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full font-[family-name:var(--font-instrument-serif)] text-[0.72rem] font-medium tracking-[0.04em] uppercase transition-colors ${
                      downloaded[item.file]
                        ? 'bg-[#0f7a3a] text-white'
                        : 'bg-[#05ed96] text-[#080808] hover:bg-[#04c97e]'
                    }`}
                  >
                    {downloaded[item.file] ? '✓ Descargado' : '↓ Descargar'}
                  </button>
                </div>
              ))}
            </div>

            <div className="h-px bg-[rgba(245,242,235,0.06)] my-6" />
            <p className="font-[family-name:var(--font-dm-sans)] text-[0.8rem] text-[rgba(245,242,235,0.3)] text-center">
              ¿Necesitas ayuda con la integración? Escríbenos a{' '}
              <a href="mailto:hola@yendo.cl" className="text-[#05ed96] no-underline hover:underline">
                hola@yendo.cl
              </a>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
