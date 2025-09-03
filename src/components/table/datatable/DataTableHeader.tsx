import { Text } from '@radix-ui/themes';
import { clsx } from 'clsx';
import React from 'react';
import { Column } from '../DataTable';
import { DataTableCheckbox } from './DataTableCheckbox';

interface DataTableHeaderProps<T> {
  columns: Column<T>[];
  selectable: boolean;
  onSelectAll: () => void;
}

export function DataTableHeader<T>({
  columns,
  selectable,
  onSelectAll,
}: DataTableHeaderProps<T>) {
  return (
    <thead className="bg-[hsl(var(--color-bg-alt-dark))] sticky top-0 z-10">
      <tr style={{ height: '42.5px', maxHeight: '42.5px' }}>
        {selectable && (
          <th className="px-3 py-2 w-10">
            <DataTableCheckbox toolTip="Marca/Desmarca todos" />
          </th>
        )}
        {columns.map((c, i) => (
          <th
            key={i}
            align={c.align || 'left'}
            className={clsx(
              'px-3 py-1.5 font-medium truncate',
              c.className,
              c.header.toLowerCase() === 'id'
                ? 'max-w-[64px] w-[64px]'
                : 'max-w-[180px]',
            )}
          >
            <Text as="span">{c.header}</Text>
          </th>
        ))}
      </tr>
    </thead>
  );
}
