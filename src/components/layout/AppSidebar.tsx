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
      className={`fixed left-0 overflow-hidden ${
        visible
          ? 'top-[65px] h-[calc(100dvh-65px)] w-[100dvw] max-w-[100dvw] translate-x-0'
          : 'top-0 -translate-x-full'
      } z-[100] bg-[hsl(var(--color-bg-alt))] border-r border-[hsl(var(--color-border))] transition-all duration-300 flex flex-col sm:w-[200px] sm:h-[calc(100vh-65px)] sm:max-w-[200px] sm:top-[65px] sm:translate-x-0 sm:flex`}
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
      {/* Conteúdo principal da sidebar */}
      <div className="flex-1 flex flex-col">
        <SidebarMenu
          menu={menu}
          user={user}
          openSubmenu={openSubmenu}
          setOpenSubmenu={setOpenSubmenu}
          onClose={onClose}
          expanded={expanded}
        />
      </div>
      {/* Informações do usuário fixas no bottom, ocultas se recolhida em telas grandes */}
      <div className="mt-auto block sm:hidden">
        <SidebarUserInfo user={user} />
      </div>
    </aside>
  );
}
