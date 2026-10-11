import { cn } from '@/utils/cn'
import { Link } from 'react-router'
import { LogoIcon } from './LogoIcon'

interface LogoProps {
  className?: string
  showText?: boolean
  iconClassName?: string
  textClassName?: string
}

export function Logo({
  className = '',
  showText = true,
  iconClassName,
  textClassName,
}: LogoProps) {
  return (
    <Link
      to="/"
      className={cn('flex items-center gap-2 cursor-pointer', className)}
    >
      <LogoIcon className={cn('h-8 w-auto text-primary', iconClassName)} />
      {showText && (
        <span
          className={cn(
            'font-display text-lg font-bold tracking-wider text-primary',
            textClassName,
          )}
        >
          CryptoPulse
        </span>
      )}
    </Link>
  )
}