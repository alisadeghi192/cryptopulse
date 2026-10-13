import { Wallet as WalletIcon } from 'lucide-react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { BlurFade } from '@/components/ui/BlurFade'

export function Wallet() {
  return (
    <main className="bg-background relative min-h-full">
      <AmbientLights variant="home" intensity="subtle" />

      <div className="relative z-10 mx-auto w-full px-4 py-8 md:px-6 md:py-12">
        <BlurFade>
          <div className="mb-8">
            <div className="text-text/70 mb-2 flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
              <WalletIcon className="text-primary size-3.5" />
              Your portfolio
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Wallet
            </h1>
          </div>
        </BlurFade>

        <BlurFade delay={0.1}>
          <div className="border-border/40 bg-surface/40 flex h-96 items-center justify-center rounded-2xl border backdrop-blur-2xl">
            <p className="text-text/70 font-mono text-sm">
              Wallet page coming soon
            </p>
          </div>
        </BlurFade>
      </div>
    </main>
  )
}