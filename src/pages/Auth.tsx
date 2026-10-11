import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router'
import { cn } from '@/utils/cn'
import { AuthImagePanel } from '@/features/auth/components/AuthImagePanel'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { RegisterForm } from '@/features/auth/components/RegisterForm'


type AuthMode = 'login' | 'register'

interface FlipCardProps {
  flipped: boolean
  direction: 'up' | 'down'
  front: React.ReactNode
  back: React.ReactNode
}

function FlipCard({ flipped, direction, front, back }: FlipCardProps) {
  const rotate = flipped
    ? direction === 'up'
      ? 'rotateX(180deg)'
      : 'rotateX(-180deg)'
    : 'rotateX(0deg)'

  const counterRotate =
    direction === 'up' ? 'rotateX(180deg)' : 'rotateX(-180deg)'

  return (
    <div
      className="relative h-screen w-1/2 transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{ transform: rotate, transformStyle: 'preserve-3d' }}
    >
      <div
        className={cn(
          'absolute inset-0 backface-hidden',
          flipped && 'pointer-events-none',
        )}
      >
        {front}
      </div>
      <div
        className={cn(
          'absolute inset-0 backface-hidden',
          !flipped && 'pointer-events-none',
        )}
        style={{ transform: counterRotate, transformStyle: 'preserve-3d' }}
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
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div
        className="hidden md:flex min-h-screen w-full"
        style={{ perspective: '2400px', perspectiveOrigin: '50% 50%' }}
      >
        <FlipCard
          flipped={!isLogin}
          direction="up"
          front={<AuthImagePanel mode="login" />}
          back={<FormSlot isLogin={false} onSwitch={handleSwitch} />}
        />

        <FlipCard
          flipped={!isLogin}
          direction="down"
          front={<FormSlot isLogin={true} onSwitch={handleSwitch} />}
          back={<AuthImagePanel mode="register" />}
        />
      </div>

      <div className="md:hidden relative flex min-h-screen items-center justify-center overflow-hidden">
        <AmbientLights intensity="subtle" variant="auth" />
        <div
          key={mode}
          className="relative z-10 w-full max-w-md px-6 animate-[slide-fade_0.5s_ease-out]"
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