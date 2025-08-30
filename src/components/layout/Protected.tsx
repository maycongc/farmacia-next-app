'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, Suspense, useCallback, useEffect } from 'react';
import MainLayout from './MainLayout';
import { Loader } from '@/design-system/feedback/Loader';
import { useAuth } from '@/hooks/useAuth';

export function Protected({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  const redirectTo = useCallback(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('returnUrl');
    }
  }, []);

  const isPublicRoute = useCallback(() => {
    const publicRoutes = ['/login', '/register', '/forgot-password'];
    return publicRoutes.includes(pathName);
  }, [pathName]);

  useEffect(() => {
    if (isLoading) return;

    // Usuário não autenticado tentando acessar rota protegida
    if (!user && !isPublicRoute()) {
      const returnUrl = pathName === '/' ? '/dashboard' : pathName;
      sessionStorage.setItem('returnUrl', returnUrl);

      router.push('/login?unauthorized=1');
      return;
    }

    // Usuário autenticado tentando acessar rota pública
    if (user && isPublicRoute()) {
      router.push(redirectTo() ?? '/dashboard');
      return;
    }

    // Usuário autenticado acessando raiz
    if (user && pathName === '/') {
      router.push('/dashboard');
      return;
    }
  }, [isLoading, user, router, pathName, redirectTo, isPublicRoute]);

  if (isLoading)
    return (
      <div className="flex justify-center py-12">
        <Loader size="2" />
      </div>
    );

  if (!user && !isPublicRoute()) return null;

  return (
    <Suspense>
      <MainLayout>{children}</MainLayout>
    </Suspense>
  );
}
