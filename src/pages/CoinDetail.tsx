import { useParams } from 'react-router'

export function CoinDetail() {
  const { id } = useParams()

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-4xl font-bold text-primary">
        Coin: {id}
      </h1>
      <p className="mt-2 text-text-secondary">Coin detail page</p>
    </div>
  )
}