import { useCallback, useState } from 'react'

export type FlowStep = 'input' | 'confirm' | 'processing' | 'success'

export function useTransactionFlow() {
  const [step, setStep] = useState<FlowStep>('input')
  const [txnId, setTxnId] = useState('')

  const reset = useCallback(() => {
    setStep('input')
    setTxnId('')
  }, [])

  const run = useCallback(
    async (
      fn: () => Promise<{ error: string | null; txnId?: string }>,
    ) => {
      setStep('processing')
      
      try {
        const { error, txnId: returnedTxnId } = await fn()

        if (error) {
          setStep('input')
          return error
        }

        // Cosmetic delay (DB write already completed via RPC)
        await new Promise((r) => setTimeout(r, 1500))

        setTxnId(returnedTxnId || '')
        setStep('success')
        return null
      } catch (err) {
        console.error('Transaction failed:', err)
        setStep('input')
        return 'An unexpected error occurred. Please try again.'
      }
    },
    [],
  )

  return { step, setStep, txnId, reset, run }
}