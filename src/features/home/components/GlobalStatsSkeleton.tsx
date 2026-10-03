export function GlobalStatsSkeleton() {
  return (
    <section className="py-12 md:py-16">
      <div className="mb-8">
        <div className="bg-elevated mb-2 h-9 w-48 animate-pulse rounded-lg" />
        <div className="bg-elevated h-4 w-64 animate-pulse rounded-lg" />
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="border-border bg-surface h-32 animate-pulse rounded-2xl border"
          />
        ))}
      </div>
    </section>
  )
}