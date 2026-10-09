import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react'
import { ABOUT_STATS } from '@/constants'
import { Link } from 'react-router'
import { GithubIcon } from '@/components/ui/BrandIcons'
import { BlurFade } from '@/components/ui/BlurFade'

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-10 md:pt-24 lg:pb-20">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-125 w-200 -translate-x-1/2 rounded-full opacity-30 blur-[140px] dark:opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(255,193,7,0.14) 0%, rgba(255,193,7,0.04) 35%, transparent 70%)',
        }}
      />

      <div className="relative container">
        <div className="mx-auto max-w-5xl text-center">
          <div className="border-primary/20 bg-primary/5 text-primary mb-7 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium backdrop-blur-sm">
            <Sparkles className="size-3.5" />
            <span>About CryptoPulse</span>
          </div>

          <h1 className="font-display text-text text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            A crypto dashboard
            <span className="from-primary via-primary block bg-linear-to-r to-amber-300 bg-clip-text text-transparent">
              built to move fast.
            </span>
          </h1>

          <p className="text-text-secondary mx-auto mt-7 max-w-2xl text-sm leading-7 sm:text-base md:text-lg">
            A production-minded React application exploring frontend
            performance, scalable architecture, data-heavy interfaces, and
            AI-assisted development.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/markets"
              className="group bg-primary hover:bg-primary-hover hover:shadow-primary/10 inline-flex h-11 items-center gap-2 rounded-lg px-5 text-sm font-semibold text-black transition-all hover:shadow-lg"
            >
              Explore Markets
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <a
              href="https://github.com/alisadeghi192"
              target="_blank"
              rel="noreferrer"
              className="border-border bg-surface text-text hover:border-border-strong hover:bg-elevated inline-flex h-11 items-center gap-2 rounded-lg border px-5 text-sm font-medium transition-colors"
            >
              <GithubIcon className="size-4" />
              View Source
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="border-border/40 bg-surface/30 mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border shadow-lg backdrop-blur-xl">
          <div className="divide-border/40 grid grid-cols-2 divide-x md:grid-cols-4">
            {ABOUT_STATS.map((stat, i) => (
              <BlurFade key={stat.label} delay={0.5 + i * 0.05}>
                <div className="group hover:bg-background/60 relative px-4 py-5 text-center transition-all duration-300 hover:shadow-[inset_0_4px_12px_rgba(0,0,0,0.15),inset_0_-2px_6px_rgba(255,255,255,0.05)] md:px-6 md:py-6">
                  {/* Inner glow  */}
                  <div className="bg-primary/0 group-hover:bg-primary/5 pointer-events-none absolute inset-0 transition-colors duration-300" />

                  <div className="relative">
                    <div
                      className={`font-display text-xl font-bold ${stat.color}`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-text-secondary mt-1 text-[11px] tracking-wider uppercase">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#idea"
            onClick={(e) => {
              e.preventDefault()
              document
                .getElementById('idea')
                ?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group text-text-secondary hover:text-primary flex flex-col items-center gap-2 transition-colors"
          >
            <span className="text-[10px] tracking-[0.25em] uppercase">
              Explore
            </span>
            <ArrowDown className="size-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  )
}
