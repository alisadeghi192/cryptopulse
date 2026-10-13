import { AmbientLights } from '@/components/ui/AmbientLights'
import { Pencil, Mail, Phone, Calendar } from 'lucide-react'
import { EditableName } from './EditableName'

interface ProfileHeaderProps {
  displayName: string
  email: string
  phone: string
  memberSince: string
  initial: string
  onSaveName: (value: string) => void
}

export function ProfileHeader({
  displayName,
  email,
  phone,
  memberSince,
  initial,
  onSaveName,
}: ProfileHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div className="pointer-events-none absolute inset-0">
        <AmbientLights variant="hero" intensity="normal" />
      </div>
      <div className="border-border/40 bg-surface/40 relative rounded-3xl border shadow-2xl backdrop-blur-3xl">
        <div className="px-6 pt-8 pb-6 md:px-8 md:pt-10 md:pb-8">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
            {/* Avatar */}
            <div className="group/avatar relative shrink-0">
              <div className="bg-primary/40 absolute inset-0 rounded-full blur-2xl" />
              <div className="border-background/30 bg-primary text-background relative flex size-20 items-center justify-center rounded-full border-[3px] text-2xl font-bold shadow-xl md:size-24 md:text-3xl">
                {initial}
              </div>
              <div className="border-background bg-success absolute right-1 bottom-1 size-5 rounded-full border-[3px]">
                <span className="bg-success absolute inset-0 animate-ping rounded-full opacity-75" />
              </div>

              <button
                type="button"
                aria-label="Change avatar"
                className="bg-background/70 text-text absolute inset-0 flex items-center justify-center rounded-full opacity-0 backdrop-blur-sm transition-opacity group-hover/avatar:opacity-100"
              >
                <Pencil className="size-6" />
              </button>
            </div>

            {/* Info */}
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

            {/* Stats */}
            <div className="border-border/60 flex w-full shrink-0 items-center justify-around gap-4 border-t pt-6 md:w-auto md:justify-end md:gap-8 md:border-t-0 md:border-l md:pt-0 md:pl-8">
              <div className="text-center md:text-left">
                <p className="text-text font-mono text-2xl font-bold tabular-nums">
                  0
                </p>
                <p className="text-text/60 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                  Watchlist
                </p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-text font-mono text-2xl font-bold tabular-nums">
                  0
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