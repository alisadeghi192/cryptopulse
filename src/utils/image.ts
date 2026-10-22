const PROXY_HOSTS = [
  'https://assets.coingecko.com/',
  'https://coin-images.coingecko.com/',
]

export function coinImageUrl(url: string | undefined | null): string {
  if (!url) return ''
  const needsProxy = PROXY_HOSTS.some((prefix) => url.startsWith(prefix))
  if (!needsProxy) return url
  return `/api/image?url=${encodeURIComponent(url)}`
}