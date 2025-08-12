import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { FloatingActionsMenu } from '@/components/table/FloatingActionsMenu';
import { useSelection } from '@/context/SelectionContext';
import CustomCheckbox from '@/design-system/components/CustomCheckbox';
import { EllipsisTooltip } from '@/design-system/components/EllipsisTooltip';

interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  rows: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string | number;
  emptyMessage?: string;
  selectable?: boolean;
  className?: string;
}

export function DataTable<T>({
  rows,
  columns,
  keyExtractor,
  emptyMessage = 'Sem registros',
  selectable = false,
  className = '',
}: DataTableProps<T>) {
  const { selected, select, deselect, clear, isSelected, selectMany } =
    useSelection();
  const selectedRows = Array.from(selected);

  const isAllSelected = rows.length > 0 && selectedRows.length === rows.length;

  function handleSelectRow(id: string | number) {
    if (isSelected(id)) {
      deselect(id);
    } else {
      select(id);
    }
  }

  function handleSelectAll() {
    if (isAllSelected) {
      rows.forEach(row => deselect(keyExtractor(row)));
    } else {
      selectMany(rows.map(keyExtractor));
    }
  }

  return (
    <>
      <div className="w-full max-w-full overflow-x-auto overflow-y-auto border border-[hsl(var(--color-border))] rounded-lg max-h-[60vh] relative">
        <table className={`w-full min-w-max text-sm ${className}`}>
          <thead className="bg-[hsl(var(--color-bg-alt))] sticky top-0 z-10">
            <tr style={{ height: '42.5px', maxHeight: '42.5px' }}>
              {selectable && (
                <th className="px-3 py-2 w-10">
                  <div className="flex items-center justify-center h-full min-h-[26px]">
                    <CustomCheckbox
                      checked={isAllSelected}
                      indeterminate={selectedRows.length > 0 && !isAllSelected}
                      onChange={handleSelectAll}
                    />
                  </div>
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
                  style={
                    c.header.toLowerCase() === 'id'
                      ? {
                          maxWidth: 64,
                          width: 64,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }
                      : {
                          maxWidth: 180,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }
                  }
                >
                  <EllipsisTooltip>{c.header}</EllipsisTooltip>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
            {rows.map(row => {
              const id = keyExtractor(row);
              const isSelected = selectedRows.includes(id);
              return (
                <tr
                  key={id}
                  className={clsx(
                    'border-t border-[hsl(var(--color-border))]',
                    'transition-colors',
                    'hover:bg-blue-50',
                    'dark:hover:bg-gray-800/60',
                    isSelected && 'bg-blue-100 dark:bg-gray-700',
                  )}
                  style={{ maxHeight: '36.5px', height: '36.5px' }}
                >
                  {selectable && (
                    <td className="px-3 w-10">
                      <div className="flex items-center justify-center h-full min-h-[26px]">
                        <CustomCheckbox
                          checked={isSelected}
                          onChange={() => handleSelectRow(id)}
                        />
                      </div>
                    </td>
                  )}
                  {columns.map((c, i) => {
                    const value = c.accessor(row);
                    return (
                      <td
                        key={i}
                        className={clsx(
                          'px-3 py-1.5 truncate',
                          c.className,
                          c.header.toLowerCase() === 'id'
                            ? 'max-w-[64px] w-[64px]'
                            : 'max-w-[180px]',
                        )}
                        style={
                          c.header.toLowerCase() === 'id'
                            ? {
                                maxWidth: 64,
                                width: 64,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }
                            : {
                                maxWidth: 180,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }
                        }
                      >
                        {typeof value === 'boolean' ? (
                          <CustomCheckbox checked={value} />
                        ) : typeof value === 'string' ? (
                          <EllipsisTooltip>{value}</EllipsisTooltip>
                        ) : typeof value === 'number' ? (
                          <EllipsisTooltip>{String(value)}</EllipsisTooltip>
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
