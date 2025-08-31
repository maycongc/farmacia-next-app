'use client';

import { ReactNode, useState } from 'react';
import { AppHeader } from './AppHeader';
import { AppMain } from './AppMain';
import { AppSidebar } from './AppSidebar';
import { useAuth } from '@/hooks/useAuth';

export default function MainLayout({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <>
      <AppHeader expanded={expanded} setExpanded={setExpanded} />
      {isAuthenticated && (
        <AppSidebar expanded={expanded} setExpanded={setExpanded} />
      )}
      <AppMain>{children}</AppMain>
    </>
  );
}
