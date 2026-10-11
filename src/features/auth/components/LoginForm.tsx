import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

interface LoginFormProps {
  onSwitch: () => void
}

export function LoginForm({ onSwitch }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
// TODO: connect to auth provider
  }

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
        <div className="relative z-10">
          <div className="mb-8 text-center">
            <h1 className="font-display text-2xl font-bold tracking-tight">
              Welcome back
            </h1>
            <p className="text-text-secondary mt-2 text-sm">
              Sign in to continue to your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-text-secondary mb-2 block font-mono text-[10px] tracking-widest uppercase">
                Email
              </label>
              <div className="focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)] flex h-11 items-center gap-2 rounded-xl border border-border bg-background/50 px-3 transition-all">
                <Mail className="text-text-secondary size-4 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="text-text placeholder:text-text-secondary/50 h-full w-full bg-transparent font-mono text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-text-secondary block font-mono text-[10px] tracking-widest uppercase">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-primary hover:text-primary-hover font-mono text-[10px] transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)] flex h-11 items-center gap-2 rounded-xl border border-border bg-background/50 px-3 transition-all">
                <Lock className="text-text-secondary size-4 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="border-border text-primary focus:ring-primary/30 size-4 cursor-pointer rounded border bg-transparent"
              />
              <label
                htmlFor="remember"
                className="text-text-secondary cursor-pointer font-mono text-xs select-none"
              >
                Remember me for 30 days
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="group mt-2 w-full gap-2"
            >
              Sign In
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          <p className="text-text-secondary mt-6 text-center text-xs">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitch}
              className="text-primary hover:text-primary-hover font-medium transition-colors"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}