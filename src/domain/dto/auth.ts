export interface LoginRequest {
  username: string;
  senha: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
}

export interface AuthUsuarioResponse {
  id: number;
  username: string;
  nome: string;
  email: string;
  permissoes?: string[];
}
