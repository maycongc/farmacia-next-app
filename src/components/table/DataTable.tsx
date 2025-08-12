import { clsx } from 'clsx';
import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { FloatingActionsMenu } from '@/components/table/FloatingActionsMenu';
import CustomCheckbox from '@/design-system/components/CustomCheckbox';
import { EllipsisTooltip } from '@/design-system/components/EllipsisTooltip';

interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
}

interface DataTableAction {
  label: string;
  onClick: (selectedIds: Array<string | number>) => void;
  color?: string;
}

interface DataTableProps<T> {
  rows: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string | number;
  emptyMessage?: string;
  selectable?: boolean;
  actions?: DataTableAction[];
}

export function DataTable<T>({
  rows,
  columns,
  keyExtractor,
  emptyMessage = 'Sem registros',
  selectable = false,
  actions,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);

  const isAllSelected = rows.length > 0 && selectedRows.length === rows.length;

  function handleSelectRow(id: string | number) {
    setSelectedRows(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(rid => rid !== id) : [...prev, id];
      return updated;
    });
  }

  function handleSelectAll() {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      const allIds = rows.map(keyExtractor);
      setSelectedRows(allIds);
    }
  }

  return (
    <>
      {selectable && selectedRows.length > 0 && (
        <FloatingActionsMenu
          selectedCount={selectedRows.length}
          actions={
            actions?.map(action => {
              let defaultColor;
              switch (action.label.toLowerCase()) {
                case 'editar':
                  defaultColor = 'bg-blue-100 text-blue-700 hover:bg-blue-200';
                  break;
                case 'excluir':
                  defaultColor = 'bg-red-100 text-red-700 hover:bg-red-200';
                  break;
                default:
                  defaultColor = action.color || '';
              }
              return {
                ...action,
                color: action.color || defaultColor,
                onClick: () => action.onClick(selectedRows),
              };
            }) ?? []
          }
          onClear={() => setSelectedRows([])}
        />
      )}
      {/* ...existing code... */}
      <div className="w-full max-w-full overflow-x-auto overflow-y-auto border border-[hsl(var(--color-border))] rounded-lg max-h-[60vh] relative">
        <table className="w-full min-w-max text-sm">
          <thead className="bg-[hsl(var(--color-bg-alt))] sticky top-0 z-10">
            <tr>
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
                    'px-3 py-2 text-left font-medium truncate',
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
                >
                  {selectable && (
                    <td className="px-3 py-2 w-10">
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
                          'px-3 py-2 truncate',
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
