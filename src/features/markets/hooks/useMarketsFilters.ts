import { useSearchParams } from 'react-router'
import { useMemo } from 'react'

export type MarketsFilter = 'all' | 'top100' | 'top500' | 'top1000' | 'top5000'
export type MarketsSort = 'market_cap_desc' | 'market_cap_asc' | 'volume_desc'
export type MarketsView = 'table' | 'grid'

export function useMarketsFilters() {
  const [params, setParams] = useSearchParams()

  const filter = (params.get('filter') as MarketsFilter) ?? 'top100'
  const view = (params.get('view') as MarketsView) ?? 'table'
  const search = params.get('q') ?? ''

  const maxCoins = useMemo(() => {
    switch (filter) {
      case 'top100': return 100
      case 'top500': return 500
      case 'top1000': return 1000
      case 'top5000': return 5000
      default: return 5000
    }
  }, [filter])

  const setFilter = (next: MarketsFilter) => {
    const newParams = new URLSearchParams(params)
    newParams.set('filter', next)
    setParams(newParams, { replace: true })
  }


  const setView = (next: MarketsView) => {
    const newParams = new URLSearchParams(params)
    newParams.set('view', next)
    setParams(newParams, { replace: true })
  }

  const setSearch = (next: string) => {
    const newParams = new URLSearchParams(params)
    if (next) newParams.set('q', next)
    else newParams.delete('q')
    setParams(newParams, { replace: true })
  }

  return {
    filter, view, search,
    maxCoins,
    setFilter, setView, setSearch,
  }
}