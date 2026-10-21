import { useState } from 'react'
import { Layers, ArrowRight } from 'lucide-react'
import { TECH_GROUPS, TECH_STACK } from '@/constants'

export default function TechStackSection() {
  const [activeTech, setActiveTech] = useState<string | null>(null)

  return (
    <section className="relative py-12 lg:py-20">
      <div className="container">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase">
              02 / Technology
            </span>

            <h2 className="text-text mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Built with modern tools
            </h2>

            <p className="text-text-secondary mt-4 max-w-xl text-sm leading-7">
              Every technology has a specific role in the application, from
              rendering and state management to data validation and visual
              exploration.
            </p>
          </div>

          <div className="text-text-secondary font-mono text-xs">
            {TECH_STACK.length.toString().padStart(2, '0')} technologies
          </div>
        </div>

        <div className="space-y-12">
          {TECH_GROUPS.map((group) => {
            const technologies = TECH_STACK.filter(
              (tech) => tech.category === group.key,
            )

            return (
              <div key={group.key}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary/50 h-px w-5" />

                  <div>
                    <h3 className="text-text text-xs font-semibold tracking-[0.15em] uppercase">
                      {group.label}
                    </h3>

                    <p className="text-text-secondary mt-0.5 text-[11px]">
                      {group.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {technologies.map((tech) => {
                    const active = activeTech === tech.name

                    return (
                      <button
                        type="button"
                        key={tech.name}
                        onMouseEnter={() => setActiveTech(tech.name)}
                        onMouseLeave={() => setActiveTech(null)}
                        onFocus={() => setActiveTech(tech.name)}
                        onBlur={() => setActiveTech(null)}
                        className="group border-border bg-surface/40 relative min-h-33 overflow-hidden rounded-xl border p-4 text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-(--tech-color)/40"
                        style={
                          {
                            '--tech-color': tech.accent,
                            '--tech-glow': `${tech.accent}22`,
                          } as React.CSSProperties
                        }
                      >
                        {/* Brand spotlight */}
                        <div
                          className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full blur-3xl transition-opacity duration-500"
                          style={{
                            background: tech.accent,
                            opacity: active ? 0.2 : 0,
                          }}
                        />

                        {/* Radial wash */}
                        <div
                          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                          style={{
                            background: `radial-gradient(circle at 50% 20%, ${tech.accent}18, transparent 55%)`,
                            opacity: active ? 1 : 0,
                          }}
                        />

                        <div className="relative flex h-full flex-col items-center justify-between text-center">
                          {/* Icon */}
                          <div
                            className="border-border/60 bg-background/60 mt-2 flex size-14 items-center justify-center rounded-2xl border p-3 transition-all duration-500 group-hover:scale-110"
                            style={{
                              borderColor: active
                                ? `${tech.accent}55`
                                : undefined,
                              boxShadow: active
                                ? `0 0 24px ${tech.accent}25`
                                : undefined,
                            }}
                          >
                            <img
                              src={tech.icon}
                              alt={tech.name}
                              className="size-8 object-contain"
                            />
                          </div>

                          {/* Name + Description */}
                          <div className="mt-4 w-full">
                            <div className="text-text truncate text-sm font-semibold">
                              {tech.name}
                            </div>

                            <div className="text-text-secondary mt-1 text-[10px] tracking-wider uppercase">
                              {tech.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Architecture Principle Card */}
        <div className="mt-16">
          <div className="mb-3 flex items-center gap-2">
            <Layers className="text-primary size-3.5" />
            <span className="text-primary font-mono text-[10px] tracking-[0.25em] uppercase">
              Architecture Principle
            </span>
            <div className="bg-border h-px flex-1" />
            <span className="text-text-secondary font-mono text-[10px]">
              Feature-based
            </span>
          </div>

          <div className="border-border bg-surface/20 grid overflow-hidden rounded-2xl border shadow-lg md:grid-cols-[1fr_auto_1fr]">
            {/* Left: What */}
            <div className="p-5 sm:p-6">
              <span className="text-text-secondary font-mono text-[10px] tracking-[0.2em] uppercase">
                What we do
              </span>
              <p className="text-text mt-2 text-sm leading-relaxed font-medium">
                Keep logic, styles, and data inside the feature that owns them.
              </p>
            </div>

            {/* Center: Arrow */}
            <div className="border-border/60 relative flex items-center justify-center border-y px-6 py-3 md:border-x md:border-y-0">
              <ArrowRight className="text-primary size-4 rotate-90 md:rotate-0" />
            </div>

            {/* Right: Why */}
            <div className="p-5 sm:p-6">
              <span className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase">
                Why it matters
              </span>
              <p className="text-text mt-2 text-sm leading-relaxed font-medium">
                Fewer shared abstractions → faster changes → fewer surprises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}