import { useCallback } from 'react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/useAuthStore'
import { useWatchlistStore } from '@/stores/useWatchlistStore'
import {
  addToWatchlist,
  removeFromWatchlist,
} from '@/lib/api/watchlist'

export function useWatchlistToggle() {
  const user = useAuthStore((s) => s.user)
  const coinIds = useWatchlistStore((s) => s.coinIds)
  const addCoin = useWatchlistStore((s) => s.addCoin)
  const removeCoin = useWatchlistStore((s) => s.removeCoin)

  const toggle = useCallback(
    async (coinId: string) => {
      if (!user) {
        toast.error('Sign in required', {
          description: 'Please sign in to use your watchlist',
        })
        return
      }

      const isIn = coinIds.includes(coinId)

      if (isIn) removeCoin(coinId)
      else addCoin(coinId)

      try {
        if (isIn) {
          await removeFromWatchlist(user.id, coinId)
          toast.success('Removed from watchlist')
        } else {
          await addToWatchlist(user.id, coinId)
          toast.success('Added to watchlist')
        }
      } catch (err) {
        if (isIn) addCoin(coinId)
        else removeCoin(coinId)

        toast.error('Something went wrong', {
          description: 'Please try again',
        })
        console.error(err)
      }
    },
    [user, coinIds, addCoin, removeCoin],
  )

  return { toggle, coinIds }
}