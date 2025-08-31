'use client';

import { Button, Flex, Heading, IconButton, Tooltip } from '@radix-ui/themes';
import { LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggleButton } from '@/design-system/components/ThemeToggleButton';
import { useAuth } from '@/hooks/useAuth';

export function AppHeader({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}) {
  const { isAuthenticated, user, logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  return (
    <header className="flex items-center justify-between min-h-[64px] max-h-[64px] gap-4 px-2 sm:px-6 py-3 border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-bg-alt-dark))] sticky top-0 z-50">
      <Flex align={'center'} gap={'2'}>
        {isAuthenticated && (
          <Tooltip content={expanded ? 'Fechar menu' : 'Abrir menu'}>
            <IconButton
              variant="ghost"
              size="3"
              className="sm:hidden m-0"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <X size={24} /> : <Menu size={24} />}
            </IconButton>
          </Tooltip>
        )}

        <Link
          href="/dashboard"
          className="hover:text-blue-600 transition-colors"
        >
          <Heading>Farmácia</Heading>
        </Link>
      </Flex>

      <Flex gap={'2'} align={'center'} className="h-fit w-fit">
        <ThemeToggleButton />

        {isAuthenticated && (
          <>
            <span className="text-md opacity-80 hidden sm:inline">
              {user!.nome}
            </span>

            <Tooltip content="Sair">
              <Button
                variant="ghost"
                color="tomato"
                size="3"
                onClick={handleLogout}
                className="p-2 hidden sm:inline-flex m-0"
              >
                <LogOut size={20} />
              </Button>
            </Tooltip>
          </>
        )}
      </Flex>
    </header>
  );
}
