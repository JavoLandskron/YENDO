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
type Marker      = import('leaflet').Marker

export function MapView({ points, selectedIdx, onSelect, userLocation }: MapViewProps) {
  const mapRef       = useRef<HTMLDivElement>(null)
  const leafletMap   = useRef<import('leaflet').Map | null>(null)
  const markersRef   = useRef<CircleMarker[]>([])
  const pinMarkerRef = useRef<Marker | null>(null)           // divIcon para el seleccionado
  const userMarkerRef = useRef<import('leaflet').CircleMarker | null>(null)
  const [mapReady, setMapReady] = useState(false)

  // Init map
  useEffect(() => {
    const container = mapRef.current
    if (!container) return

    let cancelled = false

    import('leaflet').then((L) => {
      if (cancelled) return

      if ((container as any)._leaflet_id) {
        delete (container as any)._leaflet_id
      }

      const map = L.map(container, {
        center: [-33.45, -70.65],
        zoom: 11,
        zoomControl: false,
      })

      // Zoom controls top-right, leaving bottom clear for the sheet
      L.control.zoom({ position: 'topright' }).addTo(map)

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map)

      // Oculta los markers durante el zoom para evitar el artefacto de escala
      map.on('zoomstart', () => {
        markersRef.current.forEach((m) =>
          m.setStyle({ opacity: 0, fillOpacity: 0 })
        )
      })
      map.on('zoomend', () => {
        markersRef.current.forEach((m) =>
          m.setStyle({ opacity: 1, fillOpacity: 1 })
        )
      })

      leafletMap.current = map
      setMapReady(true)
    })

    return () => {
      cancelled = true
      leafletMap.current?.remove()
      leafletMap.current = null
      setMapReady(false)
    }
  }, [])

  // Render markers
  useEffect(() => {
    if (!mapReady || !leafletMap.current) return

    let cancelled = false

    import('leaflet').then((L) => {
      // El mapa pudo haber sido destruido mientras el import resolvía
      if (cancelled || !leafletMap.current) return

      markersRef.current.forEach((m) => m.remove())
      markersRef.current = []

      const newMarkers: CircleMarker[] = []

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

        const marker = L.circleMarker([point.lat, point.lng], {
          radius,
          fillColor: color,
          color: 'rgba(0,0,0,0.6)',
          weight: 1,
          fillOpacity: 1,
          opacity: 1,
        })

        const mats = point.m
          .map((m) => `<span style="font-size:0.65rem;padding:0.15rem 0.45rem;background:rgba(5,237,150,0.12);color:#05ed96;border-radius:3px;display:inline-block">${MAT_SHORT[m] || m}</span>`)
          .join(' ')
        const dStr = point._d != null
          ? `<div style="font-size:0.7rem;color:#05ed96;margin-bottom:0.4rem">${formatDistance(point._d)} de ti</div>`
          : ''
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`

        marker.bindPopup(
          `<div style="font-family:sans-serif">
            ${dStr}
            <div style="font-size:0.85rem;font-weight:500;color:#f5f2eb;margin-bottom:0.4rem;line-height:1.4">${point.n || point.a}</div>
            <div style="font-size:0.7rem;color:rgba(245,242,235,0.4);margin-bottom:0.4rem">${POINT_TYPE_LABELS[point.t]}</div>
            <div style="display:flex;flex-wrap:wrap;gap:0.3rem;margin-bottom:0.5rem">${mats}</div>
            ${point.h ? `<div style="font-size:0.72rem;color:rgba(245,242,235,0.4);margin-bottom:0.6rem;line-height:1.4">${point.h}</div>` : ''}
            <a href="${mapsUrl}" target="_blank" style="display:block;width:100%;text-align:center;background:#05ed96;color:#080808;border-radius:12px;padding:0.45rem 1rem;font-size:0.78rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none">→ Cómo llegar</a>
          </div>`,
          { closeButton: false, maxWidth: 260 }
        )

        marker.on('click', () => onSelect(idx))
        marker.addTo(leafletMap.current)
        newMarkers.push(marker)
      })

      markersRef.current = newMarkers
    })

    return () => { cancelled = true }
  }, [mapReady, points, onSelect])

  // Pin seleccionado: divIcon con pulso + flyTo + popup
  useEffect(() => {
    if (!mapReady || !leafletMap.current) return

    // Elimina el pin anterior
    pinMarkerRef.current?.remove()
    pinMarkerRef.current = null

    if (selectedIdx === null) return

    const point = points[selectedIdx]
    const circleMarker = markersRef.current[selectedIdx]
    if (!point || !circleMarker) return

    const map = leafletMap.current

    import('leaflet').then((L) => {
      if (!leafletMap.current) return

      // Pin verde animado (divIcon) encima del circleMarker
      const icon = L.divIcon({
        html: '<div class="yendo-pin"></div>',
        className: '',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      })

      pinMarkerRef.current = L.marker([point.lat, point.lng], { icon, zIndexOffset: 1000 })
        .addTo(map)

      // Abre el popup del circleMarker (ya tiene bindPopup)
      circleMarker.openPopup()
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
