import type { Point, Material, PointType } from './types'

export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)}m`
  return `${(meters / 1000).toFixed(1)}km`
}

export const MAT_SHORT: Record<Material, string> = {
  Vidrio: 'VID',
  Metales: 'MET',
  Plásticos: 'PLA',
  Papel: 'PAP',
}

export const MAT_COLORS: Record<Material, { bg: string; text: string }> = {
  Vidrio: { bg: 'rgba(59,139,212,0.15)', text: '#5ba8e8' },
  Metales: { bg: 'rgba(5,237,150,0.1)', text: '#05ed96' },
  Plásticos: { bg: 'rgba(239,159,39,0.12)', text: '#f0a830' },
  Papel: { bg: 'rgba(170,130,90,0.15)', text: '#c4a06a' },
}

export const POINT_TYPE_LABELS: Record<PointType, string> = {
  PUNTO_LIMPIO: 'Punto limpio',
  PUNTO_VERDE: 'Punto verde',
  CAMPANA: 'Campana',
}

export function getPointColor(point: Point): string {
  const hasMetals = point.m.includes('Metales')
  if (hasMetals) return '#05ed96'
  if (point.t === 'PUNTO_LIMPIO') return '#05ed96'
  if (point.t === 'PUNTO_VERDE') return '#5ba8e8'
  return '#888'
}

export function filterPoints(points: Point[], filter: string, query: string): Point[] {
  let result = points
  if (filter !== 'all') {
    result = result.filter((p) => p.t === filter || p.m.includes(filter as Material))
  }
  if (query) {
    const q = query.toLowerCase()
    result = result.filter(
      (p) =>
        p.a.toLowerCase().includes(q) || (p.n && p.n.toLowerCase().includes(q))
    )
  }
  return result
}
