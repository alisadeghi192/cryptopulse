import type { VercelRequest, VercelResponse } from '@vercel/node'

function getCacheSeconds(path: string): number {
  if (path.startsWith('/search/trending')) return 600
  if (path.startsWith('/global')) return 300
  if (path.includes('/market_chart')) return 300
  if (path.startsWith('/coins/markets')) return 120
  if (path.startsWith('/coins/')) return 300
  return 300
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // ✅ Safely normalize path (can be string or string[])
    let pathStr = ''
    if (Array.isArray(req.query.path)) {
      pathStr = req.query.path.join('/')
    } else if (typeof req.query.path === 'string') {
      pathStr = req.query.path
    }

    if (!pathStr) {
      return res.status(400).json({ error: 'Missing path parameter' })
    }

    const coingeckoPath = '/' + pathStr

    // Build query string
    const { path: _, ...restQuery } = req.query
    const searchParams = new URLSearchParams()
    Object.entries(restQuery).forEach(([key, value]) => {
      if (Array.isArray(value)) value.forEach((v) => searchParams.append(key, v))
      else if (value) searchParams.append(key, value)
    })

    const cgUrl = `https://api.coingecko.com/api/v3${coingeckoPath}?${searchParams}`

    const response = await fetch(cgUrl, {
      headers: {
        Accept: 'application/json',
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || '',
      },
      signal: AbortSignal.timeout(8000),
    })

    const data = await response.json()

    if (!response.ok) {
      res.setHeader('Cache-Control', 'no-store')
      return res.status(response.status).json(data)
    }

    const cacheSeconds = getCacheSeconds(coingeckoPath)

    res.setHeader(
      'Cache-Control',
      `public, s-maxage=${cacheSeconds}, stale-while-revalidate=${cacheSeconds * 2}`,
    )
    res.setHeader('Content-Type', 'application/json')

    return res.status(200).json(data)
  } catch (error) {
    console.error('CoinGecko API Error:', error)
    res.setHeader('Cache-Control', 'no-store')
    return res.status(500).json({ error: 'Failed to fetch from CoinGecko' })
  }
}