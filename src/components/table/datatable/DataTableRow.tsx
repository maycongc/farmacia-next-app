'use client';

import { clsx } from 'clsx';
import { useState } from 'react';
import { Column } from '../DataTable';
import { DataTableCell } from './DataTableCell';
import { DataTableCheckbox } from './DataTableCheckbox';

interface DataTableRowProps<T> {
  row: T;
  columns: Column<T>[];
  selectable: boolean;
  isSelected: boolean;
  onSelectRow: (id: string | number) => void;
}

export function DataTableRow<T>({
  row,
  columns,
  selectable,
  isSelected,
  onSelectRow,
}: DataTableRowProps<T>) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <tr
      className={clsx(
        'h-[36px] max-h-[36px]',
        'border-t border-[hsl(var(--color-border))]',
        'transition-colors',
        'hover:bg-blue-200/80',
        'dark:hover:bg-gray-700/60',
        (isSelected || menuIsOpen) && 'bg-blue-200 dark:bg-gray-700',
      )}
    >
      {selectable && (
        <td className="px-3 w-10">
          <DataTableCheckbox toolTip="Selecionar linha" />
        </td>
      )}

      {columns.map((c, i) => (
        <DataTableCell
          key={i}
          row={row}
          column={c}
          setMenuIsOpen={setMenuIsOpen}
        />
      ))}
    </tr>
  );
}
