'use client';
import Link from 'next/link';
import { Button } from '@/design-system/components/Button';
import { ThemeToggleButton } from '@/design-system/components/ThemeToggleButton';
import { useAuth } from '@/hooks/useAuth';
import { PERMISSOES, hasPermission } from '@/utils/permissions';

export function AppHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center gap-4 px-6 py-3 border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-bg-alt))] sticky top-0 z-50">
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
            <Button intent="ghost" size="sm" onClick={logout}>
              Sair
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
