import { api, authApi, HEADER_SKIP_AUTH_REFRESH } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';
import {
  AuthDataResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '@/types/auth';

export async function register(payload: RegisterRequest): Promise<boolean> {
  const { status } = await api.post(endpoints.auth.register, payload);
  return status === 201 ? true : false;
}

export async function login(payload: LoginRequest): Promise<AuthDataResponse> {
  const { data } = await authApi.post(endpoints.auth.login, payload, {
    headers: { [HEADER_SKIP_AUTH_REFRESH]: 'true' },
  });
  return data;
}

export async function refresh(): Promise<AuthDataResponse> {
  const controller = new AbortController();
  const t = setTimeout(() => {
    controller.abort;
  }, 10000);

  const { data } = await authApi.post(
    endpoints.auth.refresh,
    {},
    {
      signal: controller.signal,
      headers: { [HEADER_SKIP_AUTH_REFRESH]: 'true' },
    },
  );

  clearTimeout(t);
  return data;
}

export async function me(): Promise<User> {
  const { data } = await api.get(endpoints.auth.me);
  return data;
}

export async function logout(): Promise<void> {
  await authApi.post(
    endpoints.auth.logout,
    {},
    { headers: { [HEADER_SKIP_AUTH_REFRESH]: 'true' } },
  );
}
