import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Z_LAYERS } from '@/constants'

interface ModalContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal must be used within a Modal')
  return context
}

interface ModalProps {
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Modal({
  children,
  open: controlledOpen,
  onOpenChange,
}: ModalProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  )
}

interface ModalBodyProps {
  children: ReactNode
  className?: string
  dismissible?: boolean
}

export function ModalBody({
  children,
  className,
  dismissible = true,
}: ModalBodyProps) {
  const { open, setOpen } = useModal()
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Body scroll lock
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Enter animation
  useEffect(() => {
    if (!open) return
    const overlay = overlayRef.current
    const panel = panelRef.current
    if (!overlay || !panel) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return

    overlay.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 200,
      easing: 'ease-out',
      fill: 'both',
    })

    panel.animate(
      [
        { opacity: 0, transform: 'scale(0.85) translateY(20px)' },
        { opacity: 1, transform: 'scale(1.04) translateY(0)' },
        { opacity: 1, transform: 'scale(1) translateY(0)' },
      ],
      {
        duration: 420,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        fill: 'both',
      },
    )
  }, [open])

  // Outside click
  useEffect(() => {
    if (!open || !dismissible) return
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
    }
  }, [open, dismissible, setOpen])

  // Escape
  useEffect(() => {
    if (!open || !dismissible) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, dismissible, setOpen])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: Z_LAYERS.modal }}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        className={cn(
          'bg-surface border-border relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto rounded-2xl border shadow-2xl',
          className,
        )}
      >
        {dismissible && <CloseIcon />}
        {children}
      </div>
    </div>,
    document.body,
  )
}

interface ModalContentProps {
  children: ReactNode
  className?: string
}

export function ModalContent({ children, className }: ModalContentProps) {
  return (
    <div className={cn('flex flex-1 flex-col p-6 md:p-8', className)}>
      {children}
    </div>
  )
}

interface ModalFooterProps {
  children: ReactNode
  className?: string
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div
      className={cn(
        'border-border/40 bg-elevated/40 flex justify-end gap-2 border-t p-4',
        className,
      )}
    >
      {children}
    </div>
  )
}

function CloseIcon() {
  const { setOpen } = useModal()
  return (
    <button
      type="button"
      onClick={() => setOpen(false)}
      className="text-text/60 hover:bg-elevated hover:text-text absolute top-4 right-4 z-20 flex size-8 cursor-pointer items-center justify-center rounded-lg transition-colors"
    >
      <X className="size-4" />
    </button>
  )
}