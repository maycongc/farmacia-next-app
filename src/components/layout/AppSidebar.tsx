'use client';
import { FlaskConical, Pill, Users } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { EllipsisTooltip } from '@/design-system/components/EllipsisTooltip';
import { useAuth } from '@/hooks/useAuth';
import { PERMISSOES, hasPermission } from '@/utils/permissions';

interface MenuItem {
  label: string;
  href?: string;
  permission?: string;
  submenu?: MenuItem[];
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

const menu: MenuItem[] = [
  {
    label: 'Usuários',
    href: '/usuarios',
    permission: PERMISSOES.USUARIO_READ,
    icon: Users,
  },
  {
    label: 'Laboratórios',
    href: '/laboratorios',
    permission: PERMISSOES.LABORATORIO_READ,
    icon: FlaskConical,
  },
  {
    label: 'Remédios',
    href: '/remedios',
    permission: PERMISSOES.REMEDIO_READ,
    icon: Pill,
  },
];

export function AppSidebar({
  expanded,
  setExpanded,
  visible = false,
  onClose,
}: {
  expanded: boolean;
  setExpanded: (v: boolean) => void;
  visible?: boolean;
  onClose?: () => void;
}) {
  const { user } = useAuth();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Expande/recolhe automaticamente em telas grandes (sm+) ao passar o mouse
  function handleMouseEnter() {
    if (window.innerWidth >= 640) setExpanded(true);
  }
  function handleMouseLeave() {
    if (window.innerWidth >= 640) setExpanded(false);
  }

  return (
    <aside
      className={`fixed left-0 ${
        visible ? 'top-[65px] h-[calc(100vh-65px)]' : 'top-0'
      } z-[100] bg-[hsl(var(--color-bg-alt))] border-r border-[hsl(var(--color-border))] transition-all duration-300 flex flex-col
          ${
            visible ? 'w-full max-w-full translate-x-0' : '-translate-x-full'
          } sm:w-[200px] sm:h-[calc(100vh-65px)] sm:max-w-[200px] sm:top-[65px] sm:translate-x-0 sm:flex
        `}
      style={
        visible
          ? {}
          : {
              width: expanded ? 200 : 40,
              maxWidth: 200,
              top: 65,
              height: `calc(100vh - 65px)`,
            }
      }
      tabIndex={-1}
      role="navigation"
      aria-label="Sidebar"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav className="flex flex-col gap-1 px-0 py-4 items-center mt-0">
        {menu.map(item => {
          if (item.permission && !hasPermission(user ?? {}, item.permission)) {
            return null;
          }
          const Icon = item.icon;
          // Submenu
          if (item.submenu) {
            return (
              <div
                key={item.label}
                className="w-full flex flex-col items-center"
              >
                <button
                  className="flex items-center w-full py-2 rounded hover:bg-brand-50/40 font-medium transition-all"
                  onClick={() =>
                    setOpenSubmenu(
                      openSubmenu === item.label ? null : item.label,
                    )
                  }
                >
                  <span className="flex items-center justify-center min-w-[32px] max-w-[32px] h-6 sm:min-w-[40px] sm:max-w-[40px]">
                    {Icon && <Icon size={20} className="mx-auto sm:size-6" />}
                  </span>
                  {(expanded || visible) && (
                    <span className="text-[15px] sm:text-sm font-medium text-left truncate w-full pl-2">
                      <EllipsisTooltip>{item.label}</EllipsisTooltip>
                    </span>
                  )}
                </button>

                {openSubmenu === item.label && expanded && (
                  <div
                    className="flex flex-col gap-1 w-full overflow-hidden bg-[hsl(var(--color-bg-alt-dark))]"
                    style={{ maxWidth: '100%' }}
                  >
                    {item.submenu.map(sub => {
                      if (
                        sub.permission &&
                        !hasPermission(user ?? {}, sub.permission)
                      ) {
                        return null;
                      }
                      const SubIcon = sub.icon;
                      return (
                        <Link
                          key={sub.label}
                          href={sub.href ?? '#'}
                          className="flex items-center py-1 rounded hover:bg-brand-50/40 text-sm gap-2 pl-2"
                          style={{ maxWidth: '100%' }}
                          onClick={() => {
                            if (visible && onClose) onClose();
                          }}
                        >
                          <span className="flex items-center justify-center min-w-[20px] max-w-[20px] h-8 sm:min-w-[24px] sm:max-w-[24px]">
                            {SubIcon && (
                              <SubIcon
                                size={16}
                                className="mx-auto sm:size-5"
                              />
                            )}
                          </span>
                          <span className="text-[15px] sm:text-sm text-left truncate w-full">
                            <EllipsisTooltip>{sub.label}</EllipsisTooltip>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }
          // Item normal
          return (
            <Link
              key={item.label}
              href={item.href ?? '#'}
              className="flex items-center w-full py-2 rounded hover:bg-brand-50/40 font-medium transition-all"
              onClick={() => {
                if (visible && onClose) onClose();
              }}
            >
              <span className="flex items-center justify-center min-w-[40px] max-w-[40px] h-6">
                {Icon && <Icon size={24} className="mx-auto" />}
              </span>
              {(expanded || visible) && (
                <span className="text-sm font-medium text-left truncate w-full pl-2">
                  <EllipsisTooltip>{item.label}</EllipsisTooltip>
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
