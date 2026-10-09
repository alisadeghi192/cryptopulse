export function CoinDetailSkeleton() {
  return (
    <main className="container py-8 md:py-12">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-elevated h-16 w-16 animate-pulse rounded-full" />
          <div>
            <div className="bg-elevated mb-2 h-6 w-40 animate-pulse rounded" />
            <div className="bg-elevated h-10 w-56 animate-pulse rounded" />
          </div>
        </div>
        <div className="bg-surface h-96 animate-pulse rounded-2xl" />
        <div className="bg-surface h-32 animate-pulse rounded-2xl" />
      </div>
    </main>
  )
}