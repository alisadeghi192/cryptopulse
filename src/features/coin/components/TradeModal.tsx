
import { useState, useEffect } from 'react'
import {
  Loader2,
  Check,
  Copy,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { toast } from 'sonner'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { useWalletStore } from '@/stores/useWalletStore'
import { useWalletActions } from '@/hooks/useWalletActions'
import { useTransactionFlow } from '@/hooks/useTransactionFlow'
import { formatBalance, formatCoinPrice, formatCoinAmount } from '@/utils/format'
import { floorTo, maxBuyCoin, maxBuyUsd, maxSellCoin } from '@/utils/trade'
import { cn } from '@/utils/cn'

type TradeCoin = {
  id: string
  symbol: string
  current_price: number
}

interface TradeModalProps {
  open: boolean
  onClose: () => void
  coin: TradeCoin
  mode: 'buy' | 'sell'
}

type InputMode = 'coin' | 'usd'

export function TradeModal({ open, onClose, coin, mode }: TradeModalProps) {
  const wallet = useWalletStore((s) => s.wallet)
  const holdings = useWalletStore((s) => s.holdings)
  const { buyCoin, sellCoin, TRADE_FEE_RATE } = useWalletActions()
  const { step, setStep, txnId, reset, run } = useTransactionFlow()

  const [amount, setAmount] = useState('')
  const [inputMode, setInputMode] = useState<InputMode>('coin')

  const isBuy = mode === 'buy'
  const price = coin.current_price
  const cashBalance = wallet?.cash_balance ?? 0
  const holdingAmount = holdings.find((h) => h.coin_id === coin.id)?.amount ?? 0

  const numericInput = parseFloat(amount) || 0
  const coinAmount = inputMode === 'coin' ? numericInput : numericInput / price
  const usdAmount = inputMode === 'coin' ? numericInput * price : numericInput

  const subtotal = usdAmount
  const fee = subtotal * TRADE_FEE_RATE
  const total = isBuy ? subtotal + fee : subtotal - fee

  const isValid =
    numericInput > 0 &&
    (isBuy
      ? total <= cashBalance && total >= 1
      : coinAmount <= holdingAmount && coinAmount > 0)

  useEffect(() => {
    if (open) {
      setAmount('')
      setInputMode('coin')
      reset()
    }
  }, [open, reset])

  const handleConfirm = async () => {
    const error = await run(() =>
      isBuy
        ? buyCoin(coin.id, coin.symbol, coinAmount, price)
        : sellCoin(coin.id, coin.symbol, coinAmount, price),
    )
    if (error) toast.error('Trade failed', { description: error })
  }

  const copyTxn = () => {
    navigator.clipboard.writeText(txnId)
    toast.success('Transaction ID copied')
  }

  const handleMax = () => {
    if (isBuy) {
      if (inputMode === 'coin') {
        const maxCoin = maxBuyCoin(cashBalance, price, TRADE_FEE_RATE)
        setAmount(maxCoin.toString())
      } else {
        const maxUsd = maxBuyUsd(cashBalance, TRADE_FEE_RATE)
        setAmount(maxUsd.toFixed(2))
      }
    } else {
      const maxCoin = maxSellCoin(holdingAmount)
      if (inputMode === 'coin') {
        setAmount(maxCoin.toString())
      } else {
        setAmount(floorTo(maxCoin * price, 2).toFixed(2))
      }
    }
  }

  const handleModeChange = (next: InputMode) => {
    if (next === inputMode) return
    if (amount) {
      if (next === 'usd') setAmount((numericInput * price).toFixed(2))
      else setAmount((numericInput / price).toFixed(8))
    }
    setInputMode(next)
  }

  return (
    <Modal open={open} onClose={onClose} dismissible={step !== 'processing'}>
      <div className="pointer-events-none absolute inset-0">
        <AmbientLights
          variant={
            step === 'success'
              ? 'modal-success'
              : isBuy
                ? 'modal-buy'
                : 'modal-sell'
          }
          intensity="normal"
        />
      </div>

      {step === 'input' && (
        <>
          <div className="mb-6">
            <div className="mb-1 flex items-center gap-2">
              {isBuy ? (
                <TrendingUp className="text-success size-4" />
              ) : (
                <TrendingDown className="text-primary size-4" />
              )}
              <h2 className="font-display text-text text-xl font-bold">
                {isBuy ? 'Buy' : 'Sell'} {coin.symbol.toUpperCase()}
              </h2>
            </div>
            <p className="text-text/60 font-mono text-xs">
              {formatCoinPrice(price)} per {coin.symbol.toUpperCase()}
            </p>
          </div>

          <div className="border-border/40 bg-background/40 mb-5 space-y-2 rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <span className="text-text/60 font-mono text-[10px] tracking-widest uppercase">
                {isBuy ? 'Cash Balance' : 'You Own'}
              </span>
              <span className="text-text font-mono text-sm font-semibold tabular-nums">
                {isBuy
                  ? formatBalance(cashBalance)
                  : `${formatCoinAmount(holdingAmount)} ${coin.symbol.toUpperCase()}`}
              </span>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (isValid) setStep('confirm')
            }}
            className="space-y-4"
          >
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="border-border/40 bg-surface/40 inline-flex rounded-lg border p-1">
                  <button
                    type="button"
                    onClick={() => handleModeChange('coin')}
                    className={cn(
                      'cursor-pointer rounded-md px-3 py-1 font-mono text-xs font-medium transition-colors',
                      inputMode === 'coin'
                        ? 'bg-primary/15 text-primary'
                        : 'text-text/60 hover:text-text',
                    )}
                  >
                    {coin.symbol.toUpperCase()}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModeChange('usd')}
                    className={cn(
                      'cursor-pointer rounded-md px-3 py-1 font-mono text-xs font-medium transition-colors',
                      inputMode === 'usd'
                        ? 'bg-primary/15 text-primary'
                        : 'text-text/60 hover:text-text',
                    )}
                  >
                    USD
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleMax}
                  className="text-primary hover:text-primary/80 cursor-pointer font-mono text-[10px] transition-colors"
                >
                  MAX
                </button>
              </div>

              <div
                className={cn(
                  'bg-background/50 flex h-14 items-center gap-2 rounded-xl border px-4 transition-all',
                  isBuy
                    ? 'border-border focus-within:border-success/50 focus-within:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]'
                    : 'border-border focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)]',
                )}
              >
                {inputMode === 'usd' && (
                  <span className="text-text/60 shrink-0 font-mono text-lg">
                    $
                  </span>
                )}
                <input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => {
                    const val = e.target.value
                    if (val === '' || /^\d*\.?\d*$/.test(val)) setAmount(val)
                  }}
                  placeholder={inputMode === 'coin' ? '0.0' : '0'}
                  className="text-text placeholder:text-text/40 h-full w-full bg-transparent font-mono text-lg font-semibold tabular-nums outline-none"
                />
                {inputMode === 'coin' && (
                  <span className="text-text/60 shrink-0 font-mono text-sm">
                    {coin.symbol.toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {numericInput > 0 && (
              <div className="border-border/40 bg-background/40 space-y-2 rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-text/60 font-mono text-[10px]">
                    {inputMode === 'coin' ? 'Subtotal' : 'You get'}
                  </span>
                  <span className="text-text font-mono text-xs tabular-nums">
                    {inputMode === 'coin'
                      ? formatBalance(subtotal)
                      : `${formatCoinAmount(coinAmount)} ${coin.symbol.toUpperCase()}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text/60 font-mono text-[10px]">
                    Fee (0.1%)
                  </span>
                  <span className="text-error font-mono text-xs tabular-nums">
                    -{formatBalance(fee)}
                  </span>
                </div>
                <div className="bg-border/40 h-px" />
                <div className="flex items-center justify-between">
                  <span className="text-text font-mono text-xs font-medium">
                    {isBuy ? 'Total cost' : 'You receive'}
                  </span>
                  <span
                    className={cn(
                      'font-mono text-sm font-bold tabular-nums',
                      isBuy ? 'text-success' : 'text-primary',
                    )}
                  >
                    {formatBalance(total)}
                  </span>
                </div>
              </div>
            )}

            {numericInput > 0 && isBuy && total > cashBalance && (
              <p className="text-error font-mono text-[11px]">
                Insufficient balance
              </p>
            )}
            {numericInput > 0 && !isBuy && coinAmount > holdingAmount && (
              <p className="text-error font-mono text-[11px]">
                Insufficient {coin.symbol.toUpperCase()}
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-surface/40 text-text/70 hover:bg-elevated/60 hover:text-text flex-1 cursor-pointer rounded-lg py-3 font-mono text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={!isValid}
                className="flex-1 cursor-pointer"
              >
                Continue
              </Button>
            </div>
          </form>
        </>
      )}

      {step === 'confirm' && (
        <>
          <div className="mb-6 flex items-center gap-3">
            <div className="border-primary/30 bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg border">
              <AlertTriangle className="size-5" />
            </div>
            <div>
              <h2 className="font-display text-text text-lg font-bold">
                Confirm {isBuy ? 'Purchase' : 'Sale'}
              </h2>
              <p className="text-text/60 font-mono text-[11px]">
                Please review before proceeding
              </p>
            </div>
          </div>

          <div className="border-border/40 bg-background/40 mb-5 space-y-3 rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <span className="text-text/60 font-mono text-xs">
                {isBuy ? 'Buying' : 'Selling'}
              </span>
              <span className="text-text font-mono text-sm font-semibold tabular-nums">
                {formatCoinAmount(coinAmount)} {coin.symbol.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text/60 font-mono text-xs">Price</span>
              <span className="text-text font-mono text-xs tabular-nums">
                {formatCoinPrice(price)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text/60 font-mono text-xs">Fee (0.1%)</span>
              <span className="text-error font-mono text-xs tabular-nums">
                -{formatBalance(fee)}
              </span>
            </div>
            <div className="bg-border/40 h-px" />
            <div className="flex items-center justify-between">
              <span className="text-text/60 font-mono text-xs">
                {isBuy ? 'Total cost' : 'You receive'}
              </span>
              <span
                className={cn(
                  'font-mono text-sm font-bold tabular-nums',
                  isBuy ? 'text-success' : 'text-primary',
                )}
              >
                {formatBalance(total)}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep('input')}
              className="bg-surface/40 text-text/70 hover:bg-elevated/60 hover:text-text flex-1 cursor-pointer rounded-lg py-3 font-mono text-sm font-medium transition-colors"
            >
              Back
            </button>
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={handleConfirm}
              className="flex-1 cursor-pointer"
            >
              Confirm
            </Button>
          </div>
        </>
      )}

      {step === 'processing' && (
        <div className="py-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="border-primary/30 bg-primary/10 flex size-16 items-center justify-center rounded-full border">
              <Loader2 className="text-primary size-8 animate-spin" />
            </div>
          </div>
          <h2 className="font-display text-text text-lg font-bold">
            Processing {isBuy ? 'Purchase' : 'Sale'}
          </h2>
          <p className="text-text/60 mt-2 font-mono text-xs">
            Executing trade...
          </p>
        </div>
      )}

      {step === 'success' && (
        <>
          <div className="py-4 text-center">
            <div className="mb-5 flex justify-center">
              <div className="border-success/30 bg-success/20 relative flex size-16 items-center justify-center rounded-full border">
                <span className="bg-success/40 absolute inset-0 animate-ping rounded-full" />
                <Check className="text-success relative size-8" />
              </div>
            </div>
            <h2 className="font-display text-text text-lg font-bold">
              {isBuy ? 'Purchase' : 'Sale'} Successful
            </h2>
            <p className="text-text/70 mt-2 font-mono text-xs">
              {isBuy
                ? `Bought ${formatCoinAmount(coinAmount)} ${coin.symbol.toUpperCase()}`
                : `Sold ${formatCoinAmount(coinAmount)} ${coin.symbol.toUpperCase()}`}
            </p>
          </div>

          {txnId && (
            <div className="border-border/40 bg-background/40 mb-5 rounded-xl border p-3">
              <p className="text-text/60 mb-1 font-mono text-[10px] tracking-widest uppercase">
                Transaction ID
              </p>
              <div className="flex items-center justify-between gap-2">
                <span className="text-text truncate font-mono text-xs font-semibold">
                  {txnId}
                </span>
                <button
                  type="button"
                  onClick={copyTxn}
                  className="text-text/60 hover:text-primary shrink-0 cursor-pointer transition-colors"
                >
                  <Copy className="size-3.5" />
                </button>
              </div>
            </div>
          )}

          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={onClose}
            className="flex-1 cursor-pointer"
          >
            Done
          </Button>
        </>
      )}
    </Modal>
  )
}