export function Home() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-4 font-display text-4xl font-bold text-primary">
        Welcome to CryptoPulse
      </h1>
      <p className="mb-8 text-text-secondary">
        Real-Time Cryptocurrency Tracking Platform
      </p>

      <div className="space-y-4">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <p className="font-mono tabular-nums text-text">
              Item #{i + 1} — Scroll to test sticky header
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}