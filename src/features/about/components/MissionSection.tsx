import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { DEVELOPMENT_STEPS } from '@/constants'
import { BlurFade } from '@/components/ui/BlurFade'

export default function MissionSection() {
  return (
    <section id="mission" className="relative py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          
          {/* Intro - Sticky */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase">
              01 / The Idea
            </span>

            <h2 className="text-text mt-4 max-w-md text-3xl font-bold tracking-tight md:text-4xl">
              Why this project?
            </h2>

            <div className="text-text-secondary mt-5 max-w-md space-y-4 text-sm leading-7 md:text-base">
              <p>
                CryptoPulse is a production-minded React application exploring
                frontend performance, scalable architecture, and data-heavy
                interfaces.
              </p>
              <p>
                While the <strong className="text-text font-medium">UI design, motion, and interactive components</strong> were heavily accelerated using AI tools, the core <strong className="text-text font-medium">frontend architecture, state management, and complex financial logic</strong> were manually engineered. For the backend, I utilized Supabase to handle authentication and secure data flows, ensuring the entire system works reliably under the hood.
              </p>
            </div>
          </div>

          {/* Vertical Timeline */}
          <div>
            {/* Header - outside the relative line container */}
            <div className="mb-10 flex items-center gap-3">
              <span className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase">
                Development Workflow
              </span>
              <div className="bg-border h-px flex-1" />
            </div>

            {/* Line container */}
            <div className="relative space-y-8">
              {/* The continuous vertical line */}
              <div className="bg-linear-to-b from-primary/60 via-border to-transparent absolute top-0 bottom-0 left-6.75 w-px" />

              {DEVELOPMENT_STEPS.map((step, index) => (
                <BlurFade key={step.number} delay={0.1 + index * 0.1}>
                  <div className="relative flex items-start gap-6">
                    {/* Timeline Dot */}
                    <div className="border-border bg-background relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border-2 shadow-sm">
                      <span className="text-primary font-mono text-sm font-bold">
                        {step.number}
                      </span>
                    </div>

                    {/* Content Card */}
                    <SpotlightCard
                      spotlightColor="rgba(255, 193, 7, 0.06)"
                      className="group border-border/50 bg-surface/30 hover:border-primary/30 flex-1 rounded-2xl border p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 md:p-6"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-text text-lg font-bold">
                          {step.title}
                        </h3>
                        <div className="bg-border group-hover:bg-primary size-1.5 rounded-full transition-colors" />
                      </div>
                      <p className="text-text-secondary mt-2 text-sm leading-6 md:leading-7">
                        {step.description}
                      </p>
                    </SpotlightCard>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}