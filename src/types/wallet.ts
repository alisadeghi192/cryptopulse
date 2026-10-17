export type TransactionType = 'deposit' | 'withdraw' | 'buy' | 'sell'

export interface Wallet {
  user_id: string
  cash_balance: number
  account_number: string | null
  created_at: string
}

export interface Holding {
  id: string
  user_id: string
  coin_id: string
  coin_symbol: string
  amount: number
  avg_buy_price: number
  created_at: string
}

export interface Transaction {
  id: string
  user_id: string
  type: TransactionType
  coin_id: string | null
  coin_symbol: string | null
  amount: number
  price: number | null
  total_usd: number
  fee: number
  txn_id: string
  created_at: string
}

export interface HoldingWithPrice extends Holding {
  current_price: number
  current_value: number
  cost_basis: number
  pnl: number
  pnl_percent: number
}

export interface TradePreview {
  amount: number        
  price: number         
  subtotal: number      
  fee: number           
  total: number        
}