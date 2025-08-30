import type { MenuItem } from '../AppSidebar';
import { SidebarMenuItem } from './SidebarMenuItem';

interface SidebarMenuProps {
  menu: MenuItem[];
  user: any;
  openSubmenu: string | null;
  setOpenSubmenu: (label: string | null) => void;
  onClose: () => void;
}

export function SidebarMenu({
  menu,
  user,
  openSubmenu,
  setOpenSubmenu,
  onClose,
}: SidebarMenuProps) {
  return (
    <nav className="flex flex-col gap-1 px-0 py-4 mt-0 overflow-y-auto w-full h-full max-h-full">
      {menu.map(item => (
        <SidebarMenuItem
          key={item.label}
          item={item}
          user={user}
          openSubmenu={openSubmenu}
          setOpenSubmenu={setOpenSubmenu}
          onClose={onClose}
        />
      ))}
    </nav>
  );
}
