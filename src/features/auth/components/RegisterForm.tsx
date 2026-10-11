import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

interface RegisterFormProps {
  onSwitch: () => void
}

export function RegisterForm({ onSwitch }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [agree, setAgree] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
     // TODO: connect to auth provider
  }

  const update =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <div>
      <div className="mb-8 flex justify-center md:hidden">
        <Logo />
      </div>

      <div
        className={cn(
          'relative overflow-hidden rounded-3xl border p-8',
          'border-border/50 bg-surface/40 backdrop-blur-2xl',
          'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]',
        )}
      >
        <div className="bg-primary/20 pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-[80px]" />

        <div className="relative z-10">
          <div className="mb-8 text-center">
            <h1 className="font-display text-2xl font-bold tracking-tight">
              Create account
            </h1>
            <p className="text-text-secondary mt-2 text-sm">
              Start tracking markets in seconds
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-text-secondary mb-2 block font-mono text-[10px] tracking-widest uppercase">
                Full name
              </label>
              <div className="focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)] flex h-11 items-center gap-2 rounded-xl border border-border bg-background/50 px-3 transition-all">
                <User className="text-text-secondary size-4 shrink-0" />
                <input
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Ali Sadeghi"
                  required
                  className="text-text placeholder:text-text-secondary/50 h-full w-full bg-transparent font-mono text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-text-secondary mb-2 block font-mono text-[10px] tracking-widest uppercase">
                Email
              </label>
              <div className="focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)] flex h-11 items-center gap-2 rounded-xl border border-border bg-background/50 px-3 transition-all">
                <Mail className="text-text-secondary size-4 shrink-0" />
                <input
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@email.com"
                  required
                  className="text-text placeholder:text-text-secondary/50 h-full w-full bg-transparent font-mono text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-text-secondary mb-2 block font-mono text-[10px] tracking-widest uppercase">
                Password
              </label>
              <div className="focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)] flex h-11 items-center gap-2 rounded-xl border border-border bg-background/50 px-3 transition-all">
                <Lock className="text-text-secondary size-4 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={update('password')}
                  placeholder="••••••••"
                  required
                  className="text-text placeholder:text-text-secondary/50 h-full w-full bg-transparent font-mono text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="text-text-secondary hover:text-text shrink-0 transition-colors"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-text-secondary mb-2 block font-mono text-[10px] tracking-widest uppercase">
                Confirm password
              </label>
              <div className="focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)] flex h-11 items-center gap-2 rounded-xl border border-border bg-background/50 px-3 transition-all">
                <Lock className="text-text-secondary size-4 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={update('confirmPassword')}
                  placeholder="••••••••"
                  required
                  className="text-text placeholder:text-text-secondary/50 h-full w-full bg-transparent font-mono text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                required
                className="border-border text-primary focus:ring-primary/30 mt-0.5 size-4 cursor-pointer rounded border bg-transparent"
              />
              <label
                htmlFor="terms"
                className="text-text-secondary cursor-pointer text-xs leading-relaxed select-none"
              >
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:text-primary-hover">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:text-primary-hover">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="group mt-2 w-full gap-2"
            >
              Create Account
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
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