'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type { Point } from '@/lib/types'
import { haversineDistance, filterPoints } from '@/lib/map-utils'
import { Sidebar } from './Sidebar'
import rawPoints from '@/lib/points-data.json'

const MapView = dynamic(() => import('./MapView').then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-[#080808]">
      <div className="font-[family-name:var(--font-dm-sans)] text-[rgba(245,242,235,0.3)] text-[0.85rem] tracking-[0.05em]">
        Cargando mapa...
      </div>
    </div>
  ),
})

const allPoints = rawPoints as Point[]

export function MapApp() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState<string | null>(null)

  const points = useMemo(() => {
    if (!userLocation) return allPoints
    return [...allPoints]
      .map((p) => ({
        ...p,
        _d: haversineDistance(userLocation.lat, userLocation.lng, p.lat, p.lng),
      }))
      .sort((a, b) => (a._d ?? Infinity) - (b._d ?? Infinity))
  }, [userLocation])

  const filteredForSidebar = useMemo(
    () => filterPoints(points, 'all', search),
    [points, search]
  )

  function handleLocate() {
    if (!navigator.geolocation) {
      showNotif('Tu navegador no soporta geolocalización.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        showNotif('Ubicación encontrada. Mostrando los más cercanos.')
      },
      () => showNotif('No se pudo obtener tu ubicación.')
    )
  }

  function showNotif(msg: string) {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3500)
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="shrink-0 flex items-center justify-between px-6 py-3.5 bg-[#080808] border-b border-[rgba(5,237,150,0.12)] z-[1000] gap-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-unbounded)] text-[1.25rem] text-[#05ed96] tracking-[0.08em] no-underline shrink-0"
        >
          YENDO
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-[480px] relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(245,242,235,0.3)] text-sm pointer-events-none">
            ◎
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por dirección o nombre..."
            className="w-full bg-[#1c1c1c] border border-[rgba(5,237,150,0.15)] rounded-[20px] pl-8 pr-4 py-2.5 text-[#f5f2eb] font-[family-name:var(--font-dm-sans)] text-[0.875rem] outline-none placeholder:text-[rgba(245,242,235,0.25)] focus:border-[#05ed96] transition-colors"
          />
        </div>

        <Link
          href="/"
          className="font-[family-name:var(--font-dm-sans)] text-[0.75rem] tracking-[0.05em] uppercase text-[rgba(245,242,235,0.4)] no-underline hover:text-[#05ed96] transition-colors shrink-0"
        >
          ← Volver
        </Link>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        <Sidebar
          points={filteredForSidebar}
          selectedIdx={selectedIdx}
          onSelect={setSelectedIdx}
          onLocate={handleLocate}
        />
        <MapView
          points={points}
          selectedIdx={selectedIdx}
          onSelect={setSelectedIdx}
          userLocation={userLocation}
        />
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1c1c1c] border border-[rgba(5,237,150,0.2)] rounded-full px-6 py-3 font-[family-name:var(--font-dm-sans)] text-[0.82rem] text-[#f5f2eb] z-[300] shadow-xl">
          {notification}
        </div>
      )}
    </div>
  )
}
