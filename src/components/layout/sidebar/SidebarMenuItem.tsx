import Link from 'next/link';
import type { MenuItem } from '../AppSidebar';
import { SidebarSubmenu } from './SidebarSubmenu';
import { hasPermission } from '@/utils/permissions';

interface SidebarMenuItemProps {
  item: MenuItem;
  user: any;
  openSubmenu: string | null;
  setOpenSubmenu: (label: string | null) => void;
  onClose?: () => void;
}

export function SidebarMenuItem({
  item,
  user,
  openSubmenu,
  setOpenSubmenu,
  onClose,
}: SidebarMenuItemProps) {
  if (item.permission && !hasPermission(user ?? {}, item.permission)) {
    return null;
  }
  const Icon = item.icon;
  if (item.submenu) {
    return (
      <SidebarSubmenu
        item={item}
        user={user}
        openSubmenu={openSubmenu}
        setOpenSubmenu={setOpenSubmenu}
      />
    );
  }
  return (
    <Link href={item.href || '#'} className="block w-full max-w-full">
      <button
        className="flex items-center w-full max-w-full py-2 px-2 rounded hover:bg-brand-50/40 font-medium transition-all"
        onClick={() => onClose && onClose()}
        style={{ minWidth: 0 }}
      >
        {Icon && (
          <span
            className="flex-shrink-0 flex justify-center items-center"
            style={{ width: 24 }}
          >
            <Icon size={24} />
          </span>
        )}
        <span className={`truncate ml-2 inline`} style={{ minWidth: 0 }}>
          {item.label}
        </span>
      </button>
    </Link>
  );
}
