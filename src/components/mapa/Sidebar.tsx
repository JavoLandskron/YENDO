'use client'

import { useState } from 'react'
import type { Point } from '@/lib/types'
import { filterPoints } from '@/lib/map-utils'
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

interface SidebarProps {
  points: Point[]
  selectedIdx: number | null
  onSelect: (idx: number) => void
  onLocate: () => void
}

export function Sidebar({ points, selectedIdx, onSelect, onLocate }: SidebarProps) {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = filterPoints(points, filter, query)
  const shown = filtered.slice(0, 80)

  return (
    <aside className="w-[360px] shrink-0 bg-[#1c1c1c] border-r border-[rgba(5,237,150,0.08)] flex flex-col overflow-hidden">
      {/* Filters */}
      <div className="px-5 pt-4 pb-3 border-b border-[rgba(245,242,235,0.06)] shrink-0">
        <div className="font-[family-name:var(--font-dm-sans)] text-[0.7rem] tracking-[0.12em] uppercase text-[rgba(245,242,235,0.4)] mb-3">
          Filtrar
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`font-[family-name:var(--font-dm-sans)] px-3 py-1 border rounded-xl text-[0.72rem] tracking-[0.06em] cursor-pointer transition-all whitespace-nowrap ${
                filter === opt.value
                  ? 'bg-[rgba(5,237,150,0.1)] border-[#05ed96] text-[#05ed96]'
                  : 'bg-transparent border-[rgba(245,242,235,0.12)] text-[rgba(245,242,235,0.5)] hover:border-[#05ed96] hover:text-[#05ed96]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats & Locate */}
      <div className="px-5 py-2.5 border-b border-[rgba(245,242,235,0.04)] flex items-center justify-between shrink-0">
        <span className="font-[family-name:var(--font-dm-sans)] text-[0.78rem] text-[rgba(245,242,235,0.35)]">
          <span className="text-[#05ed96] font-medium">{shown.length}</span> de {filtered.length} puntos
        </span>
        <button
          onClick={onLocate}
          className="font-[family-name:var(--font-dm-sans)] flex items-center gap-1.5 bg-[#05ed96] text-[#080808] border-none rounded-xl px-3 py-1.5 text-[0.72rem] font-medium tracking-[0.06em] cursor-pointer uppercase hover:bg-[#04c97e] transition-colors"
        >
          ◎ Mi ubicación
        </button>
      </div>

      {/* Points list */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(5,237,150,0.2) transparent' }}>
        {shown.length === 0 ? (
          <div className="p-12 text-center text-[rgba(245,242,235,0.25)] text-[0.85rem] leading-[1.6] font-[family-name:var(--font-dm-sans)]">
            No se encontraron puntos con ese filtro.
          </div>
        ) : (
          shown.map((point, i) => (
            <PointCard
              key={i}
              point={point}
              selected={selectedIdx === i}
              onClick={() => onSelect(i)}
            />
          ))
        )}
      </div>
    </aside>
  )
}
