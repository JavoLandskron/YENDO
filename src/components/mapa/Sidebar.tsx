'use client'

import { useState, useEffect } from 'react'
import type { Point } from '@/lib/types'
import { PointCard } from './PointCard'

const FILTER_OPTIONS = [
  { value: 'all', label: 'Todos' },
  { value: 'PUNTO_LIMPIO', label: 'Punto limpio' },
  { value: 'PUNTO_VERDE', label: 'Punto verde' },
  { value: 'CAMPANA', label: 'Campana' },
  { value: 'Metales', label: 'Metales' },
  { value: 'Vidrio', label: 'Vidrio' },
  { value: 'Plásticos', label: 'Plásticos' },
  { value: 'Papel', label: 'Papel' },
]

const PAGE_SIZE = 10

interface SidebarProps {
  points: Point[]
  total: number
  selectedIdx: number | null
  onSelect: (idx: number) => void
  onLocate: () => void
  filter: string
  onFilterChange: (f: string) => void
  sheetOpen: boolean
  onSheetToggle: () => void
}

export function Sidebar({
  points,
  total,
  selectedIdx,
  onSelect,
  onLocate,
  filter,
  onFilterChange,
  sheetOpen,
  onSheetToggle,
}: SidebarProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [points])

  const shown = points.slice(0, visibleCount)
  const remaining = points.length - visibleCount

  return (
    <aside
      className={[
        // ── Base (mobile: bottom sheet) ──────────────────────────
        'absolute bottom-0 left-0 right-0 z-[200]',
        'bg-[#1c1c1c] rounded-t-3xl',
        'overflow-hidden',
        'transition-[height] duration-300 ease-in-out',
        sheetOpen ? 'h-[72dvh]' : 'h-[172px]',

        // ── Desktop override (md+): left panel ───────────────────
        'md:static md:h-auto md:w-[360px] md:rounded-none md:z-10',
        'md:border-r md:border-[rgba(5,237,150,0.08)]',
        'md:flex md:flex-col',
      ].join(' ')}
    >
      {/* ── Mobile handle (tap to expand/collapse) ─── */}
      <button
        onClick={onSheetToggle}
        aria-label={sheetOpen ? 'Colapsar lista' : 'Expandir lista'}
        className="md:hidden w-full flex flex-col items-center pt-3 pb-1 cursor-pointer bg-transparent border-0 active:bg-[rgba(5,237,150,0.04)] transition-colors"
      >
        <div className="w-8 h-1 rounded-full bg-[rgba(245,242,235,0.2)]" />
        <span className="mt-1.5 font-[family-name:var(--font-dm-sans)] text-[0.65rem] tracking-[0.1em] uppercase text-[rgba(245,242,235,0.3)]">
          {sheetOpen ? 'Cerrar' : `${total} puntos`}
        </span>
      </button>

      {/* ── Filters ─────────────────────────────────── */}
      <div className="px-5 pt-4 pb-3 border-b border-[rgba(245,242,235,0.06)] shrink-0">
        <div className="font-[family-name:var(--font-dm-sans)] text-[0.7rem] tracking-[0.12em] uppercase text-[rgba(245,242,235,0.4)] mb-3 hidden md:block">
          Filtrar
        </div>
        {/* horizontal scroll on mobile, wrap on desktop */}
        <div
          className="flex gap-1.5 md:flex-wrap overflow-x-auto md:overflow-x-visible pb-1 md:pb-0"
          style={{ scrollbarWidth: 'none' }}
        >
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onFilterChange(opt.value)}
              className={[
                'font-[family-name:var(--font-dm-sans)] px-3 py-1.5 border rounded-xl',
                'text-[0.72rem] tracking-[0.06em] cursor-pointer transition-all whitespace-nowrap shrink-0',
                filter === opt.value
                  ? 'bg-[rgba(5,237,150,0.1)] border-[#05ed96] text-[#05ed96]'
                  : 'bg-transparent border-[rgba(245,242,235,0.12)] text-[rgba(245,242,235,0.5)] hover:border-[#05ed96] hover:text-[#05ed96]',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stats + Locate (desktop only; mobile has floating button) ── */}
      <div className="px-5 py-2.5 border-b border-[rgba(245,242,235,0.04)] flex items-center justify-between shrink-0">
        <span className="font-[family-name:var(--font-dm-sans)] text-[0.78rem] text-[rgba(245,242,235,0.35)]">
          <span className="text-[#05ed96] font-medium">{shown.length}</span> de {total} puntos
        </span>
        <button
          onClick={onLocate}
          className="font-[family-name:var(--font-dm-sans)] hidden md:flex items-center gap-1.5 bg-[#05ed96] text-[#080808] border-none rounded-xl px-3 py-1.5 text-[0.72rem] font-medium tracking-[0.06em] cursor-pointer uppercase hover:bg-[#04c97e] transition-colors"
        >
          ◎ Mi ubicación
        </button>
        {/* On mobile show a compact label */}
        <span className="md:hidden font-[family-name:var(--font-dm-sans)] text-[0.7rem] text-[rgba(245,242,235,0.25)] tracking-[0.06em] uppercase">
          más cercanos primero
        </span>
      </div>

      {/* ── Points list ─────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(5,237,150,0.2) transparent' }}
      >
        {shown.length === 0 ? (
          <div className="p-12 text-center text-[rgba(245,242,235,0.25)] text-[0.85rem] leading-[1.6] font-[family-name:var(--font-dm-sans)]">
            No se encontraron puntos con ese filtro.
          </div>
        ) : (
          <>
            {shown.map((point, i) => (
              <PointCard
                key={i}
                point={point}
                selected={selectedIdx === i}
                onClick={() => onSelect(i)}
              />
            ))}

            {remaining > 0 && (
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="w-full py-4 font-[family-name:var(--font-dm-sans)] text-[0.78rem] tracking-[0.06em] text-[rgba(245,242,235,0.4)] hover:text-[#05ed96] border-t border-[rgba(245,242,235,0.06)] transition-colors cursor-pointer bg-transparent"
              >
                + Ver {Math.min(remaining, PAGE_SIZE)} más{' '}
                <span className="text-[rgba(245,242,235,0.25)]">({remaining} restantes)</span>
              </button>
            )}
          </>
        )}
      </div>
    </aside>
  )
}
