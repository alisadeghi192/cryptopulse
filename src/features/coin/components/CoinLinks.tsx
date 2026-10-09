import { Globe, ExternalLink } from 'lucide-react'
import {
  TwitterIcon,
  GithubIcon,
  RedditIcon,
} from '@/components/ui/BrandIcons'
import { BlurFade } from '@/components/ui/BlurFade'
import { useThemeStore } from '@/stores/useThemeStore'

interface CoinLinksProps {
  homepage: string[]
  twitterScreenName: string | null
  githubRepos: string[]
  subredditUrl: string | null
  blockchainSites: string[]
}

interface LinkItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  brandColor?: { light: string; dark: string }
}

export function CoinLinks({
  homepage,
  twitterScreenName,
  githubRepos,
  subredditUrl,
  blockchainSites,
}: CoinLinksProps) {
  const theme = useThemeStore((s) => s.theme)

  const links: LinkItem[] = []

  const website = homepage.find((url) => url)
  if (website) {
    links.push({ label: 'Website', href: website, icon: Globe })
  }

  if (twitterScreenName) {
    links.push({
      label: 'Twitter',
      href: `https://twitter.com/${twitterScreenName}`,
      icon: TwitterIcon,
      brandColor: { light: '#000000', dark: '#ffffff' },
    })
  }

  const github = githubRepos.find((url) => url)
  if (github) {
    links.push({
      label: 'GitHub',
      href: github,
      icon: GithubIcon,
      brandColor: { light: '#14181e', dark: '#f0f0f0' },
    })
  }

  if (subredditUrl) {
    links.push({
      label: 'Reddit',
      href: subredditUrl,
      icon: RedditIcon,
      brandColor: { light: '#ff4500', dark: '#ff4500' },
    })
  }

  const explorer = blockchainSites.find((url) => url)
  if (explorer) {
    links.push({ label: 'Explorer', href: explorer, icon: ExternalLink })
  }

  if (links.length === 0) return null

  return (
    <BlurFade delay={0.35}>
      <div className="border-border shadow-lg bg-surface/30 rounded-2xl border p-5 md:p-6">
        <h2 className="font-display text-text mb-4 text-lg font-bold">
          Links
        </h2>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {links.map(({ label, href, icon: Icon, brandColor }) => {
            const color = brandColor
              ? theme === 'dark'
                ? brandColor.dark
                : brandColor.light
              : undefined

            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="coin-link group border-border bg-surface/40 flex items-center gap-2.5 rounded-xl border px-3.5 py-3 hover:-translate-y-0.5"
                style={
                  {
                    '--brand-color': color ?? 'var(--color-primary)',
                  } as React.CSSProperties
                }
              >
                <div className="coin-link-icon border-border/60 bg-background/60 text-text-secondary flex size-8 shrink-0 items-center justify-center rounded-lg border">
                  <Icon className="size-4" />
                </div>
                <span className="coin-link-label text-text truncate text-xs font-medium">
                  {label}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </BlurFade>
  )
}