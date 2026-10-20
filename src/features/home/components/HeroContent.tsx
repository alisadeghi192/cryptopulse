import { Link } from 'react-router'
import {
  ArrowRight,
  Zap,
  Coins,
  Shield,
  LayoutDashboard,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/Button'
import { BlurFade } from '@/components/ui/BlurFade'
import { useAuthStore } from '@/stores/useAuthStore'
import { cn } from '@/utils/cn'

export function HeroContent() {
  const isAuthenticated = !!useAuthStore((s) => s.user)

  return (
    <div className="flex flex-col items-start gap-6 lg:col-span-6">
      {/* 1. Badges */}
      <div className="xs:flex-row xs:justify-evenly flex w-full flex-col items-center gap-4 sm:justify-start">
        <BlurFade delay={0.1}>
          <span className="border-success/30 bg-success/10 text-success inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-success relative inline-flex h-2 w-2 rounded-full" />
            </span>
            Live Market Data
          </span>
        </BlurFade>
        
        {!isAuthenticated && (
          <BlurFade delay={0.1}>
            <span className="border-primary/30 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
              </span>
              $1,000 free to start trading
            </span>
          </BlurFade>
        )}
      </div>

      {/* 2. Headline */}
      <BlurFade delay={0.2}>
        <h1 className="font-display text-center text-5xl leading-[1.05] font-bold tracking-tight sm:text-start md:text-6xl lg:text-7xl">
          {isAuthenticated ? (
            <>
              Welcome Back.
              <br />
              Let's{' '}
              <span className="from-primary via-primary-hover to-primary bg-linear-to-r bg-clip-text text-transparent">
                Trade.
              </span>
            </>
          ) : (
            <>
              Track{' '}
              <span className="from-primary via-primary-hover to-primary bg-linear-to-r bg-clip-text text-transparent">
                Live.
              </span>{' '}
              Trade{' '}
              <span className="from-success via-success/80 to-success bg-linear-to-r bg-clip-text text-transparent">
                Free.
              </span>
            </>
          )}
        </h1>
      </BlurFade>

      {/* 3. Subheadline */}
      <BlurFade delay={0.3}>
        <p className="text-text-secondary max-w-xl text-center text-lg sm:text-start">
          {isAuthenticated ? (
            <>
              Your portfolio is live. Spot the next opportunity and grow your
              virtual funds.
            </>
          ) : (
            <>
              Get{' '}
              <span className="text-text font-semibold">
                $1,000 to start
              </span>
              , with unlimited virtual funding. Practice trading on real-time
              markets with zero risk.
            </>
          )}
        </p>
      </BlurFade>

      {/* 4. CTAs */}
      <BlurFade delay={0.4} className="w-full">
        <div className="flex basis-full flex-wrap items-center gap-3 pt-2">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className={cn(
                buttonVariants({ variant: 'primary', size: 'lg' }),
                'group gap-2 shadow-lg max-sm:w-full',
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/register"
              className={cn(
                buttonVariants({ variant: 'primary', size: 'lg' }),
                'group gap-2 shadow-lg max-sm:w-full',
              )}
            >
              Get $1,000 Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
          
          <Link
            to="/markets"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'max-sm:w-full shadow-lg',
            )}
          >
            Explore Markets
          </Link>
        </div>
      </BlurFade>

      {/* 5. Trust badges */}
      <BlurFade delay={0.5}>
        <div className="text-text-secondary flex flex-wrap items-center justify-evenly gap-6 pt-4 text-sm">
          <div className="flex items-center gap-2">
            <Zap className="text-success h-4 w-4" />
            <span>Live prices</span>
          </div>
          <div className="flex items-center gap-2">
            <Coins className="text-success h-4 w-4" />
            <span>5,000+ coins</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="text-success h-4 w-4" />
            <span>Zero Risk</span>
          </div>
          {!isAuthenticated && (
            <div className="flex items-center gap-2">
              <ArrowRight className="text-primary h-4 w-4" />
              <span className="text-primary">Start for Free</span>
            </div>
          )}
        </div>
      </BlurFade>
    </div>
  )
}