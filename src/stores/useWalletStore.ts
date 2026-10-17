import { create } from 'zustand'
import type { Wallet, Holding, Transaction } from '@/types/wallet'

interface WalletState {
  wallet: Wallet | null
  holdings: Holding[]
  transactions: Transaction[]
  isLoaded: boolean
  isLoading: boolean

  setWallet: (wallet: Wallet | null) => void
  setHoldings: (holdings: Holding[]) => void
  setTransactions: (transactions: Transaction[]) => void
  addTransaction: (txn: Transaction) => void
  setLoaded: (loaded: boolean) => void
  setLoading: (loading: boolean) => void
  reset: () => void
}

export const useWalletStore = create<WalletState>((set) => ({
  wallet: null,
  holdings: [],
  transactions: [],
  isLoaded: false,
  isLoading: false,

  setWallet: (wallet) => set({ wallet }),
  setHoldings: (holdings) => set({ holdings }),
  setTransactions: (transactions) => set({ transactions }),

  addTransaction: (txn) =>
    set((s) => ({ transactions: [txn, ...s.transactions] })),

  setLoaded: (isLoaded) => set({ isLoaded }),
  setLoading: (isLoading) => set({ isLoading }),

  reset: () =>
    set({
      wallet: null,
      holdings: [],
      transactions: [],
      isLoaded: false,
      isLoading: false,
    }),
}))