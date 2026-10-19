import { useMemo } from 'react'
import { useCoins } from '@/hooks/useCoins'
import { useWalletStore } from '@/stores/useWalletStore'
import type { Coin } from '@/types/coin'

export interface HoldingWithPrice {
  id: string
  user_id: string
  coin_id: string
  coin_symbol: string
  amount: number
  avg_buy_price: number
  created_at: string
  // Enriched fields
  image: string
  current_price: number
  current_value: number
  cost_basis: number
  pnl: number
  pnl_percent: number
  change24h?: number
}

export function useHoldingsWithPrice() {
  const holdings = useWalletStore((s) => s.holdings)

  const coinIds = holdings.map((h) => h.coin_id)
  const idsParam = coinIds.length > 0 ? coinIds.join(',') : undefined

  const { data: coins } = useCoins({
    ids: idsParam,
    perPage: 250,
  })

  const holdingsWithPrice = useMemo<HoldingWithPrice[]>(() => {
    return holdings.map((h) => {
      const coin = coins?.find((c: Coin) => c.id === h.coin_id)
      const currentPrice = coin?.current_price ?? 0
      const currentValue = h.amount * currentPrice
      const costBasis = h.amount * h.avg_buy_price
      const pnl = currentValue - costBasis
      const pnlPercent = costBasis > 0 ? (pnl / costBasis) * 100 : 0
      

      return {
        ...h,
        image: coin?.image ?? '',
        current_price: currentPrice,
        current_value: currentValue,
        cost_basis: costBasis,
        pnl,
        pnl_percent: pnlPercent,
        change24h: coin?.price_change_percentage_24h
      }
    })
  }, [holdings, coins])

  const totals = useMemo(() => {
    const holdingsValue = holdingsWithPrice.reduce(
      (sum, h) => sum + h.current_value,
      0,
    )
    const totalPnl = holdingsWithPrice.reduce((sum, h) => sum + h.pnl, 0)
    return { holdingsValue, totalPnl }
  }, [holdingsWithPrice])

  return {
    holdingsWithPrice,
    ...totals,
  }
}
