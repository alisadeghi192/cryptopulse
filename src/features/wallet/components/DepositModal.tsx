import { useState, useEffect } from 'react'
import {
  ArrowDownToLine,
  Loader2,
  Check,
  Copy,
  AlertTriangle,
} from 'lucide-react'
import { toast } from 'sonner'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { Button } from '@/components/ui/Button'
import { Modal, ModalBody, ModalContent } from '@/components/ui/AnimatedModal'
import { useWalletActions } from '@/hooks/useWalletActions'
import { useTransactionFlow } from '@/hooks/useTransactionFlow'
import { formatBalance } from '@/utils/format'
import { cn } from '@/utils/cn'
import { TRADE_LIMITS } from '@/constants'

interface DepositModalProps {
  open: boolean
  onClose: () => void
  currentBalance: number
}

export function DepositModal({
  open,
  onClose,
  currentBalance,
}: DepositModalProps) {
  const { deposit } = useWalletActions()
  const [amount, setAmount] = useState('')
  const { step, setStep, txnId, reset, run } = useTransactionFlow()

  useEffect(() => {
    if (open) {
      setAmount('')
      reset()
    }
  }, [open, reset])

  const numericAmount = parseFloat(amount) || 0
  const isValid =
    numericAmount >= TRADE_LIMITS.MIN_DEPOSIT_USD &&
    numericAmount <= TRADE_LIMITS.MAX_DEPOSIT_USD

  const handleConfirm = async () => {
    const error = await run(() => deposit(numericAmount))
    if (error) toast.error('Deposit failed', { description: error })
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
      <ModalBody dismissible={step !== 'processing'}>
        <div className="pointer-events-none absolute inset-0">
          <AmbientLights
            variant={step === 'success' ? 'green' : 'modal-deposit'}
            intensity="normal"
          />
        </div>

        <ModalContent>
          {step === 'input' && (
            <>
              <div className="mb-6 flex items-start gap-2">
                <ArrowDownToLine className="text-success mt-0.5 size-4" />
                <div>
                  <h2 className="font-display text-text text-xl font-bold">
                    Deposit
                  </h2>
                  <p className="text-text/60 font-mono text-xs">
                    Add funds to your wallet
                  </p>
                </div>
              </div>

              <div className="border-border/40 bg-background/40 mb-5 flex items-center justify-between rounded-lg border px-3 py-2">
                <span className="text-text/60 font-mono text-[10px] tracking-widest uppercase">
                  Current Balance
                </span>
                <span className="text-text font-mono text-sm font-semibold tabular-nums">
                  {formatBalance(currentBalance)}
                </span>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (isValid) setStep('confirm')
                }}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="deposit-amount"
                    className="text-text/70 mb-2 block font-mono text-[10px] tracking-widest uppercase"
                  >
                    Amount (USD)
                  </label>
                  <div className="border-border bg-background/50 focus-within:border-success/50 flex h-14 items-center gap-2 rounded-xl border px-4 transition-all focus-within:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]">
                    <span className="text-text/60 shrink-0 font-mono text-lg">
                      $
                    </span>
                    <input
                      id="deposit-amount"
                      type="text"
                      inputMode="decimal"
                      value={amount}
                      onChange={(e) => {
                        const v = e.target.value
                        if (v === '' || /^\d*\.?\d*$/.test(v)) setAmount(v)
                      }}
                      placeholder="0"
                      className="text-text placeholder:text-text/40 h-full w-full bg-transparent font-mono text-lg font-semibold tabular-nums outline-none"
                    />
                  </div>
                  <p className="text-text/50 mt-1.5 font-mono text-[10px]">
                    Min ${TRADE_LIMITS.MIN_DEPOSIT_USD} · Max $
                    {TRADE_LIMITS.MAX_DEPOSIT_USD.toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  {[100, 500, 1000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(String(preset))}
                      className={cn(
                        'border-border/40 bg-surface/40 text-text/70 hover:border-success/40 hover:bg-success/10 hover:text-success flex-1 cursor-pointer rounded-lg border py-2 font-mono text-xs transition-colors',
                        numericAmount === preset &&
                          'border-success/40 bg-success/10 text-success',
                      )}
                    >
                      +${preset}
                    </button>
                  ))}
                </div>

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
                    Confirm Payment
                  </h2>
                  <p className="text-text/60 font-mono text-[11px]">
                    Please review before proceeding
                  </p>
                </div>
              </div>

              <div className="border-border/40 bg-background/40 mb-5 space-y-3 rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <span className="text-text/60 font-mono text-xs">Amount</span>
                  <span className="text-success font-mono text-lg font-bold tabular-nums">
                    {formatBalance(numericAmount)}
                  </span>
                </div>
                <div className="bg-border/40 h-px" />
                <div className="flex items-center justify-between">
                  <span className="text-text/60 font-mono text-xs">
                    New Balance
                  </span>
                  <span className="text-text font-mono text-sm font-semibold tabular-nums">
                    {formatBalance(currentBalance + numericAmount)}
                  </span>
                </div>
              </div>

              <div className="border-primary/20 bg-primary/5 mb-5 flex items-start gap-2 rounded-lg border p-3">
                <AlertTriangle className="text-primary mt-0.5 size-4 shrink-0" />
                <p className="text-text/70 font-mono text-[11px] leading-relaxed">
                  This is a simulated payment. No real money will be charged.
                </p>
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
                  Confirm Payment
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
                Processing Payment
              </h2>
              <p className="text-text/60 mt-2 font-mono text-xs">
                Connecting to payment gateway...
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
                  Payment Successful
                </h2>
                <p className="text-text/70 mt-2 font-mono text-xs">
                  {formatBalance(numericAmount)} has been added to your wallet.
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
