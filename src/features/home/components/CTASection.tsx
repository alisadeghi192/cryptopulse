import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowRight, Sparkles, Zap, Shield, LayoutDashboard, Mail } from 'lucide-react'
import { buttonVariants } from '@/components/ui/Button'
import { BlurFade } from '@/components/ui/BlurFade'
import { useAuthStore } from '@/stores/useAuthStore'
import { cn } from '@/utils/cn'
import { AmbientLights } from '@/components/ui/AmbientLights'

export function CTASection() {
  const isAuthenticated = !!useAuthStore((s) => s.user)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to register with email prefilled
    if (email.trim()) {
      navigate(`/register?email=${encodeURIComponent(email.trim())}`)
    } else {
      navigate('/register')
    }
  }

  return (
    <section className="relative py-20 md:py-32">
      <AmbientLights variant="multi" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <BlurFade delay={0.1}>
          {/* ─── Glass Card ─── */}
          <div
            className={cn(
              'relative overflow-hidden rounded-3xl',
              'bg-surface/60 backdrop-blur-xl',
              'border-2 p-8 text-center md:p-16',
              // Light Mode
              'border-black/5',
              'shadow-[inset_0_4px_8px_rgba(0,0,0,0.15),inset_0_8px_20px_rgba(0,0,0,0.12),inset_0_-4px_8px_rgba(255,255,255,0.9),0_20px_40px_-10px_rgba(0,0,0,0.25)]',
              // Dark Mode
              'dark:border-white/10',
              'dark:shadow-[inset_0_4px_8px_rgba(255,255,255,0.2),inset_0_8px_20px_rgba(0,0,0,0.5),inset_0_-4px_8px_rgba(0,0,0,0.5),0_30px_60px_-10px_rgba(0,0,0,0.8)]',
            )}
          >
            <div className="bg-primary/20 pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-[80px]" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="mb-6 inline-flex">
                <span className="border-primary/30 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs backdrop-blur-sm">
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  {isAuthenticated ? 'Welcome to CryptoPulse' : 'Start in 30 seconds'}
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-display mb-4 text-4xl leading-tight font-bold tracking-tight md:text-6xl">
                {isAuthenticated ? (
                  <>
                    Your Dashboard is{' '}
                    <span className="from-primary via-primary-hover to-primary bg-linear-to-r bg-clip-text text-transparent">
                      Ready.
                    </span>
                  </>
                ) : (
                  <>
                    Ready to Start{' '}
                    <span className="from-primary via-primary-hover to-primary bg-linear-to-r bg-clip-text text-transparent">
                      Trading?
                    </span>
                  </>
                )}
              </h2>

              {/* Subheadline */}
              <p className="text-text-secondary mx-auto mb-8 max-w-lg text-lg">
                {isAuthenticated ? (
                  <>
                    Manage your virtual portfolio, track real-time prices, and
                    execute trades with zero risk.
                  </>
                ) : (
                  <>
                    Enter your email to get{' '}
                    <span className="text-text font-semibold">
                      $1,000 in virtual funds
                    </span>{' '}
                    and start trading instantly. No credit card required.
                  </>
                )}
              </p>

              {/* Input/Buttons */}
              {isAuthenticated ? (
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    to="/dashboard"
                    className={cn(
                      buttonVariants({ variant: 'primary', size: 'lg' }),
                      'group shadow-primary/30 w-full gap-2 shadow-2xl sm:w-auto',
                    )}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Go to Dashboard
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
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto flex w-full max-w-md flex-col items-center gap-3 sm:flex-row"
                  noValidate
                >
                  <div className="border-border/60 bg-background/50 focus-within:border-primary/50 flex h-12 w-full items-center gap-2 rounded-lg border px-4 backdrop-blur-sm transition-all focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)]">
                    <Mail className="text-text/50 h-4 w-4 shrink-0" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="text-text placeholder:text-text/40 h-full w-full bg-transparent font-mono text-sm outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className={cn(
                      buttonVariants({ variant: 'primary', size: 'lg' }),
                      'group h-12 w-full shrink-0 cursor-pointer gap-2 sm:w-auto',
                    )}
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}

              {/* Trust Badges */}
              <div className="text-text-secondary mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="text-success h-4 w-4" />
                  <span>Setup in 30 seconds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="text-success h-4 w-4" />
                  <span>{isAuthenticated ? 'Zero risk trading' : 'No credit card'}</span>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}