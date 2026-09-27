export function HeroSkeleton() {
  return (
    <main>
      <div className="relative z-10 mx-auto sm:px-2 md:px-4 lg:px-6 xl:px-10">
        <section className="grid grid-cols-1 items-center gap-12 py-12 md:py-20 lg:grid-cols-12 lg:gap-8">
          {/* ─── Left Column Skeleton ─────── */}
          <div className="flex flex-col items-start gap-6 lg:col-span-6">
            <div className="bg-elevated h-7 w-40 animate-pulse rounded-full" />
            <div className="bg-elevated h-16 w-full animate-pulse rounded-lg" />
            <div className="bg-elevated h-16 w-3/4 animate-pulse rounded-lg" />
            <div className="bg-elevated h-20 w-full max-w-xl animate-pulse rounded-lg" />
            <div className="flex gap-3">
              <div className="bg-elevated h-12 w-44 animate-pulse rounded-lg" />
              <div className="bg-elevated h-12 w-36 animate-pulse rounded-lg" />
            </div>
            <div className="bg-elevated h-8 w-80 animate-pulse rounded-lg" />
          </div>

          {/* ─── Right Column Skeleton ─────── */}
          <div className="lg:col-span-6">
            <div className="bg-elevated h-100 w-full animate-pulse rounded-2xl" />
          </div>
        </section>
      </div>
    </main>
  )
}