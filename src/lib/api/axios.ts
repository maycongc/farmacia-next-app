import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { endpoints } from './endpoints';
import { getAccessToken, setAccessToken, clearTokens } from '@/utils/authToken';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let refreshing = false;
let waitQueue: Array<() => void> = [];

api.interceptors.response.use(
  r => r,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const original = error.config as InternalAxiosRequestConfig;

    if (status === 401 && original && !original._retry) {
      if (refreshing) {
        await new Promise<void>(res => waitQueue.push(res));
      } else {
        refreshing = true;

        try {
          const resp = await api.post(endpoints.auth.refresh);
          // @ts-ignore
          setAccessToken(resp.data.accessToken);
        } catch {
          clearTokens();
          if (typeof window !== 'undefined') {
            window.location.href = '/login?unauthorized=1';
          }
          return Promise.reject(error);
        } finally {
          refreshing = false;
          waitQueue.forEach(fn => fn());
          waitQueue = [];
        }
      }

      original._retry = true;
      return api(original);
    }

    return Promise.reject(error);
  },
);
