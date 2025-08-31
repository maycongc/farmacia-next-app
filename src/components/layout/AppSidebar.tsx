'use client';

import { useState } from 'react';
import { SidebarMenu } from './sidebar/SidebarMenu';
import { SidebarUserInfo } from './sidebar/SidebarUserInfo';

export function AppSidebar({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: (v: boolean) => void;
}) {
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
          setExpanded={setExpanded}
          openSubmenu={openSubmenu}
          setOpenSubmenu={setOpenSubmenu}
        />
      </div>
      {/* Informações do usuário fixas no bottom */}
      <div className="mt-auto block sm:hidden">
        <SidebarUserInfo expanded={expanded} />
      </div>
    </aside>
  );
}
