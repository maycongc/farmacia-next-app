'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { useSidebar } from '@/context/SidebarContext';
import { Loader } from '@/design-system/feedback/Loader';
import { useAuth } from '@/hooks/useAuth';

export function Protected({ children }: { children: React.ReactNode }) {
  const { sidebarVisible, setSidebarVisible } = useSidebar();
  useEffect(() => {
    const handler = () => setSidebarVisible(true);
    window.addEventListener('sidebar-toggle', handler);
    return () => window.removeEventListener('sidebar-toggle', handler);
  }, [setSidebarVisible]);

  const { user, loading } = useAuth();
  const router = useRouter();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setRedirected(true);
      router.replace('/login');
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
      <AppSidebar
        expanded={sidebarExpanded}
        setExpanded={setSidebarExpanded}
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
      {sidebarVisible && (
        <div
          className="fixed inset-0 bg-black/30 z-30 sm:hidden"
          onClick={() => setSidebarVisible(false)}
        />
      )}
      <div
        className={`flex-1 flex flex-col ${
          sidebarVisible ? '' : 'sm:pl-8'
        } transition-all duration-300`}
      >
        {children}
      </div>
    </div>
  );
}
