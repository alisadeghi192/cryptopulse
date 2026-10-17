import { useCallback } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useWalletStore } from '@/stores/useWalletStore'
import {
  updateCashBalance,
  createTransaction,
  generateTxnId,
} from '@/lib/api/wallet'

const WITHDRAW_FEE = 0.5

export function useWalletActions() {
  const user = useAuthStore((s) => s.user)
  const wallet = useWalletStore((s) => s.wallet)
  const setWallet = useWalletStore((s) => s.setWallet)
  const addTransaction = useWalletStore((s) => s.addTransaction)

  const deposit = useCallback(
    async (amount: number): Promise<{ error: string | null }> => {
      if (!user || !wallet) return { error: 'Wallet not loaded' }
      if (amount < 10) return { error: 'Minimum deposit is $10' }
      if (amount > 100_000) return { error: 'Maximum deposit is $100,000' }

      const txnId = generateTxnId()
      const newBalance = wallet.cash_balance + amount

      try {
        await updateCashBalance(user.id, newBalance)

        const txn = await createTransaction({
          userId: user.id,
          type: 'deposit',
          amount,
          totalUsd: amount,
          fee: 0,
          txnId,
        })

        setWallet({ ...wallet, cash_balance: newBalance })
        addTransaction(txn)
        return { error: null }
      } catch (err) {
        console.error('Deposit failed:', err)
        return { error: 'Failed to process deposit' }
      }
    },
    [user, wallet, setWallet, addTransaction],
  )

  const withdraw = useCallback(
    async (amount: number): Promise<{ error: string | null }> => {
      if (!user || !wallet) return { error: 'Wallet not loaded' }
      if (amount < 10) return { error: 'Minimum withdrawal is $10' }
      if (amount > wallet.cash_balance) {
        return { error: 'Insufficient balance' }
      }

      const txnId = generateTxnId()
      const newBalance = wallet.cash_balance - amount

      try {
        await updateCashBalance(user.id, newBalance)

        const txn = await createTransaction({
          userId: user.id,
          type: 'withdraw',
          amount,
          totalUsd: amount,
          fee: WITHDRAW_FEE,
          txnId,
        })

        setWallet({ ...wallet, cash_balance: newBalance })
        addTransaction(txn)
        return { error: null }
      } catch (err) {
        console.error('Withdraw failed:', err)
        return { error: 'Failed to process withdrawal' }
      }
    },
    [user, wallet, setWallet, addTransaction],
  )

  return { deposit, withdraw, WITHDRAW_FEE }
}
