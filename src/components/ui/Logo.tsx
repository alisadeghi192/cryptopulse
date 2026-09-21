import logo from '@/assets/logo.svg'
import { cn } from '@/utils/cn'
import { Link } from "react-router";
interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <Link to="/" className={cn('flex items-center gap-2 cursor-pointer', className)}>
      <img
        src={logo}
        alt="CryptoPulse"
        className="h-8 w-auto"
      />
      {showText && (
        <span className="font-display text-lg font-bold tracking-wider text-primary">
          CryptoPulse
        </span>
      )}
    </Link>
  )
}