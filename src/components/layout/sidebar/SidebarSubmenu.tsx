import Link from 'next/link';
import type { MenuItem } from '../AppSidebar';
import { hasPermission } from '@/utils/permissions';

interface SidebarSubmenuProps {
  item: MenuItem;
  user: any;
  openSubmenu: string | null;
  setOpenSubmenu: (label: string | null) => void;
}

export function SidebarSubmenu({
  item,
  user,
  openSubmenu,
  setOpenSubmenu,
}: SidebarSubmenuProps) {
  const isOpen = openSubmenu === item.label;
  return (
    <div className="w-full flex flex-col items-center">
      <button
        className="flex items-center w-full py-2 gap-2 px-3 sm:px-2 mx-0 sm:mx-2 rounded hover:bg-brand-50/40 font-medium transition-all"
        onClick={() => setOpenSubmenu(isOpen ? null : item.label)}
      >
        {item.icon && <item.icon size={24} />}
        {item.label}
      </button>
      {isOpen && (
        <div className="pl-6 w-full">
          {item.submenu?.map(sub => {
            if (sub.permission && !hasPermission(user ?? {}, sub.permission))
              return null;
            const SubIcon = sub.icon;
            return (
              <Link href={sub.href || '#'} key={sub.label} className="w-full">
                <button
                  className="flex items-center gap-2 w-full py-2 rounded hover:bg-brand-100/40 font-normal transition-all"
                  onClick={() => {
                    setOpenSubmenu(null);
                    if (typeof window !== 'undefined') {
                      const sidebar = document.querySelector(
                        '[aria-label="Sidebar"]',
                      );
                      if (sidebar && sidebar.hasAttribute('tabindex')) {
                        // Se o AppSidebar estiver controlando a visibilidade via onClose, dispara o evento
                        const evt = new CustomEvent('sidebar-close');
                        window.dispatchEvent(evt);
                      }
                    }
                  }}
                >
                  {SubIcon && <SubIcon size={24} />}
                  {sub.label}
                </button>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
