import { useWallet } from '@/hooks/useWallet'

export function WalletInitializer() {
  useWallet()
  return null
}