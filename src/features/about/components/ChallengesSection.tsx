import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { CHALLENGES } from '@/constants'
import { cn } from '@/utils/cn'

export default function ChallengesSection() {
  // We only allow one open at a time (or you could use an array for multiple)
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section id="challenges" className="relative py-16 lg:py-24">
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase">
            03 / Challenges
          </span>

          <h2 className="text-text mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Engineering under constraints.
          </h2>

          <p className="text-text-secondary mt-4 text-sm leading-7 md:text-base">
            Five specific constraints shaped the technical decisions in this
            project. Click on any card to see how each one was solved.
          </p>
        </div>

        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {CHALLENGES.map((item, i) => {
            const Icon = item.icon
            const isOpen = openId === item.id

            return (
              <BlurFade key={item.id} delay={0.1 + i * 0.05}>
                <SpotlightCard
                  spotlightColor={item.glow}
                  className={cn(
                    'group border-border bg-surface/35 overflow-hidden rounded-2xl border shadow-lg transition-all duration-300',
                    isOpen ? 'border-border-strong bg-surface/60' : 'hover:border-primary/30',
                  )}
                >
                  {/* Accordion Trigger */}
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left md:p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="flex size-10 shrink-0 items-center justify-center rounded-lg border"
                        style={{
                          borderColor: `${item.accent}40`,
                          backgroundColor: `${item.accent}10`,
                        }}
                      >
                        <Icon className="size-5" style={{ color: item.accent }} />
                      </div>
                      <div>
                        <h3
                          className="text-lg font-semibold tracking-tight"
                          style={{ color: item.accent }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-text-secondary mt-0.5 text-sm">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    <div
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-full bg-elevated/50 transition-transform duration-300',
                        isOpen && 'rotate-180',
                      )}
                    >
                      <ChevronDown className="text-text-secondary size-4" />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <div
                    className={cn(
                      'grid transition-all duration-300 ease-out',
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="border-border/40 space-y-6 border-t p-5 md:p-6">
                        <div>
                          <span className="text-text/50 font-mono text-[10px] tracking-widest uppercase">
                            The Problem
                          </span>
                          <p className="text-text-secondary mt-2 text-sm leading-7">
                            {item.description}
                          </p>
                        </div>

                        <div
                          className="rounded-xl border p-4"
                          style={{
                            borderColor: `${item.accent}30`,
                            backgroundColor: `${item.accent}05`,
                          }}
                        >
                          <span
                            className="font-mono text-[10px] tracking-widest uppercase"
                            style={{ color: item.accent }}
                          >
                            The Solution
                          </span>
                          <p className="text-text mt-2 text-sm leading-7">
                            {item.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </BlurFade>
            )
          })}
        </div>
      </div>
    </section>
  )
}