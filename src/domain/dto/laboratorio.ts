export interface LaboratorioRequest {
  nome: string;
  cnpj: string;
  telefone?: string;
}
export interface LaboratorioUpdateRequest extends Partial<LaboratorioRequest> {}

export interface LaboratorioResponse {
  id: number;
  nome: string;
  endereco: string;
  email: string;
  telefone?: string;
  createdAt: string;
  updatedAt: string;
}
