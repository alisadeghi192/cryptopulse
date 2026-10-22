import { useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/useAuthStore'
import { WITHDRAW_FEE, TRADE_FEE_RATE } from '@/constants'
import { useWalletStore } from '@/stores/useWalletStore'
import {
  fetchWallet,
  fetchHoldings,
  fetchTransactions,
} from '@/lib/api/wallet'


interface RpcResponse {
  success: boolean
  txn_id?: string
}

export function useWalletActions() {
  const user = useAuthStore((s) => s.user)
  const setWallet = useWalletStore((s) => s.setWallet)
  const setHoldings = useWalletStore((s) => s.setHoldings)
  const setTransactions = useWalletStore((s) => s.setTransactions)

  // ✅ Refs for debouncing and preventing concurrent refreshes
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isRefreshingRef = useRef(false)

  const executeRefresh = useCallback(async () => {
    if (!user || isRefreshingRef.current) return
    isRefreshingRef.current = true

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
      console.error('Failed to sync wallet data:', err)
    } finally {
      isRefreshingRef.current = false
    }
  }, [user, setWallet, setHoldings, setTransactions])

  // Debounced refresh: waits 300ms after the last call before executing
  const refreshWallet = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current)
    }
    refreshTimeoutRef.current = setTimeout(() => {
      executeRefresh()
    }, 300)
  }, [executeRefresh])

  // ─── Actions ─────────────────────────────────────────────────────

  const deposit = useCallback(
    async (amount: number): Promise<{ error: string | null; txnId?: string }> => {
      if (!user) return { error: 'Not authenticated' }
      const { data, error } = await supabase.rpc('deposit_funds', { p_amount: amount })
      if (error) return { error: error.message }
      
      // Force immediate refresh after our own action
      if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current)
      await executeRefresh()
      
      const result = data as RpcResponse
      return { error: null, txnId: result?.txn_id }
    },
    [user, executeRefresh],
  )

  const withdraw = useCallback(
    async (amount: number): Promise<{ error: string | null; txnId?: string }> => {
      if (!user) return { error: 'Not authenticated' }
      const { data, error } = await supabase.rpc('withdraw_funds', { p_amount: amount })
      if (error) return { error: error.message }
      
      if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current)
      await executeRefresh()
      
      const result = data as RpcResponse
      return { error: null, txnId: result?.txn_id }
    },
    [user, executeRefresh],
  )

  const buyCoin = useCallback(
    async (
      coinId: string,
      coinSymbol: string,
      coinAmount: number,
      price: number,
    ): Promise<{ error: string | null; txnId?: string }> => {
      if (!user) return { error: 'Not authenticated' }
      const { data, error } = await supabase.rpc('buy_coin', {
        p_coin_id: coinId,
        p_coin_symbol: coinSymbol,
        p_coin_amount: coinAmount,
        p_price: price,
        p_fee_rate: TRADE_FEE_RATE,
      })
      if (error) return { error: error.message }
      
      if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current)
      await executeRefresh()
      
      const result = data as RpcResponse
      return { error: null, txnId: result?.txn_id }
    },
    [user, executeRefresh],
  )

  const sellCoin = useCallback(
    async (
      coinId: string,
      coinSymbol: string,
      coinAmount: number,
      price: number,
    ): Promise<{ error: string | null; txnId?: string }> => {
      if (!user) return { error: 'Not authenticated' }
      const { data, error } = await supabase.rpc('sell_coin', {
        p_coin_id: coinId,
        p_coin_symbol: coinSymbol,
        p_coin_amount: coinAmount,
        p_price: price,
        p_fee_rate: TRADE_FEE_RATE,
      })
      if (error) return { error: error.message }
      
      if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current)
      await executeRefresh()
      
      const result = data as RpcResponse
      return { error: null, txnId: result?.txn_id }
    },
    [user, executeRefresh],
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