import { Mail, Phone, Calendar } from 'lucide-react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { AvatarUploader } from './AvatarUploader'
import { EditableName } from './EditableName'
import { ProfileStats } from './ProfileStats'

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
  return (
    <div className="relative overflow-hidden shadow-xl rounded-3xl">
      <div className="pointer-events-none absolute inset-0">
        <AmbientLights variant="hero" intensity="normal" />
      </div>
      <div className="border-border/40 bg-surface/40 relative rounded-3xl border shadow-2xl backdrop-blur-3xl">
        <div className="px-6 pt-8 pb-6 md:px-8 md:pt-10 md:pb-8">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
            <AvatarUploader
              avatarUrl={avatarUrl}
              displayName={displayName}
              initial={initial}
            />

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

            <ProfileStats
              watchlistCount={watchlistCount}
              tradesCount={tradesCount}
            />
          </div>
        </div>
      </div>
    </div>
  )
}