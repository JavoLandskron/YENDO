import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[rgba(244,241,232,0.05)] px-10 py-[2.5rem] flex items-center justify-between flex-wrap gap-4">
      <div className="font-[family-name:var(--font-unbounded)] text-[0.85rem] text-[#05ed96] tracking-[0.1em]">
        YENDO
      </div>
      <ul className="flex gap-7 list-none flex-wrap">
        {[
          { href: '#como', label: 'Cómo funciona' },
          { href: '#proposito', label: 'Propósito' },
          { href: '#marcas', label: 'Para marcas' },
          { href: '/mapa', label: 'Mapa' },
          { href: '/suscripcion', label: 'Comunidad' },
        ].map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="font-[family-name:var(--font-dm-sans)] text-[0.72rem] tracking-[0.05em] uppercase text-[rgba(244,241,232,0.25)] no-underline hover:text-[#05ed96] transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="font-[family-name:var(--font-dm-sans)] text-[0.72rem] text-[rgba(244,241,232,0.15)] tracking-[0.04em]">
        © 2025 YENDO · Tómala fría. Tráela vacía.
      </div>
    </footer>
  )
}
