import { useEffect, useRef, useState } from 'react'
import {
  HEADER_EXPAND_THRESHOLD,
  HEADER_SCROLL_THRESHOLD,
} from '@/lib/constants'

export function useScroll(
  threshold: number = HEADER_SCROLL_THRESHOLD
) {
  const [isScrolled, setIsScrolled] = useState(false)
  const isScrolledRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (!isScrolledRef.current && currentScrollY > threshold) {
        isScrolledRef.current = true
        setIsScrolled(true)
      } else if (
        isScrolledRef.current &&
        currentScrollY < HEADER_EXPAND_THRESHOLD
      ) {
        isScrolledRef.current = false
        setIsScrolled(false)
      }
    }

    // Check on mount
    if (window.scrollY > threshold) {
      isScrolledRef.current = true
      setIsScrolled(true)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isScrolled
}