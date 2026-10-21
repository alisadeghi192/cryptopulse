import { useEffect } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useWalletStore } from '@/stores/useWalletStore'
import {
  fetchWallet,
  createWallet,
  fetchHoldings,
  fetchTransactions,
} from '@/lib/api/wallet'

export function useWallet() {
  const user = useAuthStore((s) => s.user)
  const reset = useWalletStore((s) => s.reset)

  const setWallet = useWalletStore((s) => s.setWallet)
  const setHoldings = useWalletStore((s) => s.setHoldings)
  const setTransactions = useWalletStore((s) => s.setTransactions)
  const setLoaded = useWalletStore((s) => s.setLoaded)
  const setLoading = useWalletStore((s) => s.setLoading)
  const setLoadedUserId = useWalletStore((s) => s.setLoadedUserId)
  const setError = useWalletStore((s) => s.setError)

  const userId = user?.id

  useEffect(() => {
    if (!userId) {
      reset()
      return
    }

    // Read current state without subscribing to it. This prevents the
    // effect from re-running after reset() changes isLoaded/loadedUserId.
    const state = useWalletStore.getState()

    // Already loaded for this exact user → nothing to do.
    if (state.isLoaded && state.loadedUserId === userId) return

    // A different user's data is in the store → clear it first.
    if (state.loadedUserId && state.loadedUserId !== userId) {
      reset()
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        let wallet = await fetchWallet(userId!)
        if (!wallet) wallet = await createWallet(userId!)

        const [holdings, transactions] = await Promise.all([
          fetchHoldings(userId!),
          fetchTransactions(userId!),
        ])

        if (cancelled) return

        setWallet(wallet)
        setHoldings(holdings)
        setTransactions(transactions)
        setLoadedUserId(userId!)
        setLoaded(true)
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message || 'Failed to load wallet data')
        }
        console.error('Failed to load wallet:', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [
    userId,
    reset,
    setWallet,
    setHoldings,
    setTransactions,
    setLoaded,
    setLoading,
    setLoadedUserId,
    setError,
  ])
}