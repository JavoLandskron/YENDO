export type PointType = 'CAMPANA' | 'PUNTO_LIMPIO' | 'PUNTO_VERDE'
export type Material = 'Vidrio' | 'Metales' | 'Plásticos' | 'Papel'

export interface Point {
  a: string     // address
  lat: number
  lng: number
  t: PointType
  m: Material[]
  h: string     // hours
  n?: string    // name
  _d?: number   // computed distance
}
