import type { Point } from '@/lib/types'
import { formatDistance, MAT_COLORS, MAT_SHORT, POINT_TYPE_LABELS } from '@/lib/map-utils'

interface PointCardProps {
  point: Point
  selected: boolean
  onClick: () => void
}

export function PointCard({ point, selected, onClick }: PointCardProps) {
  return (
    <div
      onClick={onClick}
      className={`px-5 py-3.5 border-b border-[rgba(245,242,235,0.04)] cursor-pointer transition-colors relative ${
        selected
          ? 'bg-[rgba(5,237,150,0.08)] border-l-2 border-l-[#05ed96] pl-[18px]'
          : 'hover:bg-[rgba(5,237,150,0.04)]'
      }`}
    >
      {point._d != null && (
        <div className="font-[family-name:var(--font-dm-sans)] text-[0.7rem] text-[#05ed96] font-medium tracking-[0.04em] mb-1">
          {formatDistance(point._d)} de ti
        </div>
      )}
      <div className="font-[family-name:var(--font-dm-sans)] text-[0.85rem] text-[#f5f2eb] leading-[1.4] mb-1.5">
        {point.n || point.a}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-[family-name:var(--font-dm-sans)] text-[0.65rem] tracking-[0.08em] uppercase text-[rgba(245,242,235,0.35)]">
          {POINT_TYPE_LABELS[point.t]}
        </span>
        {point.m.map((mat) => (
          <span
            key={mat}
            className="font-[family-name:var(--font-dm-sans)] text-[0.62rem] px-1.5 py-0.5 font-medium tracking-[0.04em]"
            style={{ background: MAT_COLORS[mat]?.bg, color: MAT_COLORS[mat]?.text }}
          >
            {MAT_SHORT[mat] || mat}
          </span>
        ))}
      </div>
      {point.h && (
        <div className="font-[family-name:var(--font-dm-sans)] text-[0.68rem] text-[rgba(245,242,235,0.25)] mt-1.5 leading-[1.3]">
          {point.h}
        </div>
      )}
    </div>
  )
}
