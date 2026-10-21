import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import {
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
import { Modal, ModalBody, ModalContent } from '@/components/ui/AnimatedModal'
import { useWalletActions } from '@/hooks/useWalletActions'
import { useTransactionFlow, type FlowStep } from '@/hooks/useTransactionFlow'
import { useAuthStore } from '@/stores/useAuthStore'
import { formatBalance } from '@/utils/format'
import { maxWithdrawUsd } from '@/utils/trade'
import { cn } from '@/utils/cn'

interface WithdrawModalProps {
  open: boolean
  onClose: () => void
  currentBalance: number
}

type Step = 'no-card' | FlowStep

export function WithdrawModal({
  open,
  onClose,
  currentBalance,
}: WithdrawModalProps) {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const { withdraw, WITHDRAW_FEE } = useWalletActions()
  const {
    step: flowStep,
    setStep: setFlowStep,
    txnId,
    reset,
    run,
  } = useTransactionFlow()

  const cardNumber = (user?.user_metadata?.card_number as string) ?? ''
  const hasCard = !!cardNumber
  const maskedCard = cardNumber ? `•••• ${cardNumber.slice(-4)}` : ''

  const [amount, setAmount] = useState('')
  const [showNoCard, setShowNoCard] = useState(!hasCard)
  const step: Step = showNoCard ? 'no-card' : flowStep

  useEffect(() => {
    if (open) {
      setAmount('')
      reset()
      setShowNoCard(!hasCard)
    }
  }, [open, hasCard, reset])

  const numericAmount = parseFloat(amount) || 0
  const isValid = numericAmount >= 10 && numericAmount <= currentBalance

  const handleMax = () => {
    setAmount(maxWithdrawUsd(currentBalance).toFixed(2))
  }

  const handleConfirm = async () => {
    const error = await run(() => withdraw(numericAmount))
    if (error) toast.error('Withdrawal failed', { description: error })
  }

  const copyTxn = () => {
    navigator.clipboard.writeText(txnId)
    toast.success('Transaction ID copied')
  }

  const goToProfile = () => {
    onClose()
    navigate('/profile')
  }

  const goBack = () => setFlowStep('input')

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
            variant={step === 'success' ? 'green' : 'modal-withdraw'}
            intensity="normal"
          />
        </div>

        <ModalContent>
          {step === 'no-card' && (
            <>
              <div className="mb-6 flex items-center gap-3">
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

              <p className="text-text/70 mb-5 font-mono text-xs leading-relaxed">
                Please add a card number in your profile before withdrawing
                funds.
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
                  onClick={goToProfile}
                  className="flex-1 cursor-pointer"
                >
                  Go to Profile
                </Button>
              </div>
            </>
          )}

          {step === 'input' && (
            <>
              <div className="mb-6 flex items-start gap-2">
                <ArrowUpFromLine className="text-primary mt-0.5 size-4" />
                <div>
                  <h2 className="font-display text-text text-xl font-bold">
                    Withdraw
                  </h2>
                  <p className="text-text/60 font-mono text-xs">
                    Send funds to your card
                  </p>
                </div>
              </div>

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

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (isValid) setFlowStep('confirm')
                }}
                className="space-y-4"
              >
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="withdraw-amount"
                      className="text-text/70 font-mono text-[10px] tracking-widest uppercase"
                    >
                      Amount (USD)
                    </label>
                    <button
                      type="button"
                      onClick={handleMax}
                      className="text-primary hover:text-primary/80 cursor-pointer font-mono text-[10px] transition-colors"
                    >
                      MAX
                    </button>
                  </div>
                  <div className="border-border bg-background/50 focus-within:border-primary/50 flex h-14 items-center gap-2 rounded-xl border px-4 transition-all focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)]">
                    <span className="text-text/60 shrink-0 font-mono text-lg">
                      $
                    </span>
                    <input
                      id="withdraw-amount"
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
                    Min $10 · Fee: ${WITHDRAW_FEE.toFixed(2)} (deducted from
                    amount)
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

                {numericAmount > currentBalance && (
                  <p className="text-error font-mono text-[11px]">
                    Exceeds available balance
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
                    Requested
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

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={goBack}
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
                Processing Withdrawal
              </h2>
              <p className="text-text/60 mt-2 font-mono text-xs">
                Connecting to your bank...
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
                  Withdrawal Successful
                </h2>
                <p className="text-text/70 mt-2 font-mono text-xs">
                  {formatBalance(numericAmount - WITHDRAW_FEE)} has been sent to{' '}
                  {maskedCard}.
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
