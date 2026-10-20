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
import { Modal, ModalBody, ModalContent } from '@/components/ui/AnimatedModal'
import { useWalletStore } from '@/stores/useWalletStore'
import { useWalletActions } from '@/hooks/useWalletActions'
import { useTransactionFlow } from '@/hooks/useTransactionFlow'
import {
  formatBalance,
  formatCoinPrice,
  formatCoinAmount,
  formatFee,
} from '@/utils/format'
import {
  lte,
  gte,
  maxBuyCoin,
  maxSellCoin,
  calculateTradeTotals,
} from '@/utils/trade'
import { TRADE_LIMITS } from '@/constants/fees'
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

export function TradeModal({ open, onClose, coin, mode }: TradeModalProps) {
  const wallet = useWalletStore((s) => s.wallet)
  const holdings = useWalletStore((s) => s.holdings)
  const { buyCoin, sellCoin, TRADE_FEE_RATE } = useWalletActions()
  const { step, setStep, txnId, reset, run } = useTransactionFlow()

  const [coinInput, setCoinInput] = useState('')
  const [usdInput, setUsdInput] = useState('')

  const isBuy = mode === 'buy'
  const price = coin.current_price
  const cashBalance = wallet?.cash_balance ?? 0
  const holdingAmount = holdings.find((h) => h.coin_id === coin.id)?.amount ?? 0

  const coinAmount = parseFloat(coinInput) || 0

  const { subtotal, fee, total } = calculateTradeTotals(
    coinAmount,
    price,
    TRADE_FEE_RATE,
    isBuy,
  )

  const minUsd = isBuy ? TRADE_LIMITS.MIN_BUY_USD : TRADE_LIMITS.MIN_SELL_USD
  const isSellingAll =
    !isBuy &&
    coinAmount > 0 &&
    lte(coinAmount, holdingAmount) &&
    gte(coinAmount, holdingAmount)
  const meetsMin = gte(subtotal, minUsd) || isSellingAll

  const isValid =
    coinAmount > 0 &&
    meetsMin &&
    (isBuy
      ? lte(total, cashBalance)
      : lte(coinAmount, holdingAmount)) // ← اینجا دیگه safeCoinAmount نداریم و مستقیم coinAmount رو چک می‌کنیم

  useEffect(() => {
    if (open) {
      setCoinInput('')
      setUsdInput('')
      reset()
    }
  }, [open, reset])

  const handleCoinChange = (val: string) => {
    if (val !== '' && !/^\d*\.?\d*$/.test(val)) return
    setCoinInput(val)
    const n = parseFloat(val) || 0
    if (n > 0) {
      setUsdInput((n * price).toFixed(2))
    } else {
      setUsdInput('')
    }
  }

  const handleUsdChange = (val: string) => {
    if (val !== '' && !/^\d*\.?\d*$/.test(val)) return
    setUsdInput(val)
    const n = parseFloat(val) || 0
    if (n > 0 && price > 0) {
      setCoinInput((n / price).toFixed(8))
    } else {
      setCoinInput('')
    }
  }

  const handleMax = () => {
    if (isBuy) {
      const max = maxBuyCoin(cashBalance, price, TRADE_FEE_RATE)
      handleCoinChange(max.toString())
    } else {
      const max = maxSellCoin(holdingAmount)
      handleCoinChange(max.toString())
    }
  }

  const handleConfirm = async () => {
    if (!isValid) return
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

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        if (!next && step !== 'processing') onClose()
      }}
    >
      <ModalBody dismissible={step !== 'processing'} className="max-w-md">
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

        <ModalContent className="p-5">
          {step === 'input' && (
            <>
              <div className="mb-4">
                <div className="mb-1 flex items-center gap-2">
                  {isBuy ? (
                    <TrendingUp className="text-success size-4" />
                  ) : (
                    <TrendingDown className="text-primary size-4" />
                  )}
                  <h2 className="font-display text-text text-lg font-bold">
                    {isBuy ? 'Buy' : 'Sell'} {coin.symbol.toUpperCase()}
                  </h2>
                </div>
                <p className="text-text/60 font-mono text-xs">
                  {formatCoinPrice(price)} per {coin.symbol.toUpperCase()}
                </p>
              </div>

              <div className="border-border/40 bg-background/40 mb-4 flex flex-col gap-1.5 rounded-lg border px-3 py-2 text-xs">
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
                {!isBuy && (
                  <div className="flex items-center justify-between">
                    <span className="text-text/60 font-mono text-[10px] tracking-widest uppercase">
                      Value
                    </span>
                    <span className="text-text/60 font-mono text-xs font-semibold tabular-nums">
                      ≈ {formatBalance(holdingAmount * price)}
                    </span>
                  </div>
                )}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (isValid) setStep('confirm')
                }}
                className="space-y-3"
              >
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-text/60 font-mono text-[10px] tracking-widest uppercase">
                      Amount ({coin.symbol.toUpperCase()})
                    </span>
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
                      'bg-background/50 flex h-12 items-center gap-2 rounded-xl border px-3 transition-all',
                      isBuy
                        ? 'border-border focus-within:border-success/50 focus-within:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]'
                        : 'border-border focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)]',
                    )}
                  >
                    <input
                      type="text"
                      inputMode="decimal"
                      value={coinInput}
                      onChange={(e) => handleCoinChange(e.target.value)}
                      placeholder="0.0"
                      className="text-text placeholder:text-text/40 h-full w-full bg-transparent font-mono text-base font-semibold tabular-nums outline-none"
                    />
                    <span className="text-text/60 shrink-0 font-mono text-xs">
                      {coin.symbol.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-text/60 font-mono text-[10px] tracking-widest uppercase">
                      Amount (USD)
                    </span>
                  </div>

                  <div
                    className={cn(
                      'bg-background/50 flex h-12 items-center gap-2 rounded-xl border px-3 transition-all',
                      isBuy
                        ? 'border-border focus-within:border-success/50 focus-within:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]'
                        : 'border-border focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)]',
                    )}
                  >
                    <span className="text-text/60 shrink-0 font-mono text-base">
                      $
                    </span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={usdInput}
                      onChange={(e) => handleUsdChange(e.target.value)}
                      placeholder="0.00"
                      className="text-text placeholder:text-text/40 h-full w-full bg-transparent font-mono text-base font-semibold tabular-nums outline-none"
                    />
                    <span className="text-text/60 shrink-0 font-mono text-xs">
                      USD
                    </span>
                  </div>
                </div>

                {coinAmount > 0 && (
                  <div className="border-border/40 bg-background/40 space-y-1.5 rounded-lg border p-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-text/60 font-mono text-[10px]">
                        Subtotal
                      </span>
                      <span className="text-text font-mono text-xs tabular-nums">
                        {formatBalance(subtotal)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text/60 font-mono text-[10px]">
                        Fee (0.1%)
                      </span>
                      <span className="text-error font-mono text-xs tabular-nums">
                        -{formatFee(fee)}
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

                {coinAmount > 0 && !meetsMin && (
                  <p className="text-error font-mono text-[11px]">
                    Minimum order is ${minUsd.toFixed(2)}
                  </p>
                )}
                {coinAmount > 0 && isBuy && !lte(total, cashBalance) && (
                  <p className="text-error font-mono text-[11px]">
                    Insufficient balance
                  </p>
                )}
                {coinAmount > 0 && !isBuy && !lte(coinAmount, holdingAmount) && (
                  <p className="text-error font-mono text-[11px]">
                    Insufficient {coin.symbol.toUpperCase()}
                  </p>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-surface/40 text-text/70 hover:bg-elevated/60 hover:text-text flex-1 cursor-pointer rounded-lg py-2.5 font-mono text-sm font-medium transition-colors"
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
              <div className="mb-5 flex items-center gap-3">
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
                  <span className="text-text/60 font-mono text-xs">
                    Fee (0.1%)
                  </span>
                  <span className="text-error font-mono text-xs tabular-nums">
                    -{formatFee(fee)}
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
                className="w-full cursor-pointer"
              >
                Done
              </Button>
            </>
          )}
        </ModalContent>
      </ModalBody>
    </Modal>
  )
}