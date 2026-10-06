import { Logo } from '@/components/ui/Logo'
import { DataRain } from './DataRain'
import { TelemetryStrip } from './TelemetryStrip'
import { FooterLinks } from './FooterLinks'
import { FOOTER_TEXT } from '@/constants'
import { SocialHighlightCards } from '@/components/ui/SocialHighlightCards'
export function Footer() {
  return (
    <footer className="border-border/40 bg-background relative overflow-hidden border-t">
      <DataRain />

      <div className="from-primary/20 pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <TelemetryStrip />

        <div className="flex flex-col items-start justify-between gap-10 py-16 md:gap-8 lg:flex-row">
          <div >
            <Logo />
            <p className="text-text-secondary mt-5 leading-relaxed">
              Real-time crypto market data, curated and beautiful. Track
              thousands of coins with live prices and zero noise.
            </p>
            <div className='mt-5'>
            <SocialHighlightCards />

            </div>
          </div>

          <FooterLinks />
        </div>

        <div className="border-border/40 flex flex-col items-center justify-between gap-3 border-t py-6 md:flex-row">
          <p className="text-text-secondary font-mono text-xs">
            {FOOTER_TEXT.copyright(new Date().getFullYear())}
          </p>
          <div className="text-text-secondary flex items-center gap-4 font-mono text-xs">
            <span>{FOOTER_TEXT.version}</span>
            <span className="text-border">•</span>
            <a
              href={FOOTER_TEXT.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className=" font-mono! hover:text-primary  transition-colors"
            >
              {FOOTER_TEXT.sourceLabel}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
