import type { ColumnDef, SortingState } from '@tanstack/react-table'
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends unknown, TValue> {
    align?: 'left' | 'right' | 'center'
    hideBelow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  }
}

export interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  // virtualization
  virtualize?: boolean
  estimateSize?: number
  // infinite scroll
  onLoadMore?: () => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  // sorting
  sorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
  // UI
  className?: string
  emptyState?: React.ReactNode
  isLoading?: boolean
  // mobile
  mobileCardRender?: (row: TData) => React.ReactNode
}