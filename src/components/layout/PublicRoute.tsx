'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import GlobalLoader from './GlobalLoader';
import { useAuth } from '@/hooks/useAuth';

export function PublicRoute({
  children,
  redirectTo = '/dashboard',
}: {
  children: ReactNode;
  redirectTo?: string;
}) {
  const { isAuthenticated, isRestoringAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isRestoringAuth) return;

    if (isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isRestoringAuth, isAuthenticated, router, redirectTo]);

  if (isRestoringAuth) return <GlobalLoader />;

  return <>{children}</>;
}
