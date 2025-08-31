'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { queryClient } from '@/lib/react-query/queryClient';
import { User } from '@/types/auth';

type ClientProvidersProps = {
  children: ReactNode;
  initialUser: User | null;
  initialToken: string | null;
};

export function ClientProviders({
  children,
  initialToken,
  initialUser,
}: ClientProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider initialUser={initialUser} initialToken={initialToken}>
        {children}
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
