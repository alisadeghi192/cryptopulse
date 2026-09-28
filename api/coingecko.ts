import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {

    const path = (req.query.path as string[]) || []
  const coingeckoPath = '/' + path.join('/')


  const { path: _, ...restQuery } = req.query
  const searchParams = new URLSearchParams()
  Object.entries(restQuery).forEach(([key, value]) => {
    if (Array.isArray(value)) value.forEach(v => searchParams.append(key, v))
    else if (value) searchParams.append(key, value)
  })

  const url = `https://api.coingecko.com/api/v3${coingeckoPath}?${searchParams}`

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || '',
      },
    })

    // Caching روی CDN ورسل
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120')
    res.setHeader('Content-Type', 'application/json')

    const data = await response.json()
    res.status(response.status).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from CoinGecko' })
  }
}