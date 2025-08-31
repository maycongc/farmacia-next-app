import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { endpoints } from './endpoints';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const HEADER_SKIP_AUTH_REFRESH = 'X-Skip-Auth-Refresh';
export const HEADER_CONTENT_TYPE = 'Content-Type';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    [HEADER_CONTENT_TYPE]: 'application/json',
  },
  withCredentials: true,
});

export const authApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    [HEADER_CONTENT_TYPE]: 'application/json',
  },
  withCredentials: true,
});

// Flag para evitar loops infinitos no refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });

  failedQueue = [];
};

// Request interceptor - adiciona token de autorização
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

authApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor - trata refresh token automaticamente
api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const isAuthRoute =
      typeof originalRequest.url === 'string' &&
      (originalRequest?.url.includes(endpoints.auth.refresh) ||
        originalRequest?.url.includes(endpoints.auth.logout));

    const skip =
      originalRequest?.headers?.[HEADER_SKIP_AUTH_REFRESH] === 'true';

    // Se o erro não é 401 ou já tentamos fazer refresh, rejeita
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      isAuthRoute ||
      skip
    ) {
      return Promise.reject(error);
    }

    // Se já está fazendo refresh, adiciona à fila
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(token => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Tenta fazer refresh do token
      const response = await authApi.post(
        endpoints.auth.refresh,
        {},
        { headers: { [HEADER_SKIP_AUTH_REFRESH]: 'true' } },
      );

      const { accessToken } = response.data;

      if (accessToken) {
        // Salva novo token
        sessionStorage.setItem('accessToken', accessToken);
      }

      // Processa fila de requisições pendentes
      processQueue(null, accessToken);

      // Reexecuta requisição original
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }
      return api(originalRequest);
    } catch (refreshError) {
      // Se refresh falha, limpa dados e redireciona para login
      processQueue(refreshError, null);
      sessionStorage.removeItem('accessToken');
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
