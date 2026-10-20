import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/useAuthStore'
import { useWalletActions } from './useWalletActions'

export function useWalletRealtimeSync() {
  const user = useAuthStore((s) => s.user)
  const { refreshWallet } = useWalletActions()

  useEffect(() => {
    if (!user) return

    const channel = supabase
      .channel(`wallet-sync-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'wallets',
          filter: `user_id=eq.${user.id}`,
        },
        () => refreshWallet(), // ← Now debounced
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'holdings',
          filter: `user_id=eq.${user.id}`,
        },
        () => refreshWallet(),
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transactions',
          filter: `user_id=eq.${user.id}`,
        },
        () => refreshWallet(),
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, refreshWallet])
}