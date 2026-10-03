import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'

import { FOOTER_LINKS } from '@/constants'

export function FooterLinks() {
  return (
    <div className='flex justify-evenly w-full'>
      {Object.entries(FOOTER_LINKS).map(([title, links]) => (
        <div key={title}>
          <h4 className="text-text mb-4 font-mono text-xs tracking-widest uppercase ">
            {title}
          </h4>
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="group text-text-secondary hover:text-text inline-flex items-center gap-1 text-base transition-colors"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}