'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import GlobalLoader from './GlobalLoader';
import { useAuth } from '@/hooks/useAuth';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isRestoringAuth } = useAuth();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isRestoringAuth) return;

    // Usuário não autenticado tentando acessar rota protegida
    if (!isAuthenticated) {
      try {
        const userLoggedOut = sessionStorage.getItem('logout');

        // Usuário fez logout então redirecionar para login
        if (userLoggedOut) {
          sessionStorage.removeItem('logout');
          router.push('/login?logout=1');
          return;
        }

        // Salva a rota que tentou acessar para retornar após o login
        const returnUrl = pathName === '/' ? '/dashboard' : pathName;
        sessionStorage.setItem('returnUrl', `${returnUrl}?${searchParams}`);

        router.replace('/login?unauthorized=1');
      } catch {
        router.replace('/login?unauthorized=1');
      } finally {
        return;
      }
    }

    // Se esta autenticado e tentar acessar a raiz, redireciona para o dashboard
    if (isAuthenticated && pathName === '/') {
      router.replace('/dashboard');
      return;
    }
  }, [isAuthenticated, isRestoringAuth, router, pathName, searchParams]);

  if (isRestoringAuth) return <GlobalLoader />;

  if (!isAuthenticated) return <GlobalLoader />;

  return <>{children}</>;
}
