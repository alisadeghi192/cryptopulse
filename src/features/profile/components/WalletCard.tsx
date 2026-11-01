import { Link as LinkIcon, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

interface WalletCardProps {
  address: string
}

export function WalletCard({ address }: WalletCardProps) {
  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(address)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = address
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      toast.success('Copied!', {
        description: 'Wallet address copied to clipboard',
      })
    } catch {
      toast.error('Failed to copy', {
        description: 'Please copy manually',
      })
    }
  }

  return (
    <div className="relative h-full shadow-md overflow-hidden rounded-2xl">
      <div className="pointer-events-none absolute inset-0">
        <AmbientLights variant="green" intensity="subtle" />
      </div>
      <SpotlightCard
        spotlightColor="rgba(34, 197, 94, 0.15)"
        className="border-border/40 bg-surface/40 group/card relative h-full rounded-2xl border p-5 shadow-lg backdrop-blur-3xl"
      >
        <LinkIcon
          className="text-success pointer-events-none absolute -right-4 -bottom-4 h-28 w-28 opacity-20 transition-opacity duration-300 group-hover/card:opacity-30 dark:opacity-5 dark:group-hover/card:opacity-10"
          strokeWidth={1.5}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <LinkIcon className="text-success size-4" />
              <span className="text-text/70 font-mono text-sm tracking-widest uppercase">
                Wallet Address
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy wallet address"
              className="text-text/40 hover:text-success shrink-0 transition-colors md:opacity-0 md:group-hover/card:opacity-100"
            >
              <Copy className="size-6 cursor-pointer" />
            </button>
          </div>
          <p className="text-text mt-3 truncate font-mono text-sm font-semibold tabular-nums md:text-base">
            {address}
          </p>
          <p className="text-text/70 mt-1 font-mono text-[10px]">
            Your unique wallet ID
          </p>
        </div>
      </SpotlightCard>
    </div>
  )
}