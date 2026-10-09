import type { Time } from 'lightweight-charts'

export interface Coin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number | null
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  price_change_percentage_1h_in_currency?: number
  price_change_percentage_7d_in_currency?: number
  circulating_supply: number
  total_supply: number | null
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  last_updated: string
  sparkline_in_7d?: {
    price: number[]
  }
}

export interface MarketChartPoint {
  time: Time
  value: number
}

export interface MarketChartResponse {
  prices: [number, number][]
  market_caps: [number, number][]
  total_volumes: [number, number][]
}

export type TimeRange = '24H' | '7D' | '1M' | '1Y'

export interface GlobalStats {
  active_cryptocurrencies: number
  markets: number
  total_market_cap: {
    usd: number
  }
  total_volume: {
    usd: number
  }
  market_cap_percentage: {
    btc: number
    eth: number
  }
  market_cap_change_percentage_24h_usd: number
}

export interface GlobalStatsResponse {
  data: GlobalStats
}

export interface TrendingCoin {
  item: {
    id: string
    coin_id: number
    name: string
    symbol: string
    market_cap_rank: number
    thumb: string
    small: string
    large: string
    slug: string
    price_btc: number
    score: number
    data: {
      price: number
      price_btc: string
      price_change_percentage_24h: {
        usd: number
      }
      market_cap: string
      total_volume: string
      sparkline: string
    }
  }
}

export interface TrendingResponse {
  coins: TrendingCoin[]
}

export interface CoinDetail {
  id: string
  symbol: string
  name: string
  image: {
    large: string
    small: string
    thumb: string
  }
  market_cap_rank: number
  description: {
    en: string
  }
  links: {
    homepage: string[]
    blockchain_site: string[]
    official_forum_url: string[]
    chat_url: string[]
    announcement_url: string[]
    twitter_screen_name: string
    facebook_username: string
    subreddit_url: string
    repos_url: {
      github: string[]
    }
  }
  categories: string[]
  market_data: {
    current_price: { usd: number }
    market_cap: { usd: number }
    total_volume: { usd: number }
    high_24h: { usd: number }
    low_24h: { usd: number }
    price_change_percentage_24h: number
    price_change_percentage_7d: number
    price_change_percentage_30d: number
    ath: { usd: number }
    ath_date: { usd: string }
    ath_change_percentage: { usd: number }
    atl: { usd: number }
    atl_date: { usd: string }
    atl_change_percentage: { usd: number }
    circulating_supply: number
    total_supply: number | null
    max_supply: number | null
  }
  last_updated: string
  sentiment_votes_up_percentage: number | null
  sentiment_votes_down_percentage: number | null
  community_data: {
    twitter_followers: number | null
    reddit_subscribers: number | null
    telegram_channel_user_count: number | null
  }
  watchlist_portfolio_users: number | null
  developer_data: {
    forks: number | null
    stars: number | null
    subscribers: number | null
    total_issues: number | null
    closed_issues: number | null
    commit_count_4_weeks: number | null
  }
}
