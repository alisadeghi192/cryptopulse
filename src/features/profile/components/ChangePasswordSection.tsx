import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown, Lock, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { PasswordField } from '@/components/ui/PasswordField'
import { useAuthStore } from '@/stores/useAuthStore'
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from '../schemas/changePasswordSchema'
import { cn } from '@/utils/cn'

export function ChangePasswordSection() {
  const changePassword = useAuthStore((s) => s.changePassword)
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: ChangePasswordFormData) => {
    const { error } = await changePassword('', data.newPassword)
    if (error) {
      toast.error('Failed to change password', { description: error })
      return
    }
    toast.success('Password changed', {
      description: 'Your password has been updated',
    })
    reset()
    setOpen(false)
  }

  return (
    <div className="border-border/30 border-b">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="group hover:bg-elevated/30 cursor-pointer flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className="border-primary/30 bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg border backdrop-blur-sm">
            <Lock className="size-4" />
          </div>
          <div>
            <p className="text-text text-sm font-medium">Change Password</p>
            <p className="text-text/70 mt-0.5 font-mono text-[11px]">
              Update your account password
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            'text-text/70 group-hover:text-primary size-4 shrink-0 transition-transform duration-300',
            open && 'rotate-180',
          )}
        />
      </button>

      <div
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 px-5 pt-1 pb-5"
            noValidate
          >
            <PasswordField
              id="new-password"
              label="New Password"
              icon={Lock}
              placeholder="••••••••"
              disabled={isSubmitting}
              error={errors.newPassword?.message}
              {...register('newPassword')}
            />

            <PasswordField
              id="confirm-password"
              label="Confirm New Password"
              icon={Lock}
              placeholder="••••••••"
              disabled={isSubmitting}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
              className="w-full gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}