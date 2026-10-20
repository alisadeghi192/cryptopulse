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
  const isLoaded = useWalletStore((s) => s.isLoaded)
  const loadedUserId = useWalletStore((s) => s.loadedUserId)
  const setWallet = useWalletStore((s) => s.setWallet)
  const setHoldings = useWalletStore((s) => s.setHoldings)
  const setTransactions = useWalletStore((s) => s.setTransactions)
  const setLoaded = useWalletStore((s) => s.setLoaded)
  const setLoading = useWalletStore((s) => s.setLoading)
  const setLoadedUserId = useWalletStore((s) => s.setLoadedUserId)
  const setError = useWalletStore((s) => s.setError)
  const reset = useWalletStore((s) => s.reset)

  useEffect(() => {
    if (!user) {
      reset()
      return
    }

    if (isLoaded && loadedUserId !== user.id) {
      reset()
    }

    if (isLoaded && loadedUserId === user.id) return

    let cancelled = false

    async function load() {
      if (!user) return
      setLoading(true)
      setError(null) // ✅ Clear previous errors

      try {
        let wallet = await fetchWallet(user.id)

        if (!wallet) {
          wallet = await createWallet(user.id)
        }

        const [holdings, transactions] = await Promise.all([
          fetchHoldings(user.id),
          fetchTransactions(user.id),
        ])

        if (cancelled) return

        setWallet(wallet)
        setHoldings(holdings)
        setTransactions(transactions)
        setLoadedUserId(user.id)
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
    user,
    isLoaded,
    loadedUserId,
    setWallet,
    setHoldings,
    setTransactions,
    setLoaded,
    setLoading,
    setLoadedUserId,
    setError,
    reset,
  ])
}