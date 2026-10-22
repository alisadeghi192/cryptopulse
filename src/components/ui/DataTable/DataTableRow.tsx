import { flexRender, type Row } from '@tanstack/react-table'
import { Link } from 'react-router'
import { cn } from '@/utils/cn'

interface DataTableRowProps<TData> {
  row: Row<TData>
  style?: React.CSSProperties
  linkTo?: string
}

export function DataTableRow<TData>({
  row,
  style,
  linkTo,
}: DataTableRowProps<TData>) {
  const cells = row.getVisibleCells().map((cell) => (
    <div
      key={cell.id}
      style={{ width: cell.column.getSize() }}
      className={cn(
        'shrink-0',
        cell.column.id === 'name' && 'flex-1',
        cell.column.columnDef.meta?.hideBelow === 'sm' && 'hidden sm:block',
        cell.column.columnDef.meta?.hideBelow === 'md' && 'hidden md:block',
        cell.column.columnDef.meta?.hideBelow === 'lg' && 'hidden lg:block',
        cell.column.columnDef.meta?.hideBelow === 'xl' && 'hidden xl:block',
        cell.column.columnDef.meta?.hideBelow === '2xl' && 'hidden 2xl:block',
      )}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </div>
  ))

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        className="flex h-14 items-center px-3 md:px-4"
        style={style}
      >
        {cells}
      </Link>
    )
  }

  return (
    <div className="flex h-14 items-center px-3 md:px-4" style={style}>
      {cells}
    </div>
  )
}