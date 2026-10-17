import { useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/useAuthStore'
import { useWalletStore } from '@/stores/useWalletStore'
import {
  fetchWallet,
  fetchHoldings,
  fetchTransactions,
} from '@/lib/api/wallet'

const WITHDRAW_FEE = 0.5
const TRADE_FEE_RATE = 0.001

export function useWalletActions() {
  const user = useAuthStore((s) => s.user)
  const setWallet = useWalletStore((s) => s.setWallet)
  const setHoldings = useWalletStore((s) => s.setHoldings)
  const setTransactions = useWalletStore((s) => s.setTransactions)

  const refreshWallet = useCallback(async () => {
    if (!user) return
    try {
      const [walletData, holdingsData, transactionsData] = await Promise.all([
        fetchWallet(user.id),
        fetchHoldings(user.id),
        fetchTransactions(user.id),
      ])
      if (walletData) setWallet(walletData)
      setHoldings(holdingsData)
      setTransactions(transactionsData)
    } catch (err) {
      console.error('Failed to refresh wallet:', err)
    }
  }, [user, setWallet, setHoldings, setTransactions])

  const deposit = useCallback(
    async (amount: number): Promise<{ error: string | null }> => {
      if (!user) return { error: 'Not authenticated' }

      const { error } = await supabase.rpc('deposit_funds', {
        p_amount: amount,
      })

      if (error) {
        return { error: error.message }
      }

      await refreshWallet()
      return { error: null }
    },
    [user, refreshWallet],
  )

  const withdraw = useCallback(
    async (amount: number): Promise<{ error: string | null }> => {
      if (!user) return { error: 'Not authenticated' }

      const { error } = await supabase.rpc('withdraw_funds', {
        p_amount: amount,
      })

      if (error) {
        return { error: error.message }
      }

      await refreshWallet()
      return { error: null }
    },
    [user, refreshWallet],
  )

  const buyCoin = useCallback(
    async (
      coinId: string,
      coinSymbol: string,
      coinAmount: number,
      price: number,
    ): Promise<{ error: string | null }> => {
      if (!user) return { error: 'Not authenticated' }

      const { error } = await supabase.rpc('buy_coin', {
        p_coin_id: coinId,
        p_coin_symbol: coinSymbol,
        p_coin_amount: coinAmount,
        p_price: price,
        p_fee_rate: TRADE_FEE_RATE,
      })

      if (error) {
        return { error: error.message }
      }

      await refreshWallet()
      return { error: null }
    },
    [user, refreshWallet],
  )

  const sellCoin = useCallback(
    async (
      coinId: string,
      coinSymbol: string,
      coinAmount: number,
      price: number,
    ): Promise<{ error: string | null }> => {
      if (!user) return { error: 'Not authenticated' }

      const { error } = await supabase.rpc('sell_coin', {
        p_coin_id: coinId,
        p_coin_symbol: coinSymbol,
        p_coin_amount: coinAmount,
        p_price: price,
        p_fee_rate: TRADE_FEE_RATE,
      })

      if (error) {
        return { error: error.message }
      }

      await refreshWallet()
      return { error: null }
    },
    [user, refreshWallet],
  )

  return {
    deposit,
    withdraw,
    buyCoin,
    sellCoin,
    refreshWallet,
    WITHDRAW_FEE,
    TRADE_FEE_RATE,
  }
}