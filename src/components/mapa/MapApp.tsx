'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type { Point } from '@/lib/types'
import { haversineDistance, filterPoints } from '@/lib/map-utils'
import { Sidebar } from './Sidebar'

const MapView = dynamic(() => import('./MapView').then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#080808]">
      <div className="font-[family-name:var(--font-dm-sans)] text-[rgba(245,242,235,0.3)] text-[0.85rem] tracking-[0.05em]">
        Cargando mapa...
      </div>
    </div>
  ),
})

export function MapApp() {
  const [allPoints, setAllPoints] = useState<Point[]>([])
  const [pointsLoading, setPointsLoading] = useState(true)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [notification, setNotification] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    fetch('/api/points')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar los puntos')
        return res.json() as Promise<{ points: Point[] }>
      })
      .then((data) => setAllPoints(data.points))
      .catch(() => showNotif('No se pudieron cargar los puntos. Intenta recargar la página.'))
      .finally(() => setPointsLoading(false))
  }, [])

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        showNotif('Mostrando los puntos más cercanos a tu ubicación.')
      },
      () => { /* permiso denegado — el botón sigue disponible */ }
    )
  }, [])

  const points = useMemo(() => {
    if (!userLocation) return allPoints
    return [...allPoints]
      .map((p) => ({
        ...p,
        _d: haversineDistance(userLocation.lat, userLocation.lng, p.lat, p.lng),
      }))
      .sort((a, b) => (a._d ?? Infinity) - (b._d ?? Infinity))
  }, [userLocation, allPoints])

  const filteredByType = useMemo(
    () => filterPoints(points, filter, ''),
    [points, filter]
  )

  const filteredForSidebar = useMemo(
    () => filterPoints(filteredByType, 'all', search),
    [filteredByType, search]
  )

  function handleFilterChange(newFilter: string) {
    setFilter(newFilter)
    setSelectedIdx(null)
  }

  // useCallback evita que handleSelect cambie de referencia en cada render,
  // lo que causaba que los markers se re-crearan y el popup se perdiera.
  const handleSelect = useCallback((idx: number) => {
    setSelectedIdx(idx)
    setSheetOpen(false)
  }, [])

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
    <div className="h-[100dvh] flex flex-col overflow-hidden">

      {/* ── Header ───────────────────────────────────────── */}
      <header className="shrink-0 relative flex items-center px-4 md:px-6 py-2.5 md:py-3.5 bg-[#080808] border-b border-[rgba(5,237,150,0.12)] z-[1000]">

        {/* Logo — izquierda */}
        <Link
          href="/"
          className="font-[family-name:var(--font-unbounded)] text-[1.1rem] md:text-[1.25rem] text-[#05ed96] tracking-[0.08em] no-underline shrink-0"
        >
          YENDO
        </Link>

        {/* Search — centrado absolutamente */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[200px] md:w-[480px] group">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200"
            style={{ color: search ? '#05ed96' : 'rgba(245,242,235,0.25)' }}
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar dirección..."
            className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(245,242,235,0.08)] rounded-lg pl-8 pr-8 py-2 text-[#f5f2eb] font-[family-name:var(--font-dm-sans)] text-[0.8rem] outline-none placeholder:text-[rgba(245,242,235,0.2)] focus:border-[rgba(5,237,150,0.5)] focus:bg-[rgba(5,237,150,0.03)] transition-all duration-200"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[rgba(245,242,235,0.3)] hover:text-[#05ed96] transition-colors text-[0.75rem] leading-none"
            >
              ✕
            </button>
          )}
        </div>

        {/* Volver — derecha */}
        <div className="ml-auto shrink-0">
          <Link
            href="/"
            className="hidden md:block font-[family-name:var(--font-dm-sans)] text-[0.75rem] tracking-[0.05em] uppercase text-[rgba(245,242,235,0.4)] no-underline hover:text-[#05ed96] transition-colors"
          >
            ← Volver
          </Link>
          <Link
            href="/"
            aria-label="Volver"
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(245,242,235,0.1)] text-[rgba(245,242,235,0.4)] hover:text-[#05ed96] hover:border-[#05ed96] transition-colors no-underline text-[1rem]"
          >
            ←
          </Link>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 relative flex">

        {/* Loading overlay */}
        {pointsLoading && (
          <div className="absolute inset-0 bg-[#080808] flex items-center justify-center z-[500]">
            <span className="font-[family-name:var(--font-dm-sans)] text-[rgba(245,242,235,0.3)] text-[0.85rem] tracking-[0.05em]">
              Cargando puntos...
            </span>
          </div>
        )}

        {/* Sidebar: left panel on desktop, bottom sheet on mobile */}
        <Sidebar
          points={filteredForSidebar}
          total={filteredForSidebar.length}
          selectedIdx={selectedIdx}
          onSelect={handleSelect}
          onLocate={handleLocate}
          filter={filter}
          onFilterChange={handleFilterChange}
          sheetOpen={sheetOpen}
          onSheetToggle={() => setSheetOpen((o) => !o)}
        />

        {/* Map: muestra exactamente el mismo conjunto que el sidebar */}
        <div className="absolute inset-0 md:relative md:flex-1">
          <MapView
            points={filteredForSidebar}
            selectedIdx={selectedIdx}
            onSelect={handleSelect}
            userLocation={userLocation}
          />
        </div>

        {/* Mobile: floating locate button above the sheet */}
        <button
          onClick={handleLocate}
          aria-label="Mi ubicación"
          className="md:hidden absolute right-4 z-[300] bg-[#080808] border border-[rgba(5,237,150,0.25)] rounded-full w-11 h-11 flex items-center justify-center text-[#05ed96] text-[1.1rem] transition-all active:scale-95 shadow-lg"
          style={{ bottom: sheetOpen ? 'calc(72dvh + 12px)' : '184px' }}
        >
          ◎
        </button>
      </div>

      {/* ── Notification ─────────────────────────────────── */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1c1c1c] border border-[rgba(5,237,150,0.2)] rounded-full px-6 py-3 font-[family-name:var(--font-dm-sans)] text-[0.82rem] text-[#f5f2eb] z-[600] shadow-xl whitespace-nowrap">
          {notification}
        </div>
      )}
    </div>
  )
}
