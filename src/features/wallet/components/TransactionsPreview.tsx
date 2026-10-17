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
import { cn } from '@/utils/cn'

export function TransactionsPreview() {
  const transactions = useWalletStore((s) => s.transactions)

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
          <div className="border-border/40 bg-surface/40 rounded-2xl border p-8 text-center backdrop-blur-3xl">
            <p className="text-text/60 font-mono text-xs">No transactions yet</p>
          </div>
        ) : (
          <div className="border-border/40 bg-surface/40 overflow-hidden rounded-2xl border backdrop-blur-3xl">
            {transactions.slice(0, 5).map((txn) => (
              <div
                key={txn.id}
                className="border-border/30 hover:bg-elevated/30 flex items-center justify-between gap-3 border-b px-4 py-3 transition-colors last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-lg',
                      txn.type === 'deposit' && 'bg-success/10 text-success',
                      txn.type === 'withdraw' && 'bg-error/10 text-error',
                      txn.type === 'buy' && 'bg-primary/10 text-primary',
                      txn.type === 'sell' && 'bg-[#3B82F6]/10 text-[#3B82F6]',
                    )}
                  >
                    {txn.type === 'deposit' && (
                      <ArrowDownToLine className="size-4" />
                    )}
                    {txn.type === 'withdraw' && (
                      <ArrowUpFromLine className="size-4" />
                    )}
                    {txn.type === 'buy' && <TrendingUp className="size-4" />}
                    {txn.type === 'sell' && <TrendingDown className="size-4" />}
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
                      txn.type === 'deposit' || txn.type === 'sell'
                        ? 'text-success'
                        : 'text-text',
                    )}
                  >
                    {txn.type === 'deposit' || txn.type === 'sell' ? '+' : '-'}
                    <BalanceValue value={txn.total_usd} />
                  </p>
                  <p className="text-text/50 mt-0.5 font-mono text-[10px]">
                    {new Date(txn.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </BlurFade>
  )
}