import { ReactNode } from 'react';
import { DataTableEmpty } from './datatable/DataTableEmpty';
import { DataTableHeader } from './datatable/DataTableHeader';
import { DataTableRow } from './datatable/DataTableRow';
import { useSelection } from '@/context/SelectionContext';

export interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  sortBy: string;
  className?: string;
  spanClassName?: string;
  align?: 'center' | 'justify' | 'left' | 'right' | 'char' | undefined;
}

interface DataTableProps<T> {
  rows: T[];
  columns: Column<T>[];
  emptyMessage?: string;
  selectable?: boolean;
  className?: string;
  handleSortClick: (field: string) => void;
}

export function DataTable<T>({
  rows,
  columns,
  emptyMessage = 'Sem registros',
  selectable = false,
  className = '',
  handleSortClick,
}: DataTableProps<T>) {
  return (
    <>
      <div className="w-full max-w-full overflow-x-auto overflow-y-auto border border-[hsl(var(--color-border))] rounded-lg max-h-[60vh] relative">
        <table className={`w-full min-w-max text-sm ${className}`}>
          <DataTableHeader
            handleSortClick={handleSortClick}
            columns={columns}
            selectable={selectable}
            onSelectAll={() => {}}
          />

          <tbody>
            {rows.length === 0 && (
              <DataTableEmpty
                colSpan={columns.length + (selectable ? 1 : 0)}
                message={emptyMessage}
              />
            )}

            {rows.map((row, i) => {
              return (
                <DataTableRow
                  key={i}
                  row={row}
                  columns={columns}
                  selectable={selectable}
                  isSelected={false}
                  onSelectRow={() => {}}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
