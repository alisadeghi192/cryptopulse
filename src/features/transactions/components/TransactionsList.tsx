import { useState } from 'react'
import { Receipt } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { EmptyState } from '@/components/ui/EmptyState'
import { TransactionItem } from './TransactionItem'
import { TransactionModal } from './TransactionModal'
import type { Transaction } from '@/types/wallet'

interface TransactionsListProps {
  transactions: Transaction[]
  allTransactions: Transaction[]
  coinImages: Record<string, string>
}

export function TransactionsList({
  transactions,
  allTransactions,
  coinImages,
}: TransactionsListProps) {
  const [selected, setSelected] = useState<Transaction | null>(null)

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={Receipt}
        title="No transactions found"
        description="Try a different filter or make your first deposit"
        variant="blue"
      />
    )
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {transactions.map((transaction, index) => (
          <BlurFade key={transaction.id} delay={Math.min(index * 0.02, 0.2)}>
            <TransactionItem
              transaction={transaction}
              onClick={() => setSelected(transaction)}
            />
          </BlurFade>
        ))}
      </div>

      <TransactionModal
        transaction={selected}
        allTransactions={allTransactions}
        coinImages={coinImages}
        onClose={() => setSelected(null)}
      />
    </>
  )
}