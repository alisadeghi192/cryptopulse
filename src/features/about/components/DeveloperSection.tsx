import { SocialHighlightCards } from '@/components/ui/SocialHighlightCards'

export default function DeveloperSection() {
  return (
    <section className="relative pb-12 lg:pb-25">
      <div className="container">
        <div className="border-border border-t pt-10 md:pt-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative size-26 shrink-0">
                <div className="border-primary/20 bg-primary/5 h-full w-full overflow-hidden rounded-full border">
                  <img
                    src="/ali.webp"
                    alt="Ali Sadeghi"
                    className="h-full w-full scale-125 object-cover object-top"
                  />
                </div>
                <div className="border-background bg-success absolute right-1 bottom-2 size-4.5 rounded-full border-[2.5px]" />
              </div>

              <div>
                <span className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase">
                  Built by
                </span>

                <h2 className="text-text mt-1 text-xl font-semibold">
                  Ali Sadeghi
                </h2>

                <p className="text-text-secondary mt-1 text-sm">
                  Frontend Developer · React · Next.js · TypeScript
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <SocialHighlightCards />
            </div>
          </div>

          <div className="mt-8 max-w-3xl space-y-4">
            <p className="text-text-secondary text-sm leading-7">
              Frontend developer focused on React, Next.js, TypeScript and
              building fast, well-structured web applications. I care about
              performance, clean architecture, and shipping products that feel
              considered.
            </p>

            <p className="text-text-secondary text-sm leading-7">
              CryptoPulse is my exploration of modern React, frontend
              performance and AI-assisted development — from architecture and
              implementation to debugging and refinement.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}