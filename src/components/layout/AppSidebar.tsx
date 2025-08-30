'use client';
import { FlaskConical, Pill, Users } from 'lucide-react';
import React, { useState } from 'react';
import { SidebarMenu } from './sidebar/SidebarMenu';
import { SidebarUserInfo } from './sidebar/SidebarUserInfo';
import { useAuth } from '@/hooks/useAuth';
import { PERMISSOES } from '@/utils/permissions';

export interface MenuItem {
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
  onClose,
  isPublicRoute,
}: {
  expanded: boolean;
  setExpanded: (v: boolean) => void;
  isPublicRoute: () => boolean;
  onClose: () => void;
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
      className={`w-full fixed left-0 top-[64px] h-[calc(100dvh-64px)] ${
        isPublicRoute && isPublicRoute() ? 'hidden' : ''
      }  ${
        expanded ? 'max-w-[100dvw] sm:max-w-[200px]' : 'max-w-0 sm:max-w-[40px]'
      } z-[100] bg-[hsl(var(--color-bg-alt)/70)] border-r border-[hsl(var(--color-border))] transition-all duration-200 flex flex-col`}
      tabIndex={-1}
      role="navigation"
      aria-label="Sidebar"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Conteúdo principal da sidebar */}
      <div className="flex-1 flex flex-col">
        <SidebarMenu
          menu={menu}
          user={user}
          openSubmenu={openSubmenu}
          setOpenSubmenu={setOpenSubmenu}
          onClose={onClose}
        />
      </div>
      {/* Informações do usuário fixas no bottom, ocultas se recolhida em telas grandes */}
      <div className="mt-auto block sm:hidden">
        <SidebarUserInfo user={user} expanded={expanded} />
      </div>
    </aside>
  );
}
