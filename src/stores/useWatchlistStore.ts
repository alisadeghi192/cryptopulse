import { create } from 'zustand'

interface WatchlistState {
  coinIds: string[]
  isLoaded: boolean
  setCoinIds: (ids: string[]) => void
  addCoin: (id: string) => void
  removeCoin: (id: string) => void
  reset: () => void
}

export const useWatchlistStore = create<WatchlistState>((set) => ({
  coinIds: [],
  isLoaded: false,

  setCoinIds: (ids) => set({ coinIds: ids, isLoaded: true }),

  addCoin: (id) =>
    set((s) => ({
      coinIds: s.coinIds.includes(id) ? s.coinIds : [id, ...s.coinIds],
    })),

  removeCoin: (id) =>
    set((s) => ({ coinIds: s.coinIds.filter((c) => c !== id) })),

  reset: () => set({ coinIds: [], isLoaded: false }),
}))