import { forwardRef, useState } from 'react'
import { Eye, EyeOff, type LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

interface PasswordFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  icon: LucideIcon
  error?: string
}

export const PasswordField = forwardRef<
  HTMLInputElement,
  PasswordFieldProps
>(({ id, label, icon: Icon, error, className, ...props }, ref) => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <label
        htmlFor={id}
        className="text-text/70 mb-1.5 block font-mono text-[10px] tracking-widest uppercase"
      >
        {label}
      </label>
      <div
        className={cn(
          'flex h-10 items-center gap-2 rounded-lg border px-3 transition-all',
          'border-border bg-background/50',
          !error &&
            'focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)]',
          error && 'border-error/50 focus-within:border-error',
        )}
      >
        <Icon className="text-text/70 size-3.5 shrink-0" />
        <input
          id={id}
          ref={ref}
          type={show ? 'text' : 'password'}
          className={cn(
            'text-text placeholder:text-text/40 h-full w-full bg-transparent font-mono text-sm outline-none',
            className,
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="text-text/70 hover:text-text shrink-0 transition-colors"
        >
          {show ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
        </button>
      </div>
      {error && (
        <p className="text-error animate-error-pulse mt-1.5 font-mono text-[11px] font-medium">
          {error}
        </p>
      )}
    </div>
  )
})

PasswordField.displayName = 'PasswordField'