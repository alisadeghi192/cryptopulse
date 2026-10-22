import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const url = req.query.url
    if (typeof url !== 'string' || !url) {
      return res.status(400).json({ error: 'Missing url parameter' })
    }

    // Only allow CoinGecko image hosts
    const allowed = [
      'https://assets.coingecko.com/',
      'https://coin-images.coingecko.com/',
    ]
    if (!allowed.some((prefix) => url.startsWith(prefix))) {
      return res.status(400).json({ error: 'Invalid image host' })
    }

    const response = await fetch(url, {
      headers: { Accept: 'image/*' },
      signal: AbortSignal.timeout(8000),
    })

    if (!response.ok) {
      return res.status(response.status).end()
    }

    const contentType = response.headers.get('content-type') || 'image/png'
    const buffer = Buffer.from(await response.arrayBuffer())

    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800')
    return res.status(200).send(buffer)
  } catch (err) {
    console.error('Image proxy error:', err)
    return res.status(500).json({ error: 'Failed to fetch image' })
  }
}