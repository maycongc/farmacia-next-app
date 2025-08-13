import { ReactNode } from 'react';
import { DataTableEmpty } from './datatable/DataTableEmpty';
import { DataTableHeader } from './datatable/DataTableHeader';
import { DataTableRow } from './datatable/DataTableRow';
import { useSelection } from '@/context/SelectionContext';

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
          <DataTableHeader
            columns={columns}
            selectable={selectable}
            isAllSelected={isAllSelected}
            selectedRowsCount={selectedRows.length}
            onSelectAll={handleSelectAll}
          />
          <tbody>
            {rows.length === 0 && (
              <DataTableEmpty
                colSpan={columns.length + (selectable ? 1 : 0)}
                message={emptyMessage}
              />
            )}
            {rows.map(row => {
              const id = keyExtractor(row);
              const isSelected = selectedRows.includes(id);
              return (
                <DataTableRow
                  key={id}
                  row={row}
                  columns={columns}
                  keyExtractor={keyExtractor}
                  selectable={selectable}
                  isSelected={isSelected}
                  onSelectRow={handleSelectRow}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
