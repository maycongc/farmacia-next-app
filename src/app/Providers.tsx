'use client';
import { Theme } from '@radix-ui/themes';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppMain } from '@/components/layout/AppMain';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { queryClient } from '@/lib/react-query/queryClient';

export function Providers({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Theme accentColor="blue" radius="medium" scaling="100%">
        <ThemeProvider>
          <AuthProvider>
            <AppHeader />
            <AppSidebar expanded={expanded} setExpanded={setExpanded} />
            <AppMain>{children}</AppMain>
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </ThemeProvider>
      </Theme>
    </QueryClientProvider>
  );
}
