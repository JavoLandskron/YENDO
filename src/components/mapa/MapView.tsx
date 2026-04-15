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

export function MapView({ points, selectedIdx, onSelect, userLocation }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMap = useRef<import('leaflet').Map | null>(null)
  const markersRef = useRef<CircleMarker[]>([])
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
        zoomControl: true,
        preferCanvas: true, // render everything on canvas — much faster
      })

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
      setMapReady(false)
    }
  }, [])

  // Render all markers using circleMarker (canvas, no DOM nodes per marker)
  useEffect(() => {
    if (!mapReady || !leafletMap.current) return

    import('leaflet').then((L) => {
      // Remove previous markers
      markersRef.current.forEach((m) => m.remove())
      markersRef.current = []

      const newMarkers: CircleMarker[] = []

      points.forEach((point, idx) => {
        const hasMetals = point.m.includes('Metales')
        const isPuntoLimpio = point.t === 'PUNTO_LIMPIO'

        const color = (hasMetals || isPuntoLimpio)
          ? '#05ed96'
          : point.t === 'PUNTO_VERDE'
          ? '#5ba8e8'
          : '#888'

        const radius = (hasMetals || isPuntoLimpio) ? 5 : 3.5

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
        marker.addTo(leafletMap.current!)
        newMarkers.push(marker)
      })

      markersRef.current = newMarkers
    })
  }, [mapReady, points, onSelect])

  // Pan to selected
  useEffect(() => {
    if (!mapReady || !leafletMap.current || selectedIdx === null) return
    const point = points[selectedIdx]
    if (!point) return
    leafletMap.current.flyTo([point.lat, point.lng], 15, { duration: 0.8 })
    markersRef.current[selectedIdx]?.openPopup()
  }, [selectedIdx, points, mapReady])

  // User location marker
  useEffect(() => {
    if (!mapReady || !leafletMap.current || !userLocation) return

    import('leaflet').then((L) => {
      userMarkerRef.current?.remove()

      userMarkerRef.current = L.circleMarker([userLocation.lat, userLocation.lng], {
        radius: 7,
        fillColor: '#fff',
        color: '#05ed96',
        weight: 3,
        fillOpacity: 1,
        opacity: 1,
      })
        .addTo(leafletMap.current!)
        .bindPopup('<div style="color:#f5f2eb;font-size:0.82rem;font-family:sans-serif">Tu ubicación</div>')

      leafletMap.current!.flyTo([userLocation.lat, userLocation.lng], 14, { duration: 1 })
    })
  }, [userLocation, mapReady])

  return (
    <div ref={mapRef} className="flex-1 min-h-0" style={{ background: '#080808' }} />
  )
}
