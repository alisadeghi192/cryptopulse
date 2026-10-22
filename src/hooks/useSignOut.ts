import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { confirm } from '@/lib/confirm'
import { useAuthStore } from '@/stores/useAuthStore'

export function useSignOut() {
  const signOut = useAuthStore((s) => s.signOut)
  const navigate = useNavigate()

  return async (onBeforeSignOut?: () => void) => {
    const ok = await confirm({
      title: 'Sign out?',
      description: 'You will need to sign in again to access your account.',
      confirmLabel: 'Sign Out',
      cancelLabel: 'Cancel',
      variant: 'danger',
    })
    if (!ok) return

    onBeforeSignOut?.()
    await signOut()
    toast.success('Signed out')
    navigate('/')
  }
}