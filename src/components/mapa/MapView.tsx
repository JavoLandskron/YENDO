'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useRef, useState } from 'react'
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
type LatLngBounds = import('leaflet').LatLngBounds
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
  const [renderBounds, setRenderBounds] = useState<LatLngBounds | null>(null)
  const [mapReady, setMapReady] = useState(false)

  // No depender de selectedIdx: el pin marker (creado en el effect de selección)
  // lleva el popup y siempre se renderiza, esté o no su circleMarker en bounds.
  // Incluirlo acá causaba re-render completo de markers en cada selección,
  // lo que cerraba el popup recién abierto.
  const renderedPoints = useMemo(() => {
    const indexedPoints = points.map((point, idx) => ({ point, idx }))
    return renderBounds
      ? indexedPoints.filter(({ point }) => renderBounds.contains([point.lat, point.lng]))
      : indexedPoints
  }, [points, renderBounds])

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
        preferCanvas: true,
      })
      markerRendererRef.current = L.canvas({ padding: 0.5 })

      const updateRenderBounds = () => {
        setRenderBounds(map.getBounds().pad(0.35))
      }

      // Zoom controls top-right, leaving bottom clear for the sheet
      L.control.zoom({ position: 'topright' }).addTo(map)

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map)

      map.on('moveend zoomend resize', updateRenderBounds)

      leafletMap.current = map
      updateRenderBounds()
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

  // Render markers — diff incremental: solo agrega los que entran y quita
  // los que salen de bounds. Los que ya están se mantienen intactos para
  // evitar el parpadeo/refresco al hacer pan o zoom.
  useEffect(() => {
    if (!mapReady || !leafletMap.current) return

    let cancelled = false

    import('leaflet').then((L) => {
      if (cancelled || !leafletMap.current) return

      const existing = markersRef.current
      const nextIdxs = new Set<number>(renderedPoints.map(({ idx }) => idx))

      // Quitar markers que ya no están en bounds
      existing.forEach((marker, idx) => {
        if (!nextIdxs.has(idx)) {
          marker.remove()
          existing.delete(idx)
        }
      })

      // Agregar solo los nuevos
      renderedPoints.forEach(({ point, idx }) => {
        if (!leafletMap.current) return
        if (existing.has(idx)) return

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

        const marker = L.circleMarker([point.lat, point.lng], markerOptions)
        marker.on('click', () => onSelectRef.current(idx))
        marker.addTo(leafletMap.current)
        existing.set(idx, marker)
      })
    })

    return () => { cancelled = true }
  }, [mapReady, renderedPoints])

  // Pin seleccionado: divIcon con pulso + popup + flyTo.
  // El popup se liga al pin marker (no al circleMarker) para que sobreviva
  // a los re-renders de markers que ocurren al cambiar bounds del mapa.
  useEffect(() => {
    if (!mapReady || !leafletMap.current) return

    // Elimina el pin anterior (esto cierra su popup también)
    pinMarkerRef.current?.remove()
    pinMarkerRef.current = null

    if (selectedIdx === null) return

    const point = points[selectedIdx]
    if (!point) return

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
      map.flyTo([point.lat, point.lng], 17, { duration: 1 })
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
        radius: 7,
        fillColor: '#fff',
        color: '#05ed96',
        weight: 3,
        fillOpacity: 1,
        opacity: 1,
      })
        .addTo(leafletMap.current)
        .bindPopup('<div style="color:#f5f2eb;font-size:0.82rem;font-family:sans-serif">Tu ubicación</div>')

      leafletMap.current.flyTo([userLocation.lat, userLocation.lng], 14, { duration: 1 })
    })

    return () => { cancelled = true }
  }, [userLocation, mapReady])

  return <div ref={mapRef} className="w-full h-full" style={{ background: '#080808' }} />
}
