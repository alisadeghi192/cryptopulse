import { toast } from 'sonner'

interface ConfirmOptions {
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'primary'
  duration?: number
}

export function confirm({
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary',
  duration = 8000,
}: ConfirmOptions): Promise<boolean> {
  return new Promise((resolve) => {
    let resolved = false

    const finish = (value: boolean) => {
      if (resolved) return
      resolved = true
      resolve(value)
    }

    toast.custom(
      (t) => (
        <div className="border-border/60 bg-surface/80 flex w-89 max-w-[calc(100vw-2rem)] flex-col gap-3 rounded-xl border p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
          <div>
            <p className="text-text font-mono text-sm font-medium">{title}</p>
            {description && (
              <p className="text-text/70 mt-1 font-mono text-xs">
                {description}
              </p>
            )}
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                toast.dismiss(t)
                finish(false)
              }}
              className="bg-elevated/20 text-text cursor-pointer hover:bg-elevated/40 rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={() => {
                toast.dismiss(t)
                finish(true)
              }}
              className={
                variant === 'danger'
                  ? 'bg-error/20 text-error hover:bg-error/30 cursor-pointer rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors'
                  : 'bg-primary/20 text-primary hover:bg-primary/30 rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors'
              }
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      ),
      {
        duration,
        position: 'bottom-right',
        classNames: {
          toast:
            '!p-0 !border-0 !bg-transparent !shadow-none !backdrop-blur-none !w-auto',
        },
        onDismiss: () => finish(false),
        onAutoClose: () => finish(false),
      },
    )
  })
}