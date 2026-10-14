import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { Camera, Trash2, Loader2, Mail, Phone, Calendar } from 'lucide-react'
import { EditableName } from './EditableName'
import { uploadAvatar, removeAvatar } from '@/lib/api/avatar'
import { useAuthStore } from '@/stores/useAuthStore'
import { confirm } from '@/lib/confirm'

interface ProfileHeaderProps {
  displayName: string
  email: string
  phone: string
  memberSince: string
  initial: string
  avatarUrl: string | null
  watchlistCount: number
  tradesCount: number
  onSaveName: (value: string) => void | Promise<void>
}

export function ProfileHeader({
  displayName,
  email,
  phone,
  memberSince,
  initial,
  avatarUrl,
  watchlistCount,
  tradesCount,
  onSaveName,
}: ProfileHeaderProps) {
  const updateProfile = useAuthStore((s) => s.updateProfile)
  const user = useAuthStore((s) => s.user)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [removing, setRemoving] = useState(false)

  const handleAvatarClick = () => {
    if (uploading || removing) return
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    setUploading(true)

    const { url, error: uploadError } = await uploadAvatar(user.id, file)

    if (uploadError || !url) {
      toast.error('Upload failed', { description: uploadError })
      setUploading(false)
      e.target.value = ''
      return
    }

    const { error: updateError } = await updateProfile({ avatar_url: url })

    setUploading(false)
    e.target.value = ''

    if (updateError) {
      toast.error('Failed to save avatar', { description: updateError })
      return
    }

    toast.success('Avatar updated')
  }

  const handleAvatarRemove = async () => {
    if (!user || !avatarUrl) return

    const ok = await confirm({
      title: 'Remove avatar?',
      description: 'This will delete your profile picture permanently.',
      confirmLabel: 'Remove',
      cancelLabel: 'Cancel',
      variant: 'danger',
    })

    if (!ok) return

    setRemoving(true)

    const { error: removeError } = await removeAvatar(user.id)

    if (removeError) {
      toast.error('Failed to remove avatar', { description: removeError })
      setRemoving(false)
      return
    }

    const { error: updateError } = await updateProfile({ avatar_url: '' })

    setRemoving(false)

    if (updateError) {
      toast.error('Failed to update profile', { description: updateError })
      return
    }

    toast.success('Avatar removed')
  }

  const busy = uploading || removing

  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div className="pointer-events-none absolute inset-0">
        <AmbientLights variant="hero" intensity="normal" />
      </div>
      <div className="border-border/40 bg-surface/40 relative rounded-3xl border shadow-2xl backdrop-blur-3xl">
        <div className="px-6 pt-8 pb-6 md:px-8 md:pt-10 md:pb-8">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
            {/* ─── Avatar + Actions ─── */}
            <div className="flex shrink-0 items-center gap-3">
              <div className="relative">
                <div className="bg-primary/40 absolute inset-0 rounded-full blur-2xl" />

                <div className="border-background/30 relative flex size-20 items-center justify-center overflow-hidden rounded-full border-[3px] shadow-xl md:size-24">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="bg-primary text-background flex h-full w-full items-center justify-center text-2xl font-bold md:text-3xl">
                      {initial}
                    </div>
                  )}
                </div>

                <div
                  className={`border-background bg-success pointer-events-none absolute right-1 bottom-1 size-5 rounded-full border-[3px] transition-opacity duration-200 ${
                    busy ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <span className="bg-success absolute inset-0 animate-ping rounded-full opacity-75" />
                </div>

                {busy && (
                  <div className="bg-background/70 absolute inset-0 flex items-center justify-center rounded-full backdrop-blur-sm">
                    <Loader2 className="text-text size-5 animate-spin" />
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  disabled={busy}
                  aria-label="Change avatar"
                  className="md:border-border/40 md:bg-surface/40 md:text-text/70 md:hover:border-primary/40 border-primary/40 md:hover:bg-primary/10 bg-primary/10 md:hover:text-primary text-primary flex size-10 cursor-pointer items-center justify-center rounded-lg border backdrop-blur-sm transition-colors disabled:opacity-50"
                >
                  {uploading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <Camera className="size-5" />
                  )}
                </button>

                {avatarUrl && (
                  <button
                    type="button"
                    onClick={handleAvatarRemove}
                    disabled={busy}
                    aria-label="Remove avatar"
                    className="md:border-border/40 md:bg-surface/40 md:text-text/70 md:hover:border-error/40 border-error/40 md:hover:bg-error/10 bg-error/10 md:hover:text-error text-error flex size-10 cursor-pointer items-center justify-center rounded-lg border backdrop-blur-sm transition-colors disabled:opacity-50"
                  >
                    {removing ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      <Trash2 className="size-5" />
                    )}
                  </button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* ─── Info ─── */}
            <div className="min-w-0 flex-1">
              <EditableName value={displayName} onSave={onSaveName} />

              <div className="text-text/70 mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs">
                <span className="flex items-center gap-1.5">
                  <Mail className="size-3.5" />
                  {email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="size-3.5" />
                  {phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  Joined {memberSince}
                </span>
              </div>
            </div>

            {/* ─── Stats ─── */}
            <div className="border-border/60 flex w-full shrink-0 items-center justify-around gap-4 border-t pt-6 md:w-auto md:justify-end md:gap-8 md:border-t-0 md:border-l md:pt-0 md:pl-8">
              <div className="text-center md:text-left">
                <p className="text-text font-mono text-2xl font-bold tabular-nums">
                  {watchlistCount}
                </p>
                <p className="text-text/60 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                  Watchlist
                </p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-text font-mono text-2xl font-bold tabular-nums">
                  {tradesCount}
                </p>
                <p className="text-text/60 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                  Trades
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}