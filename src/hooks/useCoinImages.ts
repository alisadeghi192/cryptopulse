import { useMemo } from 'react'
import { useCoins } from '@/hooks/useCoins'
import { coinImageUrl } from '@/utils/image'
import type { Transaction } from '@/types/wallet'

/**
 * Builds a map of coin_id → image URL from a list of transactions.
 * Uses a single /coins/markets request (deduped and cached by TanStack Query
 * across all components that consume the same ids).
 */
export function useCoinImages(transactions: Transaction[]) {
  const ids = useMemo(() => {
    const set = new Set<string>()
    transactions.forEach((t) => {
      if (t.coin_id) set.add(t.coin_id)
    })
    return Array.from(set).sort().join(',')
  }, [transactions])

  const { data: coins } = useCoins({ ids, perPage: 250 }, !!ids)

  return useMemo(() => {
    const map: Record<string, string> = {}
    coins?.forEach((c) => {
      map[c.id] = coinImageUrl(c.image)
    })
    return map
  }, [coins])
}