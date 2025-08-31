import Link from 'next/link';
import { SidebarSubmenu } from './SidebarSubmenu';
import { useAuth } from '@/hooks/useAuth';
import { MenuItem } from '@/lib/sidebarMenuItems';
import { hasPermission } from '@/utils/permissions';

interface SidebarMenuItemProps {
  item: MenuItem;
  setExpanded: (expanded: boolean) => void;
  openSubmenu: string | null;
  setOpenSubmenu: (label: string | null) => void;
}

export function SidebarMenuItem({
  item,
  setExpanded,
  openSubmenu,
  setOpenSubmenu,
}: SidebarMenuItemProps) {
  const { user } = useAuth();
  const Icon = item.icon;

  if (item.permission && !hasPermission(user ?? {}, item.permission)) {
    return null;
  }

  if (item.submenu) {
    return (
      <SidebarSubmenu
        item={item}
        openSubmenu={openSubmenu}
        setOpenSubmenu={setOpenSubmenu}
      />
    );
  }
  return (
    <Link href={item.href || '#'} className="block w-full max-w-full">
      <button
        className="flex items-center w-full max-w-full py-2 px-2 rounded hover:bg-brand-50/40 font-medium transition-all"
        onClick={() => setExpanded(false)}
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
