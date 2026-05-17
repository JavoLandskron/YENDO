'use client'

import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type { Point } from '@/lib/types'
import { haversineDistance } from '@/lib/map-utils'
import { Sidebar } from './Sidebar'
import { Onboarding } from './Onboarding'

const SEARCH_DEBOUNCE_MS = 300
const ONBOARDING_STORAGE_KEY = 'yendo:onboarding:v1'

interface PointsResponse {
  points: Point[]
}

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

function useDebouncedValue<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}

function useMobileDocumentScrollLock() {
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const root = document.documentElement
    const body = document.body
    const previous = {
      rootOverflow: root.style.overflow,
      rootHeight: root.style.height,
      rootOverscrollBehavior: root.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyHeight: body.style.height,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyOverscrollBehavior: body.style.overscrollBehavior,
    }
    let locked = false
    let scrollY = 0

    const lock = () => {
      if (locked) return
      locked = true
      scrollY = window.scrollY

      root.style.overflow = 'hidden'
      root.style.height = '100%'
      root.style.overscrollBehavior = 'none'
      body.style.overflow = 'hidden'
      body.style.height = '100%'
      body.style.position = 'fixed'
      body.style.top = `-${scrollY}px`
      body.style.left = '0'
      body.style.right = '0'
      body.style.width = '100%'
      body.style.overscrollBehavior = 'none'
    }

    const unlock = () => {
      if (!locked) return
      locked = false

      root.style.overflow = previous.rootOverflow
      root.style.height = previous.rootHeight
      root.style.overscrollBehavior = previous.rootOverscrollBehavior
      body.style.overflow = previous.bodyOverflow
      body.style.height = previous.bodyHeight
      body.style.position = previous.bodyPosition
      body.style.top = previous.bodyTop
      body.style.left = previous.bodyLeft
      body.style.right = previous.bodyRight
      body.style.width = previous.bodyWidth
      body.style.overscrollBehavior = previous.bodyOverscrollBehavior
      window.scrollTo(0, scrollY)
    }

    const syncLock = () => {
      if (query.matches) {
        lock()
        return
      }

      unlock()
    }

    syncLock()
    query.addEventListener('change', syncLock)

    return () => {
      query.removeEventListener('change', syncLock)
      unlock()
    }
  }, [])
}

