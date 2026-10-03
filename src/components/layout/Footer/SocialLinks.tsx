import { SOCIAL_LINKS } from '@/constants'

export function SocialLinks() {
  return (
    <div className="mt-6 flex items-center gap-3">
      {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="border-border/60 text-text-secondary hover:border-primary/40 hover:text-primary bg-background/40 flex h-9 w-9 items-center justify-center rounded-lg border backdrop-blur-sm transition-colors"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  )
}
