import { Checkbox, Text, Tooltip } from '@radix-ui/themes';
import { clsx } from 'clsx';
import { Column } from '../DataTable';
import { DataTableCheckbox } from './DataTableCheckbox';

interface DataTableCellProps<T> {
  row: T;
  column: Column<T>;
}

export function DataTableCell<T>({ column, row }: DataTableCellProps<T>) {
  const value = column.accessor(row);
  const isId = column.header?.toLowerCase() === 'id';

  const isValueString = typeof value === 'string';
  const isValueNumber = typeof value === 'number';
  const isValueBoolean = typeof value === 'boolean';

  return (
    <td
      align={
        column.align ||
        (isValueNumber ? 'right' : isValueBoolean ? 'center' : 'left')
      }
      className={clsx(
        'px-3 py-1 truncate',
        column.className,
        isId ? 'max-w-[64px] w-[64px]' : 'max-w-[180px]',
      )}
    >
      {isValueBoolean ? (
        <DataTableCheckbox
          checked={value}
          contentEditable={false}
          toolTip={value ? 'Sim' : 'Não'}
          className="cursor-not-allowed"
          variant="soft"
        />
      ) : isValueNumber || isValueString ? (
        <Tooltip content={value}>
          <Text truncate className={column.spanClassName}>
            {value}
          </Text>
        </Tooltip>
      ) : (
        value
      )}
    </td>
  );
}
