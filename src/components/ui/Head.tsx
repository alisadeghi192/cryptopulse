import { useEffect } from 'react'

const SITE_NAME = 'CryptoPulse'
const SITE_URL = 'https://cryptopulse-self.vercel.app'
const DEFAULT_IMAGE = '/og-image.png'
const DEFAULT_DESCRIPTION =
  'Track 5,000+ cryptocurrencies with live prices, charts, and a free $1,000 simulated wallet.'

interface HeadProps {
  title?: string
  fullTitle?: string
  description?: string
  image?: string
  url?: string
  noIndex?: boolean
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  )
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function Head({
  title = SITE_NAME,
  fullTitle: customFullTitle,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url = '/',
  noIndex = false,
}: HeadProps) {
  const fullTitle =
    customFullTitle ?? (title === SITE_NAME ? title : `${title} | ${SITE_NAME}`)
  const finalImage = image.startsWith('http') ? image : `${SITE_URL}${image}`
  const finalUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`

  useEffect(() => {
    document.title = fullTitle

    upsertMeta('name', 'description', description)

    if (noIndex) {
      upsertMeta('name', 'robots', 'noindex, nofollow')
    } else {
      const robotsEl = document.head.querySelector<HTMLMetaElement>(
        'meta[name="robots"]',
      )
      if (robotsEl) robotsEl.remove()
    }

    upsertCanonical(finalUrl)

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:image', finalImage)
    upsertMeta('property', 'og:url', finalUrl)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', finalImage)
  }, [fullTitle, description, finalImage, finalUrl, noIndex])

  return null
}