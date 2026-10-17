import { useMemo } from 'react'
import { useCoins } from '@/hooks/useCoins'
import { useWalletStore } from '@/stores/useWalletStore'
import type { Coin } from '@/types/coin'
import type { HoldingWithPrice } from '@/types/wallet'

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
        current_price: currentPrice,
        current_value: currentValue,
        cost_basis: costBasis,
        pnl,
        pnl_percent: pnlPercent,
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