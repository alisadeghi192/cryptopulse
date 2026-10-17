import { useWallet } from '@/hooks/useWallet'
import { useWalletRealtimeSync } from '@/hooks/useWalletRealtimeSync'

export function WalletInitializer() {
  useWallet()
  useWalletRealtimeSync()
  return null
}