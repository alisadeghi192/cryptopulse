import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Shield,
  LogOut,
  Download,
  ChevronRight,
  ChevronDown,
  Lock,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { Button } from '@/components/ui/Button'
import { PasswordField } from '@/components/ui/PasswordField'
import { useAuthStore } from '@/stores/useAuthStore'
import { useWatchlistStore } from '@/stores/useWatchlistStore'
import { useWalletStore } from '@/stores/useWalletStore'
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from '../schemas/changePasswordSchema'
import { cn } from '@/utils/cn'

export function SecuritySection() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const signOutAll = useAuthStore((s) => s.signOutAll)
  const changePassword = useAuthStore((s) => s.changePassword)
  
  const watchlistIds = useWatchlistStore((s) => s.coinIds)
  const wallet = useWalletStore((s) => s.wallet)
  const holdings = useWalletStore((s) => s.holdings)
  const transactions = useWalletStore((s) => s.transactions)

  const [passwordOpen, setPasswordOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: ChangePasswordFormData) => {
    const { error } = await changePassword(
      data.currentPassword,
      data.newPassword,
    )

    if (error) {
      toast.error('Failed to change password', { description: error })
      return
    }

    toast.success('Password changed', {
      description: 'Your password has been updated',
    })
    reset()
    setPasswordOpen(false)
  }

  const handleSignOutAll = async () => {
    setSigningOut(true)
    const { error } = await signOutAll()

    if (error) {
      toast.error('Failed to sign out', { description: error })
      setSigningOut(false)
      return
    }

    toast.success('Signed out from all devices')
    navigate('/')
  }

  const handleExport = () => {
    if (!user) return

    const data = {
      exported_at: new Date().toISOString(),
      profile: {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name ?? null,
        phone_number: user.user_metadata?.phone_number ?? null,
        card_number: user.user_metadata?.card_number ?? null,
        created_at: user.created_at,
      },
      wallet: {
        cash_balance: wallet?.cash_balance ?? 0,
        holdings: holdings.map(h => ({
          coin_id: h.coin_id,
          coin_symbol: h.coin_symbol,
          amount: h.amount,
          avg_buy_price: h.avg_buy_price,
        })),
        transactions: transactions.map(t => ({
          type: t.type,
          coin_symbol: t.coin_symbol,
          amount: t.amount,
          price: t.price,
          fee: t.fee,
          total_usd: t.total_usd,
          txn_id: t.txn_id,
          date: t.created_at,
        })),
      },
      watchlist: watchlistIds,
      preferences: {
        theme: localStorage.getItem('theme') ?? 'dark',
      },
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cryptopulse-export-${user.id.slice(0, 8)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success('Data exported', {
      description: 'Your account data and history have been downloaded',
    })
  }

  return (
    <div className="relative mt-6">
      <div className="mb-3 flex items-center gap-2">
        <Shield className="text-primary size-3.5" />
        <span className="text-primary font-mono text-[10px] tracking-[0.25em] uppercase">
          Security
        </span>
        <div className="bg-border h-px flex-1" />
      </div>

      <div className="relative overflow-hidden shadow-xl rounded-2xl">
        <div className="pointer-events-none absolute inset-0">
          <AmbientLights variant="multi" intensity="subtle" />
        </div>
        <div className="border-border/40 bg-surface/40 relative overflow-hidden rounded-2xl border shadow-lg backdrop-blur-3xl">
          {/* ── Change Password (Accordion) ── */}
          <div className="border-border/30 border-b">
            <button
              type="button"
              onClick={() => setPasswordOpen((o) => !o)}
              className="group hover:bg-elevated/30 cursor-pointer flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
              aria-expanded={passwordOpen}
            >
              <div className="flex items-center gap-3">
                <div className="border-primary/30 bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg border backdrop-blur-sm">
                  <Lock className="size-4" />
                </div>
                <div>
                  <p className="text-text text-sm font-medium">
                    Change Password
                  </p>
                  <p className="text-text/70 mt-0.5 font-mono text-[11px]">
                    Update your account password
                  </p>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  'text-text/70 group-hover:text-primary size-4 shrink-0 transition-transform duration-300',
                  passwordOpen && 'rotate-180',
                )}
              />
            </button>

            <div
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
                passwordOpen
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-3 px-5 pt-1 pb-5"
                  noValidate
                >
                  <PasswordField
                    id="current-password"
                    label="Current Password"
                    icon={Lock}
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    error={errors.currentPassword?.message}
                    {...register('currentPassword')}
                  />

                  <PasswordField
                    id="new-password"
                    label="New Password"
                    icon={Lock}
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    error={errors.newPassword?.message}
                    {...register('newPassword')}
                  />

                  <PasswordField
                    id="confirm-password"
                    label="Confirm New Password"
                    icon={Lock}
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    className="w-full gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Password'
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* ── Sign Out All Devices ── */}
          <button
            type="button"
            onClick={handleSignOutAll}
            disabled={signingOut}
            className="group hover:bg-error/5 border-border/30 cursor-pointer flex w-full items-center justify-between gap-4 border-b px-5 py-4 text-left transition-colors disabled:opacity-50"
          >
            <div className="flex items-center gap-3">
              <div className="border-error/30 bg-error/10 text-error flex size-9 shrink-0 items-center justify-center rounded-lg border backdrop-blur-sm">
                {signingOut ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <LogOut className="size-4" />
                )}
              </div>
              <div>
                <p className="text-text text-sm font-medium">
                  Sign Out from All Devices
                </p>
                <p className="text-text/70 mt-0.5 font-mono text-[11px]">
                  End all active sessions
                </p>
              </div>
            </div>
            <ChevronRight className="text-text/70 group-hover:text-error size-4 shrink-0 transition-all group-hover:translate-x-0.5" />
          </button>

          {/* ── Export Data ── */}
          <button
            type="button"
            onClick={handleExport}
            className="group hover:bg-elevated/30 cursor-pointer flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6] backdrop-blur-sm">
                <Download className="size-4" />
              </div>
              <div>
                <p className="text-text text-sm font-medium">Export Data</p>
                <p className="text-text/70 mt-0.5 font-mono text-[11px]">
                  Download your account data as JSON
                </p>
              </div>
            </div>
            <ChevronRight className="text-text/70 size-4 shrink-0 transition-all group-hover:translate-x-0.5 group-hover:text-[#3B82F6]" />
          </button>
        </div>
      </div>
    </div>
  )
}