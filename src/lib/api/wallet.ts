import { supabase } from '@/lib/supabase'
import type {
  Wallet,
  Holding,
  Transaction,
  TransactionType,
} from '@/types/wallet'

// ═══════════════════════════════════════
//   Wallet
// ═══════════════════════════════════════

export async function fetchWallet(userId: string): Promise<Wallet | null> {
  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function createWallet(userId: string): Promise<Wallet> {
  const { data, error } = await supabase
    .from('wallets')
    .insert({ user_id: userId })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateCashBalance(
  userId: string,
  newBalance: number,
): Promise<void> {
  const { error } = await supabase
    .from('wallets')
    .update({ cash_balance: newBalance })
    .eq('user_id', userId)

  if (error) throw error
}

// ═══════════════════════════════════════
//   Holdings
// ═══════════════════════════════════════

export async function fetchHoldings(userId: string): Promise<Holding[]> {
  const { data, error } = await supabase
    .from('holdings')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function upsertHolding(
  userId: string,
  coinId: string,
  coinSymbol: string,
  newAmount: number,
  newAvgPrice: number,
): Promise<void> {
  const { error } = await supabase.from('holdings').upsert(
    {
      user_id: userId,
      coin_id: coinId,
      coin_symbol: coinSymbol,
      amount: newAmount,
      avg_buy_price: newAvgPrice,
    },
    { onConflict: 'user_id,coin_id' },
  )

  if (error) throw error
}

export async function deleteHolding(
  userId: string,
  coinId: string,
): Promise<void> {
  const { error } = await supabase
    .from('holdings')
    .delete()
    .eq('user_id', userId)
    .eq('coin_id', coinId)

  if (error) throw error
}

// ═══════════════════════════════════════
//   Transactions
// ═══════════════════════════════════════

export async function fetchTransactions(
  userId: string,
  limit?: number,
): Promise<Transaction[]> {
  let query = supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (limit) query = query.limit(limit)

  const { data, error } = await query

  if (error) throw error
  return data
}

export interface CreateTransactionInput {
  userId: string
  type: TransactionType
  coinId?: string | null
  coinSymbol?: string | null
  amount: number
  price?: number | null
  totalUsd: number
  fee: number
  txnId: string
}

export async function createTransaction(
  input: CreateTransactionInput,
): Promise<Transaction> {
  const { data, error } = await supabase
    .from('transactions')
    .insert({
      user_id: input.userId,
      type: input.type,
      coin_id: input.coinId ?? null,
      coin_symbol: input.coinSymbol ?? null,
      amount: input.amount,
      price: input.price ?? null,
      total_usd: input.totalUsd,
      fee: input.fee,
      txn_id: input.txnId,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// ═══════════════════════════════════════
//   Helpers
// ═══════════════════════════════════════

/** tracking code: ex -> TXN-20251015-A3F9K2 */
export function generateTxnId(): string {
  const date = new Date()
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')

  // remove 0,1 and I,O
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let random = ''
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return `TXN-${y}${m}${d}-${random}`
}
