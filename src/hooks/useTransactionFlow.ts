import { useCallback, useState } from 'react'
import { useWalletStore } from '@/stores/useWalletStore'

export type FlowStep = 'input' | 'confirm' | 'processing' | 'success'

export function useTransactionFlow() {
  const [step, setStep] = useState<FlowStep>('input')
  const [txnId, setTxnId] = useState('')

  const reset = useCallback(() => {
    setStep('input')
    setTxnId('')
  }, [])

  const run = useCallback(
    async (fn: () => Promise<{ error: string | null }>) => {
      setStep('processing')
      const { error } = await fn()

      if (error) {
        setStep('input')
        return error
      }
      // Cosmetic delay — DB write already completed via RPC
      await new Promise((r) => setTimeout(r, 1500))
      const txn = useWalletStore.getState().transactions[0]
      setTxnId(txn?.txn_id ?? '')
      setStep('success')
      return null
    },
    [],
  )

  return { step, setStep, txnId, reset, run }
}
