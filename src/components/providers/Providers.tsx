import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { ClientProviders } from './ClientProviders';
import { SelectionProvider } from '@/context/SelectionContext';
import { ThemeProvider } from '@/context/ThemeContext';
import {
  API_BASE_URL,
  HEADER_CONTENT_TYPE,
  HEADER_SKIP_AUTH_REFRESH,
} from '@/lib/api/axios';
import { AuthDataResponse, User } from '@/types/auth';

export async function Providers({ children }: { children: ReactNode }) {
  let initialUser: User | null = null;
  let initialToken: string | null = null;

  try {
    const cookieHeader = (await cookies()).toString();

    if (cookieHeader) {
      const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          Cookie: cookieHeader,
          [HEADER_CONTENT_TYPE]: 'application/json',
          [HEADER_SKIP_AUTH_REFRESH]: 'true',
        },

        cache: 'no-store',
      });

      if (res.ok) {
        const data: AuthDataResponse = await res.json();

        initialToken = data.accessToken ?? null;

        if (data.usuario) {
          initialUser = data.usuario;
        } else {
          if (initialToken) {
            const me = await fetch(`${API_BASE_URL}/auth/me`, {
              headers: {
                Authorization: `Bearer ${initialToken}`,
              },
              cache: 'no-store',
            });

            if (me.ok) initialUser = await me.json();
          }
        }
      }
    }
  } catch (error) {
    console.error('SSR auth check failed:', error);
  }

  return (
    <ClientProviders initialUser={initialUser} initialToken={initialToken}>
      <ThemeProvider>
        <SelectionProvider>{children}</SelectionProvider>
      </ThemeProvider>
    </ClientProviders>
  );
}
