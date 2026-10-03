import {
  GithubIcon,
  TelegramIcon,
  LinkedinIcon,
  InstagramIcon,
} from '@/components/ui/BrandIcons'

export const FOOTER_LINKS = {
  Product: [
    { label: 'Markets', href: '/markets' },
    { label: 'Watchlist', href: '/watchlist' },
    { label: 'Dashboard', href: '/dashboard' },
  ],
  Company: [{ label: 'About', href: '/about' }],
  Account: [
    { label: 'Sign In', href: '/login' },
    { label: 'Create Account', href: '/register' },
  ],
} as const

export const SOCIAL_LINKS = [
  { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { icon: TelegramIcon, href: 'https://t.me', label: 'Telegram' },
] as const

export const FOOTER_TEXT = {
  description:
    'Real-time crypto market data, curated and beautiful. Track thousands of coins with live prices and zero noise.',
  copyright: (year: number) =>
    `© ${year} CryptoPulse — Built with React, TanStack & Supabase`,
  sourceUrl: 'https://github.com',
  sourceLabel: 'Source',
  version: 'v0.1.0',
} as const

export const TELEMETRY = {
  dataSource: 'CoinGecko · 5-min refresh',
  liveLabel: 'Live Data',
} as const

export const DATA_RAIN = {
  chars: '₿Ξ⟠✕₮$₽₳Ӿ$Ð¥Ł€Ƀ£ϑ⨎εƁ฿₽$ɱ¥ꜩ€$ξⓩ⟁Ñ$€Ⱡ¥₽$ȿɌꞤⱣΨ$$',
  columnCount: 45,
  columnWidth: 100 / 30,
  charCount: 12,
  delayMax: 8,
  durationMin: 4,
  durationMax: 6,
  baseOpacity: 0.15,
  fadeStep: 0.08,
  blurThreshold: 0,
} as const