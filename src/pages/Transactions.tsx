import { useMemo, useState } from 'react'
import { PageLoader } from '@/components/ui/PageLoader'
import { useWalletStore } from '@/stores/useWalletStore'
import { useCoinImages } from '@/hooks/useCoinImages'
import { useDebounce } from '@/hooks/useDebounce'
import {
  TransactionsHeader,
  TransactionsList,
  type TransactionFilter,
} from '@/features/transactions/components'

export function Transactions() {
  const transactions = useWalletStore((s) => s.transactions)
  const isLoaded = useWalletStore((s) => s.isLoaded)

  const [filter, setFilter] = useState<TransactionFilter>('all')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const coinImages = useCoinImages(transactions)

  const filteredTransactions = useMemo(() => {
    let result = transactions

    if (filter !== 'all') {
      result = result.filter((t) => t.type === filter)
    }

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase()
      result = result.filter(
        (t) =>
          t.txn_id.toLowerCase().includes(q) ||
          t.coin_symbol?.toLowerCase().includes(q),
      )
    }

    return result
  }, [transactions, filter, debouncedSearch])

  const counts = useMemo<Record<TransactionFilter, number>>(
    () => ({
      all: transactions.length,
      deposit: transactions.filter((t) => t.type === 'deposit').length,
      withdraw: transactions.filter((t) => t.type === 'withdraw').length,
      buy: transactions.filter((t) => t.type === 'buy').length,
      sell: transactions.filter((t) => t.type === 'sell').length,
    }),
    [transactions],
  )

  const volume = useMemo(
    () =>
      transactions.reduce((sum, transaction) => sum + transaction.total_usd, 0),
    [transactions],
  )

  if (!isLoaded) return <PageLoader />

  return (
    <main className="relative min-h-full">
      <div className="relative z-10 mx-auto max-w-5xl">
        <TransactionsHeader
          total={transactions.length}
          volume={volume}
          filter={filter}
          onFilterChange={setFilter}
          counts={counts}
          search={search}
          onSearchChange={setSearch}
        />

        <TransactionsList
          transactions={filteredTransactions}
          allTransactions={transactions}
          coinImages={coinImages}
        />
      </div>
    </main>
  )
}