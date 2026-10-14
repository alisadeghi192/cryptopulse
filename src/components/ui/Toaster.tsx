import { Toaster as SonnerToaster } from 'sonner'
import { useThemeStore } from '@/stores/useThemeStore'

export function Toaster() {
  const theme = useThemeStore((s) => s.theme)

  return (
    <SonnerToaster
      theme={theme}
      position="bottom-right"
      duration={3000}
      closeButton
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'group relative flex w-full flex-col gap-3 rounded-xl border border-border/60 bg-surface/80 p-4 pr-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-2xl [&_[data-content]]:flex [&_[data-content]]:flex-col [&_[data-content]]:gap-2',
          title: 'font-mono text-sm font-medium text-text',
          description: 'font-mono text-xs text-text-secondary',
          closeButton:
            'absolute cursor-pointer top-3 right-3 flex size-6 items-center justify-center rounded-md border border-border/50 bg-background/50 text-text-secondary hover:border-primary/40 hover:text-primary transition-all',
          icon: 'shrink-0',
          success: 'border-success/30',
          error: 'border-error/30',
          warning: 'border-primary/30',
          info: 'border-primary/30',
          actionButton:
            'bg-error/20 text-error cursor-pointer hover:bg-error/30 shrink-0 rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors',
          cancelButton:
            'bg-elevated/20 text-text cursor-pointer hover:bg-elevated/40 shrink-0 rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors',
        },
      }}
    />
  )
}