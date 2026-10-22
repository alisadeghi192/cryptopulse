import { useRef, useState } from 'react'
import { Camera, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { uploadAvatar, removeAvatar } from '@/lib/api/avatar'
import { useAuthStore } from '@/stores/useAuthStore'
import { confirm } from '@/lib/confirm'

interface AvatarUploaderProps {
  avatarUrl: string | null
  displayName: string
  initial: string
}

export function AvatarUploader({
  avatarUrl,
  displayName,
  initial,
}: AvatarUploaderProps) {
  const user = useAuthStore((s) => s.user)
  const updateProfile = useAuthStore((s) => s.updateProfile)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [removing, setRemoving] = useState(false)

  const busy = uploading || removing

  const handleAvatarClick = () => {
    if (busy) return
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

  return (
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
  )
}