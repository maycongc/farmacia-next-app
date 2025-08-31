import { SidebarMenuItem } from './SidebarMenuItem';
import { sidebarMenuItems } from '@/lib/sidebarMenuItems';

interface SidebarMenuProps {
  setExpanded: (expanded: boolean) => void;
  openSubmenu: string | null;
  setOpenSubmenu: (label: string | null) => void;
}

export function SidebarMenu({
  setExpanded,
  openSubmenu,
  setOpenSubmenu,
}: SidebarMenuProps) {
  return (
    <nav className="flex flex-col gap-1 px-0 py-4 mt-0 overflow-y-auto w-full h-full max-h-full">
      {sidebarMenuItems.map(item => (
        <SidebarMenuItem
          key={item.label}
          item={item}
          setExpanded={setExpanded}
          openSubmenu={openSubmenu}
          setOpenSubmenu={setOpenSubmenu}
        />
      ))}
    </nav>
  );
}
