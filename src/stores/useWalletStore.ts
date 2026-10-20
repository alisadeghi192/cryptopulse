import { create } from 'zustand'
import type { Wallet, Holding, Transaction } from '@/types/wallet'

interface WalletState {
  wallet: Wallet | null
  holdings: Holding[]
  transactions: Transaction[]
  isLoaded: boolean
  loadedUserId: string | null
  isLoading: boolean
  error: string | null // ✅ NEW

  setWallet: (wallet: Wallet | null) => void
  setHoldings: (holdings: Holding[]) => void
  setTransactions: (transactions: Transaction[]) => void
  setLoaded: (loaded: boolean) => void
  setLoading: (loading: boolean) => void
  setLoadedUserId: (userId: string | null) => void
  setError: (error: string | null) => void // ✅ NEW
  reset: () => void
}

export const useWalletStore = create<WalletState>((set) => ({
  wallet: null,
  holdings: [],
  transactions: [],
  isLoaded: false,
  loadedUserId: null,
  isLoading: false,
  error: null,

  setWallet: (wallet) => set({ wallet }),
  setHoldings: (holdings) => set({ holdings }),
  setTransactions: (transactions) => set({ transactions }),
  setLoaded: (isLoaded) => set({ isLoaded }),
  setLoading: (isLoading) => set({ isLoading }),
  setLoadedUserId: (loadedUserId) => set({ loadedUserId }),
  setError: (error) => set({ error }),

  reset: () =>
    set({
      wallet: null,
      holdings: [],
      transactions: [],
      isLoaded: false,
      loadedUserId: null,
      isLoading: false,
      error: null,
    }),
}))