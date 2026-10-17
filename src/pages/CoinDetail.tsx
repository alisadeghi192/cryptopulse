import { useParams } from 'react-router'
import { useCoinDetail } from '@/features/coin/hooks/useCoinDetail'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { CoinHeader } from '@/features/coin/components/CoinHeader'
import { BuySellButtons } from '@/features/coin/components/BuySellButtons'
import { CoinPriceChart } from '@/features/coin/components/CoinPriceChart'
import { CoinConverter } from '@/features/coin/components/CoinConverter'
import { CoinStatsGrid } from '@/features/coin/components/CoinStatsGrid'
import { HistoricalPriceTable } from '@/features/coin/components/HistoricalPriceTable'
import { ATHATLVisual } from '@/features/coin/components/ATHATLVisual'
import { SentimentMeter } from '@/features/coin/components/SentimentMeter'
import { PriceChangeHeatmap } from '@/features/coin/components/PriceChangeHeatmap'
import { SupplyVisual } from '@/features/coin/components/SupplyVisual'
import { CommunityStats } from '@/features/coin/components/CommunityStats'
import { CoinAbout } from '@/features/coin/components/CoinAbout'
import { RelatedCoins } from '@/features/coin/components/RelatedCoins'
import { CoinLinks } from '@/features/coin/components/CoinLinks'
import { PageLoader } from '@/components/ui/PageLoader'

export function CoinDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: coin, isLoading, isError } = useCoinDetail(id)

  if (isLoading) return <PageLoader />

  if (isError || !coin) {
    return (
      <main className="container py-8 md:py-12">
        <div className="flex h-96 flex-col items-center justify-center gap-4">
          <p className="text-error font-mono text-sm">Failed to load coin.</p>
        </div>
      </main>
    )
  }

  const isPositive = (coin.market_data.price_change_percentage_24h ?? 0) >= 0

  const tradeCoin = {
    id: coin.id,
    symbol: coin.symbol,
    current_price: coin.market_data.current_price.usd,
  }

  return (
    <main className="relative">
      <AmbientLights variant="coin" intensity="subtle" />

      <div className="relative z-10 container py-8 md:py-12">
        <div className="flex flex-col gap-6">
          {/* 1. Header */}
          <CoinHeader
            coinId={coin.id}
            name={coin.name}
            symbol={coin.symbol}
            image={coin.image.large}
            rank={coin.market_cap_rank}
            price={coin.market_data.current_price.usd}
            change24h={coin.market_data.price_change_percentage_24h ?? 0}
          />

          {/* 2. Buy/Sell Buttons */}
          <BuySellButtons coin={tradeCoin} />

          {/* 3. Chart */}
          <CoinPriceChart coinId={coin.id} isPositive={isPositive} />

          {/* 4. Converter + Historical */}
          <div className="grid gap-6 lg:grid-cols-2">
            <CoinConverter
              price={coin.market_data.current_price.usd}
              symbol={coin.symbol.toUpperCase()}
              image={coin.image.small}
              name={coin.name}
            />
            <HistoricalPriceTable
              coinId={coin.id}
              currentPrice={coin.market_data.current_price.usd}
            />
          </div>

          {/* 5. Stats Grid */}
          <CoinStatsGrid marketData={coin.market_data} />

          {/* 6. ATH/ATL */}
          <ATHATLVisual
            current={coin.market_data.current_price.usd}
            ath={coin.market_data.ath.usd}
            atl={coin.market_data.atl.usd}
            athChangePercentage={coin.market_data.ath_change_percentage.usd ?? 0}
          />

          {/* 7. Sentiment + Heatmap */}
          <div className="grid gap-6 lg:grid-cols-2">
            <SentimentMeter
              up={coin.sentiment_votes_up_percentage}
              down={coin.sentiment_votes_down_percentage}
            />
            <PriceChangeHeatmap coinId={coin.id} />
          </div>

          {/* 8. Supply + Community */}
          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            <SupplyVisual
              circulating={coin.market_data.circulating_supply}
              max={coin.market_data.max_supply}
            />
            <CommunityStats watchlistUsers={coin.watchlist_portfolio_users} />
          </div>

          {/* 9. About */}
          <CoinAbout name={coin.name} description={coin.description?.en ?? ''} />

          {/* 10. Related Coins */}
          <RelatedCoins
            coinId={coin.id}
            marketCapRank={coin.market_cap_rank}
          />

          {/* 11. Links */}
          <CoinLinks
            homepage={coin.links.homepage}
            twitterScreenName={coin.links.twitter_screen_name}
            githubRepos={coin.links.repos_url.github}
            subredditUrl={coin.links.subreddit_url}
            blockchainSites={coin.links.blockchain_site}
          />
        </div>
      </div>
    </main>
  )
}