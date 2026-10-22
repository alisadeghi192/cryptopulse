import {
  Copy
} from 'lucide-react'
import { toast } from 'sonner'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { Modal, ModalBody, ModalContent } from '@/components/ui/AnimatedModal'
import {
  formatBalance,
  formatCoinAmount,
  formatCoinPrice,
  formatFee,
} from '@/utils/format'
import { cn } from '@/utils/cn'
import { useWalletStore } from '@/stores/useWalletStore'
import type { Transaction } from '@/types/wallet'
import { coinImageUrl } from '@/utils/image'
import { TRANSACTION_TYPE_META } from '@/constants'

interface TransactionModalProps {
  transaction: Transaction | null
  allTransactions: Transaction[]
  coinImages: Record<string, string>
  onClose: () => void
}

export function TransactionModal({
  transaction,
  allTransactions,
  coinImages,
  onClose,
}: TransactionModalProps) {
  const currentCash = useWalletStore((s) => s.wallet?.cash_balance ?? 0)
  if (!transaction) return null

  const meta = TRANSACTION_TYPE_META[transaction.type]
  const Icon = meta.icon
  const isCredit = transaction.type === 'deposit' || transaction.type === 'sell'
  const isTrade = transaction.type === 'buy' || transaction.type === 'sell'

  // Fix empty src bug
  const rawImage = transaction.coin_id
    ? coinImages[transaction.coin_id]
    : undefined
  const hasValidImage = !!rawImage && rawImage.trim() !== ''
  const imageSrc = coinImageUrl(rawImage)

  const total = transaction.total_usd
  const subtotal =
    transaction.type === 'buy'
      ? total - transaction.fee
      : transaction.type === 'sell'
        ? total + transaction.fee
        : total
  const actualNet =
    transaction.type === 'withdraw' ? total - transaction.fee : total
  const displayAmount = transaction.type === 'withdraw' ? subtotal : actualNet

  const amountLabel = transaction.type === 'withdraw' ? 'Requested' : 'Amount'
  const netLabel =
    transaction.type === 'withdraw'
      ? 'Net to card'
      : isCredit
        ? 'Net received'
        : 'Net paid'

  const thisCashChange =
    transaction.type === 'buy'
      ? -total
      : transaction.type === 'sell'
        ? total
        : transaction.type === 'withdraw'
          ? -subtotal
          : total
  const newerTxns = allTransactions.filter(
    (t) =>
      new Date(t.created_at).getTime() >
      new Date(transaction.created_at).getTime(),
  )
  const newerChanges = newerTxns.reduce((acc, t) => {
    if (t.type === 'buy') return acc - t.total_usd
    if (t.type === 'sell') return acc + t.total_usd
    if (t.type === 'withdraw') return acc - (t.total_usd - t.fee)
    if (t.type === 'deposit') return acc + t.total_usd
    return acc
  }, 0)

  const cashAfter = currentCash - newerChanges
  const cashBefore = cashAfter - thisCashChange

  const date = new Date(transaction.created_at)
  const dateTimeLabel = date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  const copyTxn = () => {
    navigator.clipboard.writeText(transaction.txn_id)
    toast.success('Transaction ID copied')
  }

  return (
    <Modal open={!!transaction} onOpenChange={(next) => !next && onClose()}>
      <ModalBody className="max-w-md">
        <div className="pointer-events-none absolute inset-0">
          <AmbientLights variant="modal-buy" intensity="normal" />
        </div>
        <ModalContent className="p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-xl',
                  meta.iconClass,
                )}
              >
                <Icon className="size-5" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-text text-lg font-bold">
                    {meta.label}
                  </h2>
                  {transaction.coin_symbol && (
                    <span className="border-border/60 bg-background/60 text-text-secondary flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase">
                      {isTrade && hasValidImage && (
                        <img
                          src={imageSrc}
                          alt={transaction.coin_symbol}
                          className="size-3.5 rounded-full object-cover"
                        />
                      )}
                      {transaction.coin_symbol}
                    </span>
                  )}
                </div>
                <p className="text-text/60 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                  {dateTimeLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="border-border/40 border-b pb-5">
            <p className="text-text/60 font-mono text-[10px] tracking-widest uppercase">
              {isCredit ? 'You received' : 'You paid'}
            </p>
            <p
              className={cn(
                'font-display mt-1 text-3xl font-bold tabular-nums',
                isCredit ? 'text-success' : 'text-text',
              )}
            >
              {isCredit ? '+' : '-'}
              {formatBalance(displayAmount)}
            </p>
          </div>

          <div className="space-y-1 py-5">
            {isTrade && (
              <>
                <DetailRow
                  label="Amount"
                  value={`${formatCoinAmount(transaction.amount)} ${transaction.coin_symbol ?? ''}`}
                />
                {transaction.price !== null && (
                  <DetailRow
                    label="Price"
                    value={formatCoinPrice(transaction.price)}
                  />
                )}
                <DetailRow label="Subtotal" value={formatBalance(subtotal)} />
              </>
            )}
            {!isTrade && (
              <DetailRow label={amountLabel} value={formatBalance(subtotal)} />
            )}
            <DetailRow
              label="Fee"
              value={transaction.fee > 0 ? formatFee(transaction.fee) : '—'}
              valueClass={transaction.fee > 0 ? 'text-error' : 'text-text/60'}
            />
            <DetailRow
              label={netLabel}
              value={formatBalance(actualNet)}
              valueClass={cn(
                'font-semibold',
                isCredit ? 'text-success' : 'text-text',
              )}
            />
            <div className="bg-border/40 my-2 h-px" />
            <DetailRow label="Cash before" value={formatBalance(cashBefore)} />
            <DetailRow label="Cash after" value={formatBalance(cashAfter)} />
            <div className="bg-border/40 my-2 h-px" />
            <div className="pt-1">
              <p className="text-text/60 font-mono text-[10px] tracking-widest uppercase">
                Transaction ID
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <code className="border-border/40 bg-background/60 text-text flex-1 truncate rounded-lg border px-3 py-2 font-mono text-xs">
                  {transaction.txn_id}
                </code>
                <button
                  type="button"
                  onClick={copyTxn}
                  className="border-border/40 bg-surface/60 text-text/60 hover:text-primary flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border transition-colors"
                >
                  <Copy className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </ModalContent>
      </ModalBody>
    </Modal>
  )
}

function DetailRow({
  label,
  value,
  valueClass,
}: {
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-text/60 font-mono text-xs">{label}</span>
      <span
        className={cn(
          'text-text shrink-0 font-mono text-xs font-medium tabular-nums',
          valueClass,
        )}
      >
        {value}
      </span>
    </div>
  )
}
