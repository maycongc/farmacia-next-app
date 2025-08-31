'use client';
import { useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { clearFlag, getTs, setFlag } from '@/lib/authStorage';
import {
  login as doLogin,
  logout as doLogout,
  refresh as doRefresh,
  register as doRegister,
  me,
} from '@/services/authService';
import type { LoginRequest, RegisterRequest, User } from '@/types/auth';
import { clearTokens, getAccessToken, setAccessToken } from '@/utils/authToken';

type AuthContextProps = {
  user: User | null;
  isAuthenticated: boolean;
  register: (data: RegisterRequest) => Promise<boolean>;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  isRestoringAuth: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
  initialUser: User | null;
  initialToken: string | null;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

const LOGIN_EVENT = 'login';
export const LOGIN_KEY = 'auth:login';

const LOGOUT_EVENT = 'logout';
export const LOGOUT_KEY = 'auth:logout';

const LOGOUT_BLOCK_MS = 1000 * 60 * 5;

export function AuthProvider({
  children,
  initialUser,
  initialToken,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser ?? null);
  const [isRestoringAuth, setIsRestoringAuth] = useState(true);
  const queryClient = useQueryClient();

  const broadcastRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      broadcastRef.current = new BroadcastChannel('auth');
    }

    return () => {
      if (broadcastRef.current) broadcastRef.current.close();
    };
  }, []);

  function isRestoreBlocked(): boolean {
    try {
      const logoutTs = getTs(LOGOUT_KEY);
      if (!logoutTs) return false;

      const loginTs = getTs(LOGIN_KEY);
      if (loginTs && loginTs > logoutTs) {
        clearFlag(LOGOUT_KEY);
        return false;
      }

      const age = Date.now() - logoutTs;
      if (age < LOGOUT_BLOCK_MS) return true;

      clearFlag(LOGOUT_KEY);
      return false;
    } catch {
      return false;
    }
  }

  async function restoreAuth() {
    setIsRestoringAuth(true);

    try {
      if (isRestoreBlocked()) {
        clearTokens();
        setUser(null);
        return;
      }

      const token = getAccessToken();

      if (token) {
        try {
          const usuarioAutenticado = await me();
          setUser(usuarioAutenticado);
          return;
        } catch {}
      }

      try {
        const { usuario, accessToken } = await doRefresh();

        if (accessToken && usuario) {
          setAccessToken(accessToken);
          setUser(usuario);
          return;
        }
      } catch {}

      clearTokens();
      setUser(null);
    } finally {
      setIsRestoringAuth(false);
    }
  }

  useEffect(() => {
    if (initialToken) {
      setAccessToken(initialToken);

      if (initialUser) {
        setUser(initialUser);
        setIsRestoringAuth(false);
      } else {
        (async () => {
          try {
            const usuario = await me();
            setUser(usuario);
          } catch {
            setUser(null);
            clearTokens();
          } finally {
            setIsRestoringAuth(false);
          }
        })();
      }
      return;
    }

    (async () => {
      await restoreAuth();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const bc = broadcastRef.current;

    if (bc) {
      bc.onmessage = ev => {
        const { type, ts } = ev.data || {};

        if (type === LOGOUT_EVENT) {
          try {
            localStorage.setItem(LOGOUT_KEY, ts || String(Date.now()));
            localStorage.removeItem(LOGIN_KEY);
          } catch {}

          clearTokens();
          setUser(null);
          queryClient.clear();
        }

        if (type === LOGIN_EVENT) {
          try {
            localStorage.setItem(LOGIN_KEY, ts || String(Date.now()));
            localStorage.removeItem(LOGOUT_KEY);
          } catch (error) {}

          restoreAuth();
        }
      };

      return () => bc.close();
    } else {
      const onStorage = (ev: StorageEvent) => {
        if (ev.key === LOGOUT_KEY && ev.newValue) {
          clearTokens();
          setUser(null);
          queryClient.clear();
        }

        if (ev.key === LOGIN_KEY && ev.newValue) {
          restoreAuth();
        }
      };

      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function login(data: LoginRequest) {
    const now = Date.now();
    setFlag(LOGIN_KEY, now);
    clearFlag(LOGOUT_KEY);

    const { usuario, accessToken } = await doLogin(data);
    setAccessToken(accessToken);
    setUser(usuario);

    if (broadcastRef.current) {
      broadcastRef.current.postMessage({ type: LOGIN_EVENT, ts: now });
    } else {
      setFlag(LOGIN_KEY, now);
    }
  }

  async function logout() {
    const now = Date.now();
    setFlag(LOGOUT_KEY, now);
    clearFlag(LOGIN_KEY);

    if (broadcastRef.current) {
      broadcastRef.current.postMessage({ type: LOGOUT_EVENT, ts: now });
    } else {
      setFlag(LOGOUT_KEY, now);
    }

    try {
      await doLogout();
    } catch {}

    sessionStorage.setItem('logout', 'true');
    clearTokens();
    setUser(null);
    queryClient.clear();
  }

  async function register(data: RegisterRequest) {
    const [dia, mes, ano] = data.dataNascimento.split('/');
    const dataFormatada = `${ano}-${mes}-${dia}`;

    const success = await doRegister({
      ...data,
      dataNascimento: dataFormatada,
    });

    return success;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        isRestoringAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
