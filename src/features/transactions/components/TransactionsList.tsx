import { useState } from 'react'
import { Receipt } from 'lucide-react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { BlurFade } from '@/components/ui/BlurFade'
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
      <BlurFade delay={0.1}>
        <div className="border-border/40 bg-surface/40 relative overflow-hidden rounded-2xl border backdrop-blur-3xl">
          <div className="pointer-events-none absolute inset-0">
            <AmbientLights variant="blue" intensity="subtle" />
          </div>
          <div className="relative flex flex-col items-center gap-5 p-12 text-center">
            <div className="border-border/40 bg-elevated/40 flex size-16 items-center justify-center rounded-2xl border shadow-sm">
              <Receipt className="text-text/40 size-7" />
            </div>
            <div>
              <p className="text-text font-mono text-sm font-medium">
                No transactions found
              </p>
              <p className="text-text/60 mt-1 font-mono text-xs">
                Try a different filter or make your first deposit
              </p>
            </div>
          </div>
        </div>
      </BlurFade>
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