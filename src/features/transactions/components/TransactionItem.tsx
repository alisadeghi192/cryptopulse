import { ArrowDownToLine, ArrowUpFromLine, Copy, TrendingDown, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'
import { formatBalance, formatCoinAmount } from '@/utils/format'
import { cn } from '@/utils/cn'
import type { Transaction } from '@/types/wallet'

interface TransactionItemProps {
  transaction: Transaction
  onClick: () => void
}

const TYPE_META = {
  deposit: { label: 'Deposit', icon: ArrowDownToLine, iconClass: 'bg-success/10 text-success' },
  withdraw: { label: 'Withdraw', icon: ArrowUpFromLine, iconClass: 'bg-error/10 text-error' },
  buy: { label: 'Buy', icon: TrendingUp, iconClass: 'bg-primary/10 text-primary' },
  sell: { label: 'Sell', icon: TrendingDown, iconClass: 'bg-[#3B82F6]/10 text-[#3B82F6]' },
} as const

export function TransactionItem({ transaction, onClick }: TransactionItemProps) {
  const meta = TYPE_META[transaction.type]
  const Icon = meta.icon
  const isCredit = transaction.type === 'deposit' || transaction.type === 'sell'
  const isTrade = transaction.type === 'buy' || transaction.type === 'sell'

  const handleCopyTxnId = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(transaction.txn_id)
    toast.success('Transaction ID copied')
  }

  const handleCopyKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      navigator.clipboard.writeText(transaction.txn_id)
      toast.success('Transaction ID copied')
    }
  }

  const date = new Date(transaction.created_at)
  const dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const timeLabel = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <button type="button" onClick={onClick} className="border-border/40 bg-surface/40 hover:bg-elevated/30 flex w-full cursor-pointer flex-col gap-3 rounded-xl border p-4 text-left backdrop-blur-xl transition-colors sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg', meta.iconClass)}>
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-text text-sm font-medium">{meta.label}</p>
            {transaction.coin_symbol && (
              <span className="border-border/60 bg-background/60 text-text-secondary rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase">
                {transaction.coin_symbol}
              </span>
            )}
          </div>
          {/* Using span instead of button to prevent nested button HTML error */}
          <span
            role="button"
            tabIndex={0}
            onClick={handleCopyTxnId}
            onKeyDown={handleCopyKeyDown}
            className="text-text/50 hover:text-primary mt-1 flex w-fit cursor-pointer items-center gap-1 font-mono text-[10px] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <span className="max-w-45 truncate sm:max-w-65">{transaction.txn_id}</span>
            <Copy className="size-3 shrink-0" />
          </span>
        </div>
      </div>
      <div className="flex items-end justify-between gap-4 sm:justify-end">
        <div className="text-left sm:text-right">
          <p className={cn('font-mono text-sm font-semibold tabular-nums', isCredit ? 'text-success' : 'text-text')}>
            {isCredit ? '+' : '-'}{formatBalance(transaction.total_usd)}
          </p>
          <p className="text-text/60 mt-0.5 font-mono text-[10px] tabular-nums">
            {isTrade ? `${formatCoinAmount(transaction.amount)} ${transaction.coin_symbol ?? ''}` : formatBalance(transaction.amount)}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-text/70 font-mono text-[10px]">{dateLabel}</p>
          <p className="text-text/40 mt-0.5 font-mono text-[10px]">{timeLabel}</p>
        </div>
      </div>
    </button>
  )
}