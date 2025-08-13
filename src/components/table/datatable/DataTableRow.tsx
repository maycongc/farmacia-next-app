import { clsx } from 'clsx';
import React from 'react';
import { DataTableCell } from './DataTableCell';
import { DataTableCheckbox } from './DataTableCheckbox';

interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableRowProps<T> {
  row: T;
  columns: Column<T>[];
  keyExtractor: (row: T) => string | number;
  selectable: boolean;
  isSelected: boolean;
  onSelectRow: (id: string | number) => void;
}

export function DataTableRow<T>({
  row,
  columns,
  keyExtractor,
  selectable,
  isSelected,
  onSelectRow,
}: DataTableRowProps<T>) {
  const id = keyExtractor(row);
  return (
    <tr
      className={clsx(
        'border-t border-[hsl(var(--color-border))]',
        'transition-colors',
        'hover:bg-blue-200',
        'dark:hover:bg-gray-800/60',
        isSelected && 'bg-blue-100 dark:bg-gray-700',
      )}
      style={{ maxHeight: '36.5px', height: '36.5px' }}
    >
      {selectable && (
        <td className="px-3 w-10">
          <DataTableCheckbox
            checked={isSelected}
            onChange={() => onSelectRow(id)}
          />
        </td>
      )}
      {columns.map((c, i) => (
        <DataTableCell
          key={i}
          value={c.accessor(row)}
          className={c.className}
          header={c.header}
        />
      ))}
    </tr>
  );
}
