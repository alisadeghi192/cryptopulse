import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { DEVELOPMENT_STEPS } from '@/constants'

export default function MissionSection() {
  return (
    <section id="idea" className="relative py-12 lg:py-20">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase">
              01 / The idea
            </span>

            <h2 className="text-text mt-4 max-w-md text-3xl font-bold tracking-tight md:text-4xl">
              How much faster can you build with AI?
            </h2>

            <p className="text-text-secondary mt-5 max-w-md text-sm leading-7 md:text-base">
              CryptoPulse started as a practical experiment: use AI to
              accelerate development without giving up engineering judgment,
              code quality or control over the final product.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10">
            <SpotlightCard
              spotlightColor="rgba(255, 193, 7, 0.08)"
              className="border-border bg-surface/50 rounded-2xl border p-6 shadow-lg md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="border-primary/20 bg-primary/10 text-primary mt-1 flex size-9 shrink-0 items-center justify-center rounded-lg border font-mono text-xs">
                  01
                </div>

                <div>
                  <h3 className="text-text text-lg font-semibold">
                    The challenge
                  </h3>
                  <p className="text-text-secondary mt-3 text-sm leading-7">
                    The goal was not simply to produce a working interface
                    faster. The real question was whether AI could reduce
                    development friction while the resulting application still
                    felt intentionally designed, structured and production
                    minded.
                  </p>
                </div>
              </div>
            </SpotlightCard>

            <div className="before:from-primary before:via-border relative pl-5 before:absolute before:top-0 before:left-0 before:h-full before:w-px before:bg-linear-to-b before:to-transparent">
              <span className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase">
                Development workflow
              </span>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {DEVELOPMENT_STEPS.map((step) => (
                  <SpotlightCard
                    key={step.number}
                    spotlightColor="rgba(255, 193, 7, 0.06)"
                    className="group border-border bg-surface/40 hover:border-primary/30 rounded-xl border p-5 shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-primary/70 font-mono text-xs">
                        {step.number}
                      </span>
                      <div className="bg-border group-hover:bg-primary size-1.5 rounded-full transition-colors" />
                    </div>

                    <h3 className="text-text mt-5 font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary mt-2 text-xs leading-6">
                      {step.description}
                    </p>
                  </SpotlightCard>
                ))}
              </div>
            </div>

            <SpotlightCard
              spotlightColor="rgba(255, 193, 7, 0.10)"
              className="border-primary/20 bg-primary/[0.035] rounded-2xl border p-6 md:p-8"
            >
              <div className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase">
                AI-assisted development
              </div>

              <p className="text-text-secondary mt-4 max-w-2xl text-sm leading-7 md:text-base">
                AI was used as a development accelerator for exploring
                solutions, generating repetitive code, debugging and working
                with unfamiliar APIs. Architecture, technical decisions,
                validation and final implementation remained under developer
                control.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  )
}
