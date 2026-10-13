import { useEffect } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useWatchlistStore } from '@/stores/useWatchlistStore'
import { fetchWatchlist } from '@/lib/api/watchlist'

export function useWatchlist() {
  const user = useAuthStore((s) => s.user)
  const isLoaded = useWatchlistStore((s) => s.isLoaded)
  const setCoinIds = useWatchlistStore((s) => s.setCoinIds)
  const reset = useWatchlistStore((s) => s.reset)

  useEffect(() => {
    if (!user) {
      reset()
      return
    }

    if (isLoaded) return

    let cancelled = false

    fetchWatchlist(user.id)
      .then((ids) => {
        if (!cancelled) setCoinIds(ids)
      })
      .catch((err) => {
        console.error('Failed to load watchlist:', err)
      })

    return () => {
      cancelled = true
    }
  }, [user, isLoaded, setCoinIds, reset])
}