import { CreditCard, LinkIcon } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { useAuthStore } from '@/stores/useAuthStore'
import { ProfileHeader } from '@/features/profile/components/ProfileHeader'
import { InfoCard } from '@/features/profile/components/InfoCard'
import { BalanceCard } from '@/features/profile/components/BalanceCard'
import { SecuritySection } from '@/features/profile/components/SecuritySection'

const MOCK_CARD_NUMBER = '4587 9231 6548 1237'

const shortWallet = (id: string) => id.replace(/-/g, '').slice(0, 16)

export function Profile() {
  const user = useAuthStore((s) => s.user)
  const displayName = (user?.user_metadata?.full_name as string) ?? 'User'
  const email = user?.email ?? 'user@email.com'
  const phone = (user?.user_metadata?.phone_number as string) ?? '—'
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '—'
  const userId = user?.id ?? '—'
  const initial = displayName[0]?.toUpperCase() ?? 'U'

  return (
    <main className="bg-background relative min-h-full">
      <div className="mx-auto w-full">
        {/* ═══ Header Card ═══ */}
        <BlurFade>
          <ProfileHeader
            displayName={displayName}
            email={email}
            phone={phone}
            memberSince={memberSince}
            initial={initial}
            onSaveName={() => {
              // TODO: supabase updateUser
            }}
          />
        </BlurFade>

        {/* ═══ Account Info Grid ═══ */}
        <div className="mt-6 flex flex-col items-stretch justify-between gap-6 *:basis-1/3 md:flex-row">
          <BlurFade delay={0.1}>
            <InfoCard
              label="Card Number"
              value={MOCK_CARD_NUMBER}
              sublabel="Withdrawals go here"
              icon={CreditCard}
              ambientVariant="lightblue"
              spotlightColor="rgba(59, 130, 246, 0.15)"
              accent="blue"
              copyValue={MOCK_CARD_NUMBER.replace(/\s/g, '')}
              copyLabel="Card number copied to clipboard"
            />
          </BlurFade>

      <BlurFade delay={0.15}>
            <InfoCard
              label="Wallet Address"
              value={shortWallet(userId)}
              sublabel="Your unique wallet ID"
              icon={LinkIcon}
              ambientVariant="green"
              spotlightColor="rgba(34, 197, 94, 0.15)"
              accent="success"
              copyValue={shortWallet(userId)}
              copyLabel="Wallet address copied to clipboard"
              valueClassName="text-sm md:text-base"
            />
          </BlurFade>

          <BlurFade delay={0.2}>
            <BalanceCard />
          </BlurFade>
        </div>

        {/* ═══ Security Section ═══ */}
        <BlurFade delay={0.25}>
          <SecuritySection />
        </BlurFade>

        <BlurFade delay={0.3}>
          <p className="text-text/70 mt-6 text-center font-mono text-[10px] tracking-widest uppercase">
            Need help? Contact support
          </p>
        </BlurFade>
      </div>
    </main>
  )
}