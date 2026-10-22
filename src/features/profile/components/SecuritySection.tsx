import { Shield } from 'lucide-react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { ChangePasswordSection } from './ChangePasswordSection'
import { ExportDataSection } from './ExportDataSection'

export function SecuritySection() {
  return (
    <div className="relative mt-6">
      <div className="mb-3 flex items-center gap-2">
        <Shield className="text-primary size-3.5" />
        <span className="text-primary font-mono text-[10px] tracking-[0.25em] uppercase">
          Security
        </span>
        <div className="bg-border h-px flex-1" />
      </div>

      <div className="relative overflow-hidden shadow-xl rounded-2xl">
        <div className="pointer-events-none absolute inset-0">
          <AmbientLights variant="multi" intensity="subtle" />
        </div>
        <div className="border-border/40 bg-surface/40 relative overflow-hidden rounded-2xl border shadow-lg backdrop-blur-3xl">
          <ChangePasswordSection />
          <ExportDataSection />
        </div>
      </div>
    </div>
  )
}