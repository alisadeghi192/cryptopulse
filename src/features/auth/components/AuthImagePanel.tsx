import { Logo } from '@/components/ui/Logo'
import { cn } from '@/utils/cn'

interface AuthImagePanelProps {
  mode: 'login' | 'register'
}

const CONTENT = {
  login: {
    title: (
      <>
        The Pulse of{' '}
        <span className="from-primary via-primary-hover to-primary bg-linear-to-r bg-clip-text text-transparent">
          Crypto
        </span>
        , Live.
      </>
    ),
    subtitle:
      'Track real-time markets and manage your virtual portfolio seamlessly.',
    stats: [
      { value: '5,000+', label: 'Coins tracked' },
      { value: '24/7', label: 'Live data' },
    ],
    footer: 'Secure · Encrypted · Trusted',
  },
  register: {
    title: (
      <>
        Start your{' '}
        <span className="from-primary via-primary-hover to-primary bg-linear-to-r bg-clip-text text-transparent">
          crypto
        </span>{' '}
        journey.
      </>
    ),
    subtitle:
      'Create an account to claim your $1,000 virtual funds and start trading.',
    stats: [
      { value: 'Zero', label: 'Risk trading' },
      { value: 'Free', label: 'Forever' },
    ],
    footer: 'No credit card required · Instant access',
  },
}

export function AuthImagePanel({ mode }: AuthImagePanelProps) {
  const content = CONTENT[mode]

  const imageSrc = mode === 'login' ? '/auth1.webp' : '/auth2.webp'

  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        key={imageSrc}
        src={imageSrc}
        alt=""
        className={cn(
          'absolute inset-0 h-full w-full object-cover',
          'animate-[fade-in_0.7s_ease-in-out]',
        )}
      />

      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex h-full flex-col justify-between md:px-4 lg:px-12 py-12">
        <Logo iconClassName="size-20 shrink-0" textClassName="text-4xl" />

        <div>
          <h2
            key={mode}
            className={cn(
              'font-display text-4xl leading-tight font-bold tracking-tight text-white md:text-5xl',
              'animate-[slide-fade_0.7s_ease-out]',
            )}
          >
            {content.title}
          </h2>

          <p
            key={`${mode}-sub`}
            className={cn(
              'mt-4 max-w-md text-base leading-8 text-white/70',
              'animate-[slide-fade_0.7s_ease-out_0.1s_both]',
            )}
          >
            {content.subtitle}
          </p>

          <div
            key={`${mode}-stats`}
            className={cn(
              'mt-10 flex gap-8',
              'animate-[slide-fade_0.7s_ease-out_0.2s_both]',
            )}
          >
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-primary text-3xl font-bold">
                  {stat.value}
                </p>
                <p className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-primary font-mono text-sm tracking-widest uppercase">
          {content.footer}
        </p>
      </div>
    </div>
  )
}