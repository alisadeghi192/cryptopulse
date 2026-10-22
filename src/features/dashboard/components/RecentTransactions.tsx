import { useState } from 'react'
import { Link } from 'react-router'
import {
  ArrowRight,
  History,
} from 'lucide-react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { BlurFade } from '@/components/ui/BlurFade'
import { BalanceValue } from '@/components/ui/BalanceValue'
import { TransactionModal } from '@/features/transactions/components/TransactionModal'
import { cn } from '@/utils/cn'
import type { Transaction } from '@/types/wallet'
import { TRANSACTION_TYPE_META } from '@/constants'

interface RecentTransactionsProps {
  transactions: Transaction[]
  allTransactions: Transaction[]
  coinImages: Record<string, string>
}


export function RecentTransactions({
  transactions,
  allTransactions,
  coinImages,
}: RecentTransactionsProps) {
  const [selected, setSelected] = useState<Transaction | null>(null)

  return (
    <BlurFade delay={0.2}>
      <div className="border-border/40 bg-surface/40 relative h-full overflow-hidden rounded-3xl border shadow-xl backdrop-blur-3xl">
        <div className="pointer-events-none absolute inset-0">
          <AmbientLights variant="blue" intensity="subtle" />
        </div>
        <div className="relative border-border/40 flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <History className="text-primary size-4" />
            <span className="text-text font-mono text-xs font-semibold tracking-widest uppercase">
              Recent Activity
            </span>
          </div>
          <Link
            to="/transactions"
            className="text-text/60 hover:text-primary group flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase transition-colors"
          >
            View all
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {transactions.length === 0 ? (
          <div className="relative p-8 text-center">
            <p className="text-text/60 font-mono text-xs">
              No transactions yet
            </p>
          </div>
        ) : (
          <div className="relative divide-border/30 divide-y">
            {transactions.map((txn) => {
              const meta = TRANSACTION_TYPE_META[txn.type]
              const Icon = meta.icon
              const isCredit = txn.type === 'deposit' || txn.type === 'sell'

              return (
                <button
                  key={txn.id}
                  type="button"
                  onClick={() => setSelected(txn)}
                  className={cn(
                    'flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-3 text-left transition-colors',
                    meta.hoverBg,
                  )}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={cn(
                        'flex size-7 shrink-0 items-center justify-center rounded-lg',
                        meta.iconClass,
                      )}
                    >
                      <Icon className="size-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-text truncate text-sm font-medium capitalize">
                        {txn.type}
                        {txn.coin_symbol && ` ${txn.coin_symbol}`}
                      </p>
                      <p className="text-text/50 font-mono text-[10px]">
                        {new Date(txn.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <p
                    className={cn(
                      'shrink-0 font-mono text-sm font-semibold tabular-nums',
                      isCredit ? 'text-success' : 'text-text',
                    )}
                  >
                    {isCredit ? '+' : '-'}
                    <BalanceValue value={txn.total_usd} />
                  </p>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <TransactionModal
        transaction={selected}
        allTransactions={allTransactions}
        coinImages={coinImages}
        onClose={() => setSelected(null)}
      />
    </BlurFade>
  )
}