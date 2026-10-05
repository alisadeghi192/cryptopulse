export function MarketsSkeleton() {
  return (
    <main className="container py-8 md:py-12">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="bg-elevated mb-2 h-4 w-32 animate-pulse rounded" />
        <div className="bg-elevated h-10 w-40 animate-pulse rounded" />
      </div>

      {/* Toolbar skeleton */}
      <div className="mb-5 space-y-3">
        <div className="bg-elevated h-10 w-full animate-pulse rounded-lg" />
        <div className="bg-elevated h-10 w-fit animate-pulse rounded-lg px-16" />
      </div>

      {/* Table skeleton */}
      <div className="border-border bg-surface overflow-hidden rounded-2xl border">
        <div className="border-border/50 h-11 border-b" />
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="border-border/30 bg-elevated/20 h-14 animate-pulse border-b"
          />
        ))}
      </div>
    </main>
  )
}