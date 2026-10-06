import { FEATURES, ENGINEERING_POINTS } from '@/constants'
import { BlurFade } from '@/components/ui/BlurFade'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { cn } from '@/utils/cn'

export default function FeaturesSection() {
  return (
    <section className="relative py-12 lg:py-20">
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase">
            04 / Engineering
          </span>

          <h2 className="text-text mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Engineering behind the interface
          </h2>

          <p className="text-text-secondary mt-4 text-sm leading-7 md:text-base">
            The interesting part of CryptoPulse is not only what users see.
            These are the engineering decisions that keep a data-heavy
            application responsive and maintainable.
          </p>
        </div>

        {/* Engineering metrics */}
        <div className="border-border bg-surface/30 mb-5 grid grid-cols-2 overflow-hidden rounded-2xl border md:grid-cols-4">
          {ENGINEERING_POINTS.map((point, index) => {
            const colors = [
              'text-primary',
              'text-[#7C3AED]',
              'text-success',
              'text-[#F7931A]',
            ]
            const color = colors[index % colors.length]

            return (
              <div
                key={point.label}
                className={`group hover:bg-primary/3 relative flex flex-col gap-1 p-5 text-center transition-colors duration-300 md:p-6 ${
                  index !== 0
                    ? 'border-border border-t md:border-t-0 md:border-l'
                    : ''
                }`}
              >
                <span className="text-text-secondary text-[10px] tracking-[0.15em] uppercase">
                  {point.label}
                </span>

                <div
                  className={`font-display  font-semibold ${color} transition-transform duration-300 group-hover:scale-105`}
                >
                  {point.value}
                </div>

                <div className="text-text-secondary  text-[10px]">
                  {point.description}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bento */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            const large = feature.size === 'large'

            return (
              <BlurFade
                key={feature.title}
                delay={0.1 + index * 0.1}
                className={cn(
                  large && 'lg:col-span-2',
                  index === 3 && 'lg:col-span-2',
                )}
              >
                <SpotlightCard
                  spotlightColor={feature.color.glow}
                  className="group border-border bg-surface/35 relative h-full overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 md:p-7"
                >
                  <div className="relative">
                    <div
                      className={`mb-8 flex size-11 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${feature.color.bg} ${feature.color.border}`}
                    >
                      <Icon className={`size-5 ${feature.color.text}`} />
                    </div>

                    <span className="text-text-secondary font-mono text-[10px] tracking-[0.18em] uppercase">
                      {feature.eyebrow}
                    </span>

                    <h3
                      className={`text-text mt-3 font-semibold tracking-tight ${
                        large ? 'text-xl md:text-2xl' : 'text-lg'
                      }`}
                    >
                      {feature.title}
                    </h3>

                    <p
                      className={`text-text-secondary mt-3 max-w-2xl text-sm leading-7 ${
                        large ? 'md:text-base' : ''
                      }`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </SpotlightCard>
              </BlurFade>
            )
          })}
        </div>

        {/* Bottom architecture line */}
        <div className="border-border bg-surface/20 mt-5 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <span className="text-text text-sm font-medium">
              Architecture principle
            </span>

            <p className="text-text-secondary mt-1 text-xs">
              Keep complexity close to the feature that owns it.
            </p>
          </div>

          <div className="text-primary relative overflow-hidden font-mono text-[10px]">
            <span className="relative z-10">
              maintainable / predictable / reusable
            </span>
            <div
              className="via-primary/30 absolute inset-0 -translate-x-full bg-linear-to-r from-transparent to-transparent"
              style={{ animation: 'shimmer 3s ease-in-out infinite' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
