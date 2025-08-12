'use client';
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import type { AuthUsuarioResponse } from '@/domain/dto/auth';
import { login as doLogin, me } from '@/services/authService';
import { setAccessToken, getAccessToken, clearTokens } from '@/utils/authToken';

interface AuthContextValue {
  user: AuthUsuarioResponse | null;
  loading: boolean;
  login: (u: string, p: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUsuarioResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    try {
      const u = await me();
      setUser({ ...u, permissoes: u.permissoes ?? [] });
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (getAccessToken()) {
      fetchMe();
    } else {
      setLoading(false);
    }
  }, [fetchMe]);

  async function login(username: string, senha: string) {
    const tokens = await doLogin({ username, senha });
    setAccessToken(tokens.accessToken);
    await fetchMe();
  }

  const router =
    typeof window !== 'undefined'
      ? require('next/navigation').useRouter()
      : null;

  function logout() {
    if (router) {
      router.push('/login'); // Redireciona para login sem parâmetro
    }
    clearTokens();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
