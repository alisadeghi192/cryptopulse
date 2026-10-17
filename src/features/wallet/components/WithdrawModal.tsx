import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import {
  X,
  ArrowUpFromLine,
  Loader2,
  Check,
  Copy,
  AlertTriangle,
  CreditCard,
} from 'lucide-react'
import { toast } from 'sonner'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { Button } from '@/components/ui/Button'
import { useWalletActions } from '@/hooks/useWalletActions'
import { useAuthStore } from '@/stores/useAuthStore'
import { useWalletStore } from '@/stores/useWalletStore'
import { formatBalance } from '@/utils/format'
import { cn } from '@/utils/cn'

interface WithdrawModalProps {
  open: boolean
  onClose: () => void
  currentBalance: number
}

type Step = 'no-card' | 'input' | 'confirm' | 'processing' | 'success'

export function WithdrawModal({
  open,
  onClose,
  currentBalance,
}: WithdrawModalProps) {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const { withdraw, WITHDRAW_FEE } = useWalletActions()

  const cardNumber = (user?.user_metadata?.card_number as string) ?? ''
  const hasCard = !!cardNumber
  const maskedCard = cardNumber ? `•••• ${cardNumber.slice(-4)}` : ''

  const [amount, setAmount] = useState('')
  const [step, setStep] = useState<Step>(hasCard ? 'input' : 'no-card')
  const [txnId, setTxnId] = useState('')

  // Reset on open
  useEffect(() => {
    if (open) {
      setAmount('')
      setTxnId('')
      setStep(hasCard ? 'input' : 'no-card')
    }
  }, [open, hasCard])

  // Escape to close (except during processing)
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && step !== 'processing') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, step, onClose])

  const numericAmount = parseFloat(amount) || 0
  const isValid = numericAmount >= 10 && numericAmount <= currentBalance

  const handleGoToConfirm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setStep('confirm')
  }

  const handleConfirm = async () => {
    setStep('processing')

    // Simulate payment gateway delay
    await new Promise((r) => setTimeout(r, 2000))

    const { error } = await withdraw(numericAmount)

    if (error) {
      toast.error('Withdrawal failed', { description: error })
      setStep('input')
      return
    }

    const txn = useWalletStore.getState().transactions[0]
    setTxnId(txn?.txn_id ?? '')
    setStep('success')
  }

  const handleCopyTxnId = () => {
    navigator.clipboard.writeText(txnId)
    toast.success('Transaction ID copied')
  }

  const handleGoToProfile = () => {
    onClose()
    navigate('/profile')
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={() => step !== 'processing' && onClose()}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className="border-border/40 bg-surface/90 relative w-full max-w-md overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-3xl"
        >
          <div className="pointer-events-none absolute inset-0">
            <AmbientLights
              variant={step === 'success' ? 'green' : 'hero'}
              intensity="normal"
            />
          </div>

          <div className="relative z-10 p-6">
            {/* ─── NO CARD STEP ─── */}
            {step === 'no-card' && (
              <>
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="border-error/30 bg-error/10 text-error flex size-10 items-center justify-center rounded-lg border">
                      <AlertTriangle className="size-5" />
                    </div>
                    <div>
                      <h2 className="font-display text-text text-lg font-bold">
                        Card Number Required
                      </h2>
                      <p className="text-text/60 font-mono text-[11px]">
                        You need a card to withdraw
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="text-text/60 hover:bg-elevated hover:text-text flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <p className="text-text/70 mb-5 font-mono text-xs leading-relaxed">
                  Please add a card number in your profile before withdrawing
                  funds. Withdrawals will be sent to the card you register.
                </p>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-surface/40 text-text/70 hover:bg-elevated/60 hover:text-text flex-1 cursor-pointer rounded-lg py-3 font-mono text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    onClick={handleGoToProfile}
                    className="group/profile flex-1 cursor-pointer gap-2"
                  >
                    Go to Profile
                  </Button>
                </div>
              </>
            )}

            {/* ─── INPUT STEP ─── */}
            {step === 'input' && (
              <>
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <ArrowUpFromLine className="text-primary size-4" />
                      <h2 className="font-display text-text text-xl font-bold">
                        Withdraw
                      </h2>
                    </div>
                    <p className="text-text/60 font-mono text-xs">
                      Send funds to your card
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="text-text/60 hover:bg-elevated hover:text-text flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Balance + Card */}
                <div className="border-border/40 bg-background/40 mb-5 space-y-2 rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text/60 font-mono text-[10px] tracking-widest uppercase">
                      Available
                    </span>
                    <span className="text-text font-mono text-sm font-semibold tabular-nums">
                      {formatBalance(currentBalance)}
                    </span>
                  </div>
                  <div className="bg-border/40 h-px" />
                  <div className="flex items-center justify-between">
                    <span className="text-text/60 flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase">
                      <CreditCard className="size-3" />
                      To Card
                    </span>
                    <span className="text-text font-mono text-sm font-semibold">
                      {maskedCard}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleGoToConfirm} className="space-y-4">
                  <div>
                    <label
                      htmlFor="withdraw-amount"
                      className="text-text/70 mb-2 block font-mono text-[10px] tracking-widest uppercase"
                    >
                      Amount (USD)
                    </label>
                    <div className="border-border bg-background/50 focus-within:border-primary/50 flex h-14 items-center gap-2 rounded-xl border px-4 transition-all focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)]">
                      <span className="text-text/60 shrink-0 font-mono text-lg">
                        $
                      </span>
                      <input
                        id="withdraw-amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0"
                        min="10"
                        step="0.01"
                        autoFocus
                        className="text-text placeholder:text-text/40 h-full w-full [appearance:textfield] bg-transparent font-mono text-lg font-semibold tabular-nums outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                    </div>
                    <p className="text-text/50 mt-1.5 font-mono text-[10px]">
                      Min $10 · Fee: ${WITHDRAW_FEE.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {[50, 100, 500].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAmount(String(preset))}
                        className={cn(
                          'border-border/40 bg-surface/40 text-text/70 hover:border-primary/40 hover:bg-primary/10 hover:text-primary flex-1 cursor-pointer rounded-lg border py-2 font-mono text-xs transition-colors',
                          numericAmount === preset &&
                            'border-primary/40 bg-primary/10 text-primary',
                        )}
                      >
                        ${preset}
                      </button>
                    ))}
                  </div>

                  {numericAmount > 0 && numericAmount > currentBalance && (
                    <p className="text-error font-mono text-[11px]">
                      Insufficient balance
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
                      className="group/continue flex-1 cursor-pointer gap-2"
                    >
                      Continue
                    </Button>
                  </div>
                </form>
              </>
            )}

            {/* ─── CONFIRM STEP ─── */}
            {step === 'confirm' && (
              <>
                <div className="mb-6 flex items-center gap-3">
                  <div className="border-primary/30 bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg border">
                    <AlertTriangle className="size-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-text text-lg font-bold">
                      Confirm Withdrawal
                    </h2>
                    <p className="text-text/60 font-mono text-[11px]">
                      Please review before proceeding
                    </p>
                  </div>
                </div>

                <div className="border-border/40 bg-background/40 mb-5 space-y-3 rounded-xl border p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text/60 font-mono text-xs">
                      Amount
                    </span>
                    <span className="text-text font-mono text-sm font-semibold tabular-nums">
                      {formatBalance(numericAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text/60 font-mono text-xs">Fee</span>
                    <span className="text-error font-mono text-xs font-semibold tabular-nums">
                      -${WITHDRAW_FEE.toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-border/40 h-px" />
                  <div className="flex items-center justify-between">
                    <span className="text-text/60 font-mono text-xs">
                      You receive
                    </span>
                    <span className="text-primary font-mono text-sm font-bold tabular-nums">
                      {formatBalance(numericAmount - WITHDRAW_FEE)}
                    </span>
                  </div>
                  <div className="bg-border/40 h-px" />
                  <div className="flex items-center justify-between">
                    <span className="text-text/60 font-mono text-xs">
                      To card
                    </span>
                    <span className="text-text font-mono text-sm font-semibold">
                      {maskedCard}
                    </span>
                  </div>
                </div>

                <div className="border-primary/20 bg-primary/5 mb-5 flex items-start gap-2 rounded-lg border p-3">
                  <AlertTriangle className="text-primary mt-0.5 size-4 shrink-0" />
                  <p className="text-text/70 font-mono text-[11px] leading-relaxed">
                    This is a simulated withdrawal. No real money will be
                    transferred to your card.
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
                    className="flex-1 cursor-pointer gap-2"
                  >
                    Confirm
                  </Button>
                </div>
              </>
            )}

            {/* ─── PROCESSING STEP ─── */}
            {step === 'processing' && (
              <div className="py-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="border-primary/30 bg-primary/10 flex size-16 items-center justify-center rounded-full border">
                    <Loader2 className="text-primary size-8 animate-spin" />
                  </div>
                </div>
                <h2 className="font-display text-text text-lg font-bold">
                  Processing Withdrawal
                </h2>
                <p className="text-text/60 mt-2 font-mono text-xs">
                  Connecting to your bank...
                </p>
                <p className="text-text/40 mt-1 font-mono text-[10px]">
                  Please do not close this window
                </p>
              </div>
            )}

            {/* ─── SUCCESS STEP ─── */}
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
                    Withdrawal Successful
                  </h2>
                  <p className="text-text/70 mt-2 font-mono text-xs">
                    {formatBalance(numericAmount)} has been sent to {maskedCard}
                    .
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
                        onClick={handleCopyTxnId}
                        aria-label="Copy"
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
          </div>
        </div>
      </div>
    </>
  )
}
