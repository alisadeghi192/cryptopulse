import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'

interface CheckboxProps {
  id?: string
  checked: boolean
  onChange: (checked: boolean) => void
  label: React.ReactNode
  className?: string
}

export function Checkbox({
  checked,
  onChange,
  label,
  className,
}: CheckboxProps) {
  const toggle = () => onChange(!checked)

  return (
    <div
      className={cn('flex items-center gap-2.5', className)}
      onClick={toggle}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          toggle()
        }
      }}
    >
      <div
        className={cn(
          'flex size-4.5 shrink-0 items-center justify-center rounded-[5px] border transition-all duration-200',
          'border-primary/40 bg-background/50',
          'hover:border-2',
          'focus-visible:ring-primary/30 focus-visible:ring-2',
          checked && 'border-primary bg-primary',
        )}
      >
        <Check
          className={cn(
            'size-3 text-background transition-all duration-200',
            checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
          )}
          strokeWidth={3}
        />
      </div>

      <span className="text-text-secondary flex-1 cursor-pointer text-xs leading-4.5 select-none">
        {label}
      </span>
    </div>
  )
}