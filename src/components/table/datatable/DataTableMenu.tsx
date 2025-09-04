import { ContextMenu } from '@radix-ui/themes';
import { useTableActions } from '@/context/TableActionsContext';

interface DataTableMenuProps<T> {
  row: T;
}

export default function DataTableMenu<T>({ row }: DataTableMenuProps<T>) {
  const { actions } = useTableActions();

  async function handleActionClick(
    action: (typeof actions)[number],
    e: React.MouseEvent,
  ) {
    e.preventDefault();
    await action.onClick(row);

    // Close the context menu
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  }

  return (
    <ContextMenu.Content variant="soft">
      {actions.map((action, i) => (
        <ContextMenu.Item
          key={i}
          color={action.color}
          onClick={e => handleActionClick(action, e)}
        >
          {action.icon}
          {action.label}
        </ContextMenu.Item>
      ))}
    </ContextMenu.Content>
  );
}
