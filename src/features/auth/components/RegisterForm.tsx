import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { ArrowRight, Mail, Lock, Phone, User, Loader2 } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { InputField } from '@/components/ui/InputField'
import { useAuthStore } from '@/stores/useAuthStore'
import {
  registerSchema,
  type RegisterFormData,
} from '../schemas/registerSchema'
import { cn } from '@/utils/cn'

interface RegisterFormProps {
  onSwitch: () => void
}

export function RegisterForm({ onSwitch }: RegisterFormProps) {
  const navigate = useNavigate()
  const signUp = useAuthStore((s) => s.signUp)
  const isLoading = useAuthStore((s) => s.isLoading)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      agree: false as true,
    },
  })

  const agree = watch('agree')

  const onSubmit = async (data: RegisterFormData) => {
    const { error } = await signUp(
      data.email,
      data.password,
      data.fullName,
      data.phone,
    )

    if (error) {
      if (error.toLowerCase().includes('already registered')) {
        toast.error('Email already in use', {
          description: 'Try signing in instead',
        })
      } else if (error.toLowerCase().includes('password')) {
        toast.error('Weak password', {
          description: 'Password must be at least 6 characters',
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
      toast.success('Account created!', {
        description: 'Welcome to CryptoPulse',
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
          <div className="mb-4 text-center">
            <h1 className="font-display text-2xl font-bold tracking-tight">
              Create account
            </h1>
            <p className="text-text-secondary mt-2 text-sm">
              Start tracking markets in seconds
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2.5"
            noValidate
          >
            <InputField
              id="register-name"
              label="Full Name"
              icon={User}
              type="text"
              placeholder="Ali Sadeghi"
              error={errors.fullName?.message}
              {...register('fullName')}
            />

            <InputField
              id="register-phone"
              label="Phone Number"
              icon={Phone}
              type="tel"
              placeholder="09123456789"
              error={errors.phone?.message}
              {...register('phone')}
            />

            <InputField
              id="register-email"
              label="Email"
              icon={Mail}
              type="email"
              placeholder="you@email.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <InputField
              id="register-password"
              label="Password"
              icon={Lock}
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              showPasswordToggle
              {...register('password')}
            />

            <InputField
              id="register-confirm"
              label="Confirm password"
              icon={Lock}
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              showPasswordToggle
              {...register('confirmPassword')}
            />

            <div>
              <Checkbox
                checked={agree}
                onChange={(checked) =>
                  setValue('agree', checked as true, { shouldValidate: true })
                }
                label={
                  <>
                    I agree to the{' '}
                    <span className="text-primary hover:text-primary-hover cursor-pointer">
                      Terms
                    </span>{' '}
                    and{' '}
                    <span className="text-primary hover:text-primary-hover cursor-pointer">
                      Privacy Policy
                    </span>
                  </>
                }
              />
              {errors.agree && (
                <p className="text-error mt-1.5 font-mono text-[10px]">
                  {errors.agree.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="group mt-2 w-full gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <p className="text-text-secondary mt-6 text-center text-xs">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitch}
              className="text-primary hover:text-primary-hover font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}