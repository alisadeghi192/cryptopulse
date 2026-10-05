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
