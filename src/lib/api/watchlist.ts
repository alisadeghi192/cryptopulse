import { supabase } from '@/lib/supabase'

export async function fetchWatchlist(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('watchlist')
    .select('coin_id')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data.map((row) => row.coin_id)
}

export async function addToWatchlist(
  userId: string,
  coinId: string,
): Promise<void> {
  const { error } = await supabase
    .from('watchlist')
    .insert({ user_id: userId, coin_id: coinId })

  if (error) throw error
}

export async function removeFromWatchlist(
  userId: string,
  coinId: string,
): Promise<void> {
  const { error } = await supabase
    .from('watchlist')
    .delete()
    .eq('user_id', userId)
    .eq('coin_id', coinId)

  if (error) throw error
}