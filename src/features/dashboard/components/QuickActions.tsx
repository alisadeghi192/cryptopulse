import { Link, useNavigate } from 'react-router'
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
  Compass,
} from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { cn } from '@/utils/cn'

interface QuickActionsProps {
  onDeposit: () => void
  onWithdraw: () => void
}

export function QuickActions({ onDeposit, onWithdraw }: QuickActionsProps) {
  const navigate = useNavigate()

  return (
    <BlurFade delay={0.15}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <ActionButton
          label="Deposit"
          icon={ArrowDownToLine}
          onClick={onDeposit}
          accent="success"
        />
        <ActionButton
          label="Withdraw"
          icon={ArrowUpFromLine}
          onClick={onWithdraw}
          accent="primary"
        />
        <ActionButton
          label="Trade"
          icon={TrendingUp}
          onClick={() => navigate('/markets?view=table')}
          accent="blue"
        />
        <ActionButton
          label="Explore"
          icon={Compass}
          to="/"
          accent="purple"
        />
      </div>
    </BlurFade>
  )
}

type Accent = 'success' | 'primary' | 'blue' | 'purple'

const ACCENT: Record<
  Accent,
  { iconBg: string; iconText: string; hover: string }
> = {
  success: {
    iconBg: 'bg-success/10',
    iconText: 'text-success',
    hover: 'hover:border-success/40',
  },
  primary: {
    iconBg: 'bg-primary/10',
    iconText: 'text-primary',
    hover: 'hover:border-primary/40',
  },
  blue: {
    iconBg: 'bg-[#3B82F6]/10',
    iconText: 'text-[#3B82F6]',
    hover: 'hover:border-[#3B82F6]/40',
  },
  purple: {
    iconBg: 'bg-[#7C3AED]/10',
    iconText: 'text-[#7C3AED]',
    hover: 'hover:border-[#7C3AED]/40',
  },
}

interface ActionButtonProps {
  label: string
  icon: React.ComponentType<{ className?: string }>
  accent: Accent
  onClick?: () => void
  to?: string
}

function ActionButton({
  label,
  icon: Icon,
  accent,
  onClick,
  to,
}: ActionButtonProps) {
  const styles = ACCENT[accent]

  const inner = (
    <div
      className={cn(
        'border-border/40 bg-surface/40 group flex h-full w-full cursor-pointer flex-col items-start gap-3 rounded-xl border p-4 shadow-md backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5',
        styles.hover,
      )}
    >
      <div
        className={cn(
          'flex size-9 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110',
          styles.iconBg,
          styles.iconText,
        )}
      >
        <Icon className="size-4" />
      </div>
      <span className="text-text font-mono text-sm font-medium">{label}</span>
    </div>
  )

  if (to) {
    return <Link to={to}>{inner}</Link>
  }

  return (
    <button type="button" onClick={onClick} className="cursor-pointer text-left">
      {inner}
    </button>
  )
}