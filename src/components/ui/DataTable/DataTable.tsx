import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table'
import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { DataTableHeader } from './DataTableHeader'
import { DataTableVirtualBody } from './DataTableVirtualBody'
import { cn } from '@/utils/cn'
import type { DataTableProps } from './types'
import { MobileLoadMore } from './MobileLoadMore'

export function DataTable<TData>({
  data,
  columns,
  virtualize = false,
  estimateSize = 56,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  sorting: controlledSorting,
  onSortingChange,
  className,
  emptyState,
  isLoading,
  mobileCardRender,
}: DataTableProps<TData>) {
  const [internalSorting, setInternalSorting] = useState<SortingState>([])
  const sorting = controlledSorting ?? internalSorting
  const setSorting = onSortingChange ?? setInternalSorting

  const isMobile = useMediaQuery('(max-width: 767px)')

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater
      setSorting(next)
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: 'onChange',
  })

 if (isMobile && mobileCardRender) {
  return (
    <div className={cn('space-y-2', className)}>
      {data.map((row, i) => (
        <div key={i}>{mobileCardRender(row)}</div>
      ))}
      <MobileLoadMore
        onLoadMore={onLoadMore}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  )
}

  if (isLoading) {
    return (
      <div
        className={cn(
          'border-border bg-surface overflow-hidden rounded-2xl border',
          className,
        )}
      >
        <div className="border-border/50 h-11 border-b" />
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="border-border/30 bg-elevated/20 h-14 animate-pulse border-b"
          />
        ))}
      </div>
    )
  }

  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>
  }

  return (
    <div
      className={cn(
        'border-border bg-surface w-full overflow-hidden rounded-2xl border shadow-lg',
        className,
      )}
    >
      <DataTableHeader table={table} />

      {virtualize ? (
        <DataTableVirtualBody
          table={table}
          estimateSize={estimateSize}
          onLoadMore={onLoadMore}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : (
        <div>
          {table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="border-border/30 hover:bg-elevated/40 flex h-14 items-center border-b px-3 transition-colors md:px-4"
            >
              {row.getVisibleCells().map((cell) => (
                <div
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                  className={cn(
                    'shrink-0',
                    cell.column.id === 'name' && 'flex-1',
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}