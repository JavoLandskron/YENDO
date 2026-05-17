// SERVER-ONLY — never import this file from a Client Component.
// It imports the raw JSON at module init so it is loaded once and stays in memory.
import type { Point, PointType, Material } from '@/lib/types'
import rawData from '@/lib/points-data.json'

// Deduplica entradas con coordenadas idénticas al mismo tipo (datos duplicados en el JSON fuente)
const seen = new Set<string>()
const ALL_POINTS = (rawData as unknown as Point[]).filter((p) => {
  const key = `${p.lat},${p.lng},${p.t}`
  if (seen.has(key)) return false
  seen.add(key)
  return true
})

export interface PointsQuery {
  type?: string | null
  q?: string | null
}

const VALID_TYPES = new Set<string>(['CAMPANA', 'PUNTO_LIMPIO', 'PUNTO_VERDE'])
const VALID_MATERIALS = new Set<string>(['Vidrio', 'Metales', 'Plásticos', 'Papel'])

function sanitizeType(raw: string | null | undefined): string | null {
  if (!raw) return null
  return VALID_TYPES.has(raw) || VALID_MATERIALS.has(raw) ? raw : null
}

function sanitizeQuery(raw: string | null | undefined): string | null {
  if (!raw) return null
  const trimmed = raw.trim().slice(0, 100).toLowerCase()
  return trimmed || null
}

export function queryPoints({ type, q }: PointsQuery): Point[] {
  const safeType = sanitizeType(type)
  const safeQ = sanitizeQuery(q)

  let result = ALL_POINTS

  if (safeType) {
    result = result.filter(
      (p) => p.t === (safeType as PointType) || p.m.includes(safeType as Material)
    )
  }

  if (safeQ) {
    result = result.filter(
      (p) => p.a.toLowerCase().includes(safeQ) || (p.n && p.n.toLowerCase().includes(safeQ))
    )
  }

  return result
}

export function totalPoints(): number {
  return ALL_POINTS.length
}
