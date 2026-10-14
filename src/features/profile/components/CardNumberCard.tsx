import { useState } from 'react'
import { CreditCard, Pencil, X, Check, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { useAuthStore } from '@/stores/useAuthStore'
import { cn } from '@/utils/cn'

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

export function CardNumberCard() {
  const user = useAuthStore((s) => s.user)
  const updateProfile = useAuthStore((s) => s.updateProfile)

  const savedCard = (user?.user_metadata?.card_number as string) ?? ''
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const [saving, setSaving] = useState(false)

  const digits = draft.replace(/\D/g, '')
  const isValid = digits.length === 16

  const handleEdit = () => {
    setDraft(savedCard)
    setEditing(true)
  }

  const handleCancel = () => {
    setDraft('')
    setEditing(false)
  }

  const handleSave = async () => {
    if (!isValid) {
      toast.error('Invalid card number', {
        description: 'Card number must be exactly 16 digits',
      })
      return
    }

    setSaving(true)

    const { error } = await updateProfile({ card_number: digits })

    setSaving(false)

    if (error) {
      toast.error('Failed to save card number', { description: error })
      return
    }

    toast.success('Card number saved')
    setDraft('')
    setEditing(false)
  }

  return (
    <div className="relative h-full overflow-hidden rounded-2xl">
      <div className="pointer-events-none absolute inset-0">
        <AmbientLights variant="lightblue" intensity="subtle" />
      </div>
      <SpotlightCard
        spotlightColor="rgba(59, 130, 246, 0.15)"
        className="border-border/40 bg-surface/40 group/card relative h-full rounded-2xl border p-5 shadow-lg backdrop-blur-3xl"
      >
        <CreditCard
          className="pointer-events-none absolute -right-4 -bottom-4 h-28 w-28 text-[#3B82F6] opacity-20 transition-opacity duration-300 group-hover/card:opacity-30 dark:opacity-5 dark:group-hover/card:opacity-10"
          strokeWidth={1.5}
        />

        <div className="relative z-10">
          {/* ─── Header ─── */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <CreditCard className="size-4 text-[#3B82F6]" />
              <span className="text-text/70 font-mono text-[10px] tracking-widest uppercase">
                Card Number
              </span>
            </div>

            {!editing ? (
              <button
                type="button"
                onClick={handleEdit}
                aria-label="Edit card number"
                className="text-text/40 hover:text-[#3B82F6] -mt-0.5 shrink-0 transition-colors"
              >
                <Pencil className="size-4 cursor-pointer" />
              </button>
            ) : (
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || !isValid}
                  aria-label="Save"
                  className="text-success hover:bg-success/15 flex size-7 items-center justify-center rounded-md transition-colors disabled:opacity-30"
                >
                  {saving ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Check className="size-4 cursor-pointer" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  aria-label="Cancel"
                  className="text-text/50 hover:bg-elevated/40 hover:text-text flex size-7 items-center justify-center rounded-md transition-colors disabled:opacity-50"
                >
                  <X className="size-4 cursor-pointer" />
                </button>
              </div>
            )}
          </div>

          {/* ─── Body ─── */}
          {editing ? (
            <div className="mt-3">
              <input
                type="text"
                inputMode="numeric"
                value={formatCardNumber(draft)}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="0000 0000 0000 0000"
                autoFocus
                disabled={saving}
                className={cn(
                  'text-text placeholder:text-text/40 w-full border-b-2 bg-transparent pb-1 font-mono text-base font-semibold tabular-nums outline-none transition-colors md:text-lg',
                  isValid
                    ? 'border-primary/40 focus:border-primary'
                    : 'border-border focus:border-primary/50',
                  saving && 'opacity-50',
                )}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave()
                  if (e.key === 'Escape') handleCancel()
                }}
              />
              <p className="text-text/60 mt-2 font-mono text-[10px]">
                {digits.length}/16 digits
              </p>
            </div>
          ) : savedCard ? (
            <>
              <p className="text-text mt-3 font-mono text-base font-semibold tabular-nums md:text-lg">
                {formatCardNumber(savedCard)}
              </p>
              <p className="text-text/70 mt-1 font-mono text-[10px]">
                Withdrawals go here
              </p>
            </>
          ) : (
            <>
              <p className="text-text mt-3 font-mono text-sm font-medium">
                Please add your card number
              </p>
              <p className="text-text/70 mt-1 font-mono text-[10px]">
                Add your 16-digit card for withdrawals
              </p>
            </>
          )}
        </div>
      </SpotlightCard>
    </div>
  )
}