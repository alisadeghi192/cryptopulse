import { BlurFade } from '@/components/ui/BlurFade'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { CHALLENGES } from '@/constants'

export default function ChallengesSection() {
  return (
    <section className="relative py-12 lg:py-20">
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase">
            03 / Problems
          </span>

          <h2 className="text-text mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Problems worth solving
          </h2>

          <p className="text-text-secondary mt-4 text-sm leading-7 md:text-base">
            Three constraints shaped most of the technical decisions in this
            project. Each one forced a simpler, more honest solution.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {CHALLENGES.map((item, i) => (
            <BlurFade key={item.number} delay={0.1 + i * 0.1}>
              <SpotlightCard
                spotlightColor={item.glow}
                className="border-border bg-surface/35 h-full rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary font-mono text-xs">
                    {item.number}
                  </span>
                  <div
                    className="size-1.5 rounded-full"
                    style={{ background: item.accent }}
                  />
                </div>

                <div className="mt-6">
                  <span className="text-text-secondary font-mono text-[10px] tracking-[0.18em] uppercase">
                    {item.problem}
                  </span>

                  <h3
                    className="mt-2 text-lg font-semibold tracking-tight"
                    style={{ color: item.accent }}
                  >
                    {item.solution}
                  </h3>

                  <p className="text-text-secondary mt-3 text-sm leading-7">
                    {item.description}
                  </p>
                </div>
              </SpotlightCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}