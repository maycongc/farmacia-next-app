'use client';

import { Box, Text, Tooltip } from '@radix-ui/themes';
import { clsx } from 'clsx';
import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
} from 'lucide-react';
import { Column } from '../DataTable';
import { DataTableCheckbox } from './DataTableCheckbox';
import { useTableSortAndPagination } from '@/hooks/useTableSortAndPagination';

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
  const { sortByParam, orderParam, handleSortClick } =
    useTableSortAndPagination();

  return (
    <thead className="bg-[hsl(var(--color-bg-alt-dark))] sticky top-0 z-10">
      <tr style={{ height: '42.5px', maxHeight: '42.5px' }}>
        {selectable && (
          <th className="px-3 py-2 w-10">
            <DataTableCheckbox toolTip="Marca/Desmarca todos" />
          </th>
        )}
        {columns.map((c, i) => (
          <Tooltip
            key={i}
            content={`Ordernar por ${c.header} ${
              orderParam === 'asc' ? '' : ''
            }`}
          >
            <th
              align={c.align || 'left'}
              onClick={() => handleSortClick(c.sortBy)}
              className={clsx(
                'cursor-pointer hover:bg-gray-700/30 relative',
                'px-3 py-1.5 font-medium truncate',
                c.className,
                c.header.toLowerCase() === 'id'
                  ? 'max-w-[64px] w-[64px]'
                  : 'max-w-[180px]',
              )}
            >
              <Text as="span">{c.header}</Text>

              <Box
                className={`absolute top-3 ${
                  c.align === 'right' ? 'left-2' : 'right-2'
                }`}
              >
                {sortByParam && sortByParam === c.sortBy ? (
                  orderParam === 'asc' ? (
                    <ChevronUpIcon size={20} className="text-blue-500" />
                  ) : (
                    <ChevronDownIcon size={20} className="text-yellow-500" />
                  )
                ) : (
                  !sortByParam && <ChevronsUpDownIcon size={20} />
                )}
              </Box>
            </th>
          </Tooltip>
        ))}
      </tr>
    </thead>
  );
}
