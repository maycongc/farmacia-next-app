'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Protected } from '@/components/layout/Protected';
import { AuthProvider } from '@/context/AuthContext';
import { SelectionProvider } from '@/context/SelectionContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { queryClient } from '@/lib/react-query/queryClient';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <SelectionProvider>
            <Protected>{children}</Protected>
            <ReactQueryDevtools initialIsOpen={false} />
          </SelectionProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
