import { useEffect, useRef } from 'react'
import { flexRender, type Table } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Link } from 'react-router' 
import { cn } from '@/utils/cn'

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

  // ─── Infinite scroll  ───
  useEffect(() => {
    const sentinel = sentinelRef.current
    const parent = parentRef.current
    if (
      !sentinel ||
      !parent ||
      !onLoadMore ||
      !hasNextPage ||
      isFetchingNextPage
    )
      return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore()
      },
      {
        root: parent,
        rootMargin: '400px',
      },
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
          
          const coinId = (row.original as any)?.id as string | undefined
          const isCoin = !!coinId

          return (
            <div
              key={row.id}
              data-index={virtualRow.index}
              ref={(node) => virtualizer.measureElement(node)}
              className={cn(
                'absolute top-0 left-0 w-full',
                'border-border/30 border-b',
                'hover:bg-elevated/40 transition-colors',
              )}
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {isCoin ? (
                <Link
                  to={`/coin/${coinId}`}
                  className="flex h-14 items-center px-3 md:px-4"
                >
                  {row.getVisibleCells().map((cell) => (
                    <div
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className={cn(
                        'shrink-0',
                        cell.column.id === 'name' && 'flex-1',
                        cell.column.columnDef.meta?.hideBelow === 'sm' &&
                          'hidden sm:block',
                        cell.column.columnDef.meta?.hideBelow === 'md' &&
                          'hidden md:block',
                        cell.column.columnDef.meta?.hideBelow === 'lg' &&
                          'hidden lg:block',
                        cell.column.columnDef.meta?.hideBelow === 'xl' &&
                          'hidden xl:block',
                        cell.column.columnDef.meta?.hideBelow === '2xl' &&
                          'hidden 2xl:block',
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  ))}
                </Link>
              ) : (
                <div className="flex h-14 items-center px-3 md:px-4">
                  {row.getVisibleCells().map((cell) => (
                    <div
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className={cn(
                        'shrink-0',
                        cell.column.id === 'name' && 'flex-1',
                        cell.column.columnDef.meta?.hideBelow === 'sm' &&
                          'hidden sm:block',
                        cell.column.columnDef.meta?.hideBelow === 'md' &&
                          'hidden md:block',
                        cell.column.columnDef.meta?.hideBelow === 'lg' &&
                          'hidden lg:block',
                        cell.column.columnDef.meta?.hideBelow === 'xl' &&
                          'hidden xl:block',
                        cell.column.columnDef.meta?.hideBelow === '2xl' &&
                          'hidden 2xl:block',
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {/* Sentinel infinite scroll */}
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

        {/* Loading indicator */}
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