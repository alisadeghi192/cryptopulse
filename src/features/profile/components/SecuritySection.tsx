import { useState } from 'react'
import {
  Shield,
  LogOut,
  Download,
  ChevronRight,
  ChevronDown,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

export function SecuritySection() {
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: supabase.auth.signInWithPassword + updateUser
  }

  const handleSignOutAll = () => {
    // TODO: supabase.auth.signOut({ scope: 'global' })
  }

  const handleExport = () => {
    // TODO: build JSON + download
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

      <div className="relative overflow-hidden rounded-2xl">
        <div className="pointer-events-none absolute inset-0">
          <AmbientLights variant="multi" intensity="subtle" />
        </div>
        <div className="border-border/40 bg-surface/40 relative overflow-hidden rounded-2xl border shadow-lg backdrop-blur-3xl">
          {/* ── Change Password (Accordion) ── */}
          <div className="border-border/30 border-b">
            <button
              type="button"
              onClick={() => setPasswordOpen((o) => !o)}
              className="group cursor-pointer hover:bg-elevated/30 flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
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

            {/* Grid trick for smooth accordion */}
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
                  onSubmit={handleChangePassword}
                  className="space-y-3 px-5 pt-1 pb-5"
                >
                  {/* Current Password */}
                  <div>
                    <label
                      htmlFor="current-password"
                      className="text-text/70 mb-1.5 block font-mono text-[10px] tracking-widest uppercase"
                    >
                      Current Password
                    </label>
                    <div className="focus-within:border-primary/50 border-border bg-background/50 flex h-10 items-center gap-2 rounded-lg border px-3 transition-all focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)]">
                      <Lock className="text-text/70 size-3.5 shrink-0" />
                      <input
                        id="current-password"
                        type={showCurrent ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="text-text placeholder:text-text/40 h-full w-full bg-transparent font-mono text-sm outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrent((s) => !s)}
                        className="text-text/70 hover:text-text shrink-0 transition-colors"
                        aria-label={
                          showCurrent ? 'Hide password' : 'Show password'
                        }
                      >
                        {showCurrent ? (
                          <EyeOff className="size-3.5" />
                        ) : (
                          <Eye className="size-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label
                      htmlFor="new-password"
                      className="text-text/70 mb-1.5 block font-mono text-[10px] tracking-widest uppercase"
                    >
                      New Password
                    </label>
                    <div className="focus-within:border-primary/50 border-border bg-background/50 flex h-10 items-center gap-2 rounded-lg border px-3 transition-all focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)]">
                      <Lock className="text-text/70 size-3.5 shrink-0" />
                      <input
                        id="new-password"
                        type={showNew ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="text-text placeholder:text-text/40 h-full w-full bg-transparent font-mono text-sm outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew((s) => !s)}
                        className="text-text/70 hover:text-text shrink-0 transition-colors"
                        aria-label={showNew ? 'Hide password' : 'Show password'}
                      >
                        {showNew ? (
                          <EyeOff className="size-3.5" />
                        ) : (
                          <Eye className="size-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="text-text/70 mb-1.5 block font-mono text-[10px] tracking-widest uppercase"
                    >
                      Confirm New Password
                    </label>
                    <div className="focus-within:border-primary/50 border-border bg-background/50 flex h-10 items-center gap-2 rounded-lg border px-3 transition-all focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)]">
                      <Lock className="text-text/70 size-3.5 shrink-0" />
                      <input
                        id="confirm-password"
                        type={showConfirm ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="text-text placeholder:text-text/40 h-full w-full bg-transparent font-mono text-sm outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((s) => !s)}
                        className="text-text/70 hover:text-text shrink-0 transition-colors"
                        aria-label={
                          showConfirm ? 'Hide password' : 'Show password'
                        }
                      >
                        {showConfirm ? (
                          <EyeOff className="size-3.5" />
                        ) : (
                          <Eye className="size-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full"
                  >
                    Update Password
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* ── Sign Out All Devices ── */}
          <button
            type="button"
            onClick={handleSignOutAll}
            className="group cursor-pointer hover:bg-error/5 border-border/30 flex w-full items-center justify-between gap-4 border-b px-5 py-4 text-left transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="border-error/30 bg-error/10 text-error flex size-9 shrink-0 items-center justify-center rounded-lg border backdrop-blur-sm">
                <LogOut className="size-4" />
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
            className="group cursor-pointer hover:bg-elevated/30 flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
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
