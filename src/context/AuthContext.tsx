'use client';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  login as doLogin,
  refresh as doRefresh,
  register as doRegister,
  me,
} from '@/services/authService';
import type { LoginRequest, RegisterRequest, User } from '@/types/auth';
import { clearTokens, getAccessToken, setAccessToken } from '@/utils/authToken';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isRefreshing: boolean;
  register: (data: RegisterRequest) => Promise<boolean | null>;
  login: (data: LoginRequest) => Promise<void>;
  refresh: () => Promise<boolean | null>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  isRefreshing: false,
  register: async () => null,
  login: async () => {},
  refresh: async () => null,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMe = useCallback(async () => {
    try {
      if (!user) {
        const u = await me();
        setUser(u);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (getAccessToken() && !user) {
      fetchMe();
    } else {
      setIsLoading(false);
    }
  }, [fetchMe, user]);

  async function register(data: RegisterRequest) {
    const [dia, mes, ano] = data.dataNascimento.split('/');
    const dataFormatada = `${ano}-${mes}-${dia}`;

    const success = await doRegister({
      ...data,
      dataNascimento: dataFormatada,
    });

    return success;
  }

  async function login(data: LoginRequest) {
    const { username, senha, rememberMe } = data;

    const responseData = await doLogin({ username, senha, rememberMe });
    setAccessToken(responseData.accessToken);
    setUser(responseData.usuario);
    setIsLoading(false);
  }

  async function refresh(): Promise<boolean> {
    if (isRefreshing) return false;

    setIsRefreshing(true);

    try {
      const { usuario, accessToken } = await doRefresh();
      setAccessToken(accessToken);
      setUser(usuario);
      return true;
    } catch {
      logout();
      return false;
    } finally {
      setIsRefreshing(false);
    }
  }

  const router =
    typeof window !== 'undefined'
      ? require('next/navigation').useRouter()
      : null;

  async function logout() {
    if (router) {
      router.push('/login'); // Redireciona para login sem parâmetro
    }

    clearTokens();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isRefreshing,
        register,
        login,
        refresh,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
