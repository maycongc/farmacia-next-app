import { clsx } from 'clsx';
import CustomCheckbox from '@/design-system/components/CustomCheckbox';
import { EllipsisTooltip } from '@/design-system/components/EllipsisTooltip';

interface DataTableCellProps {
  value: any;
  className?: string;
  header?: string;
}

export function DataTableCell({
  value,
  className,
  header,
}: DataTableCellProps) {
  const isId = header?.toLowerCase() === 'id';
  const style = isId
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
      };

  return (
    <td
      className={clsx(
        'px-3 py-1 truncate',
        className,
        isId ? 'max-w-[64px] w-[64px]' : 'max-w-[180px]',
      )}
      style={style}
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
}
