'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AppSidebar } from './AppSidebar';
import { Loader } from '@/design-system/feedback/Loader';
import { useAuth } from '@/hooks/useAuth';

export function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setRedirected(true);
      router.replace('/login?unauthorized=1');
    }
  }, [loading, user, router]);

  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <Loader />
      </div>
    );

  if (!user) return null;

  return (
    <div className="relative">
      <AppSidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      <div className="flex-1 flex flex-col pl-8">
        {redirected && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow z-50">
            Você foi redirecionado para o login por falta de autorização.
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
