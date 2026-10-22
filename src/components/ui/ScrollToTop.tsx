import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

interface ScrollToTopProps {
  /**
   * Optional scroll container. If provided, this element is scrolled to the
   * top on route change instead of `window`. Use this when the layout has its
   * own scrollable `<main>` (e.g. AppLayout).
   */
  containerRef?: React.RefObject<HTMLElement | null>
}

export function ScrollToTop({ containerRef }: ScrollToTopProps = {}) {
  const { pathname } = useLocation()
  const prevPath = useRef(pathname)

  useEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname

    const target = containerRef?.current
    if (target) {
      target.scrollTo({ top: 0 })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, containerRef])

  return null
}