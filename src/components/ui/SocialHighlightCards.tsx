import { useThemeStore } from '@/stores/useThemeStore'
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  TelegramIcon,
} from '@/components/ui/BrandIcons'

export interface SocialLink {
  label: string
  href: string
  highlight: string
  icon: React.ComponentType<{ className?: string }>
}

const socials: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/alisadeghi192',
    highlight: '#14181e',
    icon: GithubIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    highlight: '#0a66c2',
    icon: LinkedinIcon,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    highlight: '#e4405f',
    icon: InstagramIcon,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/alisadeghi_dev',
    highlight: '#26a5e4',
    icon: TelegramIcon,
  },
]

export function SocialHighlightCards() {
  const theme = useThemeStore((s) => s.theme)

  return (
    <nav className="social-highlight-cards" aria-label="Social links">
      {socials.map((social) => {
        const Icon = social.icon

        // GitHub only: white in dark mode
        const color =
          social.label === 'GitHub' && theme === 'dark'
            ? '#f0f0f0'
            : social.highlight

        return (
          <a
            key={social.href}
            className="social-highlight-card"
            href={social.href}
            target="_blank"
            rel="noreferrer"
            title={social.label}
            aria-label={social.label}
            style={{ color }}
          >
            <span className="social-highlight-card__glow" aria-hidden="true" />
            <span className="social-highlight-card__beam" aria-hidden="true" />
            <span className="social-highlight-card__icon">
              <Icon />
            </span>
          </a>
        )
      })}
    </nav>
  )
}