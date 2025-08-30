export interface RemedioRequest {
  nome: string;
  via: string;
  lote: string;
  quantidade: number;
  validade: string;
  laboratorio: { id: number };
}

export interface RemedioResponse {
  id: number;
  nome: string;
  via: string;
  lote: string;
  validade: string;
  laboratorio: { id: number; nome: string };
  createdAt: string;
  updatedAt: string;
}
