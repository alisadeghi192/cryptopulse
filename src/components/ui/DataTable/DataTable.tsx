import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table'
import { useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { DataTableHeader } from './DataTableHeader'
import { DataTableVirtualBody } from './DataTableVirtualBody'
import { cn } from '@/utils/cn'
import type { DataTableProps } from './types'

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
  const mobileParentRef = useRef<HTMLDivElement>(null)

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

  // ─── Mobile virtualizer (always called, count=0 when not mobile) ───
  const mobileVirtualizer = useVirtualizer({
    count: isMobile && mobileCardRender ? data.length : 0,
    getScrollElement: () => mobileParentRef.current,
    estimateSize: () => 76,
    overscan: 5,
  })

  // ─── Mobile card view ───
  if (isMobile && mobileCardRender) {
    const mobileItems = mobileVirtualizer.getVirtualItems()

    return (
      <div
        ref={mobileParentRef}
        className={cn('h-[70vh] overflow-y-auto custom-scroll', className)}
        onScroll={(e) => {
          const el = e.currentTarget
          const nearBottom =
            el.scrollHeight - el.scrollTop - el.clientHeight < 400
          if (nearBottom && hasNextPage && !isFetchingNextPage && onLoadMore) {
            onLoadMore()
          }
        }}
      >
        <div
          style={{
            height: `${mobileVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {mobileItems.map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {mobileCardRender(data[virtualItem.index])}
            </div>
          ))}
        </div>

        {isFetchingNextPage && (
          <div className="text-text-secondary py-4 text-center font-mono text-xs">
            Loading more...
          </div>
        )}
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