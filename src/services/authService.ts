import {
  LoginRequest,
  TokenResponse,
  AuthUsuarioResponse,
} from '@/domain/dto/auth';
import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';

export async function login(payload: LoginRequest): Promise<TokenResponse> {
  const { data } = await api.post(endpoints.auth.login, payload);
  return data;
}

export async function me(): Promise<AuthUsuarioResponse> {
  const { data } = await api.get(endpoints.auth.me);
  return data;
}
