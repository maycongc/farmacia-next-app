export interface User {
  id: number;
  username: string;
  nome: string;
  email: string;
  permissoes?: string[];
}

export interface LoginRequest {
  username: string;
  senha: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  nome: string;
  username: string;
  senha: string;
  email: string;
  cpf: string;
  dataNascimento: string;
}

export interface AuthDataResponse {
  accessToken: string;
  tipo: string;
  usuario: User;
}
