import { NextRequest } from 'next/server'
import { queryPoints, totalPoints } from '@/lib/server/points'

// Data is static JSON — allow the CDN / browser to cache aggressively.
// stale-while-revalidate keeps responses fast even after max-age expires.
const CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
  'Content-Type': 'application/json',
} as const

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const points = queryPoints({
    type: searchParams.get('type'),
    q: searchParams.get('q'),
  })

  return Response.json(
    { points, total: points.length, all: totalPoints() },
    { headers: CACHE_HEADERS }
  )
}
