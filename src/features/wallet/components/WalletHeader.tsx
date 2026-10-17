import { Wallet as WalletIcon } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'

export function WalletHeader() {
  return (
    <BlurFade>
      <div className="mb-6">
        <div className="text-text/70 mb-2 flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
          <WalletIcon className="text-primary size-3.5" />
          Your portfolio
        </div>
        <h1 className="font-display text-text text-3xl font-bold tracking-tight md:text-4xl">
          Wallet
        </h1>
      </div>
    </BlurFade>
  )
}