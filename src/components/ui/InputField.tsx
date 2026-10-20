import { forwardRef, useState } from 'react'
import { Eye, EyeOff, type LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  icon: LucideIcon
  error?: string
  showPasswordToggle?: boolean
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      label,
      icon: Icon,
      error,
      showPasswordToggle,
      type,
      className,
      ...props
    },
    ref,
  ) => {
    const [show, setShow] = useState(false)
    const inputType = showPasswordToggle ? (show ? 'text' : 'password') : type

    return (
      <div>
        <label
          htmlFor={id}
          className="text-primary mb-2 block font-mono text-[10px] tracking-widest uppercase"
        >
          {label}
        </label>
        <div
          className={cn(
            'flex h-11 items-center gap-2 rounded-xl border px-3 transition-all',
            'border-border bg-background/50',
            !error &&
              'focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)]',
            error && 'border-error/50 focus-within:border-error',
          )}
        >
          <Icon className="text-text-secondary size-4 shrink-0" />
          <input
            id={id}
            ref={ref}
            type={inputType}
            className={cn(
              'text-text placeholder:text-text-secondary/50 h-full w-full bg-transparent font-mono text-sm outline-none',
              className,
            )}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShow((s) => !s)}
              aria-label={show ? 'Hide password' : 'Show password'}
              className="text-text-secondary cursor-pointer hover:text-text shrink-0 transition-colors"
            >
              {show ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-error mt-1.5 font-mono text-[11px] font-medium">
            {error}
          </p>
        )}
      </div>
    )
  },
)

InputField.displayName = 'InputField'
