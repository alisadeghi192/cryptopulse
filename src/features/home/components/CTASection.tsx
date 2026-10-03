import { Link } from 'react-router'
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react'
import { buttonVariants } from '@/components/ui/Button'
import { BlurFade } from '@/components/ui/BlurFade'
import { cn } from '@/utils/cn'
import { AmbientLights } from '@/components/ui/AmbientLights'

export function CTASection() {
  return (
    <section className="relative py-20 md:py-32 container">
      {/* ─── Neon Lights  ─── */}
      <AmbientLights variant="multi" />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <BlurFade delay={0.1}>
          {/* ─── Glass Card ─── */}
          <div
            className={cn(
              'relative overflow-hidden rounded-3xl',
              'bg-surface/60 backdrop-blur-xl',
              'border-2 p-8 text-center md:p-16',

              // ─── Light Mode:   ───
              'border-black/5',
              'shadow-[inset_0_4px_8px_rgba(0,0,0,0.15),inset_0_8px_20px_rgba(0,0,0,0.12),inset_0_-4px_8px_rgba(255,255,255,0.9),0_20px_40px_-10px_rgba(0,0,0,0.25)]',

              // ─── Dark Mode:   ───
              'dark:border-white/10',
              'dark:shadow-[inset_0_4px_8px_rgba(255,255,255,0.2),inset_0_8px_20px_rgba(0,0,0,0.5),inset_0_-4px_8px_rgba(0,0,0,0.5),0_30px_60px_-10px_rgba(0,0,0,0.8)]',
            )}
          >
            {/* ─── Top Inner Glow ─── */}
            <div className="bg-primary/20 pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-[80px]" />

            {/* ─── Content ─── */}
            <div className="relative z-10">
              {/* Badge */}
              <div className="mb-6 inline-flex">
                <span className="border-primary/30 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs backdrop-blur-sm">
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  Start in 30 seconds
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-display mb-4 text-4xl leading-tight font-bold tracking-tight md:text-6xl">
                Ready to Start{' '}
                <span className="from-primary via-primary-hover to-primary bg-linear-to-r bg-clip-text text-transparent">
                  Trading?
                </span>
              </h2>

              {/* Subheadline */}
              <p className="text-text-secondary mx-auto mb-8 max-w-lg text-lg">
                Get{' '}
                <span className="text-text font-semibold">
                  $1,000 in virtual funds
                </span>{' '}
                and start trading instantly. No risk, no credit card.
              </p>

              {/* CTA Buttons */}
              <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className={cn(
                    buttonVariants({ variant: 'primary', size: 'lg' }),
                    'group shadow-primary/30 w-full gap-2 shadow-2xl sm:w-auto',
                  )}
                >
                  Get $1,000 Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/markets"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'w-full sm:w-auto',
                  )}
                >
                  Explore Markets
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="text-text-secondary flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="text-success h-4 w-4" />
                  <span>Setup in 30 seconds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="text-success h-4 w-4" />
                  <span>No credit card</span>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
