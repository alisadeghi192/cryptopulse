import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Copy,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { toast } from 'sonner'
import { formatBalance, formatCoinAmount } from '@/utils/format'
import { cn } from '@/utils/cn'
import type { Transaction } from '@/types/wallet'

interface TransactionItemProps {
  transaction: Transaction
  onClick: () => void
}

const TYPE_META = {
  deposit: {
    label: 'Deposit',
    icon: ArrowDownToLine,
    iconClass: 'bg-success/15 text-success',
    cardClass: 'bg-success/[0.06] border-success/20 hover:bg-success/15 hover:border-success/40',
  },
  withdraw: {
    label: 'Withdraw',
    icon: ArrowUpFromLine,
    iconClass: 'bg-error/15 text-error',
    cardClass: 'bg-error/[0.06] border-error/20 hover:bg-error/15 hover:border-error/40',
  },
  buy: {
    label: 'Buy',
    icon: TrendingUp,
    iconClass: 'bg-primary/15 text-primary',
    cardClass: 'bg-primary/[0.06] border-primary/20 hover:bg-primary/15 hover:border-primary/40',
  },
  sell: {
    label: 'Sell',
    icon: TrendingDown,
    iconClass: 'bg-[#3B82F6]/15 text-[#3B82F6]',
    cardClass: 'bg-[#3B82F6]/[0.06] border-[#3B82F6]/20 hover:bg-[#3B82F6]/15 hover:border-[#3B82F6]/40',
  },
} as const

export function TransactionItem({
  transaction,
  onClick,
}: TransactionItemProps) {
  const meta = TYPE_META[transaction.type]
  const Icon = meta.icon
  const isCredit =
    transaction.type === 'deposit' || transaction.type === 'sell'
  const isTrade =
    transaction.type === 'buy' || transaction.type === 'sell'

  const handleCopyTxnId = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(transaction.txn_id)
    toast.success('Transaction ID copied')
  }

  const date = new Date(transaction.created_at)
  const dateLabel = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const timeLabel = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full cursor-pointer flex-col gap-3 rounded-xl border p-4 text-left backdrop-blur-xl transition-all duration-300 sm:flex-row sm:items-center sm:justify-between',
        meta.cardClass
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-lg',
            meta.iconClass,
          )}
        >
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

          <button
            type="button"
            onClick={handleCopyTxnId}
            className="text-text/50 hover:text-primary mt-1 flex cursor-pointer items-center gap-1 font-mono text-[10px] transition-colors"
          >
            <span className="max-w-45 truncate sm:max-w-65">
              {transaction.txn_id}
            </span>
            <Copy className="size-3 shrink-0" />
          </button>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 sm:justify-end">
        <div className="text-left sm:text-right">
          <p
            className={cn(
              'font-mono text-sm font-semibold tabular-nums',
              isCredit ? 'text-success' : 'text-text',
            )}
          >
            {isCredit ? '+' : '-'}
            {formatBalance(transaction.total_usd)}
          </p>
          <p className="text-text/60 mt-0.5 font-mono text-[10px] tabular-nums">
            {isTrade
              ? `${formatCoinAmount(transaction.amount)} ${transaction.coin_symbol ?? ''}`
              : formatBalance(transaction.amount)}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-text/70 font-mono text-[10px]">{dateLabel}</p>
          <p className="text-text/40 mt-0.5 font-mono text-[10px]">
            {timeLabel}
          </p>
        </div>
      </div>
    </button>
  )
}