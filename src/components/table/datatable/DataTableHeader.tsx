import { clsx } from 'clsx';
import React from 'react';
import { DataTableCheckbox } from './DataTableCheckbox';

interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableHeaderProps<T> {
  columns: Column<T>[];
  selectable: boolean;
  isAllSelected: boolean;
  selectedRowsCount: number;
  onSelectAll: () => void;
}

export function DataTableHeader<T>({
  columns,
  selectable,
  isAllSelected,
  selectedRowsCount,
  onSelectAll,
}: DataTableHeaderProps<T>) {
  return (
    <thead className="bg-[hsl(var(--color-bg-alt))] sticky top-0 z-10">
      <tr style={{ height: '42.5px', maxHeight: '42.5px' }}>
        {selectable && (
          <th className="px-3 py-2 w-10">
            <DataTableCheckbox
              checked={isAllSelected}
              indeterminate={selectedRowsCount > 0 && !isAllSelected}
              onChange={onSelectAll}
            />
          </th>
        )}
        {columns.map((c, i) => (
          <th
            key={i}
            className={clsx(
              'px-3 py-1.5 text-left font-medium truncate',
              c.className,
              c.header.toLowerCase() === 'id'
                ? 'max-w-[64px] w-[64px]'
                : 'max-w-[180px]',
            )}
          >
            {c.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
