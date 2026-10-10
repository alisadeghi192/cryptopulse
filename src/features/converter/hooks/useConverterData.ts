import { useCoins } from '@/hooks/useCoins'
import type { SelectOption } from '../components/CurrencySelect'


export function useConverterData() {
  const { data: coins, isLoading, isError } = useCoins({
    perPage: 250,
    sparkline: false,
  })

  const options: SelectOption[] = [
    ...(coins ?? []).map((coin) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      image: coin.image,
    })),
  ]

  const prices: Record<string, number> = {}
  coins?.forEach((coin) => {
    prices[coin.id] = coin.current_price
  })

  const convert = (
    amount: number,
    from: SelectOption | null,
    to: SelectOption | null,
  ): number => {
    if (!from || !to || amount <= 0) return 0

    const fromPrice = from.id === 'usd' ? 1 : prices[from.id] ?? 0

    const toPrice = to.id === 'usd' ? 1 : prices[to.id] ?? 0

    if (toPrice === 0) return 0

    return (amount * fromPrice) / toPrice
  }

  const rate = (from: SelectOption | null, to: SelectOption | null): number =>
    convert(1, from, to)

  return {
    options,
    convert,
    rate,
    isLoading,
    isError,
  }
}