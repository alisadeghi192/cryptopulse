import { Download, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/useAuthStore'
import { useWatchlistStore } from '@/stores/useWatchlistStore'
import { useWalletStore } from '@/stores/useWalletStore'

export function ExportDataSection() {
  const user = useAuthStore((s) => s.user)
  const watchlistIds = useWatchlistStore((s) => s.coinIds)
  const wallet = useWalletStore((s) => s.wallet)
  const holdings = useWalletStore((s) => s.holdings)
  const transactions = useWalletStore((s) => s.transactions)

  const handleExport = () => {
    if (!user) return

    const data = {
      exported_at: new Date().toISOString(),
      profile: {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name ?? null,
        phone_number: user.user_metadata?.phone_number ?? null,
        card_number: user.user_metadata?.card_number ?? null,
        created_at: user.created_at,
      },
      wallet: {
        cash_balance: wallet?.cash_balance ?? 0,
        holdings: holdings.map((h) => ({
          coin_id: h.coin_id,
          coin_symbol: h.coin_symbol,
          amount: h.amount,
          avg_buy_price: h.avg_buy_price,
        })),
        transactions: transactions.map((t) => ({
          type: t.type,
          coin_symbol: t.coin_symbol,
          amount: t.amount,
          price: t.price,
          fee: t.fee,
          total_usd: t.total_usd,
          txn_id: t.txn_id,
          date: t.created_at,
        })),
      },
      watchlist: watchlistIds,
      preferences: {
        theme: localStorage.getItem('theme') ?? 'dark',
      },
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cryptopulse-export-${user.id.slice(0, 8)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success('Data exported', {
      description: 'Your account data and history have been downloaded',
    })
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      className="group hover:bg-elevated/30 cursor-pointer flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6] backdrop-blur-sm">
          <Download className="size-4" />
        </div>
        <div>
          <p className="text-text text-sm font-medium">Export Data</p>
          <p className="text-text/70 mt-0.5 font-mono text-[11px]">
            Download your account data as JSON
          </p>
        </div>
      </div>
      <ChevronRight className="text-text/70 size-4 shrink-0 transition-all group-hover:translate-x-0.5 group-hover:text-[#3B82F6]" />
    </button>
  )
}