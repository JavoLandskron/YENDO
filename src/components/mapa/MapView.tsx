'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react'
import type { Point } from '@/lib/types'
import { formatDistance, MAT_SHORT, POINT_TYPE_LABELS } from '@/lib/map-utils'

interface MapViewProps {
  points: Point[]
  selectedIdx: number | null
  onSelect: (idx: number) => void
  userLocation: { lat: number; lng: number } | null
}

type CircleMarker = import('leaflet').CircleMarker
type CircleMarkerOptions = import('leaflet').CircleMarkerOptions
type Marker      = import('leaflet').Marker
type Renderer = import('leaflet').Renderer
type LeafletContainer = HTMLDivElement & { _leaflet_id?: number }

function buildPopupHtml(point: Point): string {
  const mats = point.m
    .map((m) => `<span style="font-size:0.65rem;padding:0.15rem 0.45rem;background:rgba(5,237,150,0.12);color:#05ed96;border-radius:3px;display:inline-block">${MAT_SHORT[m] || m}</span>`)
    .join(' ')
  const dStr = point._d != null
    ? `<div style="font-size:0.7rem;color:#05ed96;margin-bottom:0.4rem">${formatDistance(point._d)} de ti</div>`
    : ''
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`
  return `<div style="font-family:sans-serif">
    ${dStr}
    <div style="font-size:0.85rem;font-weight:500;color:#f5f2eb;margin-bottom:0.4rem;line-height:1.4">${point.n || point.a}</div>
    <div style="font-size:0.7rem;color:rgba(245,242,235,0.4);margin-bottom:0.4rem">${POINT_TYPE_LABELS[point.t]}</div>
    <div style="display:flex;flex-wrap:wrap;gap:0.3rem;margin-bottom:0.5rem">${mats}</div>
    ${point.h ? `<div style="font-size:0.72rem;color:rgba(245,242,235,0.4);margin-bottom:0.6rem;line-height:1.4">${point.h}</div>` : ''}
    <a href="${mapsUrl}" target="_blank" style="display:block;width:100%;text-align:center;background:#05ed96;color:#080808;border-radius:12px;padding:0.45rem 1rem;font-size:0.78rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none">→ Cómo llegar</a>
  </div>`
}

export function MapView({ points, selectedIdx, onSelect, userLocation }: MapViewProps) {
  const mapRef       = useRef<HTMLDivElement>(null)
  const leafletMap   = useRef<import('leaflet').Map | null>(null)
  const markersRef   = useRef<Map<number, CircleMarker>>(new Map())
  const pinMarkerRef = useRef<Marker | null>(null)           // divIcon para el seleccionado
  const userMarkerRef = useRef<import('leaflet').CircleMarker | null>(null)
  const markerRendererRef = useRef<Renderer | null>(null)
  const [mapReady, setMapReady] = useState(false)

  // Init map
  useEffect(() => {
    const container = mapRef.current
    if (!container) return

    let cancelled = false

    import('leaflet').then((L) => {
      if (cancelled) return

      const leafletContainer = container as LeafletContainer
      if (leafletContainer._leaflet_id) {
        delete leafletContainer._leaflet_id
      }

      const map = L.map(container, {
        center: [-33.45, -70.65],
        zoom: 11,
        zoomControl: false,
      })
      // SVG renderer con padding grande: el <svg> se dibuja cubriendo bien
      // más allá del viewport, así Leaflet puede animar pan/zoom sin tener
      // que recrear/reagregar markers cuando uno entra o sale del viewport.
      markerRendererRef.current = L.svg({ padding: 2 })

      // Zoom controls top-right, leaving bottom clear for the sheet
      L.control.zoom({ position: 'topright' }).addTo(map)

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map)

      leafletMap.current = map
      setMapReady(true)
    })

    return () => {
      cancelled = true
      leafletMap.current?.remove()
      leafletMap.current = null
      markerRendererRef.current = null
      setMapReady(false)
    }
  }, [])

  // Mantenemos onSelect en un ref para que el efecto de markers no se vuelva
  // a ejecutar cuando el padre re-renderiza y pasa una nueva referencia.
  const onSelectRef = useRef(onSelect)
  useEffect(() => { onSelectRef.current = onSelect }, [onSelect])

  // selectedIdx en un ref para consultarlo dentro del effect de markers sin
  // agregarlo como dependencia (que recrearía todos los markers en cada select).
  const selectedIdxRef = useRef(selectedIdx)
  useEffect(() => { selectedIdxRef.current = selectedIdx }, [selectedIdx])

  // Render markers — se ejecuta solo cuando cambia la data (filtro/búsqueda/
  // userLocation re-sort), NO cuando el usuario hace pan o zoom. Todos los
  // puntos se montan una sola vez; SVG los mueve fluido con el mapa.
  useEffect(() => {
    if (!mapReady || !leafletMap.current) return

    let cancelled = false

    import('leaflet').then((L) => {
      if (cancelled || !leafletMap.current) return

      // Limpiamos todo y montamos de nuevo: como el array `points` puede
      // venir reordenado (sort por distancia al userLocation), los `idx`
      // pueden no corresponderse entre renders → la única opción correcta
      // es recrear.
      markersRef.current.forEach((m) => m.remove())
      markersRef.current = new Map()

      points.forEach((point, idx) => {
        if (!leafletMap.current) return

        const hasMetals = point.m.includes('Metales')
        const isPuntoLimpio = point.t === 'PUNTO_LIMPIO'

        const color = hasMetals || isPuntoLimpio
          ? '#05ed96'
          : point.t === 'PUNTO_VERDE'
          ? '#5ba8e8'
          : '#888'

        const radius = hasMetals || isPuntoLimpio ? 5 : 3.5

        const markerOptions: CircleMarkerOptions = {
          radius,
          fillColor: color,
          color: 'rgba(0,0,0,0.6)',
          weight: 1,
          fillOpacity: 1,
          opacity: 1,
        }

        if (markerRendererRef.current) {
          markerOptions.renderer = markerRendererRef.current
        }

        if (idx === selectedIdxRef.current) {
          markerOptions.opacity = 0
          markerOptions.fillOpacity = 0
        }

        const marker = L.circleMarker([point.lat, point.lng], markerOptions)
        marker.on('click', () => onSelectRef.current(idx))
        marker.addTo(leafletMap.current)
        markersRef.current.set(idx, marker)
      })
    })

    return () => { cancelled = true }
  }, [mapReady, points])

  // Pin seleccionado: divIcon con pulso + popup + flyTo.
  // El popup se liga al pin marker (no al circleMarker) para que sobreviva
  // a los re-renders de markers que ocurren al cambiar bounds del mapa.
  useEffect(() => {
    if (!mapReady || !leafletMap.current) return

    // Elimina el pin anterior (esto cierra su popup también)
    pinMarkerRef.current?.remove()
    pinMarkerRef.current = null

    // Restaura visibilidad de todos los circleMarkers (el seleccionado anterior
    // pudo haber quedado oculto). Esto evita un "fantasma" del circleMarker
    // detrás/al lado del pin durante el flyTo.
    markersRef.current.forEach((m) =>
      m.setStyle({ opacity: 1, fillOpacity: 1 })
    )

    if (selectedIdx === null) return

    const point = points[selectedIdx]
    if (!point) return

    // Oculta el circleMarker del punto seleccionado mientras el pin esté visible
    const selectedCircle = markersRef.current.get(selectedIdx)
    selectedCircle?.setStyle({ opacity: 0, fillOpacity: 0 })

    const map = leafletMap.current

    import('leaflet').then((L) => {
      if (!leafletMap.current) return

      const icon = L.divIcon({
        html: '<div class="yendo-pin"></div>',
        className: '',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      })

      const pin = L.marker([point.lat, point.lng], { icon, zIndexOffset: 1000 })
        .bindPopup(buildPopupHtml(point), { closeButton: false, maxWidth: 260 })
        .addTo(map)

      pinMarkerRef.current = pin
      pin.openPopup()

      // Animación fluida hacia el punto. Durante un flyTo con cambio grande
      // de zoom, Leaflet escala el <svg> de los markers con transform → se
      // ven gigantes hasta que termina. Ocultamos solo esa capa durante la
      // animación; el pin (DOM) sigue visible guiando el ojo. Al terminar,
      // los circleMarkers reaparecen ya dibujados al zoom final correcto.
      const rendererEl =
        (markerRendererRef.current as unknown as { _container?: HTMLElement } | null)?._container
      if (rendererEl) rendererEl.style.visibility = 'hidden'

      const handleFlyEnd = () => {
        map.off('moveend', handleFlyEnd)
        if (rendererEl) rendererEl.style.visibility = ''
      }
      map.on('moveend', handleFlyEnd)
      map.flyTo([point.lat, point.lng], 17, { duration: 0.8, easeLinearity: 0.25 })
    })
  }, [selectedIdx, points, mapReady])

  // User location marker
  useEffect(() => {
    if (!mapReady || !leafletMap.current || !userLocation) return

    let cancelled = false

    import('leaflet').then((L) => {
      if (cancelled || !leafletMap.current) return

      userMarkerRef.current?.remove()

      userMarkerRef.current = L.circleMarker([userLocation.lat, userLocation.lng], {
        radius: 8,
        fillColor: '#2f8bff',
        color: '#fff',
        weight: 3,
        fillOpacity: 1,
        opacity: 1,
      })
        .addTo(leafletMap.current)
        .bindPopup('<div style="color:#f5f2eb;font-size:0.82rem;font-family:sans-serif">Tu ubicación</div>')

      const map = leafletMap.current
      const rendererEl =
        (markerRendererRef.current as unknown as { _container?: HTMLElement } | null)?._container
      if (rendererEl) rendererEl.style.visibility = 'hidden'

      const handleFlyEnd = () => {
        map.off('moveend', handleFlyEnd)
        if (rendererEl) rendererEl.style.visibility = ''
      }
      map.on('moveend', handleFlyEnd)
      map.flyTo([userLocation.lat, userLocation.lng], 14, { duration: 0.8, easeLinearity: 0.25 })
    })

    return () => { cancelled = true }
  }, [userLocation, mapReady])

  return <div ref={mapRef} className="w-full h-full" style={{ background: '#080808' }} />
}
