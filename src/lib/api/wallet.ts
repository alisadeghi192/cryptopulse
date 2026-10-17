import { supabase } from '@/lib/supabase'
import type { Wallet, Holding, Transaction } from '@/types/wallet'

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

export async function fetchHoldings(userId: string): Promise<Holding[]> {
  const { data, error } = await supabase
    .from('holdings')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

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