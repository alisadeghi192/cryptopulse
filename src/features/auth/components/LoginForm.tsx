import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Mail, Lock, Loader2 } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { InputField } from '@/components/ui/InputField'
import { useAuthStore } from '@/stores/useAuthStore'
import { loginSchema, type LoginFormData } from '../schemas/loginSchema'
import { cn } from '@/utils/cn'
import { toast } from 'sonner'

interface LoginFormProps {
  onSwitch: () => void
}

export function LoginForm({ onSwitch }: LoginFormProps) {
  const navigate = useNavigate()
  const signIn = useAuthStore((s) => s.signIn)
  const isLoading = useAuthStore((s) => s.isLoading)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    const { error } = await signIn(data.email, data.password)

    if (error) {
      if (error.toLowerCase().includes('invalid login credentials')) {
        toast.error('Sign in failed', {
          description: 'Invalid email or password',
        })
      } else if (error.toLowerCase().includes('email not confirmed')) {
        toast.error('Email not confirmed', {
          description: 'Check your inbox to confirm your email',
        })
      } else if (error.toLowerCase().includes('rate limit')) {
        toast.error('Too many attempts', {
          description: 'Please wait a few minutes and try again',
        })
      } else {
        toast.error('Something went wrong', {
          description: 'Please try again in a moment',
        })
      }
    } else {
      toast.success('Welcome back!', {
        description: 'Redirecting to your dashboard...',
      })
      navigate('/dashboard')
    }
  }

  return (
    <div>
      <div className="mb-8 flex justify-center md:hidden">
        <Logo textClassName="text-2xl" iconClassName="h-10" />
      </div>

      <div
        className={cn(
          'relative overflow-hidden rounded-3xl border p-6',
          'border-border/50 bg-surface/40',
          'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]',
        )}
      >
        <div className="relative z-10">
          <div className="mb-8 text-center">
            <h1 className="font-display text-2xl font-bold tracking-tight">
              Welcome back
            </h1>
            <p className="text-text-secondary mt-2 text-sm">
              Sign in to continue to your dashboard
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <InputField
              id="login-email"
              label="Email"
              icon={Mail}
              type="email"
              placeholder="you@email.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <InputField
              id="login-password"
              label="Password"
              icon={Lock}
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              showPasswordToggle
              {...register('password')}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className={cn("group mt-2 w-full gap-2" , !isLoading && "cursor-pointer")} 
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <p className="text-text-secondary mt-6 text-center text-xs">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitch}
              className="text-primary cursor-pointer hover:text-primary-hover font-medium transition-colors"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}