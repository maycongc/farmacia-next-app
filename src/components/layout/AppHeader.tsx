'use client';
import { LogOut, Menu, X } from 'lucide-react';
// ...existing code...
import Link from 'next/link';
import { useSidebar } from '@/context/SidebarContext';
import { Button } from '@/design-system/components/Button';
import { EllipsisTooltip } from '@/design-system/components/EllipsisTooltip';
import { ThemeToggleButton } from '@/design-system/components/ThemeToggleButton';
import { useAuth } from '@/hooks/useAuth';
import { PERMISSOES, hasPermission } from '@/utils/permissions';

export function AppHeader() {
  const { user, logout } = useAuth();
  const { sidebarVisible, setSidebarVisible } = useSidebar();

  return (
    <header className="flex items-center gap-4 px-2 sm:px-6 py-3 border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-bg-alt))] sticky top-0 z-50">
      {/* Botão de menu/fechar para mobile */}
      <Button
        intent="ghost"
        size="sm"
        className="sm:hidden mr-2"
        aria-label={sidebarVisible ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        {sidebarVisible ? <X size={24} /> : <Menu size={24} />}
      </Button>
      <Link
        href="/"
        className="font-semibold text-lg hover:text-blue-600 transition-colors"
      >
        Farmácia
      </Link>

      <div className="ml-auto flex items-center gap-3">
        <ThemeToggleButton />
        {user && (
          <>
            <span className="text-sm opacity-80">{user.nome}</span>
            <EllipsisTooltip tooltip="Deslogar">
              <Button
                intent="ghost"
                size="sm"
                onClick={logout}
                aria-label="Sair"
                className="p-2"
              >
                <LogOut size={20} />
              </Button>
            </EllipsisTooltip>
          </>
        )}
      </div>
    </header>
  );
}
