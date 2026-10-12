import { useEffect, useRef } from 'react'
import { useLocation, useSearchParams } from 'react-router'
import { cn } from '@/utils/cn'
import { AuthImagePanel } from '@/features/auth/components/AuthImagePanel'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { RegisterForm } from '@/features/auth/components/RegisterForm'

type AuthMode = 'login' | 'register'

interface SwapCardProps {
  flipped: boolean
  direction: 'up' | 'down'
  front: React.ReactNode
  back: React.ReactNode
}

function SwapCard({ flipped, direction, front, back }: SwapCardProps) {
  const outY = direction === 'up' ? '-100%' : '100%'
  const inY = direction === 'up' ? '100%' : '-100%'

  const frontRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (frontRef.current) {
      if (flipped) {
        frontRef.current.setAttribute('inert', '')
      } else {
        frontRef.current.removeAttribute('inert')
      }
    }
    if (backRef.current) {
      if (!flipped) {
        backRef.current.setAttribute('inert', '')
      } else {
        backRef.current.removeAttribute('inert')
      }
    }
  }, [flipped])

  return (
    <div className="relative h-screen w-1/2 overflow-hidden">
      <div
        ref={frontRef}
        className={cn(
          'absolute inset-0 transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]',
          flipped
            ? 'pointer-events-none opacity-0'
            : 'pointer-events-auto opacity-100',
        )}
        style={{ transform: flipped ? `translateY(${outY})` : 'translateY(0)' }}
      >
        {front}
      </div>
      <div
        ref={backRef}
        className={cn(
          'absolute inset-0 transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]',
          flipped
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
        style={{ transform: flipped ? 'translateY(0)' : `translateY(${inY})` }}
      >
        {back}
      </div>
    </div>
  )
}

interface FormSlotProps {
  isLogin: boolean
  onSwitch: () => void
}

function FormSlot({ isLogin, onSwitch }: FormSlotProps) {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden">
      <AmbientLights intensity="subtle" variant="auth" />
      <div className="relative z-10 w-full max-w-md px-6">
        {isLogin ? (
          <LoginForm onSwitch={onSwitch} />
        ) : (
          <RegisterForm onSwitch={onSwitch} />
        )}
      </div>
    </div>
  )
}

export function Auth() {
  const { pathname } = useLocation()
  const [params, setParams] = useSearchParams()

  const modeFromPath: AuthMode = pathname.includes('register')
    ? 'register'
    : 'login'

  const mode = (params.get('mode') as AuthMode | null) ?? modeFromPath
  const isLogin = mode === 'login'

  useEffect(() => {
    if (params.get('mode')) {
      const next = new URLSearchParams(params)
      next.delete('mode')
      setParams(next, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const handleSwitch = () => {
    const next = new URLSearchParams(params)
    next.delete('mode')
    setParams(next, { replace: true })
    window.history.pushState(null, '', isLogin ? '/register' : '/login')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <div className="bg-background relative min-h-screen w-full overflow-hidden">
      <div className="hidden min-h-screen w-full md:flex">
        <SwapCard
          flipped={!isLogin}
          direction="up"
          front={<AuthImagePanel mode="login" />}
          back={<FormSlot isLogin={false} onSwitch={handleSwitch} />}
        />

        <SwapCard
          flipped={!isLogin}
          direction="down"
          front={<FormSlot isLogin={true} onSwitch={handleSwitch} />}
          back={<AuthImagePanel mode="register" />}
        />
      </div>

      <div className="relative flex min-h-screen items-center justify-center overflow-hidden md:hidden">
        <AmbientLights intensity="subtle" variant="auth" />
        <div
          key={mode}
          className="relative z-10 w-full max-w-md animate-[slide-fade_0.5s_ease-out] px-6"
        >
          {isLogin ? (
            <LoginForm onSwitch={handleSwitch} />
          ) : (
            <RegisterForm onSwitch={handleSwitch} />
          )}
        </div>
      </div>
    </div>
  )
}
