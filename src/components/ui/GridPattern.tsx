import { cn } from '@/utils/cn'

export function GridPattern({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0',
        'bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]',
        'bg-size-[40px_40px]',
        '[mask-[radial-gradient(ellipse_at_center,black_20%,transparent_70%)]',
        'opacity-30',
        className
      )}
    />
  )
}