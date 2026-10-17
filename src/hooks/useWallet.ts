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
  const setWallet = useWalletStore((s) => s.setWallet)
  const setHoldings = useWalletStore((s) => s.setHoldings)
  const setTransactions = useWalletStore((s) => s.setTransactions)
  const setLoaded = useWalletStore((s) => s.setLoaded)
  const setLoading = useWalletStore((s) => s.setLoading)
  const reset = useWalletStore((s) => s.reset)

  useEffect(() => {
    if (!user) {
      reset()
      return
    }

    if (isLoaded) return

    async function load() {
      setLoading(true)
      try {
        let wallet = await fetchWallet(user!.id)

        if (!wallet) {
          wallet = await createWallet(user!.id)
        }

        const [holdings, transactions] = await Promise.all([
          fetchHoldings(user!.id),
          fetchTransactions(user!.id),
        ])

        setWallet(wallet)
        setHoldings(holdings)
        setTransactions(transactions)
        setLoaded(true)
      } catch (err) {
        console.error('Failed to load wallet:', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [
    user,
    isLoaded,
    setWallet,
    setHoldings,
    setTransactions,
    setLoaded,
    setLoading,
    reset,
  ])
}