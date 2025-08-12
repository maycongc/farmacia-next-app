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
    permission: PERMISSOES.LIST_USUARIO,
    icon: Users,
  },
  {
    label: 'Laboratórios',
    href: '/laboratorios',
    permission: PERMISSOES.LIST_LABORATORIO,
    icon: FlaskConical,
  },
  {
    label: 'Remédios',
    href: '/remedios',
    permission: PERMISSOES.LIST_REMEDIO,
    icon: Pill,
  },
];

export function AppSidebar({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: (v: boolean) => void;
}) {
  const { user } = useAuth();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <aside
      className={`fixed left-0 z-40 bg-[hsl(var(--color-bg-alt))] border-r border-[hsl(var(--color-border))] transition-all duration-300 flex flex-col`}
      style={{
        width: expanded ? 200 : 40,
        maxWidth: 200,
        top: 65,
        height: `calc(100vh - 65px)`,
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <nav className="flex flex-col gap-1 px-0 py-4 items-center">
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
                  <span className="flex items-center justify-center min-w-[40px] max-w-[40px] h-6">
                    {Icon && <Icon size={24} className="mx-auto" />}
                  </span>
                  {expanded && (
                    <span className="text-sm font-medium text-left truncate w-full pl-2">
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
                        >
                          <span className="flex items-center justify-center min-w-[24px] max-w-[24px] h-8">
                            {SubIcon && (
                              <SubIcon size={20} className="mx-auto" />
                            )}
                          </span>
                          <span className="text-left truncate w-full">
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
            >
              <span className="flex items-center justify-center min-w-[40px] max-w-[40px] h-6">
                {Icon && <Icon size={24} className="mx-auto" />}
              </span>
              {expanded && (
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
