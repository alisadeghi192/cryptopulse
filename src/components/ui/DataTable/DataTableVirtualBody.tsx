import { useEffect, useRef } from 'react'
import type { Table } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { DataTableRow } from './DataTableRow'

interface DataTableVirtualBodyProps<TData> {
  table: Table<TData>
  estimateSize?: number
  onLoadMore?: () => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
}

export function DataTableVirtualBody<TData>({
  table,
  estimateSize = 56,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: DataTableVirtualBodyProps<TData>) {
  const parentRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const { rows } = table.getRowModel()

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 10,
  })

  const items = virtualizer.getVirtualItems()

  useEffect(() => {
    const sentinel = sentinelRef.current
    const parent = parentRef.current
    if (!sentinel || !parent || !onLoadMore || !hasNextPage || isFetchingNextPage)
      return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore()
      },
      { root: parent, rootMargin: '400px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [onLoadMore, hasNextPage, isFetchingNextPage])

  return (
    <div
      ref={parentRef}
      className="custom-scroll max-h-[70vh] overflow-x-hidden overflow-y-auto md:max-h-[calc(100vh-16rem)]"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {items.map((virtualRow) => {
          const row = rows[virtualRow.index]
          const coinId = (row.original as { id?: string })?.id

          return (
            <div
              key={row.id}
              data-index={virtualRow.index}
              ref={(node) => virtualizer.measureElement(node)}
              className="border-border/30 hover:bg-elevated/40 absolute top-0 left-0 w-full border-b transition-colors"
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              <DataTableRow
                row={row}
                linkTo={coinId ? `/coin/${coinId}` : undefined}
              />
            </div>
          )
        })}

        <div
          ref={sentinelRef}
          style={{
            position: 'absolute',
            top: `${virtualizer.getTotalSize()}px`,
            left: 0,
            width: '100%',
            height: '1px',
          }}
        />

        {isFetchingNextPage && (
          <div
            style={{
              position: 'absolute',
              top: `${virtualizer.getTotalSize() + 16}px`,
              left: 0,
              width: '100%',
            }}
            className="text-text-secondary text-center font-mono text-xs"
          >
            Loading more...
          </div>
        )}
      </div>
    </div>
  )
}