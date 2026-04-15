import type { Metadata } from 'next'
import { MapApp } from '@/components/mapa/MapApp'

export const metadata: Metadata = {
  title: 'YENDO — Encuentra tu punto limpio',
  description: 'Escanea tu lata YENDO y encuentra el punto limpio más cercano. Sin apps. Sin vueltas.',
}

export default function MapaPage() {
  return <MapApp />
}
