// src/features/dashboard/components/RecentTransactions.tsx

import { Link } from 'react-router'
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowRight,
  History,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { BalanceValue } from '@/components/ui/BalanceValue'
import { cn } from '@/utils/cn'
import type { Transaction } from '@/types/wallet'

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  return (
    <BlurFade delay={0.2}>
      <div className="border-border/40 bg-surface/40 relative h-full overflow-hidden rounded-3xl border shadow-xl backdrop-blur-3xl">
        <div className="border-border/40 flex items-center justify-between border-b px-5 py-4">
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
          <div className="p-8 text-center">
            <p className="text-text/60 font-mono text-xs">
              No transactions yet
            </p>
          </div>
        ) : (
          <div className="divide-border/30 divide-y">
            {transactions.map((txn) => {
              const isCredit =
                txn.type === 'deposit' || txn.type === 'sell'
              return (
                <div
                  key={txn.id}
                  className="hover:bg-elevated/30 flex items-center justify-between gap-3 px-5 py-3 transition-colors"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={cn(
                        'flex size-7 shrink-0 items-center justify-center rounded-lg',
                        txn.type === 'deposit' &&
                          'bg-success/10 text-success',
                        txn.type === 'withdraw' && 'bg-error/10 text-error',
                        txn.type === 'buy' && 'bg-primary/10 text-primary',
                        txn.type === 'sell' &&
                          'bg-[#3B82F6]/10 text-[#3B82F6]',
                      )}
                    >
                      {txn.type === 'deposit' && (
                        <ArrowDownToLine className="size-3.5" />
                      )}
                      {txn.type === 'withdraw' && (
                        <ArrowUpFromLine className="size-3.5" />
                      )}
                      {txn.type === 'buy' && (
                        <TrendingUp className="size-3.5" />
                      )}
                      {txn.type === 'sell' && (
                        <TrendingDown className="size-3.5" />
                      )}
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
                </div>
              )
            })}
          </div>
        )}
      </div>
    </BlurFade>
  )
}