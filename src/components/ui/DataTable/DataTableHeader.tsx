import { flexRender, type Table } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { cn } from '@/utils/cn'

interface DataTableHeaderProps<TData> {
  table: Table<TData>
}

export function DataTableHeader<TData>({ table }: DataTableHeaderProps<TData>) {
  return (
    <div className="border-border/50 bg-surface/60 sticky top-0 z-10 border-b pr-1.5 backdrop-blur-xl">
      {table.getHeaderGroups().map((headerGroup) => (
        <div
          key={headerGroup.id}
          className="flex h-11 items-center px-3 md:px-4"
        >
          {headerGroup.headers.map((header) => {
            const canSort = header.column.getCanSort()
            const sorted = header.column.getIsSorted()
            const align = header.column.columnDef.meta?.align

            return (
              <div
                key={header.id}
                style={{ width: header.getSize() }}
                className={cn(
                  'shrink-0',
                  header.column.id === 'name' && 'flex-1',
                  header.column.columnDef.meta?.hideBelow === 'sm' &&
                    'hidden sm:block',
                  header.column.columnDef.meta?.hideBelow === 'md' &&
                    'hidden md:block',
                  header.column.columnDef.meta?.hideBelow === 'lg' &&
                    'hidden lg:block',
                  header.column.columnDef.meta?.hideBelow === 'xl' &&
                    'hidden xl:block',
                  header.column.columnDef.meta?.hideBelow === '2xl' &&
                    'hidden 2xl:block',
                )}
              >
                {header.isPlaceholder ? null : (
                  <button
                    type="button"
                    disabled={!canSort}
                    onClick={header.column.getToggleSortingHandler()}
                    className={cn(
                      'group flex w-full items-center gap-1',
                      'text-text-secondary font-mono text-xs tracking-wider uppercase',
                      sorted && 'text-primary hover:text-primary!',
                      canSort && 'hover:text-text cursor-pointer',
                      !canSort && 'cursor-default',
                      align === 'right' && 'justify-end',
                      align === 'center' && 'justify-center',
                    )}
                  >
                    <span>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </span>
                    {canSort && (
                      <span className={cn('transition-opacity')}>
                        {sorted === 'asc' && <ArrowUp className="h-3 w-3" />}
                        {sorted === 'desc' && <ArrowDown className="h-3 w-3" />}
                        {!sorted && <ArrowUpDown className="h-3 w-3" />}
                      </span>
                    )}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
