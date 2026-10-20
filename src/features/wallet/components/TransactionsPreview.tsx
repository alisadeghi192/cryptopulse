import { useState } from 'react'
import {
  Plus,
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { BalanceValue } from '@/components/ui/BalanceValue'
import { useWalletStore } from '@/stores/useWalletStore'
import { TransactionModal } from '@/features/transactions/components/TransactionModal'
import { cn } from '@/utils/cn'
import type { Transaction } from '@/types/wallet'

const TYPE_META = {
  deposit: {
    icon: ArrowDownToLine,
    iconClass: 'bg-success/10 text-success',
    rowClass: 'bg-success/5 hover:bg-success/10',
  },
  withdraw: {
    icon: ArrowUpFromLine,
    iconClass: 'bg-error/10 text-error',
    rowClass: 'bg-error/5 hover:bg-error/10',
  },
  buy: {
    icon: TrendingUp,
    iconClass: 'bg-primary/10 text-primary',
    rowClass: 'bg-primary/5 hover:bg-primary/10',
  },
  sell: {
    icon: TrendingDown,
    iconClass: 'bg-[#3B82F6]/10 text-[#3B82F6]',
    rowClass: 'bg-[#3B82F6]/5 hover:bg-[#3B82F6]/10',
  },
} as const

export function TransactionsPreview() {
  const transactions = useWalletStore((s) => s.transactions)
  const [selected, setSelected] = useState<Transaction | null>(null)

  return (
    <BlurFade delay={0.15}>
      <div className="relative mt-6">
        <div className="mb-3 flex items-center gap-2">
          <Plus className="text-primary size-3.5" />
          <span className="text-primary font-mono text-[10px] tracking-[0.25em] uppercase">
            Recent Activity
          </span>
          <div className="bg-border h-px flex-1" />
        </div>

        {transactions.length === 0 ? (
          <div className="border-border/40 bg-surface/40 rounded-2xl shadow-lg border p-8 text-center backdrop-blur-3xl">
            <p className="text-text/60 font-mono text-xs">No transactions yet</p>
          </div>
        ) : (
          <div className="border-border/40 space-y-1 bg-surface/40 overflow-hidden shadow-xl rounded-2xl border p-1 backdrop-blur-3xl">
            {transactions.slice(0, 5).map((txn) => {
              const meta = TYPE_META[txn.type]
              const Icon = meta.icon
              const isCredit = txn.type === 'deposit' || txn.type === 'sell'

              return (
                <button
                  key={txn.id}
                  type="button"
                  onClick={() => setSelected(txn)}
                  className={cn(
                    'flex w-full cursor-pointer items-center justify-between gap-3 shadow-sm rounded-xl px-3 py-3 text-left transition-colors',
                    meta.rowClass,
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-lg',
                        meta.iconClass,
                      )}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-text text-sm font-medium capitalize">
                        {txn.type}
                        {txn.coin_symbol && ` ${txn.coin_symbol}`}
                      </p>
                      <p className="text-text/60 truncate font-mono text-[10px]">
                        {txn.txn_id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={cn(
                        'font-mono text-sm tabular-nums',
                        isCredit ? 'text-success' : 'text-text',
                      )}
                    >
                      {isCredit ? '+' : '-'}
                      <BalanceValue value={txn.total_usd} />
                    </p>
                    <p className="text-text/50 mt-0.5 font-mono text-[10px]">
                      {new Date(txn.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <TransactionModal
        transaction={selected}
        allTransactions={transactions}
        coinImages={{}} 
        onClose={() => setSelected(null)}
      />
    </BlurFade>
  )
}