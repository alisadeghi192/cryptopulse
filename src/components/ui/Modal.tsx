import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Z_LAYERS } from '@/constants'

let lockCount = 0

interface ModalProps {
  open: boolean
  onClose: () => void
  titleId?: string
  dismissible?: boolean
  showClose?: boolean
  className?: string
  children: React.ReactNode
}

export function Modal({
  open,
  onClose,
  titleId,
  dismissible = true,
  showClose = true,
  className,
  children,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    lockCount++
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dismissible) onClose()
      if (e.key !== 'Tab' || !panelRef.current) return

      const nodes = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
      )
      if (!nodes.length) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const active = document.activeElement

      if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)

    const raf = requestAnimationFrame(() => {
      const node = panelRef.current?.querySelector<HTMLElement>(
        'input,button,[tabindex]:not([tabindex="-1"])',
      )
      node?.focus()
    })

    return () => {
      document.removeEventListener('keydown', onKey)
      cancelAnimationFrame(raf)
      lockCount--
      document.body.style.overflow = lockCount > 0 ? 'hidden' : prev
    }
  }, [open, dismissible, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      style={{ zIndex: Z_LAYERS.modal }}
      onClick={() => dismissible && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'border-border/40 bg-surface/90 relative w-full max-w-md overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-3xl',
          className,
        )}
      >
        {showClose && dismissible && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-text/60 hover:bg-elevated hover:text-text absolute top-4 right-4 z-20 flex size-8 cursor-pointer items-center justify-center rounded-lg transition-colors"
          >
            <X className="size-4" />
          </button>
        )}
        <div className="relative z-10 p-6">{children}</div>
      </div>
    </div>,
    document.body,
  )
}