import { usePathname } from 'next/navigation';
import { ReactNode, useCallback, useState } from 'react';
import { AppHeader } from './AppHeader';
import { AppMain } from './AppMain';
import { AppSidebar } from './AppSidebar';

export default function MainLayout({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const pathName = usePathname();

  const publicRoutes = ['/login', '/register', '/forgot-password'];

  const isPublicRoute = useCallback(() => {
    return publicRoutes.includes(pathName);
  }, [pathName]);

  function onCloseSidebar() {
    setExpanded(false);
  }

  return (
    <>
      <AppHeader expanded={expanded} setExpanded={setExpanded} />
      <AppSidebar
        expanded={expanded}
        setExpanded={setExpanded}
        isPublicRoute={isPublicRoute}
        onClose={onCloseSidebar}
      />
      <AppMain isPublicRoute={isPublicRoute}>{children}</AppMain>
    </>
  );
}
