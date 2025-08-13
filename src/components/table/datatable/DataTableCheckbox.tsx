import CustomCheckbox from '@/design-system/components/CustomCheckbox';

interface DataTableCheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  className?: string;
}

export function DataTableCheckbox({
  checked,
  indeterminate = false,
  onChange,
  className,
}: DataTableCheckboxProps) {
  return (
    <div
      className={
        className || 'flex items-center justify-center h-full min-h-[26px]'
      }
    >
      <CustomCheckbox
        checked={checked}
        indeterminate={indeterminate}
        onChange={onChange}
      />
    </div>
  );
}
