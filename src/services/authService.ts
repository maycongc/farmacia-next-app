import { api } from '@/lib/api/axios';
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
  const { data } = await api.post(endpoints.auth.login, payload);
  return data;
}

export async function refresh(): Promise<AuthDataResponse> {
  const { data } = await api.post(endpoints.auth.refresh);
  return data;
}

export async function me(): Promise<User> {
  const { data } = await api.get(endpoints.auth.me);
  return data;
}
