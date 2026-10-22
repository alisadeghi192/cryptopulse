import {
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import type { TransactionType } from '@/types/wallet'

interface TransactionTypeMeta {
  label: string
  icon: typeof ArrowDownToLine
  iconClass: string
  rowClass: string
  hoverBg: string
}

export const TRANSACTION_TYPE_META: Record<
  TransactionType,
  TransactionTypeMeta
> = {
  deposit: {
    label: 'Deposit',
    icon: ArrowDownToLine,
    iconClass: 'bg-success/10 text-success',
    rowClass: 'bg-success/5 hover:bg-success/10',
    hoverBg: 'hover:bg-success/5',
  },
  withdraw: {
    label: 'Withdraw',
    icon: ArrowUpFromLine,
    iconClass: 'bg-error/10 text-error',
    rowClass: 'bg-error/5 hover:bg-error/10',
    hoverBg: 'hover:bg-error/5',
  },
  buy: {
    label: 'Buy',
    icon: TrendingUp,
    iconClass: 'bg-primary/10 text-primary',
    rowClass: 'bg-primary/5 hover:bg-primary/10',
    hoverBg: 'hover:bg-primary/5',
  },
  sell: {
    label: 'Sell',
    icon: TrendingDown,
    iconClass: 'bg-[#3B82F6]/10 text-[#3B82F6]',
    rowClass: 'bg-[#3B82F6]/5 hover:bg-[#3B82F6]/10',
    hoverBg: 'hover:bg-[#3B82F6]/5',
  },
}