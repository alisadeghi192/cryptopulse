import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

interface ScrollToTopProps {
  containerRef?: React.RefObject<HTMLElement | null>
}

export function ScrollToTop({ containerRef }: ScrollToTopProps = {}) {
  const { pathname } = useLocation()
  const prevPath = useRef(pathname)

  useEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname

    const target = containerRef?.current
    // If the container has its own scroll, scroll it; otherwise scroll the window
    if (target && target.scrollHeight > target.clientHeight) {
      target.scrollTo({ top: 0 })
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [pathname, containerRef])

  return null
}