export function MapApp() {
  const [allPoints, setAllPoints] = useState<Point[]>([])
  const [pointsLoading, setPointsLoading] = useState(true)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [notification, setNotification] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  // null = aún no chequeado en localStorage; true/false = decisión tomada
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null)
  // Snapshot del valor inicial — usado para decidir auto-geolocate solo en
  // returning users, sin re-disparar cuando completan onboarding manualmente.
  const initialOnboardingSeen = useRef<boolean | null>(null)
  const notificationTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const debouncedSearch = useDebouncedValue(search.trim(), SEARCH_DEBOUNCE_MS)

  useMobileDocumentScrollLock()

  const showNotif = useCallback((msg: string) => {
    if (notificationTimer.current) {
      clearTimeout(notificationTimer.current)
    }

    setNotification(msg)
    notificationTimer.current = setTimeout(() => setNotification(null), 3500)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const params = new URLSearchParams()

    if (filter !== 'all') {
      params.set('type', filter)
    }

    if (debouncedSearch) {
      params.set('q', debouncedSearch)
    }

    const query = params.toString()
    const url = query ? `/api/points?${query}` : '/api/points'

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar los puntos')
        return res.json() as Promise<PointsResponse>
      })
      .then((data) => setAllPoints(data.points))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        showNotif('No se pudieron cargar los puntos. Intenta recargar la página.')
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setPointsLoading(false)
        }
      })

    return () => controller.abort()
  }, [filter, debouncedSearch, showNotif])

  useEffect(() => {
    return () => {
      if (notificationTimer.current) {
        clearTimeout(notificationTimer.current)
      }
    }
  }, [])

  // Decide on mount si mostrar onboarding (first-time) o saltarlo (returning).
  useEffect(() => {
    let seen = false
    try {
      seen = localStorage.getItem(ONBOARDING_STORAGE_KEY) === '1'
    } catch {
      // Storage no disponible (private mode, etc.) → tratar como first-time.
    }
    initialOnboardingSeen.current = seen
    setShowOnboarding(!seen)
  }, [])

  // Auto-geolocate SOLO para returning users (que se saltean el onboarding).
  // Los first-time users disparan geolocalización desde el botón del onboarding.
  useEffect(() => {
    if (initialOnboardingSeen.current !== true) return
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setSelectedIdx(null)
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        showNotif('Mostrando los puntos más cercanos a tu ubicación.')
      },
      () => { /* permiso denegado — el botón sigue disponible */ }
    )
  }, [showOnboarding, showNotif])

  const handleOnboardingComplete = useCallback((askLocation: boolean) => {
    try {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, '1')
    } catch {
      // Si falla, igual cerramos el onboarding en sesión.
    }
    setShowOnboarding(false)

    if (askLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setSelectedIdx(null)
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
          showNotif('Mostrando los puntos más cercanos a tu ubicación.')
        },
        () => showNotif('No pudimos obtener tu ubicación. Podés intentarlo después.')
      )
    }
  }, [showNotif])

  const points = useMemo(() => {
    if (!userLocation) return allPoints
    return [...allPoints]
      .map((p) => ({
        ...p,
        _d: haversineDistance(userLocation.lat, userLocation.lng, p.lat, p.lng),
      }))
      .sort((a, b) => (a._d ?? Infinity) - (b._d ?? Infinity))
  }, [userLocation, allPoints])

  function handleFilterChange(newFilter: string) {
    setFilter(newFilter)
    setSelectedIdx(null)
    setPointsLoading(true)
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
        setSelectedIdx(null)
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        showNotif('Ubicación encontrada. Mostrando los más cercanos.')
      },
      () => showNotif('No se pudo obtener tu ubicación.')
    )
  }

  return (
    <div className="fixed inset-0 h-[100dvh] w-full flex flex-col overflow-hidden overscroll-none md:relative">

      {/* ── Onboarding overlay (first-time only) ─────────── */}
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}

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
            onChange={(e) => {
              setSearch(e.target.value)
              setSelectedIdx(null)
              setPointsLoading(true)
            }}
            placeholder="Buscar dirección..."
            className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(245,242,235,0.08)] rounded-lg pl-8 pr-8 py-2 text-[#f5f2eb] font-[family-name:var(--font-dm-sans)] text-[0.8rem] outline-none placeholder:text-[rgba(245,242,235,0.2)] focus:border-[rgba(5,237,150,0.5)] focus:bg-[rgba(5,237,150,0.03)] transition-all duration-200"
          />
          {search && (
            <button
              onClick={() => {
                setSearch('')
                setSelectedIdx(null)
                setPointsLoading(true)
              }}
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
          key={`${filter}:${debouncedSearch}`}
          points={points}
          total={points.length}
          selectedIdx={selectedIdx}
          onSelect={handleSelect}
          onLocate={handleLocate}
          filter={filter}
          onFilterChange={handleFilterChange}
          sheetOpen={sheetOpen}
          onSheetToggle={() => setSheetOpen((o) => !o)}
        />

        {/* Map + botón de geolocalización dentro del mismo contenedor.
            `isolate` crea un stacking context que encapsula los z-index internos
            de Leaflet (tiles 200, markers 600, popups 700) y evita que tapen el
            Sidebar (z-[200]) en móvil. */}
        <div className="absolute inset-0 isolate md:relative md:flex-1">
          <MapView
            points={points}
            selectedIdx={selectedIdx}
            onSelect={handleSelect}
            userLocation={userLocation}
          />

          {/* Botón flotante dentro del mapa — siempre encima de Leaflet.
              En móvil se ubica sobre el bottom sheet (colapsado o abierto). */}
          <button
            onClick={handleLocate}
            aria-label="Mi ubicación"
            title="Mi ubicación"
            style={{
              bottom: sheetOpen ? 'calc(72dvh + 1rem)' : 'calc(116px + 1rem)',
            }}
            className="absolute right-4 z-[1001] bg-[#080808] border border-[rgba(5,237,150,0.3)] rounded-2xl flex items-center gap-2 px-3 h-11 md:h-10 text-[#05ed96] transition-[bottom,transform,background-color,border-color] duration-300 active:scale-95 hover:border-[#05ed96] hover:bg-[rgba(5,237,150,0.06)] shadow-[0_8px_24px_rgba(0,0,0,0.5)] md:bottom-14!"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
              <circle cx="12" cy="12" r="9" strokeOpacity="0.3"/>
            </svg>
            <span className="font-[family-name:var(--font-dm-sans)] text-[0.72rem] font-medium tracking-[0.06em] uppercase hidden md:block">
              Mi ubicación
            </span>
          </button>
        </div>
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
