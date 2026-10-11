import { Logo } from '@/components/ui/Logo'
import { useThemeStore } from '@/stores/useThemeStore'
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
      'Real-time market data, powerful charts, and a wallet to grow your crypto wealth.',
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
      'Join thousands of traders tracking real-time markets with CryptoPulse.',
    stats: [
      { value: '250+', label: 'Exchanges' },
      { value: 'Free', label: 'No credit card' },
    ],
    footer: 'Free forever · No credit card',
  },
}

export function AuthImagePanel({ mode }: AuthImagePanelProps) {
  const theme = useThemeStore((s) => s.theme)
  const content = CONTENT[mode]

  const imageSrc =
    theme === 'dark'
      ? mode === 'login'
        ? '/auth1.jpg'
        : '/auth2.jpg'
      : mode === 'login'
        ? '/auth2.jpg'
        : '/auth/register-light.jpg'

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background Image */}
      <img
        key={imageSrc}
        src={imageSrc}
        alt=""
        className={cn(
          'absolute inset-0 h-full w-full object-cover',
          'animate-[fade-in_0.7s_ease-in-out]',
        )}
      />

      {/* Overlay */}
      <div
        className={cn(
          'absolute inset-0',
          theme === 'dark'
            ? 'from-background/80 via-background/50 to-background/80 bg-linear-to-br'
            : 'from-background/60 via-background/30 to-background/60 bg-linear-to-br',
        )}
      />

      {/* Ambient glow */}
      <div className="bg-primary/30 absolute -bottom-20 -left-20 h-80 w-80 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-12">
        <Logo />

        <div>
          <h2
            key={mode}
            className={cn(
              'font-display text-3xl leading-tight font-bold tracking-tight text-white md:text-4xl',
              'animate-[slide-fade_0.7s_ease-out]',
            )}
          >
            {content.title}
          </h2>

          <p
            key={`${mode}-sub`}
            className={cn(
              'mt-4 max-w-md text-sm leading-7 text-white/70',
              'animate-[slide-fade_0.7s_ease-out_0.1s_both]',
            )}
          >
            {content.subtitle}
          </p>

          <div
            key={`${mode}-stats`}
            className={cn(
              'mt-8 flex gap-6',
              'animate-[slide-fade_0.7s_ease-out_0.2s_both]',
            )}
          >
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-primary">
                  {stat.value}
                </p>
                <p className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
          {content.footer}
        </p>
      </div>
    </div>
  )
}