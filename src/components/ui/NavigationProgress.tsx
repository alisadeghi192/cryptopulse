import { useNavigationProgress } from '@/hooks/useNavigationProgress'

export function NavigationProgress() {
  const { visible, progress } = useNavigationProgress()

  if (!visible) return null

  return (
    <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-100 h-0.5">
      <div
        className="from-primary via-primary-hover to-primary h-full bg-linear-to-r shadow-[0_0_10px_var(--color-primary)] transition-[width] duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
