import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

export function useNavigationProgress() {
  const location = useLocation()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!visible) return

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    setProgress(100)

    hideTimerRef.current = setTimeout(() => {
      setVisible(false)
      setProgress(0)
    }, 400)

    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [location.pathname, location.search]) 

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return

      const target = event.target as HTMLElement
      const link = target.closest('a')
      if (!link) return

      const href = link.getAttribute('href')
      if (!href || href.startsWith('#')) return

      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) {
        return
      }

      if (
        link.target === '_blank' ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const nextUrl = new URL(href, window.location.origin)
      const currentUrl = window.location.pathname + window.location.search
      const nextPath = nextUrl.pathname + nextUrl.search

      if (currentUrl === nextPath) return

      setVisible(true)
      setProgress(5)

      if (timerRef.current) clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setProgress((current) => {
          if (current >= 85) return 85
          return current + (85 - current) * 0.04
        })
      }, 100)
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return { visible, progress }
}