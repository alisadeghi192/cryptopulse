import { cn } from "@/utils/cn";

export function Aurora({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none z-20 absolute inset-0 overflow-hidden',
        className
      )}
    >
      {/* Blob 1 */}
      <div
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full opacity-50 blur-[80px]"
        style={{
          background: '#7C3AED',
          animation: 'aurora-1 15s ease-in-out infinite',
        }}
      />
      {/* Blob 2 */}
      <div
        className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full opacity-40 blur-[80px]"
        style={{
          background: 'var(--color-success)',
          animation: 'aurora-2 18s ease-in-out infinite',
        }}
      />
      {/* Blob 3 */}
      <div
        className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[100px]"
        style={{
          background: 'var(--color-primary)',
          animation: 'aurora-3 20s ease-in-out infinite',
        }}
      />
    </div>
  )
}