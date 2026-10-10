// src/pages/NotFound.tsx
import { Link } from 'react-router'
import { ArrowLeft, Compass } from 'lucide-react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { BlurFade } from '@/components/ui/BlurFade'
import { GridPattern } from '@/components/ui/GridPattern'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

export function NotFound() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <AmbientLights variant="aurora" intensity="subtle" />
        <GridPattern className="opacity-[0.05]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* 4 ₿ 4 */}
        <BlurFade delay={0.1}>
          <div
            className="flex items-center justify-center gap-2 md:gap-4"
            style={{ animation: 'notfound-float 4s ease-in-out infinite' }}
          >
            {/* 4 */}
            <span className="font-display text-[100px] leading-none font-black tracking-tighter text-primary md:text-[180px]">
              4
            </span>

            {/* Gold Coin with ₿ */}
            <div className="relative size-20 shrink-0 md:size-35">
              {/* Outer glow */}
              <div className="bg-primary/40 absolute inset-0 rounded-full blur-2xl" />

              {/* Coin body */}
              <div className="bg-primary-hover absolute inset-0 rounded-full shadow-[inset_0_-4px_8px_rgba(0,0,0,0.3),0_8px_32px_rgba(255,193,7,0.5)]">
                <div className="from-primary-hover via-primary to-primary-hover absolute inset-1 rounded-full bg-linear-to-br" />

                {/* Inner ring */}
                <div className="border-primary-hover/40 absolute inset-[15%] rounded-full border-2" />

                {/* Highlight */}
                <div className="absolute top-2 left-4 h-3 w-6 rounded-full bg-white/40 blur-[2px] md:top-3 md:left-6 md:h-4 md:w-10" />
              </div>

              {/* ₿ */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-display text-background text-3xl font-bold md:text-5xl"
                  style={{ textShadow: '0 1px 2px rgba(255,255,255,0.3)' }}
                >
                  ₿
                </span>
              </div>
            </div>

            {/* 4 */}
            <span className="font-display text-[100px] leading-none font-black tracking-tighter text-primary md:text-[180px]">
              4
            </span>
          </div>
        </BlurFade>

        {/* Divider line */}
        <BlurFade delay={0.2}>
          <div className="mx-auto mt-8 flex max-w-md items-center gap-3">
            <div className="bg-border h-px flex-1" />
            <span className="text-text-secondary font-mono text-[10px] tracking-[0.3em] uppercase">
              Page not found
            </span>
            <div className="bg-border h-px flex-1" />
          </div>
        </BlurFade>

        {/* Subheadline */}
        <BlurFade delay={0.3}>
          <p className="text-text-secondary mx-auto mt-6 max-w-md text-sm leading-7 md:text-base">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
        </BlurFade>

        {/* Actions */}
        <BlurFade delay={0.4}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className={cn(
                buttonVariants({ variant: 'primary', size: 'lg' }),
                'group gap-2',
              )}
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
            <Link
              to="/markets"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'gap-2',
              )}
            >
              <Compass className="size-4" />
              Explore Markets
            </Link>
          </div>
        </BlurFade>
      </div>
    </main>
  )
}