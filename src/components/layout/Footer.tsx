import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[rgba(244,241,232,0.05)] px-5 sm:px-8 md:px-10 py-8 md:py-[2.5rem]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-4 md:flex-wrap">
        <div className="font-[family-name:var(--font-unbounded)] text-[0.85rem] text-[#05ed96] tracking-[0.1em]">
          YENDO
        </div>
        <ul className="grid grid-cols-2 sm:flex sm:gap-7 gap-y-3 gap-x-6 list-none md:flex-wrap">
          {[
            { href: '/#como', label: 'Cómo funciona' },
            { href: '/#proposito', label: 'Propósito' },
            { href: '/#marcas', label: 'Para marcas' },
            { href: '/mapa', label: 'Mapa' },
            { href: '/suscripcion', label: 'Comunidad' },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-[family-name:var(--font-dm-sans)] text-[0.72rem] tracking-[0.05em] uppercase text-[rgba(244,241,232,0.35)] no-underline hover:text-[#05ed96] transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="font-[family-name:var(--font-dm-sans)] text-[0.7rem] md:text-[0.72rem] text-[rgba(244,241,232,0.2)] tracking-[0.04em] leading-[1.5]">
          © 2026 YENDO · Tómala fría. Tráela vacía.
        </div>
      </div>
    </footer>
  )
}
