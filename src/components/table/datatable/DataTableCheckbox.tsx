import { Checkbox, Flex, Tooltip } from '@radix-ui/themes';

type DataTableCheckboxProps = {
  checked?: boolean;
  contentEditable?: boolean;
  toolTip?: string;
  className?: string;
  variant?: 'surface' | 'classic' | 'soft' | undefined;
};

export function DataTableCheckbox({
  checked,
  toolTip,
  contentEditable,
  className,
  variant,
}: DataTableCheckboxProps) {
  return (
    <Tooltip content={toolTip} hidden={!toolTip}>
      <Flex align={'center'} justify={'center'} className="h-full">
        <Checkbox
          size={'3'}
          checked={checked}
          contentEditable={contentEditable}
          variant={variant}
          className={className}
        />
      </Flex>
    </Tooltip>
  );
}
